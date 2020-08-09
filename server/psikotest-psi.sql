-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 09, 2020 at 01:53 PM
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
  `benar_salah` char(1) NOT NULL
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
  `kunci_jawaban` text NOT NULL,
  `aktif` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_sesi_test`
--

CREATE TABLE `t_sesi_test` (
  `id_user` int(11) NOT NULL,
  `sesi` varchar(255) NOT NULL,
  `tanggal_test` bigint(20) NOT NULL,
  `tanggal_selesai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `waktu` int(11) NOT NULL,
  `tanggal_periksa` int(11) DEFAULT NULL,
  `tanggal_pengesahan` int(11) DEFAULT NULL
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
  ADD PRIMARY KEY (`id_test`),
  ADD UNIQUE KEY `sesi` (`sesi`,`tipe_test`,`nomor_test`);

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
  MODIFY `id_test` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
