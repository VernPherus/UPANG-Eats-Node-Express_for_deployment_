const Order = require("../models/Order");
const connection = require("../connection/connection");

exports.getAllOrders = async (req, res) => {
    try {
        const [results, fields] = await connection.query(`SELECT * FROM orders`);
        const orders = results.map(row => new Order(...Object.values(row)));

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getOrdersForStall = async (req, res) => {
    try {
        const stallId = req.params.id;

        // 1. Fetch orders for the stall
        const [ordersResult] = await connection.query(`
        SELECT o.*, u.first_name, u.last_name
        FROM orders o
        JOIN users u ON o.user_id = u.user_id 
        WHERE o.stall_id = ?`,
            [stallId]
        );
        console.log(ordersResult);

        // 2. For each order, fetch its items and construct the receipt data
        const receipts = await Promise.all(ordersResult.map(async (order) => {
            const [orderItemsResult] = await connection.query(`
            SELECT oi.*, fi.item_name, fi.image_url 
            FROM order_items oi
            JOIN food_items fi ON oi.item_id = fi.item_id
            WHERE oi.order_id = ?`,
                [order.order_id]
            );

            return {
                order_id: order.order_id,
                user_id: order.user_id,
                stall_id: order.stall_id,
                order_date: order.order_date,
                total_amount: order.total_amount,
                order_status: order.order_status,
                customer_name: `${order.first_name} ${order.last_name}`,
                items: orderItemsResult.map(item => ({
                    order_item_id: item.order_item_id,
                    item_id: item.item_id,
                    item_name: item.item_name,
                    quantity: item.quantity,
                    subtotal: item.subtotal,
                    image_url: item.image_url,
                })),
            };
        }));
        console.log(receipts);

        res.json(receipts); // Send the array of receipts
    } catch (error) {
        console.error('Error fetching orders for stall:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};



exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const [results, fields] = await connection.query('SELECT * FROM orders WHERE order_id = ?', [orderId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Order not found' })
        }

        const order = new Order(...Object.values(results[0]));
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.getOrderByUserId = async (req, res) => {
    try {
        const userId = req.params.id; // Changed orderId to userId

        // 1. Fetch orders for the user
        const [ordersResult] = await connection.query(`
      SELECT o.*, u.first_name, u.last_name
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      WHERE o.user_id = ?`,
            [userId]
        );

        if (ordersResult.length === 0) {
            return res.status(404).json({ error: 'No orders found for this user' });
        }

        // 2. For each order, fetch its items
        const orders = await Promise.all(ordersResult.map(async (order) => {
            const [orderItemsResult] = await connection.query(`
        SELECT oi.*, fi.item_name, fi.image_url
        FROM order_items oi
        JOIN food_items fi ON oi.item_id = fi.item_id
        WHERE oi.order_id = ?`,
                [order.order_id]
            );

            return {
                order_id: order.order_id,
                user_id: order.user_id,
                stall_id: order.stall_id,
                order_date: order.order_date,
                total_amount: order.total_amount,
                order_status: order.order_status,
                customer_name: `${order.first_name} ${order.last_name}`,
                items: orderItemsResult.map(item => ({
                    order_item_id: item.order_item_id,
                    item_id: item.item_id,
                    item_name: item.item_name,
                    quantity: item.quantity,
                    subtotal: item.subtotal,
                    image_url: item.image_url,
                })),
            };
        }));

        res.json(orders);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createOrder = async (req, res) => {
    try {
        const { user_id, total_amount, items } = req.body;

        // 1. Get the stall_id from the first item (assuming all items are from the same stall)
        const itemId = items[0].item_id; // Assuming items is not empty

        const [rows] = await connection.query(
            'SELECT stall_id FROM food_items WHERE item_id = ?',
            [itemId]
        );

        if (rows.length === 0) {
            throw new Error('Item not found');
        }

        const stall_id = rows[0].stall_id;

        // 2. Create the order
        const [orderResult] = await connection.query(
            'INSERT INTO orders (user_id, stall_id, total_amount) VALUES (?, ?, ?)',
            [user_id, stall_id, total_amount]
        );
        const orderId = orderResult.insertId;

        // 3. Create order items
        for (const item of items) {
            await connection.query(
                'INSERT INTO order_items (order_id, item_id, quantity, subtotal) VALUES (?, ?, ?, ?)',
                [orderId, item.item_id, item.quantity, item.subtotal]
            );
        }

        // 4. Delete the user's tray items
        await connection.query('DELETE FROM trays WHERE user_id = ?', [user_id]);

        res.status(201).send();
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { order_status } = req.body;

        const [result, fields] = await connection.query(
            'UPDATE orders SET order_status = ? WHERE order_id = ?',
            [order_status, orderId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' })
        }

        const [updatedOrderData] = await connection.query(
            'SELECT * FROM orders WHERE order_id = ?', [orderId]
        )
        const updatedOrder = new Order(...Object.values(updatedOrderData[0]));

        res.json(updatedOrder);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const [result, fields] = await connection.query('DELETE FROM orders WHERE order_id = ?', orderId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' })
        }

        //Status code 204 cant send messages on the json
        res.status(204).send()
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}