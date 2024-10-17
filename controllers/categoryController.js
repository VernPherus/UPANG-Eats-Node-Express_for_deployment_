const Category = require('../models/Category');
const connection = require('../connection/connection');


exports.getAllCategories = async (req, res) => {
    try {
        const [results, fields] = await connection.query('SELECT * FROM categories');
        const categories = results.map(row => new Category(...Object.values(row)));

        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createCategory = async (req, res) => {
    try {
        const { category_name, image_url } = req.body;
        
        const [result, fields] = await connection.query(
            'INSERT INTO categories (category_name, image_url) VALUES (?, ?)',
            [category_name, image_url]
        );
        
        const newCategoryId = result.insertId;

        const [newCategoryData] = await connection.query('SELECT * FROM categories WHERE category_id = ?', [newCategoryId]);
        const newCategory = new Category(...Object.values(newCategoryData[0]))

        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.updateCategoryName = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { category_name, image_url } = req.body;

        const [result, fields] = await connection.query(
            'UPDATE categories SET category_name = ?, image_url = ? WHERE category_id = ?',
            [category_name, image_url, categoryId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({error: 'Category not found'})
        }

        const [updatedCategoryData] = await connection.query(
            'SELECT * FROM categories WHERE category_id = ?', [categoryId]
        )
        const updatedCategory = new Category(...Object.values(updatedCategoryData[0]));
        
        res.json(updatedCategory);
    } catch(error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteCategory = async (req, res) => {
    try{
        const categoryId = req.params.id;

        const [result, fields] = await connection.query('DELETE FROM categories WHERE category_id = ?', categoryId);

        if (result.affectedRows === 0 ) {
            return res.status(404).json({error: 'Category not found'})
        }

        //Status code 204 cant send messages on the json
        res.status(204).send()
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}