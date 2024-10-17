const connection = require('../connection/connection');
const Transaction = require('../models/Transaction');

exports.getAllTransactions = async (req, res) => {
    try {
        const [results, fields] = await connection.query('SELECT * FROM transactions');
        const transactions = results.map(row => new Transaction(...Object.values(row)));

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getTransactionByUserId = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const [results, fields] = await connection.query('SELECT * FROM transactions WHERE user_id = ?', [transactionId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' })
        }

        const transactions = results.map(row => new Transaction(...Object.values(row)));
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createTransaction = async (req, res) => {
    try {
        const { user_id, transaction_type, amount, source_id, destination_id, status, description } = req.body;

        const [result, fields] = await connection.query(
            'INSERT INTO transactions (user_id, transaction_type, amount, source_id, destination_id, status, description) VALUES (?,?,?,?,?,?,?)',
            [user_id, transaction_type, amount, source_id, destination_id, status, description]
        );

        const newTransactionId = result.insertId;

        const [newTransactionData] = await connection.query('SELECT * FROM transactions WHERE transaction_id = ?', [newTransactionId]);
        const newTransaction = new Transaction(...Object.values(newTransactionData[0]))

        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateTransactionStatus = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const { status } = req.body;

        const [result, fields] = await connection.query(
            'UPDATE transactions SET status = ? WHERE transaction_id = ?',
            [status, transactionId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({error: 'Transaction not found'})
        }

        const [updatedTransactionData] = await connection.query(
            'SELECT * FROM transactions WHERE transaction_id = ?', [transactionId]
        )
        const updatedTransaction = new Transaction(...Object.values(updatedTransactionData[0]));

        res.json(updatedTransaction);
    } catch(error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// exports.deleteStall = async (req, res) => {
//     try{
//         const stallId = req.params.id;

//         const [result, fields] = await connection.query('DELETE FROM stalls WHERE stall_id = ?', stallId);

//         if (result.affectedRows === 0 ) {
//             return res.status(404).json({error: 'Stall not found'})
//         }

//         //Status code 204 cant send messages on the json
//         res.status(204).send()
//     } catch (error) {
//         console.error('Error fetching stall:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }
