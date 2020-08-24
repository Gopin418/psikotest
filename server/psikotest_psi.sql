-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 24, 2020 at 06:04 AM
-- Server version: 10.4.12-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `psikotest_psi`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_cfit_iq`
--

CREATE TABLE `t_cfit_iq` (
  `id_cfit_iq` int(11) NOT NULL,
  `total_raw_score_min` int(11) NOT NULL,
  `total_raw_score_max` int(11) NOT NULL,
  `umur_tahun_min` int(11) NOT NULL,
  `umur_tahun_max` int(11) NOT NULL,
  `umur_bulan_min` int(11) NOT NULL,
  `umur_bulan_max` int(11) NOT NULL,
  `score_iq` int(11) NOT NULL,
  `aktif` char(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_cfit_iq`
--

INSERT INTO `t_cfit_iq` (`id_cfit_iq`, `total_raw_score_min`, `total_raw_score_max`, `umur_tahun_min`, `umur_tahun_max`, `umur_bulan_min`, `umur_bulan_max`, `score_iq`, `aktif`) VALUES
(1, 0, 30, 13, 13, 0, 4, 136, '1'),
(2, 31, 31, 13, 13, 0, 4, 137, '1');

-- --------------------------------------------------------

--
-- Table structure for table `t_ist_info`
--

