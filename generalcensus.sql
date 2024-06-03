-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 03, 2024 at 09:16 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `household`
--

-- --------------------------------------------------------

--
-- Table structure for table `generalcensus`
--

DROP TABLE IF EXISTS `generalcensus`;
CREATE TABLE IF NOT EXISTS `generalcensus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barangay` varchar(100) NOT NULL,
  `zone` varchar(50) NOT NULL,
  `dateOfInterview` date NOT NULL,
  `respondentName` varchar(100) NOT NULL,
  `intervieweeName` varchar(100) NOT NULL,
  `familyNumber` varchar(50) NOT NULL,
  `familyMemberName` varchar(100) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `age` int NOT NULL,
  `sex` enum('Male','Female') NOT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `civilStatus` enum('Single','Married','Widowed','Separated','Divorced') NOT NULL,
  `educationalAttainment` varchar(100) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `pregnancyStatus` enum('Yes','No') DEFAULT NULL,
  `nursingMotherStatus` enum('Yes','No') DEFAULT NULL,
  `familyPlanningPractice` enum('Yes','No') DEFAULT NULL,
  `presenceOfDisabilities` enum('Yes','No') DEFAULT NULL,
  `mainWaterSource` varchar(100) DEFAULT NULL,
  `garbageDisposal` varchar(100) DEFAULT NULL,
  `toiletFacility` varchar(100) DEFAULT NULL,
  `tenureStatus` varchar(100) DEFAULT NULL,
  `vegetableGardenPresence` tinyint(1) NOT NULL,
  `poultryLivestockPresence` tinyint(1) NOT NULL,
  `fishpondPresence` tinyint(1) NOT NULL,
  `accessToElectricity` tinyint(1) NOT NULL,
  `houseConstructionMaterials` varchar(100) DEFAULT NULL,
  `communicationMeans` varchar(100) DEFAULT NULL,
  `ofwStatus` tinyint(1) NOT NULL,
  `plantationCrops` varchar(100) DEFAULT NULL,
  `farmMachineries` varchar(100) DEFAULT NULL,
  `povertyIncidence` decimal(10,2) DEFAULT NULL,
  `foodThreshold` decimal(10,2) DEFAULT NULL,
  `livelihoods` varchar(100) DEFAULT NULL,
  `confirmation` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `generalcensus`
--

