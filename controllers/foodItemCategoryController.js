const FoodItemCategory = require("../models/FoodItemCategory");
const connection = require("../connection/connection");

exports.addCategoriesToFoodItem = async (req, res) => {
    const foodId = req.params.id;
    try {
        const categoryIds = req.body;

        await connection.query(
            'DELETE FROM food_item_categories WHERE food_item_id = ?',
            [foodId]
        );

        if (categoryIds && categoryIds.length > 0) {
            const values = categoryIds.map(categoryId => [foodId, categoryId]);
            await connection.query(
                'INSERT INTO food_item_categories (food_item_id, category_id) VALUES ?',
                [values]
            );
        }

        const [updatedCategories] = await connection.query(`
            SELECT c.* 
            FROM categories c
            JOIN food_item_categories fic ON c.category_id = fic.category_id
            WHERE fic.food_item_id = ? AND c.category_id IN (?)`,
            [foodId, categoryIds]
        );

        res.status(201).json(updatedCategories);
    } catch (error) {
        console.error('Error fetching food:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}