CREATE TABLE `t_ist_info` (
  `id_ist_info` int(11) NOT NULL,
  `mode` varchar(255) NOT NULL,
  `umur_min` double NOT NULL,
  `umur_max` double NOT NULL,
  `rw` int(11) NOT NULL,
  `sw` int(11) NOT NULL,
  `m` double DEFAULT NULL,
  `s` double DEFAULT NULL,
  `aktif` char(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_ist_info`
--

INSERT INTO `t_ist_info` (`id_ist_info`, `mode`, `umur_min`, `umur_max`, `rw`, `sw`, `m`, `s`, `aktif`) VALUES
(1, 'SE', 0, 12, 0, 74, NULL, NULL, '1'),
(2, 'SE', 0, 12, 1, 78, NULL, NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `t_ist_iq`
--

CREATE TABLE `t_ist_iq` (
  `id_ist_iq` int(11) NOT NULL,
  `sw` int(11) NOT NULL,
  `iq` int(11) NOT NULL,
  `prosentase` int(11) NOT NULL,
  `aktif` char(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_ist_iq`
--

INSERT INTO `t_ist_iq` (`id_ist_iq`, `sw`, `iq`, `prosentase`, `aktif`) VALUES
(1, 58, 37, 0, '1'),
(2, 60, 40, 0, '1');

-- --------------------------------------------------------

--
-- Table structure for table `t_ist_norm_ge`
--

CREATE TABLE `t_ist_norm_ge` (
  `id_ist_norm_ge` int(11) NOT NULL,
  `nilai_atas` int(11) NOT NULL,
  `nilai_bawah` int(11) NOT NULL,
  `rw` int(11) NOT NULL,
  `aktif` char(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_ist_norm_ge`
--

INSERT INTO `t_ist_norm_ge` (`id_ist_norm_ge`, `nilai_atas`, `nilai_bawah`, `rw`, `aktif`) VALUES
(1, 1, -100000, 1, '1'),
(2, 2, 2, 2, '1'),
(3, 3, 3, 3, '1'),
(4, 4, 4, 4, '1'),
(5, 6, 5, 5, '1'),
(6, 8, 7, 6, '1');

-- --------------------------------------------------------

--
-- Table structure for table `t_jawaban_normal`
--

CREATE TABLE `t_jawaban_normal` (
  `id_test` int(11) NOT NULL,
  `nomor_soal` int(11) NOT NULL,
  `index_jawaban` int(11) DEFAULT NULL,
  `jawaban` text DEFAULT NULL,
  `jawaban_terakhir` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_jawaban_normal`
--

INSERT INTO `t_jawaban_normal` (`id_test`, `nomor_soal`, `index_jawaban`, `jawaban`, `jawaban_terakhir`) VALUES
(11, 3, 1, 'Gempa bumi', '1'),
(11, 5, 1, 'Kuku', '1'),
(11, 6, 1, 'Selalu', '1'),
(11, 6, 1, 'Biasanya', '1'),
(11, 7, 1, 'Lemak', '1'),
(11, 8, 1, 'Lawan', '1'),
(11, 20, 1, '110', '1'),
(12, 1, 1, 'bujukan', '1'),
(12, 2, 1, 'Boros', '1'),
(12, 3, 1, 'Salju', '1'),
(12, 4, 1, 'Khianat', '1'),
(12, 5, 1, 'Pelana', '1'),
(12, 6, 1, 'Tidak pernah', '1'),
(12, 7, 1, 'Sayuran', '1'),
(12, 8, 1, 'Sorak', '1'),
(12, 9, 1, 'Paradoks', '1'),
(12, 10, 1, 'Lidah', '1'),
(12, 11, 1, 'Kotak PPPK', '1'),
(12, 12, 1, '24', '1'),
(12, 13, 1, 'Konservatif', '1'),
(12, 14, 1, 'Jarang', '1'),
(12, 15, 1, '950', '1'),
(12, 16, 1, 'Ayunan', '1'),
(12, 17, 1, 'Jarang', '1'),
(12, 18, 1, 'Semarang', '1'),
(12, 19, 1, 'Kemungkinan menang', '1'),
(12, 20, 1, '105', '1'),
(13, 21, 1, 'Lengkungan', '1'),
(13, 22, 1, 'Menggergaji', '1'),
(13, 23, 1, 'Panjang', '1'),
(13, 24, 1, 'Melepaskan', '1'),
(13, 25, 1, 'Selatan', '1'),
(13, 26, 1, 'Tugas', '1'),
(13, 27, 1, 'Lapisan', '1'),
(13, 28, 1, 'Berkilauan', '1'),
(13, 29, 1, 'Sepeda motor', '1'),
(13, 30, 1, 'Saxophone', '1'),
(13, 31, 1, 'Licin', '1'),
(13, 32, 1, 'Bintang pari', '1'),
(13, 33, 1, 'Pengerahan', '1'),
(13, 34, 1, 'Bersepeda', '1'),
(13, 35, 1, 'Potret', '1'),
(13, 36, 1, 'Runcing', '1'),
(13, 37, 1, 'Obeng', '1'),
(13, 38, 1, 'Perkawinan', '1'),
(13, 39, 1, 'Melicinkan', '1'),
(13, 40, 1, 'Batu', '1'),
(14, 41, 1, 'Berpikir', '1'),
(14, 42, 1, 'Pagar', '1'),
(14, 43, 1, 'Kecepatan', '1'),
(14, 44, 1, 'Platina', '1'),
(14, 45, 1, 'Gambar', '1'),
(14, 46, 1, 'Menilai', '1'),
(14, 47, 1, 'Bernapas', '1'),
(14, 48, 1, 'Talang', '1'),
(14, 50, 1, 'Tukang emas', '1'),
(14, 51, 1, 'Mendengar', '1'),
(14, 52, 1, 'Kelakar', '1'),
(14, 53, 1, 'Sedih', '1'),
(14, 54, 1, 'Jas', '1'),
(14, 55, 1, 'Nyanyian', '1'),
(14, 56, 1, 'Ilmu hewan', '1'),
(14, 57, 1, 'Dingin', '1'),
(14, 58, 1, 'Ditempa', '1'),
(14, 59, 1, 'Mikroskop', '1'),
(15, 61, 1, 'Bunga', '1'),
(15, 62, 1, 'indra', '1'),
(15, 63, 1, 'permata', '1'),
(15, 64, 1, '', '1'),
(15, 65, 1, '', '1'),
(15, 66, 1, '', '1'),
(15, 67, 1, '', '1'),
(15, 68, 1, '', '1'),
(15, 69, 1, '', '1'),
(15, 70, 1, '', '1'),
(15, 71, 1, '', '1'),
(15, 72, 1, '', '1'),
(15, 73, 1, '', '1'),
(15, 74, 1, '', '1'),
(15, 75, 1, '', '1'),
(15, 76, 1, '', '1');

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
  `nilai_score` int(11) NOT NULL DEFAULT 1,
  `aktif` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_kunci_jawaban_normal`
--

INSERT INTO `t_kunci_jawaban_normal` (`id_kunci_jawaban_normal`, `tipe_test`, `nomor_test`, `nomor_soal`, `index_jawaban`, `tipe_kunci_jawaban`, `kunci_jawaban`, `nilai_score`, `aktif`) VALUES
(79, 'ist', 1, 1, 1, '1', 'Kewibawaan', 1, '1'),
(80, 'ist', 1, 2, 1, '1', 'Boros', 1, '1'),
(81, 'ist', 1, 3, 1, '1', 'Gempa bumi', 1, '1'),
(82, 'ist', 1, 4, 1, '1', 'Khianat', 1, '1'),
(83, 'ist', 1, 5, 1, '1', 'Kuku', 1, '1'),
(84, 'ist', 1, 6, 1, '1', 'Biasanya', 1, '1'),
(85, 'ist', 1, 7, 1, '1', 'Lemak', 1, '1'),
(86, 'ist', 1, 8, 1, '1', 'Lawan', 1, '1'),
(87, 'ist', 1, 9, 1, '1', 'Hipotesis', 1, '1'),
(88, 'ist', 1, 10, 1, '1', 'Sol', 1, '1'),
(89, 'ist', 1, 11, 1, '1', 'Kotak PPPK', 1, '1'),
(90, 'ist', 1, 12, 1, '1', '24', 1, '1'),
(91, 'ist', 1, 13, 1, '1', 'Konservatif', 1, '1'),
(92, 'ist', 1, 14, 1, '1', 'Selalu', 1, '1'),
(93, 'ist', 1, 15, 1, '1', '800', 1, '1'),
(94, 'ist', 1, 16, 1, '1', 'Kekuatan', 1, '1'),
(95, 'ist', 1, 17, 1, '1', 'Biasanya', 1, '1'),
(96, 'ist', 1, 18, 1, '1', 'Bandung', 1, '1'),
(97, 'ist', 1, 19, 1, '1', 'Kemungkinan menang', 1, '1'),
(98, 'ist', 1, 20, 1, '1', '130', 1, '1'),
(99, 'ist', 2, 21, 1, '1', 'Panah', 1, '1'),
(100, 'ist', 2, 22, 1, '1', 'Memaki', 1, '1'),
(101, 'ist', 2, 23, 1, '1', 'Isi', 1, '1'),
(102, 'ist', 2, 24, 1, '1', 'Melepaskan', 1, '1'),
(103, 'ist', 2, 25, 1, '1', 'Perjalanan', 1, '1'),
(104, 'ist', 2, 26, 1, '1', 'Tugas', 1, '1'),
(105, 'ist', 2, 27, 1, '1', 'Payung', 1, '1'),
(106, 'ist', 2, 28, 1, '1', 'Kasar', 1, '1'),
(107, 'ist', 2, 29, 1, '1', 'Sepeda', 1, '1'),
(108, 'ist', 2, 30, 1, '1', 'Biola', 1, '1'),
(109, 'ist', 2, 31, 1, '1', 'Lurus', 1, '1'),
(110, 'ist', 2, 32, 1, '1', 'Jam', 1, '1'),
(111, 'ist', 2, 33, 1, '1', 'Kebijaksanaan', 1, '1'),
(112, 'ist', 2, 34, 1, '1', 'Berjalan', 1, '1'),
(113, 'ist', 2, 35, 1, '1', 'Potret', 1, '1'),
(114, 'ist', 2, 36, 1, '1', 'Panjang', 1, '1'),
(115, 'ist', 2, 37, 1, '1', 'Gunting', 1, '1'),
(116, 'ist', 2, 38, 1, '1', 'Masyarakat', 1, '1'),
(117, 'ist', 2, 39, 1, '1', 'Memahat', 1, '1'),
(118, 'ist', 2, 40, 1, '1', 'Bulu', 1, '1'),
(119, 'ist', 3, 41, 1, '1', 'Melupakan', 1, '1'),
(120, 'ist', 3, 42, 1, '1', 'Sangkar', 1, '1'),
(121, 'ist', 3, 43, 1, '1', 'Jalan raya', 1, '1'),
(122, 'ist', 3, 44, 1, '1', 'Gelang', 1, '1'),
(123, 'ist', 3, 45, 1, '1', 'Kubus', 1, '1'),
(124, 'ist', 3, 46, 1, '1', 'Menentukan', 0, '1'),
(125, 'ist', 3, 47, 1, '1', 'Tengik', 1, '1'),
(126, 'ist', 3, 48, 1, '1', 'Sungai', 1, '1'),
(127, 'ist', 3, 49, 1, '1', 'Pelindung', 1, '1'),
(128, 'ist', 3, 50, 1, '1', 'Tukang emas', 1, '1'),
(129, 'ist', 3, 51, 1, '1', 'Nada', 0, '1'),
(130, 'ist', 3, 52, 1, '1', 'Kelakar', 1, '1'),
(131, 'ist', 3, 53, 1, '1', 'Suasana hati', 1, '1'),
(132, 'ist', 3, 54, 1, '1', 'Sutra', 1, '1'),
(133, 'ist', 3, 55, 1, '1', 'Suara', 0, '1'),
(134, 'ist', 3, 56, 1, '1', 'Mutasi', 0, '1'),
(135, 'ist', 3, 57, 1, '1', 'Es', 1, '1'),
(136, 'ist', 3, 58, 1, '1', 'Ditempa', 1, '1'),
(137, 'ist', 3, 59, 1, '1', 'Mikroskop', 1, '1'),
(138, 'ist', 3, 60, 1, '1', 'Lautan api', 1, '1'),
(139, 'ist', 4, 61, 1, '2', 'bunga\nkembang\nperdu', 2, '1'),
(140, 'ist', 4, 61, 1, '2', 'tumbuh-tumbuhan\ntangkal\nharum', 1, '1'),
(141, 'ist', 4, 61, 1, '2', 'pohon', 0, '1'),
(142, 'ist', 4, 62, 1, '2', 'alat indera\nindera\npanca indera', 2, '1'),
(143, 'ist', 4, 62, 1, '2', 'organ\nalat tubuh', 1, '1'),
(144, 'ist', 4, 62, 1, '2', 'kepala\nalat', 0, '1'),
(145, 'ist', 4, 63, 1, '2', 'hablur\nkristal\nzat arang', 2, '1'),
(146, 'ist', 4, 63, 1, '2', 'berkilauan\nmengkilat\nbening', 1, '1'),
(147, 'ist', 4, 63, 1, '2', 'mahal\npermata', 0, '1'),
(148, 'ist', 4, 64, 1, '2', 'cuaca', 2, '1'),
(149, 'ist', 4, 64, 1, '2', 'air\nbasah\ngejala alam', 1, '1'),
(150, 'ist', 4, 64, 1, '2', 'musim dingin\niklim', 0, '1'),
(151, 'ist', 4, 65, 1, '2', 'pembawa berita\nalat perhubungan', 2, '1'),
(152, 'ist', 4, 65, 1, '2', 'PTT\npos\ntelekomunikasi\nperhubungan\nkomunikasi', 1, '1'),
(153, 'ist', 4, 66, 1, '2', 'alat optik\noptik', 2, '1'),
(154, 'ist', 4, 66, 1, '2', 'lensa', 1, '1'),
(155, 'ist', 4, 66, 1, '2', 'melihat\nalat penglihatan\nalat', 0, '1'),
(156, 'ist', 4, 67, 1, '2', 'alat pencernaan', 2, '1'),
(157, 'ist', 4, 67, 1, '2', 'jalan makanan\nperut\nisi perut\npencernaan makanan', 1, '1'),
(158, 'ist', 4, 67, 1, '2', 'makanan', 0, '1'),
(159, 'ist', 4, 68, 1, '2', 'penyebut jumlah\npengertian jumlah\njumlah\nkuantitas', 2, '1'),
(160, 'ist', 4, 68, 1, '2', 'mengukur\nukuran', 1, '1'),
(161, 'ist', 4, 68, 1, '2', 'uang', 0, '1'),
(162, 'ist', 4, 69, 1, '2', 'bibit\nbakal\nalat pembiak\npermulaan\npenghidupan', 2, '1'),
(163, 'ist', 4, 69, 1, '2', 'sel\npembiakan', 1, '1'),
(164, 'ist', 4, 69, 1, '2', 'pertanian\nketurunan', 0, '1'),
(165, 'ist', 4, 70, 1, '2', 'simbol\nlambang\ntanda', 2, '1'),
(166, 'ist', 4, 70, 1, '2', 'nama\ntanda pengenal', 1, '1'),
(167, 'ist', 4, 70, 1, '2', 'warna', 0, '1'),
(168, 'ist', 4, 71, 1, '2', 'makhluk\nmakhluk hidup\norganisme', 2, '1'),
(169, 'ist', 4, 71, 1, '2', 'tumbuh\nbiologi\nilmu hayat', 1, '1'),
(170, 'ist', 4, 71, 1, '2', 'hidup\nhayat\nhutan', 0, '1'),
(171, 'ist', 4, 72, 1, '2', 'wadah\ntempat pengisi\ntempat penyimpanan', 2, '1'),
(172, 'ist', 4, 72, 1, '2', 'air\ntempat sesuatu\ntempat\nbenda', 1, '1'),
(173, 'ist', 4, 72, 1, '2', 'lubang', 0, '1'),
(174, 'ist', 4, 73, 1, '2', 'penertian waktu\nbatas', 2, '1'),
(175, 'ist', 4, 73, 1, '2', 'waktu\nmasa\nsaat\nlamanya', 1, '1'),
(176, 'ist', 4, 73, 1, '2', 'kata waktu\nbuku', 0, '1'),
(177, 'ist', 4, 74, 1, '2', 'sifat - watak\nsifat watak\nsifat - karakter\nsifat karakter', 2, '1'),
(178, 'ist', 4, 74, 1, '2', 'sifat', 1, '1'),
(179, 'ist', 4, 74, 1, '2', 'uang\nwatak\nkarakter', 0, '1'),
(180, 'ist', 4, 75, 1, '2', 'regulator harga\npengertian ekonomi', 2, '1'),
(181, 'ist', 4, 75, 1, '2', 'dagang\nniaga\npenjualan\npembelian\njual beli', 1, '1'),
(182, 'ist', 4, 75, 1, '2', 'lawan kata', 0, '1'),
(183, 'ist', 4, 76, 1, '2', 'pengertian ruang\npenyebut ruang', 2, '1'),
(184, 'ist', 4, 76, 1, '2', 'arah\nletak\npenentu daerah\ntempat\nruang\npenunjuk tempat', 1, '1'),
(185, 'ist', 4, 76, 1, '2', 'daerah\ntingkatan\nruangan\nkata', 0, '1'),
(186, 'ist', 5, 77, 1, '2', '3\n5', 1, '1'),
(187, 'ist', 5, 78, 1, '2', '2\n8\n0', 1, '1'),
(188, 'ist', 5, 79, 1, '2', '2\n5\n0', 1, '1'),
(189, 'ist', 5, 80, 1, '2', '2\n6', 1, '1'),
(190, 'ist', 5, 81, 1, '2', '3\n0', 1, '1'),
(191, 'ist', 5, 82, 1, '2', '7\n0', 1, '1'),
(192, 'ist', 5, 83, 1, '2', '4\n5', 1, '1'),
(193, 'ist', 5, 84, 1, '2', '5', 1, '1'),
(194, 'ist', 5, 85, 1, '2', '4\n8', 1, '1'),
(195, 'ist', 5, 86, 1, '2', '7\n8', 1, '1'),
(196, 'ist', 5, 87, 1, '2', '1\n9', 1, '1'),
(197, 'ist', 5, 88, 1, '2', '6', 1, '1'),
(198, 'ist', 5, 89, 1, '2', '5\n7', 1, '1'),
(199, 'ist', 5, 90, 1, '2', '9\n0', 1, '1'),
(200, 'ist', 5, 91, 1, '2', '2\n0', 1, '1'),
(201, 'ist', 5, 92, 1, '2', '1\n7', 1, '1'),
(202, 'ist', 5, 93, 1, '2', '2\n4', 1, '1'),
(203, 'ist', 5, 94, 1, '2', '5', 1, '1'),
(204, 'ist', 5, 95, 1, '2', '4\n8', 1, '1'),
(205, 'ist', 5, 96, 1, '2', '3', 1, '1'),
(206, 'ist', 6, 97, 1, '2', '2\n7', 1, '1'),
(207, 'ist', 6, 98, 1, '2', '2\n5', 1, '1'),
(208, 'ist', 6, 99, 1, '2', '2\n7', 1, '1'),
(209, 'ist', 6, 100, 1, '2', '1\n5', 1, '1'),
(210, 'ist', 6, 101, 1, '2', '4\n6', 1, '1'),
(211, 'ist', 6, 102, 1, '2', '1\n0', 1, '1'),
(212, 'ist', 6, 103, 1, '2', '2\n4', 1, '1'),
(213, 'ist', 6, 104, 1, '2', '7', 1, '1'),
(214, 'ist', 6, 105, 1, '2', '5', 1, '1'),
(215, 'ist', 6, 106, 1, '2', '1\n4', 1, '1'),
(216, 'ist', 6, 107, 1, '2', '8', 1, '1'),
(217, 'ist', 6, 109, 1, '2', '4\n5', 1, '1'),
(218, 'ist', 6, 110, 1, '2', '3\n6', 1, '1'),
(219, 'ist', 6, 111, 1, '2', '1\n2', 1, '1'),
(220, 'ist', 6, 112, 1, '2', '8\n0', 1, '1'),
(221, 'ist', 6, 113, 1, '2', '1\n4', 1, '1'),
(222, 'ist', 6, 114, 1, '2', '1\n2', 1, '1'),
(223, 'ist', 6, 115, 1, '2', '3\n6', 1, '1'),
(224, 'ist', 6, 116, 1, '2', '1\n0', 1, '1'),
(244, 'ist', 7, 117, 1, '1', 'A', 1, '1'),
(245, 'ist', 7, 118, 1, '1', 'C', 1, '1'),
(246, 'ist', 7, 119, 1, '1', 'B', 1, '1'),
(247, 'ist', 7, 120, 1, '1', 'A', 1, '1'),
(248, 'ist', 7, 121, 1, '1', 'D', 1, '1'),
(249, 'ist', 7, 122, 1, '1', 'B', 1, '1'),
(250, 'ist', 7, 123, 1, '1', 'C', 1, '1'),
(251, 'ist', 7, 124, 1, '1', 'E', 1, '1'),
(252, 'ist', 7, 125, 1, '1', 'E', 1, '1'),
(253, 'ist', 7, 126, 1, '1', 'D', 1, '1'),
(254, 'ist', 7, 127, 1, '1', 'E', 1, '1'),
(255, 'ist', 7, 128, 1, '1', 'B', 1, '1'),
(256, 'ist', 7, 129, 1, '1', 'D', 1, '1'),
(257, 'ist', 7, 130, 1, '1', 'C', 1, '1'),
(258, 'ist', 7, 131, 1, '1', 'B', 1, '1'),
(259, 'ist', 7, 132, 1, '1', 'A', 1, '1'),
(260, 'ist', 7, 133, 1, '1', 'B', 1, '1'),
(261, 'ist', 7, 134, 1, '1', 'D', 1, '1'),
(262, 'ist', 7, 135, 1, '1', 'C', 1, '1'),
(263, 'ist', 7, 136, 1, '1', 'A', 1, '1'),
(264, 'ist', 8, 137, 1, '1', 'A', 1, '1'),
(265, 'ist', 8, 138, 1, '1', 'C', 1, '1'),
(266, 'ist', 8, 139, 1, '1', 'D', 1, '1'),
(267, 'ist', 8, 140, 1, '1', 'E', 1, '1'),
(268, 'ist', 8, 141, 1, '1', 'A', 1, '1'),
(269, 'ist', 8, 142, 1, '1', 'C', 1, '1'),
(270, 'ist', 8, 143, 1, '1', 'D', 1, '1'),
(271, 'ist', 8, 144, 1, '1', 'C', 1, '1'),
(272, 'ist', 8, 145, 1, '1', 'E', 1, '1'),
(273, 'ist', 8, 146, 1, '1', 'A', 1, '1'),
(274, 'ist', 8, 147, 1, '1', 'B', 1, '1'),
(275, 'ist', 8, 148, 1, '1', 'D', 1, '1'),
(276, 'ist', 8, 149, 1, '1', 'E', 1, '1'),
(277, 'ist', 8, 150, 1, '1', 'B', 1, '1'),
(278, 'ist', 8, 151, 1, '1', 'D', 1, '1'),
(279, 'ist', 8, 152, 1, '1', 'B', 1, '1'),
(280, 'ist', 8, 153, 1, '1', 'A', 1, '1'),
(281, 'ist', 8, 154, 1, '1', 'E', 1, '1'),
(282, 'ist', 8, 155, 1, '1', 'B', 1, '1'),
(283, 'ist', 8, 156, 1, '1', 'C', 1, '1'),
(284, 'ist', 9, 157, 1, '1', 'Kesenian', 1, '1'),
(285, 'ist', 9, 158, 1, '1', 'Binatang', 1, '1'),
(286, 'ist', 9, 159, 1, '1', 'Perkakas', 1, '1'),
(287, 'ist', 9, 160, 1, '1', 'Bunga', 1, '1'),
(288, 'ist', 9, 161, 1, '1', 'Burung', 1, '1'),
(289, 'ist', 9, 162, 1, '1', 'Bunga', 1, '1'),
(290, 'ist', 9, 163, 1, '1', 'Kesenian', 1, '1'),
(291, 'ist', 9, 164, 1, '1', 'Binatang', 1, '1'),
(292, 'ist', 9, 165, 1, '1', 'Burung', 1, '1'),
(293, 'ist', 9, 166, 1, '1', 'Perkakas', 1, '1'),
(294, 'ist', 9, 167, 1, '1', 'Perkakas', 1, '1'),
(295, 'ist', 9, 168, 1, '1', 'Bunga', 1, '1'),
(296, 'ist', 9, 169, 1, '1', 'Binatang', 1, '1'),
(297, 'ist', 9, 170, 1, '1', 'Burung', 1, '1'),
(298, 'ist', 9, 171, 1, '1', 'Kesenian', 1, '1'),
(299, 'ist', 9, 172, 1, '1', 'Perkakas', 1, '1'),
(300, 'ist', 9, 173, 1, '1', 'Binatang', 1, '1'),
(301, 'ist', 9, 174, 1, '1', 'Bunga', 1, '1'),
(302, 'ist', 9, 175, 1, '1', 'Burung', 1, '1'),
(303, 'ist', 9, 176, 1, '1', 'Kesenian', 0, '1');

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

--
-- Dumping data for table `t_sesi_test`
--

INSERT INTO `t_sesi_test` (`id_user`, `sesi`, `tanggal_test`, `tanggal_selesai`) VALUES
(1, '1aa881b4b64db57415977290002674f4cbd77', 1597729000267, NULL),
(1, '251deec2141c2e3515981308119074d18e0cf', 1598130811907, NULL),
(1, '8440d5ab37f6ae7d1597669212633d3248f17', 1597669212633, NULL),
(1, 'e963c084411eb73e1598131222113f68d92ec', 1598131222113, NULL),
(5, '073807a229176cb11598084088952858058f1', 1598084088952, NULL),
(5, '41f6b34acd81eb371597654837492a7febe7a', 1597654837492, NULL),
(6, 'dddd67638e1cf22015978039636587bd65d1e', 1597803963658, NULL);

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
  `benar` int(11) DEFAULT NULL,
  `salah` int(11) DEFAULT NULL,
  `catatan_pemeriksa` text DEFAULT NULL,
  `id_user_pemeriksa` int(11) DEFAULT NULL,
  `catatan_yang_mengesahkan` text DEFAULT NULL,
  `id_user_yang_mengesahkan` int(11) DEFAULT NULL,
  `tanggal_periksa` int(11) DEFAULT NULL,
  `tanggal_pengesahan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_test`
--

INSERT INTO `t_test` (`id_test`, `id_user`, `sesi`, `tipe_test`, `nomor_test`, `waktu`, `benar`, `salah`, `catatan_pemeriksa`, `id_user_pemeriksa`, `catatan_yang_mengesahkan`, `id_user_yang_mengesahkan`, `tanggal_periksa`, `tanggal_pengesahan`) VALUES
(11, 1, '8440d5ab37f6ae7d1597669212633d3248f17', 'ist', 1, 344, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 6, 'dddd67638e1cf22015978039636587bd65d1e', 'ist', 1, 128, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 6, 'dddd67638e1cf22015978039636587bd65d1e', 'ist', 2, 210, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 6, 'dddd67638e1cf22015978039636587bd65d1e', 'ist', 3, 282, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 6, 'dddd67638e1cf22015978039636587bd65d1e', 'ist', 4, 356, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  `jenjang_pendidikan` varchar(255) DEFAULT NULL,
  `agama` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `nama_ayah` varchar(255) DEFAULT NULL,
  `pekerjaan_ayah` varchar(255) DEFAULT NULL,
  `alamat_ayah` text DEFAULT NULL,
  `nama_ibu` varchar(255) DEFAULT NULL,
  `pekerjaan_ibu` varchar(255) DEFAULT NULL,
  `alamat_ibu` text DEFAULT NULL,
  `hobi` varchar(255) DEFAULT NULL,
  `cita2` varchar(255) DEFAULT NULL,
  `anak_ke` int(11) DEFAULT NULL,
  `jml_saudara` int(11) DEFAULT NULL,
  `mata_pelajaran_disukai` varchar(255) DEFAULT NULL,
  `mata_pelajaran_disukai_alasan` varchar(255) DEFAULT NULL,
  `mata_pelajaran_tdk_disukai` varchar(255) DEFAULT NULL,
  `mata_pelajaran_tdk_disukai_alasan` varchar(255) DEFAULT NULL,
  `mata_pelajaran_tinggi` varchar(255) DEFAULT NULL,
  `mata_pelajaran_rendah` varchar(255) DEFAULT NULL,
  `jurusan_sekolah` varchar(255) DEFAULT NULL,
  `cara_belajar` varchar(255) DEFAULT NULL,
  `tugas_sulit` varchar(255) DEFAULT NULL,
  `kegiatan_orang_tua` int(11) DEFAULT NULL,
  `kegiatan_orang_tua_lainnya` varchar(255) DEFAULT NULL,
  `sakit_keras_ya_tidak` varchar(255) DEFAULT NULL,
  `sakit_keras_ya_penyakit` varchar(255) DEFAULT NULL,
  `sakit_keras_ya_kapan` varchar(255) DEFAULT NULL,
  `sakit_keras_ya_akibat` varchar(255) DEFAULT NULL,
  `psikotest_ya_tidak` varchar(255) DEFAULT NULL,
  `psikotest_ya_kapan` varchar(255) DEFAULT NULL,
  `psikotest_tempat` varchar(255) DEFAULT NULL,
  `psikotest_tujuan` varchar(255) DEFAULT NULL,
  `tipe_user` char(1) NOT NULL DEFAULT '0',
  `aktif` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_users`
--

INSERT INTO `t_users` (`id_user`, `email`, `password`, `nama_user`, `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin`, `jenjang_pendidikan`, `agama`, `alamat`, `nama_ayah`, `pekerjaan_ayah`, `alamat_ayah`, `nama_ibu`, `pekerjaan_ibu`, `alamat_ibu`, `hobi`, `cita2`, `anak_ke`, `jml_saudara`, `mata_pelajaran_disukai`, `mata_pelajaran_disukai_alasan`, `mata_pelajaran_tdk_disukai`, `mata_pelajaran_tdk_disukai_alasan`, `mata_pelajaran_tinggi`, `mata_pelajaran_rendah`, `jurusan_sekolah`, `cara_belajar`, `tugas_sulit`, `kegiatan_orang_tua`, `kegiatan_orang_tua_lainnya`, `sakit_keras_ya_tidak`, `sakit_keras_ya_penyakit`, `sakit_keras_ya_kapan`, `sakit_keras_ya_akibat`, `psikotest_ya_tidak`, `psikotest_ya_kapan`, `psikotest_tempat`, `psikotest_tujuan`, `tipe_user`, `aktif`) VALUES
(1, 'bebas@bebas.com', 'bebas', 'Zaenudin Dzulkarnaen', 'Jakarta', 932892855000, '1', 'Strata 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0', '1'),
(2, 'alvin@mail.com', 'alvin', 'Alvin Ardiansyah', 'Bandung', 1431216000000, '1', 'Sekolah Lanjutan Tingkat Atas', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0', '1'),
(5, 'nurhasan@gmail.com', 'nurhasan', 'Nurhasan', 'Bandung', -473376835000, '1', 'Strata Dua', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '1'),
(6, 'nurhasanr@gmail.com', 'h454n', 'Nurhasan', 'SAMPANG', -239932800000, '1', 'Strata 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0', '1');

-- --------------------------------------------------------

--
-- Table structure for table `t_users_kursus`
--

CREATE TABLE `t_users_kursus` (
  `id_user` int(11) NOT NULL,
  `macam` varchar(255) NOT NULL,
  `lokasi` varchar(255) NOT NULL,
  `tahun_lulus` int(11) NOT NULL,
  `instansi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_users_olahraga_seni`
--

CREATE TABLE `t_users_olahraga_seni` (
  `id_user` int(11) NOT NULL,
  `tipe_isian` varchar(255) NOT NULL,
  `kegiatan` varchar(255) NOT NULL,
  `aktif` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_users_organisasi`
--

CREATE TABLE `t_users_organisasi` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jabatan` varchar(255) NOT NULL,
  `lokasi` varchar(255) NOT NULL,
  `lamanya` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_users _saudara`
--

CREATE TABLE `t_users _saudara` (
  `id_user` int(11) NOT NULL,
  `tipe_isian` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `pekerjaan_sekolah` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_users_sekolah`
--

CREATE TABLE `t_users_sekolah` (
  `id_user` int(11) NOT NULL,
  `jenis_sekolah` varchar(255) NOT NULL,
  `nama_sekolah` varchar(255) NOT NULL,
  `lokasi` varchar(255) NOT NULL,
  `tahun_lulus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_cfit_iq`
--
ALTER TABLE `t_cfit_iq`
  ADD PRIMARY KEY (`id_cfit_iq`);

--
-- Indexes for table `t_ist_info`
--
ALTER TABLE `t_ist_info`
  ADD PRIMARY KEY (`id_ist_info`);

--
-- Indexes for table `t_ist_iq`
--
ALTER TABLE `t_ist_iq`
  ADD PRIMARY KEY (`id_ist_iq`);

--
-- Indexes for table `t_ist_norm_ge`
--
ALTER TABLE `t_ist_norm_ge`
  ADD PRIMARY KEY (`id_ist_norm_ge`);

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
-- AUTO_INCREMENT for table `t_cfit_iq`
--
ALTER TABLE `t_cfit_iq`
  MODIFY `id_cfit_iq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `t_ist_info`
--
ALTER TABLE `t_ist_info`
  MODIFY `id_ist_info` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `t_ist_iq`
--
ALTER TABLE `t_ist_iq`
  MODIFY `id_ist_iq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `t_ist_norm_ge`
--
ALTER TABLE `t_ist_norm_ge`
  MODIFY `id_ist_norm_ge` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `t_kunci_jawaban_normal`
--
ALTER TABLE `t_kunci_jawaban_normal`
  MODIFY `id_kunci_jawaban_normal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=304;

--
-- AUTO_INCREMENT for table `t_test`
--
ALTER TABLE `t_test`
  MODIFY `id_test` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