INSERT INTO `generalcensus` (`id`, `barangay`, `zone`, `dateOfInterview`, `respondentName`, `intervieweeName`, `familyNumber`, `familyMemberName`, `dateOfBirth`, `age`, `sex`, `religion`, `civilStatus`, `educationalAttainment`, `occupation`, `pregnancyStatus`, `nursingMotherStatus`, `familyPlanningPractice`, `presenceOfDisabilities`, `mainWaterSource`, `garbageDisposal`, `toiletFacility`, `tenureStatus`, `vegetableGardenPresence`, `poultryLivestockPresence`, `fishpondPresence`, `accessToElectricity`, `houseConstructionMaterials`, `communicationMeans`, `ofwStatus`, `plantationCrops`, `farmMachineries`, `povertyIncidence`, `foodThreshold`, `livelihoods`, `confirmation`) VALUES
(1, 'Barangay Bonifacio San Fernando Camarines Sur', 'Zone 1', '2024-01-01', 'John Doe', 'Jane Doe', '001', 'John Jr. Doe', '2000-01-01', 24, 'Male', 'Catholic', 'Single', 'College Graduate', 'Software Developer', 'No', 'No', 'Yes', 'No', 'Tap Water', 'Collected by Barangay', 'Flush Toilet', 'Owned', 1, 1, 0, 1, 'Concrete', 'Mobile', 0, 'Rice', 'Tractor', '15000.00', '12000.00', 'IT Services', 1),
(2, 'Barangay 6', 'Zone 6', '2023-05-20', 'Emilia Bautista', 'Carlos Bautista', '6', 'Sophia Bautista', '1985-06-06', 38, 'Female', 'Catholic', 'Married', 'College Graduate', 'Nurse', '', '', 'Yes', 'No', 'Water District', 'Collected', 'Flush', 'Owned', 0, 0, 0, 0, 'Concrete', 'Mobile', 0, 'Mango', 'Tractor', '0.00', '0.00', 'Healthcare', 0),
(3, 'Barangay 7', 'Zone 7', '2023-05-21', 'Raul Ramos', 'Maria Ramos', '7', 'Diego Ramos', '1992-07-07', 31, 'Male', 'Protestant', 'Single', 'High School Graduate', 'Driver', '', '', 'No', 'No', 'Deep Well', 'Burning', 'Pit Latrine', 'Rented', 0, 0, 0, 0, 'Wood', 'Radio', 0, 'Banana', 'Plow', '0.00', '0.00', 'Transport', 0),
(4, 'Barangay 8', 'Zone 8', '2023-05-22', 'Lucia Flores', 'Antonio Flores', '8', 'Marina Flores', '1998-08-08', 25, 'Female', 'Muslim', 'Married', 'Elementary Graduate', 'Housekeeper', 'Yes', 'Yes', 'No', 'No', 'River', 'Dumping', 'Pit Latrine', 'Owned', 0, 0, 0, 0, 'Bamboo', 'Television', 0, 'Sugarcane', 'Harrow', '0.00', '0.00', 'Domestic Work', 0),
(5, 'Barangay 9', 'Zone 9', '2023-05-23', 'Carlos Diaz', 'Luz Diaz', '9', 'Enrique Diaz', '2002-09-09', 21, 'Male', 'Catholic', 'Single', 'College Graduate', 'Student', '', '', 'No', 'No', 'Spring', 'Collected', 'Flush', 'Rented', 0, 0, 0, 0, 'Concrete', 'Internet', 0, 'Coconut', 'Sprayer', '0.00', '0.00', 'Studying', 0),
(6, 'Barangay 10', 'Zone 10', '2023-05-24', 'Mariano Santos', 'Angela Santos', '10', 'Pedro Santos', '1970-10-10', 53, 'Male', 'Protestant', 'Widowed', 'High School Graduate', 'Fisherman', '', '', 'No', 'No', 'Water District', 'Burning', 'Flush', 'Owned', 0, 0, 0, 0, 'Concrete', 'Mobile', 0, 'Rice', 'Carabao', '0.00', '0.00', 'Fishing', 0),
(7, 'Barangay 1', 'Zone 1', '2023-05-15', 'Juan Dela Cruz', 'Maria Dela Cruz', '1', 'Jose Dela Cruz', '1990-01-01', 33, 'Male', 'Catholic', 'Married', 'High School', 'Farmer', NULL, NULL, 'Yes', 'No', 'Deep Well', 'Burning', 'Pit Latrine', 'Owned', 0, 0, 0, 0, 'Wood', 'Mobile', 0, 'Coconut', 'Plow', '0.00', '0.00', 'Farming', 0),
(8, 'Barangay 2', 'Zone 2', '2023-05-16', 'Pedro Santos', 'Ana Santos', '2', 'Luis Santos', '1985-02-02', 38, 'Male', 'Protestant', 'Single', 'Elementary', 'Vendor', NULL, NULL, 'No', 'No', 'River', 'Dumping', 'Flush', 'Rented', 0, 0, 0, 0, 'Bamboo', 'Television', 0, 'Rice', 'Tractor', '0.00', '0.00', 'Trading', 0),
(9, 'Barangay 3', 'Zone 3', '2023-05-17', 'Luis Garcia', 'Carmen Garcia', '3', 'Mia Garcia', '1975-03-03', 48, 'Female', 'Muslim', 'Married', 'College', 'Teacher', 'No', 'No', 'Yes', 'Yes', 'Spring', 'Collected', 'Flush', 'Owned', 0, 0, 0, 0, 'Concrete', 'Internet', 0, 'Corn', 'Harvester', '0.00', '0.00', 'Education', 0),
(10, 'Barangay 4', 'Zone 4', '2023-05-18', 'Josefa Reyes', 'Fernando Reyes', '4', 'Luz Reyes', '1995-04-04', 28, 'Female', 'Catholic', 'Widowed', 'High School', 'Fisher', NULL, NULL, 'Yes', 'No', 'Water District', 'Burning', 'Flush', 'Rented', 0, 0, 0, 0, 'Concrete', 'Mobile', 0, 'Coconut', 'Plow', '0.00', '0.00', 'Fishing', 0),
(11, 'Barangay 5', 'Zone 5', '2023-05-19', 'Ramon Castillo', 'Rosa Castillo', '5', 'Juanita Castillo', '1980-05-05', 43, 'Male', 'Catholic', 'Single', 'High School', 'Laborer', NULL, NULL, 'No', 'No', 'Deep Well', 'Dumping', 'Flush', 'Owned', 0, 0, 0, 0, 'Wood', 'Mobile', 0, 'Rice', 'Tractor', '0.00', '0.00', 'Construction', 0),
(12, 'Barangay 6', 'Zone 6', '2023-05-20', 'Emilia Bautista', 'Carlos Bautista', '6', 'Sophia Bautista', '1985-06-06', 38, 'Female', 'Catholic', 'Married', 'College Graduate', 'Nurse', NULL, NULL, 'Yes', 'No', 'Water District', 'Collected', 'Flush', 'Owned', 0, 0, 0, 0, 'Concrete', 'Mobile', 0, 'Mango', 'Tractor', '0.00', '0.00', 'Healthcare', 0),
(13, 'Barangay 7', 'Zone 7', '2023-05-21', 'Raul Ramos', 'Maria Ramos', '7', 'Diego Ramos', '1992-07-07', 31, 'Male', 'Protestant', 'Single', 'High School Graduate', 'Driver', NULL, NULL, 'No', 'No', 'Deep Well', 'Burning', 'Pit Latrine', 'Rented', 0, 0, 0, 0, 'Wood', 'Radio', 0, 'Banana', 'Plow', '0.00', '0.00', 'Transport', 0),
(14, 'Barangay 8', 'Zone 8', '2023-05-22', 'Lucia Flores', 'Antonio Flores', '8', 'Marina Flores', '1998-08-08', 25, 'Female', 'Muslim', 'Married', 'Elementary Graduate', 'Housekeeper', 'Yes', 'Yes', 'No', 'No', 'River', 'Dumping', 'Pit Latrine', 'Owned', 0, 0, 0, 0, 'Bamboo', 'Television', 0, 'Sugarcane', 'Harrow', '0.00', '0.00', 'Domestic Work', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
