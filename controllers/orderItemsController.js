const OrderItem = require('../models/OrderItem');
const connection = require('../connection/connection');

exports.getAllOrderItems = async (req, res) => {
    try {
        const [results, fields] = await connection.query('SELECT * FROM order_items');
        const orderItems = results.map(row => new OrderItem(...Object.values(row)));

        res.json(orderItems);
    } catch (error) {
        console.error('Error fetching order items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getOrderItemById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const [results, fields] = await connection.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Order Items not found' })
        }

        const orderItems = results.map(row => new OrderItem(...Object.values(row)));

        res.json(orderItems);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createOrderItem = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { item_id, quantity, subtotal } = req.body;

        const [result, fields] = await connection.query(
            'INSERT INTO order_items (order_id, item_id, quantity, subtotal) VALUES (?,?,?,?)',
            [ orderId, item_id, quantity, subtotal]
        );
        const newOrderItemId = result.insertId;

        const [newOrderItemData] = await connection.query('SELECT * FROM order_items WHERE order_item_id = ?', [newOrderItemId]);
        const newOrderItem = new OrderItem(...Object.values(newOrderItemData[0]))

        res.status(201).json(newOrderItem);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteOrderItem = async (req, res) => {
    const orderId = req.params.id;

    try{
        await connection.beginTransaction(); // Start a transaction

        // 1. Delete associated order_items
        await connection.query('DELETE FROM order_items WHERE order_id = ?', [orderId]);

        // 2. Delete the order itself
        const [result, fields] = await connection.query('DELETE FROM orders WHERE order_id = ?', orderId);

        await connection.commit(); // Commit the transaction if both deletions succeed

        if (result.affectedRows === 0 ) {
            return res.status(404).json({error: 'Order not found'})
        }

        //Status code 204 cant send messages on the json
        res.status(204).send()
    } catch (error) {
        await connection.rollback(); // Rollback the transaction if any error occurs
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}