const mysql = require("mysql2");

exports.createDatabase = async () => {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      multipleStatements: true,
    });

    const sql = `

  -- Create Database

  CREATE DATABASE IF NOT EXISTS test_db_ohoho;
  USE test_db_ohoho;


  -- Table structure for bookmarks

  CREATE TABLE bookmarks(
    bookmark_id int(11) NOT NULL,
    user_id int(11) DEFAULT NULL, 
    item_id int(11) DEFAULT NULL,
    stall_id int(11) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


  -- Dumping data for table 'bookmarks'

  INSERT INTO bookmarks (bookmark_id, user_id, item_id, stall_id) VALUES
    (1, 1, 1, 1), 
    (3, 1, 2, 3), 
    (4, 1, 5, 3), 
    (5, 2, 1, 1), 
    (6, 2, 2, 1),
    (7, 2, 3, 1), 
    (8, 2, 4, 1);


  -- Table structre for 'categories'
  
  CREATE TABLE categories (
    category_id int(11) NOT NULL,
    category_name varchar(255) NOT NULL,
    image_url varchar(255) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- Dumping data for table categories
  INSERT INTO categories (category_id, category_name, image_url) VALUES
    (1, 'Snack', 'assets/categories/Snack.png'),
    (2, 'Burger', 'assets/categories/Burger.png'),
    (3, 'Rice Meal', 'assets/categories/RiceMeal.png'),
    (4, 'Drinks', 'assets/categories/Drinks.png'),
    (5, 'Noodles', 'assets/categories/Noodles.png'),
    (6, 'Dimsum', 'assets/categories/Dimsums.png'),
    (7, 'Fries', 'assets/categories/Fries.png'),
    (8, 'Bread', 'assets/categories/Bread.png'),
    (10, 'Soup', 'assets/categories/Soup.png');


  -- Table structure for 'food_items'

  CREATE TABLE food_items (
    item_id int(11) NOT NULL,
    stall_id int(11) DEFAULT NULL,
    item_name varchar(255) NOT NULL,
    description text DEFAULT NULL,
    price int(10) NOT NULL,
    image_url varchar(255) DEFAULT NULL,
    is_available tinyint(1) DEFAULT 1,
    is_breakfast tinyint(1) DEFAULT 0,
    is_lunch tinyint(1) DEFAULT 0,
    is_merienda tinyint(1) DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


  -- Dumping data for table 'food_items'
  INSERT INTO food_items (item_id, stall_id, item_name, description, price, image_url, is_available, is_breakfast, is_lunch, is_merienda) VALUES
    (2, 1, 'Lumpiang Shanghai', 'Cheese ng tatay mo', 50, '', 0, 0, 0, 0),
    (3, 1, 'Chicken Burger', 'Chicken patty in a soft bun with lettuce and mayo', 75, '', 1, 0, 1, 0),
    (4, 1, 'Tapsilog', 'Beef tapa with fried egg and garlic rice', 120, '', 1, 1, 1, 0),
    (5, 1, 'Pancit Canton', 'Stir-fried noodles with vegetables and meat', 65, '', 1, 0, 1, 1),
    (6, 1, 'Siomai', 'Steamed pork dumplings served with soy sauce', 45, '', 0, 0, 0, 0),
    (7, 2, 'Turon', 'Banana wrapped in spring roll wrapper and fried', 20, '', 1, 0, 0, 1),
    (8, 2, 'Cheeseburger', 'Juicy beef patty with cheese in a bun', 85, '', 1, 0, 1, 0),
    (9, 2, 'Adobo Rice Meal', 'Savory chicken adobo with rice', 110, '', 1, 1, 1, 0),
    (10, 2, 'Buko Juice', 'Fresh coconut juice', 30, '', 1, 0, 1, 1),
    (11, 2, 'Kikiam', 'Deep-fried pork sausage served with sauce', 35, '', 1, 0, 1, 1),
    (12, 3, 'Banana Cue', 'Caramelized bananas on a stick', 25, '', 1, 0, 0, 1),
    (13, 3, 'Double Burger', 'Double beef patty with cheese and bacon', 120, '', 1, 0, 1, 0),
    (14, 3, 'Longsilog', 'Sweet longganisa with fried egg and garlic rice', 95, '', 1, 1, 1, 0),
    (15, 3, 'Mami Noodles', 'Hot beef noodle soup', 70, '', 1, 0, 1, 1),
    (16, 3, 'French Fries', 'Crispy potato fries', 45, '', 1, 0, 1, 1),
    (17, 4, 'Puto', 'Steamed rice cakes', 15, '', 1, 0, 0, 1),
    (18, 4, 'Bacon Cheeseburger', 'Beef patty with bacon and cheese', 105, '', 1, 0, 1, 0),
    (19, 4, 'Lechon Kawali Meal', 'Crispy fried pork belly with rice', 130, '', 1, 1, 1, 0),
    (20, 4, 'Sago’t Gulaman', 'Sweet tapioca pearls and gelatin drink', 25, '', 1, 0, 1, 1),
    (21, 4, 'Siopao', 'Steamed bun with pork filling', 40, '', 1, 0, 1, 1),
    (36, 1, 'Milo', 'Energy Gap', 30, '', 0, 0, 0, 1);

    

  `;

    await connection.promise().query(sql);
    console.log("Database and tables created successfully!");
  } catch (err) {
    console.error("Error creating database: ", err);
  }
};
