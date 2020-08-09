-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 25, 2020 at 05:28 PM
-- Server version: 10.5.4-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `psikotest-psi`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_jawaban_normal`
--

CREATE TABLE `t_jawaban_normal` (
  `id_test` int(11) NOT NULL,
  `nomor_soal` int(11) NOT NULL,
  `index_jawaban` int(11) DEFAULT NULL,
  `jawaban` int(11) DEFAULT NULL,
  `jawaban_terakhir` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_jawaban_pauli`
--

CREATE TABLE `t_jawaban_pauli` (
  `id_test` int(11) NOT NULL,
  `urutan` int(11) NOT NULL,
  `angka_atas` int(11) NOT NULL,
  `angka_bawah` int(11) NOT NULL,
  `jawaban` int(11) NOT NULL,
  `status` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_sesi_test`
--

CREATE TABLE `t_sesi_test` (
  `id_user` int(11) NOT NULL,
  `sesi` varchar(255) NOT NULL,
  `tanggal_test` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_sesi_test`
--

INSERT INTO `t_sesi_test` (`id_user`, `sesi`, `tanggal_test`) VALUES
(1, '6335f3ebf67e08f30c6f', 1595693401941),
(1, '76dc61d83c5a21ab1daf', 1595696487432),
(1, '93a8a34d1753890d99b9', 1595696479701),
(1, 'a44da2823474c8e67fd2', 1595693391096),
(1, 'a781565cd3c5ae333a31', 1595693405693),
(1, 'aedfef48f7ed533458da', 1595696770763);

-- --------------------------------------------------------

--
-- Table structure for table `t_test`
--

CREATE TABLE `t_test` (
  `id_test` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `sesi` varchar(255) NOT NULL,
  `tipe_test` varchar(255) NOT NULL,
  `nomor_test` int(11) NOT NULL,
  `waktu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_users`
--

CREATE TABLE `t_users` (
  `id_user` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_user` varchar(255) NOT NULL,
  `tempat_lahir` varchar(255) NOT NULL,
  `tanggal_lahir` bigint(20) NOT NULL,
  `jenis_kelamin` char(1) NOT NULL,
  `jenjang_pendidikan` varchar(255) NOT NULL,
  `aktif` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_users`
--

INSERT INTO `t_users` (`id_user`, `email`, `password`, `nama_user`, `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin`, `jenjang_pendidikan`, `aktif`) VALUES
(1, 'bebas@bebas.com', 'bebas', 'Zaenudin Dzulkarnaen', 'Jakarta', 932892855000, '1', 'Strata 1', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_sesi_test`
--
ALTER TABLE `t_sesi_test`
  ADD PRIMARY KEY (`id_user`,`sesi`);

--
-- Indexes for table `t_test`
--
ALTER TABLE `t_test`
  ADD PRIMARY KEY (`id_test`);

--
-- Indexes for table `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_test`
--
ALTER TABLE `t_test`
  MODIFY `id_test` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
