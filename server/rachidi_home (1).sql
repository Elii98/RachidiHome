-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `rachidi_home`;
CREATE DATABASE `rachidi_home` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rachidi_home`;

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `streetname` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `buildingname` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `landmark` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `userid` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ismain` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `addresses` (`id`, `nickname`, `city`, `streetname`, `buildingname`, `landmark`, `userid`, `ismain`) VALUES
(1,	'asda',	'sdas',	'da',	'sda',	'sd',	'1',	1),
(2,	'my nick',	'beirut',	'hamra',	'hamra plaza',	'idk',	'1',	0),
(3,	'test',	'lkajd',	'alkssdj',	'alskd',	'asld',	'1',	0),
(4,	'aklsjdlksajd',	'laskdjlaskdj',	'aslklaskdj',	'aslkdjlaskjd',	'alksdjlkasjd',	'0',	0);

DROP TABLE IF EXISTS `bannerimages`;
CREATE TABLE `bannerimages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemid` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `bannerimages` (`id`, `image`, `itemid`) VALUES
(1,	'img1.jpg',	1),
(2,	'img2.png',	2),
(3,	'img1.jpg',	3);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_unicode_ci,
  `image` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `image`) VALUES
(1,	'Kitchen',	'img1.jpg'),
(2,	'Furniture',	'img2.png');

DROP TABLE IF EXISTS `faq`;
CREATE TABLE `faq` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `faq` (`id`, `question`, `answer`) VALUES
(1,	'What is rachidi Home?',	'Rachidi home is a multi purpose store dedicated to giving you the best items in its region, well known for its uniquness and approachability'),
(2,	'second question?',	'second answer');

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `oldprice` int NOT NULL,
  `deliverytime` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `specifications` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `newprice` int NOT NULL,
  `categoryid` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `items` (`id`, `title`, `image`, `oldprice`, `deliverytime`, `description`, `specifications`, `newprice`, `categoryid`) VALUES
(1,	'Home couch',	'item.jpg',	1200000,	'4',	'lorem ipsum lorem ipsum',	'24 x 27',	1100000,	1),
(2,	'Shoes Blue fantastic',	'img2.png',	1000000,	'7',	'loreeeeeeeeeeeeem',	'252525',	900000,	2),
(3,	'asasd',	'img1.jpg',	123,	'asd',	'asd',	'asd',	123,	1);

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemid` int NOT NULL,
  `userid` int NOT NULL,
  `date` timestamp NOT NULL,
  `quantity` int NOT NULL,
  `locationid` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `orders` (`id`, `itemid`, `userid`, `date`, `quantity`, `locationid`) VALUES
(1,	1,	1,	'2021-05-11 15:22:14',	3,	1),
(2,	2,	2,	'2021-05-11 18:59:10',	4,	1),
(3,	2,	1,	'2021-05-11 19:00:20',	8,	1);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` text COLLATE utf8mb4_unicode_ci,
  `first_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `phone_number` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `walletpoints` decimal(10,0) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `password`, `first_name`, `last_name`, `phone_number`, `walletpoints`) VALUES
(1,	'q',	'Ali',	'Ibrahim',	'q',	0),
(11,	'w',	'Kassim',	'Mohammad',	'w',	250000),
(12,	'',	'',	'',	'',	0);

-- 2021-06-15 11:15:37
