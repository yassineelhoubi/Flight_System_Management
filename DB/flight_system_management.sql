-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2021 at 05:28 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `a`
--

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `fName` varchar(55) DEFAULT NULL,
  `lName` varchar(55) DEFAULT NULL,
  `email` varchar(55) DEFAULT NULL,
  `nbrPhone` int(11) DEFAULT NULL,
  `code` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dates`
--

CREATE TABLE `dates` (
  `id` int(11) NOT NULL,
  `departdate` datetime DEFAULT NULL,
  `arrivaldate` datetime DEFAULT NULL,
  `idFlight` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dates`
--

INSERT INTO `dates` (`id`, `departdate`, `arrivaldate`, `idFlight`) VALUES
(1, '2030-01-19 10:34:09', '2030-01-19 03:34:09', 1),
(2, '2030-01-19 10:34:09', '2030-01-19 03:34:09', 2),
(3, '2030-01-19 10:34:09', '2030-01-19 03:34:09', 3),
(4, '2025-02-26 05:34:09', '2025-02-26 05:34:09', 5),
(5, '2025-02-26 05:34:09', '2025-02-26 05:34:09', 6),
(6, '2025-02-26 17:22:47', '2025-02-26 05:34:09', 7),
(7, '2025-02-26 17:22:38', '2025-02-26 05:34:09', 8);

-- --------------------------------------------------------

--
-- Table structure for table `escale`
--

CREATE TABLE `escale` (
  `id` int(11) NOT NULL,
  `locations` varchar(55) DEFAULT NULL,
  `idFlight` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `escale`
--

INSERT INTO `escale` (`id`, `locations`, `idFlight`) VALUES
(1, NULL, 1),
(2, NULL, 2),
(3, 'New York', 3),
(4, NULL, 5),
(5, NULL, 7),
(6, 'New York', 8),
(7, 'Madrid', 6);

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `id` int(11) NOT NULL,
  `companyName` varchar(100) NOT NULL,
  `places` int(11) NOT NULL,
  `departureStation` varchar(100) NOT NULL,
  `arrivalStation` varchar(100) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `companyName`, `places`, `departureStation`, `arrivalStation`, `price`) VALUES
(1, 'France Air', 20, 'Casablanca', 'Madrid', 123),
(2, 'Turkish Airlines', 20, 'Marrakech', 'Paris', 232),
(3, 'RAM', 20, 'Tanger', 'Layoun', 534),
(4, 'Quatar Airways', 20, 'California', 'casablanca', 4253),
(5, 'France Air', 20, 'Casablanca', 'Madrid', 123),
(6, 'Turkish Airlines', 20, 'Marrakech', 'Paris', 232),
(7, 'RAM', 20, 'Tanger', 'Layoun', 534),
(8, 'Quatar Airways', 20, 'California', 'casablanca', 4253);

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `places` int(11) DEFAULT NULL,
  `idFlight` int(11) DEFAULT NULL,
  `idClient` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dates`
--
ALTER TABLE `dates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idFlight` (`idFlight`);

--
-- Indexes for table `escale`
--
ALTER TABLE `escale`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idFlight` (`idFlight`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idFlight` (`idFlight`),
  ADD KEY `idClient` (`idClient`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dates`
--
ALTER TABLE `dates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `escale`
--
ALTER TABLE `escale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dates`
--
ALTER TABLE `dates`
  ADD CONSTRAINT `dates_ibfk_1` FOREIGN KEY (`idFlight`) REFERENCES `flights` (`id`);

--
-- Constraints for table `escale`
--
ALTER TABLE `escale`
  ADD CONSTRAINT `escale_ibfk_1` FOREIGN KEY (`idFlight`) REFERENCES `flights` (`id`);

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`idFlight`) REFERENCES `flights` (`id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`idClient`) REFERENCES `client` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
