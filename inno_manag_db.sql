-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 14, 2023 at 09:01 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inno_manag_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id_client` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `tel_client` varchar(12) DEFAULT '',
  `statue` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id_client`, `nom`, `tel_client`, `statue`) VALUES
(1, 'passagé', '90990909090', 1),
(2, 'dem', '321', 0),
(3, 'moncef', '123649', 0),
(7, 'bouazza', '28814441', 1),
(45, 'wa7ed okhor met3edi', '9872316', 0),
(10000, 'client fidele1', '16151413', 1),
(10002, 'zebi', '12365478', 0),
(10003, 'test', '000000', 0),
(10004, 'wahed met3edi', '456456', 0),
(10005, 'okht li t3ada 9bila', '32654511', 0),
(10006, 'yfz1', '12122121', 0);

-- --------------------------------------------------------

--
-- Table structure for table `fournisseurs`
--

CREATE TABLE `fournisseurs` (
  `id_four` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `tel_four` varchar(12) DEFAULT NULL,
  `pays` varchar(50) DEFAULT 'Tunisie',
  `statue` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fournisseurs`
--

INSERT INTO `fournisseurs` (`id_four`, `nom`, `tel_four`, `pays`, `statue`) VALUES
(21, 'f1', '1111', 'Tunisie', 0),
(22, 'f2', '22222', 'canada', 1),
(23, 'f5', '447', 'libie', 0);

-- --------------------------------------------------------

--
-- Table structure for table `liste_prod`
--

CREATE TABLE `liste_prod` (
  `id_prod` varchar(50) NOT NULL,
  `id_v` int(11) NOT NULL,
  `qte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `liste_prod`
--

INSERT INTO `liste_prod` (`id_prod`, `id_v`, `qte`) VALUES
('01', 16, 1),
('01', 18, 5),
('01', 20, 1),
('las15', 15, 6),
('ref1', 4, 1),
('ref1', 5, 1),
('ref1', 6, 1),
('ref1', 7, 1),
('ref1', 8, 1),
('ref1', 9, 2),
('ref1', 10, 19),
('ref1', 11, 3),
('ref1', 12, 1),
('ref1', 13, 3),
('refprodjdid', 17, 1),
('refprodjdid', 19, 2),
('refprodjdid', 20, 1),
('taeat', 14, 6);

-- --------------------------------------------------------

--
-- Table structure for table `produits`
--

CREATE TABLE `produits` (
  `id_prod` varchar(50) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `img` varchar(256) NOT NULL,
  `qte` int(11) DEFAULT NULL,
  `prix` decimal(9,3) DEFAULT NULL,
  `id_four` int(11) NOT NULL,
  `statue` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `produits`
--

INSERT INTO `produits` (`id_prod`, `nom`, `img`, `qte`, `prix`, `id_four`, `statue`) VALUES
('01', 'ragnarogue', 'defaultImg.png', 7, '12.000', 22, 1),
('las15', 'liquide 100 ml melon', 'defaultImg.png', 4, '12.000', 22, 0),
('prodref1', 'prod1', 'defaultImg.png', 2, '25.000', 22, 0),
('ref1', 'prodnewnew55', 'defaultImg.png', 69, '111.000', 21, 0),
('refprodjdid', 'prod jdid jdid', 'defaultImg.png', 2, '500.000', 22, 1),
('taeat', 'ateae', '65carbon (12).png', 94, '2000.000', 21, 0);

-- --------------------------------------------------------

--
-- Table structure for table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id_utilisateur` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `tel_u` varchar(12) DEFAULT NULL,
  `mdp` varchar(50) NOT NULL,
  `role` enum('admin','vendeur','comptable') NOT NULL,
  `statue` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `nom`, `tel_u`, `mdp`, `role`, `statue`) VALUES
(15, 'gamha', '', '215487', 'vendeur', 1),
(16, 'medKhouAhmed', '456654', '369', 'admin', 0),
(17, 'hamza', '', '98528971', 'comptable', 1),
(18, 'admin1', NULL, '98528971', 'admin', 1),
(19, 'admin2', '0', '96083579', 'admin', 1),
(20, 'admin', NULL, 'admin', 'admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ventes`
--

CREATE TABLE `ventes` (
  `id_v` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `prix_tot` decimal(15,3) DEFAULT NULL,
  `prix_donnee` decimal(15,3) NOT NULL,
  `remise` decimal(6,3) NOT NULL DEFAULT '0.000',
  `id_utilisateur` int(11) NOT NULL,
  `date_v` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ventes`
--

INSERT INTO `ventes` (`id_v`, `id_client`, `prix_tot`, `prix_donnee`, `remise`, `id_utilisateur`, `date_v`) VALUES
(4, 2, '150.000', '150.000', '0.000', 15, '2023-08-10 16:49:37'),
(5, 3, '135.000', '121.500', '10.000', 15, '2023-08-10 16:51:36'),
(6, 3, '99.900', '50.000', '10.000', 15, '2023-08-10 19:47:45'),
(7, 7, '1163.000', '22.000', '0.000', 15, '2023-08-10 19:50:06'),
(8, 3, '111.000', '100.000', '0.000', 16, '2023-08-10 20:08:37'),
(9, 2, '710.600', '748.000', '5.000', 16, '2023-08-10 20:26:12'),
(10, 2, '1898.100', '100.000', '10.000', 15, '2023-08-11 13:43:52'),
(11, 2, '299.700', '299.700', '10.000', 15, '2023-08-11 13:46:45'),
(12, 3, '109.890', '109.890', '1.000', 15, '2023-08-11 13:48:48'),
(13, 2, '9299.700', '9299.700', '10.000', 15, '2023-08-11 14:56:32'),
(14, 3, '12000.000', '12000.000', '0.000', 15, '2023-08-11 15:05:19'),
(15, 7, '64.800', '64.800', '10.000', 18, '2023-09-14 18:20:33'),
(16, 7, '10.800', '9.720', '10.000', 18, '2023-09-14 18:31:12'),
(17, 1, '500.000', '500.000', '0.000', 20, '2023-09-14 20:10:40'),
(18, 10000, '54.000', '50.000', '10.000', 20, '2023-09-14 21:37:05'),
(19, 1, '750.000', '750.000', '25.000', 20, '2023-09-14 21:37:26'),
(20, 10000, '501.760', '400.000', '2.000', 20, '2023-09-14 21:37:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id_client`);

--
-- Indexes for table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  ADD PRIMARY KEY (`id_four`);

--
-- Indexes for table `liste_prod`
--
ALTER TABLE `liste_prod`
  ADD PRIMARY KEY (`id_prod`,`id_v`),
  ADD KEY `liste_prod_ibfk_2` (`id_v`);

--
-- Indexes for table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id_prod`),
  ADD KEY `id_four` (`id_four`);

--
-- Indexes for table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id_utilisateur`);

--
-- Indexes for table `ventes`
--
ALTER TABLE `ventes`
  ADD PRIMARY KEY (`id_v`),
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10007;

--
-- AUTO_INCREMENT for table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  MODIFY `id_four` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `ventes`
--
ALTER TABLE `ventes`
  MODIFY `id_v` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `liste_prod`
--
ALTER TABLE `liste_prod`
  ADD CONSTRAINT `liste_prod_ibfk_1` FOREIGN KEY (`id_prod`) REFERENCES `produits` (`id_prod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `liste_prod_ibfk_2` FOREIGN KEY (`id_v`) REFERENCES `ventes` (`id_v`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`id_four`) REFERENCES `fournisseurs` (`id_four`);

--
-- Constraints for table `ventes`
--
ALTER TABLE `ventes`
  ADD CONSTRAINT `ventes_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id_client`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ventes_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
