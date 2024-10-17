const User = require('../models/User');
const connection = require('../connection/connection');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const [results, fields] = await connection.query('SELECT * FROM users');
        const users = results.map(row => new User(...Object.values(row)));

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const [results, fields] = await connection.query('SELECT * FROM users WHERE user_id = ?', [userId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user = new User(...Object.values(results[0]));
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getTotalUsers = async (req, res) => {
    try {
        const [results] = await connection.query('SELECT COUNT(*) AS totalUsers FROM users');
        const totalUsers = results[0].totalUsers;
        res.json({ totalUsers });
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.createUser = async (req, res) => {
    try {
        const { student_id, first_name, last_name, email, password, phone_number, user_type } = req.body;

        // hashing the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const [result] = await connection.query(
            'INSERT INTO users (student_id, first_name, last_name, email, password, phone_number, user_type) VALUES (?,?,?,?,?,?,?)',
            [student_id, first_name, last_name, email, hashedPassword, phone_number, user_type]
        );

        const newUserId = result.insertId;

        const [newUserData] = await connection.query('SELECT * FROM users WHERE user_id = ?', [newUserId]);
        const newUser = new User(...Object.values(newUserData[0]));

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { student_id, first_name, last_name, email, password, phone_number, user_type } = req.body;

        const [result, fields] = await connection.query(
            'UPDATE users SET student_id = ?, first_name = ?, last_name = ?, email = ?, password = ?, phone_number = ?, user_type = ? WHERE user_id = ?',
            [student_id, first_name, last_name, email, password, phone_number, user_type, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({error: 'User not found'})
        }

        const [updatedUserData] = await connection.query(
            'SELECT * FROM users WHERE user_id = ?', [userId]
        )
        const updatedUser = new User(...Object.values(updatedUserData[0]));

        res.json(updatedUser);
    } catch(error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;

        const [result, fields] = await connection.query('DELETE FROM users WHERE user_id = ?', userId);

        if (result.affectedRows === 0 ) {
            return res.status(404).json({error: 'User not found'})
        }

        //Status code 204 cant send messages on the json
        res.status(204).send()
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// login function
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        // no user
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];

        // hashpassword and password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // check user_type
        let userTypeResponse;
        switch (user.user_type) {
            case 'admin':
                userTypeResponse = 'Admin access granted';
                break;
            case 'stall_owner':
                userTypeResponse = 'Stall owner access granted';
                break;
            case 'user':
                userTypeResponse = 'User access granted';
                break;
            default:
                userTypeResponse = 'Unknown user type';
        }

        // success
        const response = {
            user_id: user.user_id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
            user_type: user.user_type,
        };

        if (user.user_type === 'stall_owner') {
            const [stallResult] = await connection.query('SELECT stall_id, stall_name FROM stalls WHERE owner_id = ?', [user.user_id]);
            if (stallResult.length > 0) {
                response.stall_id = stallResult[0].stall_id;
                response.stall_name = stallResult[0].stall_name; // Add stall_name to response
            }
        }
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};