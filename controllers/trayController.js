const Tray = require('../models/Tray');
const connection = require('../connection/connection');
const Stall = require('../models/Stall');

exports.getAllTrays = async (req, res) => {
    try {
        const [results, fields] = await connection.query(`
            SELECT t.*, s.stall_name, f.item_name 
            FROM trays t
            JOIN food_items f ON t.item_id = f.item_id
            JOIN stalls s ON f.stall_id = s.stall_id
            `);
        const trays = results.map(row => {
            const tray = new Tray(...Object.values(row));
            tray.stall_name = row.stall_name;
            tray.item_name = row.item_name;
            return tray;
        });

        res.json(trays);
    } catch (error) {
        console.error('Error fetching trays:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getTrayByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const [results, fields] = await connection.query(`
            SELECT t.*, s.stall_name, f.item_name 
            FROM trays t
            JOIN food_items f ON t.item_id = f.item_id
            JOIN stalls s ON f.stall_id = s.stall_id
            WHERE user_id = ?
            `, [userId]);
        const trays = results.map(row => {
            const tray = new Tray(...Object.values(row));
            tray.stall_name = row.stall_name;
            tray.item_name = row.item_name;
            return tray;
        });
        res.json(trays);
    } catch (error) {
        console.error('Error fetching tray:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createTray = async (req, res) => {
    try {
        const { user_id, item_id, quantity } = req.body;

        // 1. Get the stall_id of the new item
        const [itemResult] = await connection.query('SELECT stall_id FROM food_items WHERE item_id = ?', [item_id]);
        if (itemResult.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        const newItemStallId = itemResult[0].stall_id;

        // 2. Check if there are existing items in the tray with a different stall_id
        const [existingTrayResult] = await connection.query(`
            SELECT tray_id
            FROM trays
            WHERE user_id = ?`, [user_id]);

        if (existingTrayResult.length > 0) {
            const existingTrayIds = existingTrayResult.map(row => row.tray_id); // Extract tray_ids

            const [stallIdsResult] = await connection.query(`
                SELECT DISTINCT stall_id
                FROM food_items fi
                JOIN trays t ON fi.item_id = t.item_id
                WHERE t.tray_id IN (?)`, [existingTrayIds]);

            if (stallIdsResult.length > 1 || (stallIdsResult.length === 1 && stallIdsResult[0].stall_id !== newItemStallId)) {
                // There are items from multiple stalls or a single stall that's different from the new item
                return res.status(409).json({
                    message: 'Stall conflict',
                    trayIdsToDelete: existingTrayIds, // Send the list of tray_ids to delete
                    newStallId: newItemStallId
                });
            }
        }

        // 3. If no conflict, proceed with creating the tray item
        const [result, fields] = await connection.query(
            'INSERT INTO trays (user_id, item_id, quantity) VALUES (?,?,?)',
            [user_id, item_id, quantity]
        );

        const newTrayId = result.insertId;

         // 4. Get the stall_id of the newly added tray item
         const [trayItemResult] = await connection.query(`
            SELECT fi.stall_id 
            FROM food_items fi
            JOIN trays t ON fi.item_id = t.item_id
            WHERE t.tray_id = ?`, 
            [newTrayId]
        );
        const newTrayStallId = trayItemResult[0].stall_id;

        // 5. Get the stall details using the stall_id
        const [stallResult] = await connection.query('SELECT * FROM stalls WHERE stall_id = ?', [newTrayStallId]);

        const stall = new Stall(...Object.values(stallResult[0]));

        // 6. Include the stall details in the response
        res.status(201).json(stall);
    } catch (error) {
        console.error('Error fetching tray:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateTray = async (req, res) => {
    try {
        const trayId = req.params.id;
        const { quantity } = req.body;

        const [result, fields] = await connection.query(
            'UPDATE trays SET quantity = ? WHERE tray_id = ?',
            [quantity, trayId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tray not found' })
        }

        const [updatedTrayData] = await connection.query(
            'SELECT * FROM trays WHERE tray_id = ?', [trayId]
        )
        const updatedTray = new Tray(...Object.values(updatedTrayData[0]));

        res.json(updatedTray);
    } catch (error) {
        console.error('Error fetching tray:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteTray = async (req, res) => {
    try {
        const trayId = req.params.id;

        const [result, fields] = await connection.query('DELETE FROM trays WHERE tray_id = ?', trayId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tray not found' })
        }

        //Status code 204 cant send messages on the json
        res.status(204).send()
    } catch (error) {
        console.error('Error deleting tray:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.deleteTrayIds = async (req, res) => {
    try {
        const trayIdsToDelete = req.body;

        if (!Array.isArray(trayIdsToDelete) || trayIdsToDelete.length === 0) {
            return res.status(400).json({
                error: 'Invalid request body. Expected an array of tray_ids.'
            });
        }

        const [result] = await connection.query(`DELETE FROM trays WHERE tray_id IN (?)`, [trayIdsToDelete]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'No matching tray items found'
            });
        }

        //Status code 204 cant send messages on the json
        res.status(204).send()
    } catch (error) {
        console.error('Error deleting tray items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}