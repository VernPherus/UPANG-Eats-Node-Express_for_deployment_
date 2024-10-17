-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2024 at 09:00 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `upang_eats`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `bookmark_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `stall_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`bookmark_id`, `user_id`, `item_id`, `stall_id`) VALUES
(1, 1, 1, 1),
(3, 1, 2, 3),
(4, 1, 5, 3),
(5, 2, 1, 1),
(6, 2, 2, 1),
(7, 2, 3, 1),
(8, 2, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `image_url`) VALUES
(1, 'Snack', 'assets/categories/Snack.png'),
(2, 'Burger', 'assets/categories/Burger.png'),
(3, 'Rice Meal', 'assets/categories/RiceMeal.png'),
(4, 'Drinks', 'assets/categories/Drinks.png'),
(5, 'Noodles', 'assets/categories/Noodles.png'),
(6, 'Dimsum', 'assets/categories/Dimsums.png'),
(7, 'Fries', 'assets/categories/Fries.png'),
(8, 'Bread', 'assets/categories/Bread.png'),
(10, 'Soup', 'assets/categories/Soup.png');

-- --------------------------------------------------------

--
-- Table structure for table `food_items`
--

CREATE TABLE `food_items` (
  `item_id` int(11) NOT NULL,
  `stall_id` int(11) DEFAULT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` int(10) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `is_breakfast` tinyint(1) DEFAULT 0,
  `is_lunch` tinyint(1) DEFAULT 0,
  `is_merienda` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_items`
--

INSERT INTO `food_items` (`item_id`, `stall_id`, `item_name`, `description`, `price`, `image_url`, `is_available`, `is_breakfast`, `is_lunch`, `is_merienda`) VALUES
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

-- --------------------------------------------------------

--
-- Table structure for table `food_item_categories`
--

CREATE TABLE `food_item_categories` (
  `food_item_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_item_categories`
--

INSERT INTO `food_item_categories` (`food_item_id`, `category_id`) VALUES
(2, 1),
(3, 2),
(4, 3),
(5, 5),
(6, 6),
(7, 1),
(8, 2),
(9, 3),
(10, 4),
(11, 6),
(12, 1),
(13, 2),
(14, 3),
(15, 10),
(16, 7),
(17, 1),
(18, 2),
(19, 3),
(20, 4),
(21, 6);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `stall_id` int(11) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` int(10) NOT NULL,
  `order_status` enum('pending','accepted','ready','completed','cancelled') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `stall_id`, `order_date`, `total_amount`, `order_status`) VALUES
(2, 2, 1, '2024-09-21 18:15:49', 123, 'ready'),
(3, 2, 1, '2024-10-10 19:48:34', 340, 'ready'),
(5, 2, 1, '2024-10-10 19:49:56', 340, 'accepted'),
(16, 1, 1, '2024-10-10 21:23:28', 50, 'pending'),
(32, 1, 1, '2024-10-11 14:06:40', 445, 'accepted'),
(34, 10, 1, '2024-10-11 18:17:11', 345, 'ready'),
(35, 10, 1, '2024-10-12 16:46:58', 50, 'accepted');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `item_id`, `quantity`, `subtotal`) VALUES
(1, NULL, 2, 2, 100),
(2, NULL, 3, 1, 75),
(3, NULL, 3, 1, 75),
(6, 2, 4, 1, 120),
(7, 2, 5, 2, 240),
(8, 3, 2, 1, 50),
(9, 3, 4, 2, 240),
(10, 4, 2, 1, 50),
(11, 4, 4, 2, 240),
(12, 5, 2, 1, 50),
(13, 5, 4, 2, 240),
(14, 6, 2, 1, 50),
(15, 6, 4, 2, 240),
(16, 7, 2, 1, 50),
(17, 7, 4, 2, 240),
(18, 8, 2, 1, 50),
(19, 8, 4, 2, 240),
(20, 9, 2, 1, 50),
(21, 9, 4, 2, 240),
(22, 10, 2, 1, 50),
(23, 11, 2, 1, 50),
(24, 12, 2, 1, 50),
(25, 13, 2, 1, 50),
(26, 14, 2, 1, 50),
(27, 15, 2, 1, 50),
(28, 16, 2, 1, 50),
(29, 17, 2, 1, 50),
(30, 18, 2, 1, 50),
(31, 19, 2, 1, 50),
(32, 20, 2, 4, 200),
(33, 21, 7, 1, 20),
(34, 22, 2, 3, 150),
(35, 22, 3, 1, 75),
(36, 22, 4, 1, 120),
(37, 22, 5, 1, 65),
(38, 22, 6, 1, 35),
(39, 23, 2, 3, 150),
(40, 23, 3, 1, 75),
(41, 23, 4, 1, 120),
(42, 23, 5, 1, 65),
(43, 23, 6, 1, 35),
(44, 24, 2, 3, 150),
(45, 24, 3, 1, 75),
(46, 24, 4, 1, 120),
(47, 24, 5, 1, 65),
(48, 24, 6, 1, 35),
(49, 25, 2, 3, 150),
(50, 25, 3, 1, 75),
(51, 25, 4, 1, 120),
(52, 25, 5, 1, 65),
(53, 25, 6, 1, 35),
(54, 26, 2, 3, 150),
(55, 26, 3, 1, 75),
(56, 26, 4, 1, 120),
(57, 26, 5, 1, 65),
(58, 26, 6, 1, 35),
(59, 27, 2, 3, 150),
(60, 27, 3, 1, 75),
(61, 27, 4, 1, 120),
(62, 27, 5, 1, 65),
(63, 27, 6, 1, 35),
(64, 28, 2, 3, 150),
(65, 28, 3, 1, 75),
(66, 28, 4, 1, 120),
(67, 28, 5, 1, 65),
(68, 28, 6, 1, 35),
(69, 29, 2, 3, 150),
(70, 29, 3, 1, 75),
(71, 29, 4, 1, 120),
(72, 29, 5, 1, 65),
(73, 29, 6, 1, 35),
(74, 30, 2, 3, 150),
(75, 30, 3, 1, 75),
(76, 30, 4, 1, 120),
(77, 30, 5, 1, 65),
(78, 30, 6, 1, 35),
(79, 31, 2, 3, 150),
(80, 31, 3, 1, 75),
(81, 31, 4, 1, 120),
(82, 31, 5, 1, 65),
(83, 31, 6, 1, 35),
(84, 32, 2, 3, 150),
(85, 32, 3, 1, 75),
(86, 32, 4, 1, 120),
(87, 32, 5, 1, 65),
(88, 32, 6, 1, 35),
(89, 33, 2, 1, 50),
(90, 33, 3, 1, 75),
(91, 33, 4, 1, 120),
(92, 33, 5, 1, 65),
(93, 33, 6, 1, 35),
(94, 34, 2, 1, 50),
(95, 34, 3, 1, 75),
(96, 34, 4, 1, 120),
(97, 34, 5, 1, 65),
(98, 34, 6, 1, 35),
(99, 35, 2, 1, 50);

-- --------------------------------------------------------

--
-- Table structure for table `stalls`
--

CREATE TABLE `stalls` (
  `stall_id` int(11) NOT NULL,
  `stall_name` varchar(255) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `contact_number` varchar(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_banner_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stalls`
--

INSERT INTO `stalls` (`stall_id`, `stall_name`, `owner_id`, `description`, `contact_number`, `image_url`, `image_banner_url`, `is_active`) VALUES
(1, 'Boss Sisig!', 12, NULL, NULL, 'assets/stalls/profiles/1.jpg', 'assets/stalls/banners/BossSisigBanner.jpg', 1),
(2, 'Ninong Ry’s Special Delicacy Stall', 3, NULL, NULL, 'assets/stalls/profiles/2.jpg', 'assets/stalls/banners/NinongRySpecialDelicacyBanner.jpg', 1),
(3, 'Mekus Mekus Tayo Insan!', 4, NULL, NULL, 'assets/stalls/profiles/3.jpg', 'assets/stalls/banners/MekusMekusTayoInsanBanner.jpeg', 1),
(4, 'Masamsamit So Adele', 7, NULL, NULL, 'assets/stalls/profiles/4.jpg', 'assets/stalls/banners/MasamsamitSoAdeleBanner.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transaction_type` enum('deposit','send','receive','refund','withdraw') NOT NULL,
  `amount` int(11) NOT NULL,
  `source_id` int(11) DEFAULT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','completed','failed') DEFAULT 'pending',
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trays`
--

CREATE TABLE `trays` (
  `tray_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trays`
--

INSERT INTO `trays` (`tray_id`, `user_id`, `item_id`, `quantity`) VALUES
(4, 2, 6, 2),
(130, 1, 2, 1),
(137, 10, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `student_id` varchar(14) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(11) DEFAULT NULL,
  `user_type` enum('user','stall_owner','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `student_id`, `first_name`, `last_name`, `email`, `password`, `phone_number`, `user_type`) VALUES
(1, '03-2223-040518', 'Christian Jose', 'Soriano', 'soriano.christianjose.m@gmail.com', 'password', NULL, 'user'),
(2, '03-2223-000000', 'Ritchmarc', 'Bustillo', 'ritchmarc.bustillo@gmail.com', 'password', NULL, 'stall_owner'),
(3, '03-2223-111111', 'Nervin', 'Ferrer', 'nervin.ferrer@gmail.com', 'password', NULL, 'stall_owner'),
(4, '03-2223-222222', 'Kenth', 'Marasigan', 'kenth.marasigan@gmail.com', 'password', NULL, 'stall_owner'),
(7, '03-2223-333333', 'Guerrero', 'Katherine', 'katherine.guerrero@gmail.com', 'password', NULL, 'stall_owner'),
(8, '03-2223-696900', 'Francis2', 'Gonzales2', 'gonzales2.francis@gmail.com', 'password2', '09696969692', 'user'),
(10, 'stu_id', 'fname', 'lname', 'email', '$2b$10$.fawltSJ1eHObQy/BiCXYuS9uyR68dTu75p8U6yKDW4tMYn0xuWne', '1234567890', 'user'),
(12, 'stu_id2', 'fname', 'lname', 'stallowner', '$2b$10$I9lgWqt9H5Glyj73EdLR5uT4fk5r3oS9NboFkYs1hJ1JzteUV.pF2', '1234567890', 'stall_owner'),
(14, 'stu_id3', 'fname', 'lname', 'admin', '$2b$10$qXHFeWZTpeAEvt7KWS116u2gpyvwijkwvM3no6dHn992e1S2iyC7K', '1234567890', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`bookmark_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `food_items`
--
ALTER TABLE `food_items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `food_item_categories`
--
ALTER TABLE `food_item_categories`
  ADD PRIMARY KEY (`food_item_id`,`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`);

--
-- Indexes for table `stalls`
--
ALTER TABLE `stalls`
  ADD PRIMARY KEY (`stall_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `trays`
--
ALTER TABLE `trays`
  ADD PRIMARY KEY (`tray_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `bookmark_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `food_items`
--
ALTER TABLE `food_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `stalls`
--
ALTER TABLE `stalls`
  MODIFY `stall_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trays`
--
ALTER TABLE `trays`
  MODIFY `tray_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
