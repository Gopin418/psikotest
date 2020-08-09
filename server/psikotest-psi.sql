-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 09, 2020 at 10:19 AM
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
-- Table structure for table `t_hasil_penilaian_normal`
--

CREATE TABLE `t_hasil_penilaian_normal` (
  `id_hasil_penilaian_normal` int(11) NOT NULL,
  `sesi_soal` varchar(255) NOT NULL,
  `tipe_test` varchar(255) NOT NULL,
  `nomor_test` int(11) NOT NULL,
  `benar` int(11) DEFAULT NULL,
  `salah` int(11) DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `tanggal_periksa` int(11) NOT NULL,
  `id_user_pemeriksa` int(11) NOT NULL,
  `tanggal_pengesahan` int(11) DEFAULT NULL,
  `id_user_yang_mengesahkan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_jawaban_normal`
--

CREATE TABLE `t_jawaban_normal` (
  `id_test` int(11) NOT NULL,
  `nomor_soal` int(11) NOT NULL,
  `index_jawaban` int(11) DEFAULT NULL,
  `jawaban` varchar(255) DEFAULT NULL,
  `jawaban_terakhir` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_jawaban_normal`
--

INSERT INTO `t_jawaban_normal` (`id_test`, `nomor_soal`, `index_jawaban`, `jawaban`, `jawaban_terakhir`) VALUES
(5, 20, 1, 'Kewibawaan', '1'),
(5, 20, 1, 'Kaya', '1'),
(5, 20, 1, 'Khianat', '1'),
(5, 20, 1, 'Gesper', '1'),
(5, 20, 1, 'Kerapkali', '1'),
(5, 20, 1, 'Jarang', '1'),
(5, 20, 1, '115', '1'),
(6, 40, 1, 'Panah', '1'),
(6, 40, 1, 'Menggergaji', '1'),
(6, 40, 1, 'Panjang', '1'),
(6, 40, 1, 'Mengaitkan', '1'),
(6, 40, 1, 'Kayu', '1'),
(7, 60, 1, 'Memimpikan', '1'),
(7, 60, 1, 'Sangkar', '1'),
(7, 60, 1, 'Kecepatan', '1'),
(7, 60, 1, 'Platina', '1'),
(7, 60, 1, 'Piramida', '1'),
(7, 60, 1, 'Merenungkan', '1'),
(7, 60, 1, 'Asin', '1'),
(7, 60, 1, 'Ember', '1'),
(7, 60, 1, 'Pelindung', '1'),
(7, 60, 1, 'Besi Tempat', '1'),
(7, 60, 1, 'Lautan api', '1'),
(8, 76, 1, 'sad', '1'),
(8, 76, 1, 'sad', '1'),
(8, 76, 1, 'asd', '1'),
(8, 76, 1, 'asd', '1'),
(8, 76, 1, 'd', '1'),
(8, 76, 1, 'dsa', '1'),
(8, 76, 1, 'sad', '1'),
(9, 96, 1, '6', '1'),
(9, 96, 2, '1', '1'),
(9, 96, 1, '8', '1'),
(9, 96, 2, '1', '1'),
(9, 96, 1, '9', '1'),
(9, 96, 2, '1', '1'),
(9, 96, 1, '5', '1'),
(9, 96, 2, '1', '1'),
(9, 96, 1, '9', '1'),
(9, 96, 2, '1', '1'),
(9, 96, 1, '5', '1'),
(9, 96, 2, '1', '1'),
(9, 96, 1, '9', '1'),
(9, 96, 2, '1', '1'),
(9, 96, 1, '6', '1'),
(9, 96, 2, '1', '1'),
(10, 116, 1, '6', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '8', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '9', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '5', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '9', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '5', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '9', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '6', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '6', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '4', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '8', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '4', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '8', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '4', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '4', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '7', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '4', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '8', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '10', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '4', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '9', '1'),
(10, 116, 2, '1', '1'),
(10, 116, 1, '5', '1'),
(10, 116, 2, '1', '1'),
(11, 20, 1, 'Kewibawaan', '1'),
(11, 20, 1, 'Kaya', '1'),
(11, 20, 1, 'Gempa Bumi', '1'),
(11, 20, 1, 'Khianat', '1'),
(11, 20, 1, '115', '1'),
(12, 40, 1, 'Lengkungan', '1'),
(12, 40, 1, 'Menggergaji', '1'),
(12, 40, 1, 'Kayu', '1'),
(13, 60, 1, 'Memimpikan', '1'),
(13, 60, 1, 'Sangkar', '1'),
(13, 60, 1, 'Kecepatan', '1'),
(13, 60, 1, 'Gelang', '1'),
(13, 60, 1, 'Lautan api', '1'),
(14, 76, 1, 'sadasd', '1'),
(14, 76, 1, '', '1'),
(14, 76, 1, 'asdasd', '1'),
(14, 76, 1, 'sdasdasdad', '1'),
(14, 76, 1, 'assdasdasd', '1'),
(14, 76, 1, 'asdasd', '1'),
(14, 76, 1, 'dadas', '1'),
(14, 76, 1, 'dasd', '1'),
(14, 76, 1, 'asdasd', '1'),
(15, 96, 1, '9', '1'),
(15, 96, 2, '1', '1'),
(15, 96, 1, '5', '1'),
(15, 96, 2, '1', '1'),
(15, 96, 1, '8', '1'),
(15, 96, 2, '1', '1'),
(15, 96, 1, '5', '1'),
(15, 96, 2, '1', '1'),
(15, 96, 1, '8', '1'),
(15, 96, 2, '1', '1'),
(15, 96, 1, '5', '1'),
(15, 96, 2, '1', '1'),
(15, 96, 1, '8', '1'),
(15, 96, 2, '1', '1'),
(15, 96, 1, '5', '1'),
(15, 96, 2, '1', '1');

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
-- Table structure for table `t_kunci_jawaban_normal`
--

CREATE TABLE `t_kunci_jawaban_normal` (
  `id_kunci_jawaban_normal` int(11) NOT NULL,
  `tipe_test` varchar(255) NOT NULL,
  `nomor_test` int(11) NOT NULL,
  `nomor_soal` int(11) NOT NULL,
  `index_jawaban` int(11) NOT NULL,
  `tipe_kunci_jawaban` char(1) NOT NULL,
  `kunci_jawaban_satu` varchar(255) NOT NULL,
  `kunci_jawaban_banyak` text NOT NULL,
  `aktif` char(1) NOT NULL
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
(1, '75f25c961695d96d50da', 1596949263908),
(1, '76dc61d83c5a21ab1daf', 1595696487432),
(1, '844de9980e42682e3467', 1595701179301),
(1, '8db0d5014155c4e7733a', 1595751355230),
(1, '93a8a34d1753890d99b9', 1595696479701),
(1, '9ba1a1a9de8c6afa5301', 1596947374919),
(1, 'a44da2823474c8e67fd2', 1595693391096),
(1, 'a781565cd3c5ae333a31', 1595693405693),
(1, 'aedfef48f7ed533458da', 1595696770763),
(1, 'b64a7a5012434972c465', 1596957051081),
(1, 'd60c58e27d01a484a427', 1595751493268);

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

--
-- Dumping data for table `t_test`
--

INSERT INTO `t_test` (`id_test`, `id_user`, `sesi`, `tipe_test`, `nomor_test`, `waktu`) VALUES
(5, 1, 'd60c58e27d01a484a427', 'ist', 1, 308),
(6, 1, 'd60c58e27d01a484a427', 'ist', 2, 440),
(7, 1, 'd60c58e27d01a484a427', 'ist', 3, 485),
(8, 1, 'd60c58e27d01a484a427', 'ist', 4, 496),
(9, 1, 'd60c58e27d01a484a427', 'ist', 5, 512),
(10, 1, 'd60c58e27d01a484a427', 'ist', 6, 585),
(11, 1, 'd60c58e27d01a484a427', 'ist', 1, 14),
(12, 1, 'd60c58e27d01a484a427', 'ist', 2, 23),
(13, 1, 'd60c58e27d01a484a427', 'ist', 3, 43),
(14, 1, 'd60c58e27d01a484a427', 'ist', 4, 59),
(15, 1, 'd60c58e27d01a484a427', 'ist', 5, 77),
(16, 1, 'b64a7a5012434972c465', 'cfit', 1, 12),
(17, 1, 'b64a7a5012434972c465', 'cfit', 1, 21);

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
  `tipe_user` char(1) NOT NULL DEFAULT '0',
  `aktif` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_users`
--

INSERT INTO `t_users` (`id_user`, `email`, `password`, `nama_user`, `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin`, `jenjang_pendidikan`, `tipe_user`, `aktif`) VALUES
(1, 'bebas@bebas.com', 'bebas', 'Zaenudin Dzulkarnaen', 'Jakarta', 932892855000, '1', 'Strata 1', '0', '1'),
(2, 'alvin@mail.com', 'alvin@mail.com', 'Alvin Ardiansyah', 'Bandung', 1431216000000, '1', 'Sekolah Lanjutan Tingkat Atas', '0', '1'),
(5, 'nurhasan@gmail.com', 'nurhasan', 'Nurhasan', 'Bandung', -473376835000, '1', 'Strata Dua', '1', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_hasil_penilaian_normal`
--
ALTER TABLE `t_hasil_penilaian_normal`
  ADD PRIMARY KEY (`id_hasil_penilaian_normal`);

--
-- Indexes for table `t_kunci_jawaban_normal`
--
ALTER TABLE `t_kunci_jawaban_normal`
  ADD PRIMARY KEY (`id_kunci_jawaban_normal`);

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
-- AUTO_INCREMENT for table `t_hasil_penilaian_normal`
--
ALTER TABLE `t_hasil_penilaian_normal`
  MODIFY `id_hasil_penilaian_normal` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `t_kunci_jawaban_normal`
--
ALTER TABLE `t_kunci_jawaban_normal`
  MODIFY `id_kunci_jawaban_normal` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `t_test`
--
ALTER TABLE `t_test`
  MODIFY `id_test` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
