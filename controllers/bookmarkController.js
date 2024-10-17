const Bookmark = require('../models/Bookmark');
const connection = require('../connection/connection');


exports.getAllBookmarks = async (req, res) => {
    try {
        const [results, fields] = await connection.query('SELECT * FROM bookmarks');
        const bookmarks = results.map(row => new Bookmark(...Object.values(row)));

        res.json(bookmarks);
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getBookmarkByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const [results, fields] = await connection.query('SELECT * FROM bookmarks WHERE user_id = ?', [userId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }

        const bookmarks = results.map(row => new Bookmark(...Object.values(row)));

        res.json(bookmarks);
    } catch (error) {
        console.error('Error fetching bookmark:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createBookmark = async (req, res) => {
    try {
        const { user_id, item_id, stall_id } = req.body;

        const [result, fields] = await connection.query(
            'INSERT INTO bookmarks (user_id, item_id, stall_id) VALUES (?,?,?)',
            [user_id, item_id, stall_id]
        );
        
        const newBookmarkId = result.insertId;

        const [newBookmarkData] = await connection.query('SELECT * FROM bookmarks WHERE bookmark_id = ?', [newBookmarkId]);
        const newBookmark = new Bookmark(...Object.values(newBookmarkData[0]))

        res.status(201).json(newBookmark);
    } catch (error) {
        console.error('Error fetching bookmark:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteBookmark = async (req, res) => {
    try{
        const bookmarkId = req.params.id;

        const [result, fields] = await connection.query('DELETE FROM bookmarks WHERE bookmark_id = ?', bookmarkId);

        if (result.affectedRows === 0 ) {
            return res.status(404).json({error: 'Bookmark not found'})
        }

        //Status code 204 cant send messages on the json
        res.status(204).send()
    } catch (error) {
        console.error('Error fetching bookmark:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}