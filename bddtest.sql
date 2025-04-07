-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.5.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for maintconn
CREATE DATABASE IF NOT EXISTS `maintconn` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci */;
USE `maintconn`;

-- Dumping structure for table maintconn.alarme
CREATE TABLE IF NOT EXISTS `alarme` (
  `id_alarme` int(11) NOT NULL,
  `date_heure` datetime DEFAULT NULL,
  `type_alarme` varchar(50) DEFAULT '',
  `temp` float DEFAULT 0,
  `seuil` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Dumping data for table maintconn.alarme: ~0 rows (approximately)

-- Dumping structure for table maintconn.seuils
CREATE TABLE IF NOT EXISTS `seuils` (
  `id_seuil` int(11) NOT NULL,
  `seuil_bas` float DEFAULT 0,
  `seuil_haut` float DEFAULT 0,
  `date` datetime DEFAULT '0000-00-00 00:00:00',
  `seuil_tres_bas` float DEFAULT NULL,
  `seuil_tres_haut` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Dumping data for table maintconn.seuils: ~0 rows (approximately)

-- Dumping structure for table maintconn.seuil_histo
CREATE TABLE IF NOT EXISTS `seuil_histo` (
  `id_historique` int(11) NOT NULL,
  `old_seuil_bas` int(11) DEFAULT NULL,
  `old_seuil_haut` int(11) DEFAULT NULL,
  `new_seuil_bas` int(11) DEFAULT NULL,
  `new_seuil_haut` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Dumping data for table maintconn.seuil_histo: ~0 rows (approximately)

-- Dumping structure for table maintconn.users
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Dumping data for table maintconn.users: ~0 rows (approximately)

-- Dumping structure for table maintconn.variable
CREATE TABLE IF NOT EXISTS `variable` (
  `id_mesure` int(11) NOT NULL,
  `date_heure` datetime DEFAULT '0000-00-00 00:00:00',
  `temp` float DEFAULT 0,
  `cycle` binary(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Dumping data for table maintconn.variable: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
