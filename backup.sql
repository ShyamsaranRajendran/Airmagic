-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: sign_in_data
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `EjjH`
--

DROP TABLE IF EXISTS `EjjH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EjjH` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EjjH`
--

LOCK TABLES `EjjH` WRITE;
/*!40000 ALTER TABLE `EjjH` DISABLE KEYS */;
INSERT INTO `EjjH` VALUES (4,'http://192.168.89.209:4000/gallery/gal2/image5.png');
/*!40000 ALTER TABLE `EjjH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gallery_1`
--

DROP TABLE IF EXISTS `Gallery_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gallery_1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gallery_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gallery_1`
--

LOCK TABLES `Gallery_1` WRITE;
/*!40000 ALTER TABLE `Gallery_1` DISABLE KEYS */;
INSERT INTO `Gallery_1` VALUES (1,'/gal1/image1.png'),(2,'/gal1/image2.png'),(3,'/gal1/image3.png'),(4,'/gal1/image1.png'),(5,'/gal1/image2.png'),(6,'/gal1/image3.png'),(7,'/gal1/image4.png'),(8,'/gal1/image5.png');
/*!40000 ALTER TABLE `Gallery_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gallery_2`
--

DROP TABLE IF EXISTS `Gallery_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gallery_2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gallery_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gallery_2`
--

LOCK TABLES `Gallery_2` WRITE;
/*!40000 ALTER TABLE `Gallery_2` DISABLE KEYS */;
INSERT INTO `Gallery_2` VALUES (1,'/gal2/image1.png'),(2,'/gal2/image2.png'),(3,'/gal2/image3.png'),(4,'/gal2/image4.png'),(5,'/gal2/image5.png');
/*!40000 ALTER TABLE `Gallery_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gallery_3`
--

DROP TABLE IF EXISTS `Gallery_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gallery_3` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gallery_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gallery_3`
--

LOCK TABLES `Gallery_3` WRITE;
/*!40000 ALTER TABLE `Gallery_3` DISABLE KEYS */;
INSERT INTO `Gallery_3` VALUES (1,'/gal3/image1.png'),(2,'/gal3/image2.png'),(3,'/gal3/image3.png'),(4,'/gal3/image4.png'),(5,'/gal3/image5.png');
/*!40000 ALTER TABLE `Gallery_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gallery_4`
--

DROP TABLE IF EXISTS `Gallery_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gallery_4` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gallery_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gallery_4`
--

LOCK TABLES `Gallery_4` WRITE;
/*!40000 ALTER TABLE `Gallery_4` DISABLE KEYS */;
INSERT INTO `Gallery_4` VALUES (1,'/gal4/image1.png'),(2,'/gal4/image2.png'),(3,'/gal4/image3.png'),(4,'/gal4/image4.png'),(5,'/gal4/image5.png');
/*!40000 ALTER TABLE `Gallery_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ribi`
--

DROP TABLE IF EXISTS `Ribi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ribi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ribi`
--

LOCK TABLES `Ribi` WRITE;
/*!40000 ALTER TABLE `Ribi` DISABLE KEYS */;
/*!40000 ALTER TABLE `Ribi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_images`
--

DROP TABLE IF EXISTS `cart_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_images`
--

LOCK TABLES `cart_images` WRITE;
/*!40000 ALTER TABLE `cart_images` DISABLE KEYS */;
INSERT INTO `cart_images` VALUES (1,'/images/nature-1.png'),(2,'/images/nature-1.png'),(3,'/images/nature-1.png'),(4,'/images/nature-1.png'),(5,'/images/nature-1.png'),(6,'/images/nature-1.png'),(7,'/images/nature-1.png'),(8,'/images/nature-1.png'),(9,'/images/nature-1.png'),(10,'/images/nature-1.png'),(11,'/images/nature-1.png'),(12,'/images/nature-1.png'),(13,'/images/nature-1.png'),(14,'/images/nature-1.png'),(15,'/images/nature-1.png'),(16,'/images/nature-1.png'),(17,'/images/nature-1.png'),(18,'/images/nature-1.png'),(19,'/images/nature-1.png'),(20,'/images/nature-1.png'),(21,'/images/nature-1.png'),(22,'/images/nature-2.png'),(23,'/images/img-avatar2.png'),(24,'/images/nature-1.png'),(25,'/images/nature-2.png'),(26,'/images/img-avatar2.png'),(27,'/images/nature-2.png'),(28,'/images/nature-1.png');
/*!40000 ALTER TABLE `cart_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dWS8`
--

DROP TABLE IF EXISTS `dWS8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dWS8` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dWS8`
--

LOCK TABLES `dWS8` WRITE;
/*!40000 ALTER TABLE `dWS8` DISABLE KEYS */;
INSERT INTO `dWS8` VALUES (23,'http://localhost:4000/gallery/gal1/image2.png'),(36,'http://localhost:4000/gallery/gal3/image2.png'),(37,'http://localhost:4000/gallery/gal2/image5.png'),(38,'/img/sarancode6@gmail.com.png');
/*!40000 ALTER TABLE `dWS8` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gOzG`
--

DROP TABLE IF EXISTS `gOzG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gOzG` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gOzG`
--

LOCK TABLES `gOzG` WRITE;
/*!40000 ALTER TABLE `gOzG` DISABLE KEYS */;
INSERT INTO `gOzG` VALUES (48,'http://localhost:4000/gallery/gal3/image1.png'),(50,'http://localhost:4000/gallery/gal3/image4.png'),(51,'http://localhost:4000/gallery/gal3/image2.png');
/*!40000 ALTER TABLE `gOzG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `key` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'shyamsaran6.2.2005@gmail.com','shyamsaran1977','gOzG'),(2,'karthikrajask.22aid@kongu.edu','123','gBAY'),(3,'bjugebgu@gmail.com','123456','Ribi'),(4,'shivnanzu@gmail.com','amas','uoCu'),(5,'sarancode6@gmail.com','1234567890','dWS8'),(6,'papa@gmail.com','1234567890','3Unp'),(7,'shyam@gmail.com','shyam69','EjjH');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-17 11:39:29
