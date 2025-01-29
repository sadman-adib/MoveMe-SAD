-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2025 at 01:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moveme2.0`
--

-- --------------------------------------------------------

--
-- Table structure for table `busowner_management_table`
--

CREATE TABLE `busowner_management_table` (
  `busowner_id` varchar(100) DEFAULT NULL,
  `busowner_name` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `quantity` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `busowner_management_table`
--

INSERT INTO `busowner_management_table` (`busowner_id`, `busowner_name`, `phone`, `email`, `status`, `quantity`) VALUES
('bo11123', 'Arif Hossain', '01911123456', 'arif.hossain@example.com', NULL, '0'),
('bo11234', 'Mahbub Alam', '01911234567', 'mahbub.alam@example.com', NULL, '1'),
('bo12345', 'Abdul Karim', '01912345678', 'abdul.karim@example.com', NULL, '3'),
('bo22234', 'Mitu Khatun', '01922234567', 'mitu.khatun@example.com', NULL, '5'),
('bo22345', 'Sadia Sultana', '01922345678', 'sadia.sultana@example.com', NULL, '3'),
('bo23456', 'Farhana Rahman', '01923456789', 'farhana.rahman@example.com', NULL, '1'),
('bo33456', 'Rubel Hossain', '01933456789', 'rubel.hossain@example.com', NULL, '4'),
('bo34567', 'Saiful Islam', '01934567890', 'saiful.islam@example.com', NULL, '5'),
('bo44567', 'Nusrat Jahan', '01944567890', 'nusrat.jahan@example.com', NULL, '2'),
('bo45678', 'Mariam Akter', '01945678901', 'mariam.akter@example.com', NULL, '2'),
('bo55678', 'Rafiq Ahmed', '01955678901', 'rafiq.ahmed@example.com', NULL, '5'),
('bo56789', 'Habibur Rahman', '01956789012', 'habibur.rahman@example.com', NULL, '4'),
('bo66789', 'Rumana Parveen', '01966789012', 'rumana.parveen@example.com', NULL, '1'),
('bo67890', 'Sharmin Jahan', '01967890123', 'sharmin.jahan@example.com', NULL, '3'),
('bo77890', 'Shakil Anwar', '01977890123', 'shakil.anwar@example.com', NULL, '2'),
('bo78901', 'Nazmul Hasan', '01978901234', 'nazmul.hasan@example.com', NULL, '2'),
('bo88901', 'Fahim Chowdhury', '01988901234', 'fahim.chowdhury@example.com', NULL, '4'),
('bo89012', 'Ayesha Siddiqua', '01989012345', 'ayesha.siddiqua@example.com', NULL, '5'),
('bo90123', 'Tariqul Islam', '01990123456', 'tariqul.islam@example.com', NULL, '4'),
('bo99012', 'Nasrin Akter', '01999012345', 'nasrin.akter@example.com', NULL, '3');

-- --------------------------------------------------------

--
-- Table structure for table `busowner_table`
--

CREATE TABLE `busowner_table` (
  `busowner_id` varchar(100) NOT NULL,
  `busowner_name` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `bus_quantity` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `payment` varchar(100) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_provider` varchar(50) DEFAULT NULL,
  `payment_account_number` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `busowner_table`
--

INSERT INTO `busowner_table` (`busowner_id`, `busowner_name`, `phone`, `email`, `location`, `bus_quantity`, `status`, `payment`, `payment_method`, `payment_provider`, `payment_account_number`) VALUES
('bo11123', 'Arif Hossain', '01911123456', 'arif.hossain@example.com', 'Uttara, Dhaka', '0', NULL, '', '', NULL, NULL),
('bo11234', 'Mahbub Alam', '01911234567', 'mahbub.alam@example.com', 'Banani, Dhaka', '1', NULL, '', '', NULL, NULL),
('bo12345', 'Abdul Karim', '01912345678', 'abdul.karim@example.com', 'Badda, Dhaka', '3', NULL, '', '', NULL, NULL),
('bo22234', 'Mitu Khatun', '01922234567', 'mitu.khatun@example.com', 'Gulshan, Dhaka', '5', NULL, '', '', NULL, NULL),
('bo22345', 'Sadia Sultana', '01922345678', 'sadia.sultana@example.com', 'Rampura, Dhaka', '3', NULL, '', '', NULL, NULL),
('bo23456', 'Farhana Rahman', '01923456789', 'farhana.rahman@example.com', 'Khigaon, Dhaka', '1', NULL, '', '', NULL, NULL),
('bo33456', 'Rubel Hossain', '01933456789', 'rubel.hossain@example.com', 'Ashulia, Dhaka', '4', NULL, '', '', NULL, NULL),
('bo34567', 'Saiful Islam', '01934567890', 'saiful.islam@example.com', 'Abdullahpur, Dhaka', '5', NULL, '', '', NULL, NULL),
('bo44567', 'Nusrat Jahan', '01944567890', 'nusrat.jahan@example.com', 'Banasree, Dhaka', '2', NULL, '', '', NULL, NULL),
('bo45678', 'Mariam Akter', '01945678901', 'mariam.akter@example.com', '', '2', NULL, '', '', NULL, NULL),
('bo55678', 'Rafiq Ahmed', '01955678901', 'rafiq.ahmed@example.com', '', '5', NULL, '', '', NULL, NULL),
('bo56789', 'Habibur Rahman', '01956789012', 'habibur.rahman@example.com', '', '4', NULL, '', '', NULL, NULL),
('bo66789', 'Rumana Parveen', '01966789012', 'rumana.parveen@example.com', '', '1', NULL, '', '', NULL, NULL),
('bo67890', 'Sharmin Jahan', '01967890123', 'sharmin.jahan@example.com', '', '3', NULL, '', '', NULL, NULL),
('bo77890', 'Shakil Anwar', '01977890123', 'shakil.anwar@example.com', '', '2', NULL, '', '', NULL, NULL),
('bo78901', 'Nazmul Hasan', '01978901234', 'nazmul.hasan@example.com', '', '2', NULL, '', '', NULL, NULL),
('bo88901', 'Fahim Chowdhury', '01988901234', 'fahim.chowdhury@example.com', '', '4', NULL, '', '', NULL, NULL),
('bo89012', 'Ayesha Siddiqua', '01989012345', 'ayesha.siddiqua@example.com', '', '5', NULL, '', '', NULL, NULL),
('bo90123', 'Tariqul Islam', '01990123456', 'tariqul.islam@example.com', '', '4', NULL, '', '', NULL, NULL),
('bo99012', 'Nasrin Akter', '01999012345', 'nasrin.akter@example.com', '', '3', NULL, '', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bus_management_table`
--

CREATE TABLE `bus_management_table` (
  `bus_id` varchar(100) DEFAULT NULL,
  `model` varchar(100) DEFAULT NULL,
  `capacity` int(11) NOT NULL,
  `busowner_id` varchar(100) DEFAULT NULL,
  `assigned_route` varchar(100) DEFAULT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_management_table`
--

INSERT INTO `bus_management_table` (`bus_id`, `model`, `capacity`, `busowner_id`, `assigned_route`, `driver_name`, `status`) VALUES
('b12345', 'Raida', 50, 'bo22234', 'Route A', 'Driver 1', 'in-progress'),
('b23456', 'Turag', 50, 'bo22234', 'Route A', 'Driver 1', 'available'),
('b34567', 'Anabil', 50, 'bo22234', 'Route A', 'Driver 1', 'maintenance'),
('b45678', 'Salsabil', 50, 'bo22234', 'Route B', 'Driver 1', 'in-progress'),
('b56789', 'Alif', 50, 'bo22234', '', 'Driver 1', 'available'),
('BUS790', 'tata', 50, 'bo11123', 'Route B', '', 'maintenance');

-- --------------------------------------------------------

--
-- Table structure for table `bus_table`
--

CREATE TABLE `bus_table` (
  `bus_id` varchar(100) NOT NULL,
  `busowner_id` varchar(100) DEFAULT NULL,
  `model` varchar(100) DEFAULT NULL,
  `capacity` varchar(100) DEFAULT NULL,
  `registration_number` varchar(50) DEFAULT NULL,
  `device_id` varchar(50) DEFAULT NULL,
  `tax_token` varchar(50) DEFAULT NULL,
  `insurance` varchar(50) DEFAULT NULL,
  `fitness` varchar(50) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_table`
--

INSERT INTO `bus_table` (`bus_id`, `busowner_id`, `model`, `capacity`, `registration_number`, `device_id`, `tax_token`, `insurance`, `fitness`, `status`) VALUES
('b12345', 'bo22234', 'Raida', '50', 'dhaka_metro_g_12_3344', 'd12345', '2025-10-10', '2025-10-15', '2025-10-20', NULL),
('b23456', 'bo22234', 'Turag', '50', 'dhaka_metro_g_12_3345', 'd23456', '2025-10-11', '2025-10-16', '2025-10-21', NULL),
('b34567', 'bo22234', 'Anabil', '50', 'dhaka_metro_g_12_3346', 'd34567', '2025-10-12', '2025-10-17', '2025-10-22', NULL),
('b45678', 'bo22234', 'Salsabil', '50', 'dhaka_metro_g_12_3347', 'd45678', '2025-10-13', '2025-10-18', '2025-10-23', NULL),
('b56789', 'bo22234', 'Alif', '50', 'dhaka_metro_g_12_3348', 'd56789', '2025-10-14', '2025-10-19', '2025-10-24', NULL),
('BUS790', 'bo11123', 'tata', '50', 'dhaka', 'd1234', '2025-01-31', '2025-01-28', '2025-01-23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `driver_management_table`
--

CREATE TABLE `driver_management_table` (
  `driver_id` varchar(100) DEFAULT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `license` varchar(50) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `assigned_bus_id` varchar(100) DEFAULT NULL,
  `license_exp_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driver_management_table`
--

INSERT INTO `driver_management_table` (`driver_id`, `driver_name`, `phone`, `license`, `status`, `assigned_bus_id`, `license_exp_date`) VALUES
('dr11123', 'Fazlur Rahman', '01911123456', '9012384567', 'available', NULL, '2025-10-28'),
('dr11234', 'Kamal Uddin', '01911234567', '0123456789', 'available', NULL, '2025-10-19'),
('dr12345', 'Abdul Mannan', '01912345678', '1234567890', 'Inactive', NULL, '2025-10-10'),
('dr22234', 'Mostafa Kamal', '01922234567', '0123495678', 'Inactive', NULL, '2025-10-29'),
('dr22345', 'Salma Akter', '01922345678', '1234506789', 'available', NULL, '2025-10-20'),
('dr23456', 'Rafiqul Islam', '01923456789', '2345678901', 'On-service', NULL, '2025-10-11'),
('dr33456', 'Hasina Begum', '01933456789', '2345617890', 'available', NULL, '2025-10-21'),
('dr34567', 'Mizanur Rahman', '01934567890', '3456789012', 'Inactive', NULL, '2025-10-12'),
('dr44567', 'Rubel Mia', '01944567890', '3456728901', 'available', NULL, '2025-10-22'),
('dr45678', 'Shamsul Alam', '01945678901', '4567890123', 'available', NULL, '2025-10-13'),
('dr55678', 'Parvez Alam', '01955678901', '4567839012', 'Inactive', NULL, '2025-10-23'),
('dr56789', 'Nazrul Islam', '01956789012', '5678901234', 'On-service', NULL, '2025-10-14'),
('dr66789', 'Aminur Rahman', '01966789012', '5678940123', 'available', NULL, '2025-10-24'),
('dr67890', 'Habibur Rahman', '01967890123', '6789012345', 'On-service', NULL, '2025-10-15'),
('dr77890', 'Shahidul Islam', '01977890123', '6789051234', 'available', NULL, '2025-10-25'),
('dr78901', 'Sharmin Akter', '01978901234', '7890123456', 'Inactive', NULL, '2025-10-16'),
('dr88901', 'Anisur Rahman', '01988901234', '7890162345', 'available', NULL, '2025-10-26'),
('dr89012', 'Faruk Hossain', '01989012345', '8901234567', 'On-service', NULL, '2025-10-17'),
('dr90123', 'Nasima Begum', '01990123456', '9012345678', 'available', NULL, '2025-10-18'),
('dr99012', 'Lutfar Rahman', '01999012345', '8901273456', 'Inactive', NULL, '2025-10-27');

-- --------------------------------------------------------

--
-- Table structure for table `driver_table`
--

CREATE TABLE `driver_table` (
  `driver_id` varchar(100) NOT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `license` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `nid` varchar(20) DEFAULT NULL,
  `license_exp_date` date DEFAULT NULL,
  `payment` varchar(100) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driver_table`
--

INSERT INTO `driver_table` (`driver_id`, `driver_name`, `phone`, `license`, `status`, `nid`, `license_exp_date`, `payment`, `payment_method`, `account_number`) VALUES
('dr11123', 'Fazlur Rahman', '01911123456', '9012384567', 'On-service', '90123845678901234', '2025-10-28', NULL, NULL, NULL),
('dr11234', 'Kamal Uddin', '01911234567', '0123456789', 'available', '01234567890123456', '2025-10-19', NULL, NULL, NULL),
('dr12345', 'Abdul Mannan', '01912345678', '1234567890', 'Inactive', '12345678901234567', '2025-10-10', NULL, NULL, NULL),
('dr22234', 'Mostafa Kamal', '01922234567', '0123495678', 'Inactive', '01234956789012345', '2025-10-29', NULL, NULL, NULL),
('dr22345', 'Salma Akter', '01922345678', '1234506789', 'available', '12345067890123456', '2025-10-20', NULL, NULL, NULL),
('dr23456', 'Rafiqul Islam', '01923456789', '2345678901', 'On-service', '23456789012345678', '2025-10-11', NULL, NULL, NULL),
('dr33456', 'Hasina Begum', '01933456789', '2345617890', 'available', '23456178901234567', '2025-10-21', NULL, NULL, NULL),
('dr34567', 'Mizanur Rahman', '01934567890', '3456789012', 'Inactive', '34567890123456789', '2025-10-12', NULL, NULL, NULL),
('dr44567', 'Rubel Mia', '01944567890', '3456728901', 'available', '34567289012345678', '2025-10-22', NULL, NULL, NULL),
('dr45678', 'Shamsul Alam', '01945678901', '4567890123', 'available', '45678901234567890', '2025-10-13', NULL, NULL, NULL),
('dr55678', 'Parvez Alam', '01955678901', '4567839012', 'Inactive', '45678390123456789', '2025-10-23', NULL, NULL, NULL),
('dr56789', 'Nazrul Islam', '01956789012', '5678901234', 'On-service', '56789012345678901', '2025-10-14', NULL, NULL, NULL),
('dr66789', 'Aminur Rahman', '01966789012', '5678940123', 'available', '56789401234567890', '2025-10-24', NULL, NULL, NULL),
('dr67890', 'Habibur Rahman', '01967890123', '6789012345', 'On-service', '67890123456789012', '2025-10-15', NULL, NULL, NULL),
('dr77890', 'Shahidul Islam', '01977890123', '6789051234', 'available', '67890512345678901', '2025-10-25', NULL, NULL, NULL),
('dr78901', 'Sharmin Akter', '01978901234', '7890123456', 'Inactive', '78901234567890123', '2025-10-16', NULL, NULL, NULL),
('dr88901', 'Anisur Rahman', '01988901234', '7890162345', 'available', '78901623456789012', '2025-10-26', NULL, NULL, NULL),
('dr89012', 'Faruk Hossain', '01989012345', '8901234567', 'On-service', '89012345678901234', '2025-10-17', NULL, NULL, NULL),
('dr90123', 'Nasima Begum', '01990123456', '9012345678', 'available', '90123456789012345', '2025-10-18', NULL, NULL, NULL),
('dr99012', 'Lutfar Rahman', '01999012345', '8901273456', 'Inactive', '89012734567890123', '2025-10-27', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_table`
--

CREATE TABLE `employee_table` (
  `employee_id` varchar(250) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `joining_date` date NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nid` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `teamname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_table`
--

INSERT INTO `employee_table` (`employee_id`, `employee_name`, `joining_date`, `phone`, `email`, `nid`, `password`, `teamname`) VALUES
('CMGMT0001', 'Laura Adams', '2023-09-01', '2345678901', 'laura.adams@example.com', 'NID234567', 'password999', 'Central Management'),
('MAINT0001', 'Charlie Brown', '2023-04-10', '3456789012', 'charlie.brown@example.com', 'NID345678', 'password789', 'Maintenance Team'),
('MAINT0002', 'Hannah Lee', '2023-05-14', '8901234567', 'hannah.lee@example.com', 'NID890123', 'password234', 'Maintenance Team'),
('MGMT0001', 'Bob Smith', '2022-03-20', '2345678901', 'bob.smith@example.com', 'NID234567', 'password456', 'Management Team'),
('MGMT0002', 'George King', '2023-01-25', '7890123456', 'george.king@example.com', 'NID789012', 'password901', 'Management Team'),
('REG0001', 'Alice Johnson', '2022-01-15', '1234567890', 'alice.johnson@example.com', 'NID123456', 'password123', 'Registration Team'),
('REG0002', 'Fiona Grey', '2022-12-20', '6789012345', 'fiona.grey@example.com', 'NID678901', 'password678', 'Registration Team'),
('REV0001', 'Diana White', '2023-06-05', '4567890123', 'diana.white@example.com', 'NID456789', 'password012', 'Revenue Team'),
('REV0002', 'Isaac Moore', '2023-02-10', '9012345678', 'isaac.moore@example.com', 'NID901234', 'password567', 'Revenue Team'),
('RTT0001', 'Ethan Green', '2022-11-12', '5678901234', 'ethan.green@example.com', 'NID567890', 'password345', 'Real Time Tracking Team'),
('RTT0002', 'Jack Taylor', '2023-07-30', '0123456789', 'jack.taylor@example.com', 'NID012345', 'password890', 'Real Time Tracking Team');

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_table`
--

CREATE TABLE `maintenance_table` (
  `bus_id` varchar(100) DEFAULT NULL,
  `driver_id` varchar(100) DEFAULT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `assigned_machanic` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maintenance_table`
--

INSERT INTO `maintenance_table` (`bus_id`, `driver_id`, `driver_name`, `phone`, `location`, `status`, `assigned_machanic`) VALUES
('b12345', 'dr11123', 'Fazlur Rahman', '01911123456', 'Baridhara', 'emergency', 'John Doe'),
('b23456', 'dr11234', 'Kamal Uddin', '01911234567', 'Rampura', 'complete', 'Jane Smith'),
('b34567', 'dr12345', 'Abdul Mannan', '01912345678', 'Badda', 'in progress', 'Mike Johnson'),
('b45678', 'dr22234', 'Mostafa Kamal', '01922234567', 'Basabo', 'emergency', 'Emily Davis'),
('b56789', 'dr22345', 'Salma Akter', '01922345678', 'Uttara', 'complete', 'Robert Brown'),
('b67890', 'dr23456', 'Rafiqul Islam', '01923456789', 'Khilgaon', 'in progress', 'Sarah Wilson'),
('b78901', 'dr33456', 'Hasina Begum', '01933456789', 'Mohakhali', 'emergency', 'David Miller'),
('b89012', 'dr34567', 'Mizanur Rahman', '01934567890', 'Malibag', 'complete', 'Laura Garcia'),
('b90123', 'dr44567', 'Rubel Mia', '01944567890', 'Baridhara', 'in progress', 'James Lee'),
('b11234', 'dr45678', 'Shamsul Alam', '01945678901', 'Rampura', 'complete', 'Anna Martinez'),
('b22345', 'dr55678', 'Parvez Alam', '01955678901', 'Badda', 'emergency', 'Chris Taylor'),
('b33456', 'dr56789', 'Nazrul Islam', '01956789012', 'Basabo', 'in progress', 'Patricia Thomas'),
('b44567', 'dr66789', 'Aminur Rahman', '01966789012', 'Uttara', 'complete', 'Charles Anderson'),
('b55678', 'dr67890', 'Habibur Rahman', '01967890123', 'Khilgaon', 'emergency', 'Elizabeth Moore'),
('b66789', 'dr77890', 'Shahidul Islam', '01977890123', 'Mohakhali', 'complete', 'Matthew Harris'),
('b77890', 'dr78901', 'Sharmin Akter', '01978901234', 'Malibag', 'in progress', 'Jennifer Thompson'),
('b88901', 'dr88901', 'Anisur Rahman', '01988901234', 'Baridhara', 'emergency', 'Christopher White'),
('b99012', 'dr89012', 'Faruk Hossain', '01989012345', 'Rampura', 'complete', 'Amanda Martin'),
('b11223', 'dr90123', 'Nasima Begum', '01990123456', 'Badda', 'in progress', 'Daniel Jackson'),
('b22334', 'dr99012', 'Lutfar Rahman', '01999012345', 'Basabo', 'emergency', 'Sophia Hernandez'),
('B1234', 'D5678', 'Robiul Robin', '+880123456789', 'Badda', 'issue', NULL),
('B1234', 'D5678', 'Robiul Robin', '+880123456789', 'Baridhara', 'emergency', NULL),
('BUS12790', 'DR12345', 'Robiul Robin', '+880123456789', 'Mirpur', 'emergency', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `passenger_management_table`
--

CREATE TABLE `passenger_management_table` (
  `passenger_id` varchar(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `rfid` varchar(50) DEFAULT NULL,
  `spent_amount` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `passenger_table`
--

CREATE TABLE `passenger_table` (
  `passenger_id` varchar(100) NOT NULL,
  `passenger_name` varchar(100) DEFAULT NULL,
  `phone` varchar(100) NOT NULL,
  `rfid` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `payment` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_table`
--

CREATE TABLE `payment_table` (
  `user_id` varchar(100) NOT NULL,
  `method` varchar(50) DEFAULT NULL,
  `number` varchar(20) DEFAULT NULL,
  `amount` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `revenue_table`
--

CREATE TABLE `revenue_table` (
  `rfid` varchar(50) DEFAULT NULL,
  `passenger_name` varchar(500) DEFAULT NULL,
  `busowner_id` varchar(100) DEFAULT NULL,
  `bus_id` varchar(100) DEFAULT NULL,
  `start_location` varchar(100) DEFAULT NULL,
  `end_location` varchar(100) DEFAULT NULL,
  `start_datetime` datetime DEFAULT NULL,
  `end_datetime` datetime DEFAULT NULL,
  `fare` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `revenue_table`
--

INSERT INTO `revenue_table` (`rfid`, `passenger_name`, `busowner_id`, `bus_id`, `start_location`, `end_location`, `start_datetime`, `end_datetime`, `fare`) VALUES
('0001001440', '0', 'bo1234505', 'b1234505', 'Abdullahpur', 'Uttara', '2025-01-01 08:00:00', '2025-01-01 08:50:00', '96'),
('0001001441', '0', 'bo1234505', 'b1234505', 'Baridhara', 'Basabo', '2025-01-01 16:00:00', '2025-01-01 16:41:00', '78'),
('0001001442', '0', 'bo1234505', 'b1234505', 'Ashulia', 'Gulshan', '2025-01-02 08:00:00', '2025-01-02 08:37:00', '46'),
('0001001443', '0', 'bo1234505', 'b1234505', 'Mohakhali', 'Gulshan', '2025-01-02 16:00:00', '2025-01-02 16:38:00', '31'),
('0001001444', '0', 'bo1234505', 'b1234505', 'Khilgaon', 'Uttara', '2025-01-03 08:00:00', '2025-01-03 08:36:00', '55'),
('0001001445', '0', 'bo1234505', 'b1234505', 'Baridhara', 'Abdullahpur', '2025-01-03 16:00:00', '2025-01-03 16:44:00', '81'),
('0001001446', '0', 'bo1234505', 'b1234505', 'Abdullahpur', 'Ashulia', '2025-01-04 08:00:00', '2025-01-04 08:47:00', '31'),
('0001001447', '0', 'bo1234505', 'b1234505', 'Ashulia', 'Baridhara', '2025-01-04 16:00:00', '2025-01-04 16:39:00', '100'),
('0001001448', '0', 'bo1234505', 'b1234505', 'Abdullahpur', 'Khilgaon', '2025-01-05 08:00:00', '2025-01-05 08:30:00', '88'),
('0001001449', '0', 'bo1234505', 'b1234505', 'Baridhara', 'Ashulia', '2025-01-05 16:00:00', '2025-01-05 16:49:00', '34'),
('0001001450', '0', 'bo1234505', 'b1234505', 'Ashulia', 'Uttara', '2025-01-06 08:00:00', '2025-01-06 08:50:00', '40'),
('0001001451', '0', 'bo1234505', 'b1234505', 'Baridhara', 'Gulshan', '2025-01-06 16:00:00', '2025-01-06 16:39:00', '64'),
('0001001452', '0', 'bo1234505', 'b1234505', 'Badda', 'Khilgaon', '2025-01-07 08:00:00', '2025-01-07 08:47:00', '32'),
('0001001453', '0', 'bo1234505', 'b1234505', 'Mohakhali', 'Badda', '2025-01-07 16:00:00', '2025-01-07 16:40:00', '56'),
('0001001454', '0', 'bo1234505', 'b1234505', 'Badda', 'Baridhara', '2025-01-08 08:00:00', '2025-01-08 08:54:00', '46'),
('0001001455', '0', 'bo1234505', 'b1234505', 'Basabo', 'Khilgaon', '2025-01-08 16:00:00', '2025-01-08 16:54:00', '80'),
('0001001456', '0', 'bo1234505', 'b1234505', 'Mohakhali', 'Uttara', '2025-01-09 08:00:00', '2025-01-09 08:48:00', '59'),
('0001001457', '0', 'bo1234505', 'b1234505', 'Baridhara', 'Ashulia', '2025-01-09 16:00:00', '2025-01-09 16:38:00', '80'),
('0001001458', '0', 'bo1234505', 'b1234505', 'Uttara', 'Abdullahpur', '2025-01-10 08:00:00', '2025-01-10 08:40:00', '100'),
('0001001459', '0', 'bo1234505', 'b1234505', 'Mohakhali', 'Badda', '2025-01-10 16:00:00', '2025-01-10 16:59:00', '36'),
('0001001460', '0', 'bo1234505', 'b1234505', 'Khilgaon', 'Gulshan', '2025-01-11 08:00:00', '2025-01-11 08:41:00', '46'),
('0001001461', '0', 'bo1234505', 'b1234505', 'Gulshan', 'Ashulia', '2025-01-11 16:00:00', '2025-01-11 16:30:00', '45'),
('0001001462', '0', 'bo1234505', 'b1234505', 'Khilgaon', 'Mohakhali', '2025-01-12 08:00:00', '2025-01-12 08:56:00', '87'),
('0001001463', '0', 'bo1234505', 'b1234505', 'Khilgaon', 'Badda', '2025-01-12 16:00:00', '2025-01-12 16:57:00', '67'),
('0001001464', '0', 'bo1234505', 'b1234505', 'Uttara', 'Ashulia', '2025-01-13 08:00:00', '2025-01-13 08:47:00', '69'),
('0001001465', '0', 'bo1234505', 'b1234505', 'Khilgaon', 'Basabo', '2025-01-13 16:00:00', '2025-01-13 17:00:00', '63'),
('0001001466', '0', 'bo1234505', 'b1234505', 'Abdullahpur', 'Badda', '2025-01-14 08:00:00', '2025-01-14 08:32:00', '57'),
('0001001467', '0', 'bo1234505', 'b1234505', 'Uttara', 'Gulshan', '2025-01-14 16:00:00', '2025-01-14 16:31:00', '87'),
('0001001468', '0', 'bo1234505', 'b1234505', 'Badda', 'Mohakhali', '2025-01-15 08:00:00', '2025-01-15 08:45:00', '70'),
('0001001469', '0', 'bo1234505', 'b1234505', 'Basabo', 'Gulshan', '2025-01-15 16:00:00', '2025-01-15 16:35:00', '94'),
('0001001470', '0', 'bo1234505', 'b1234505', 'Khilgaon', 'Abdullahpur', '2025-01-16 08:00:00', '2025-01-16 08:34:00', '87');

-- --------------------------------------------------------

--
-- Table structure for table `storeowner_management_table`
--

CREATE TABLE `storeowner_management_table` (
  `store_id` varchar(100) DEFAULT NULL,
  `store_name` varchar(100) DEFAULT NULL,
  `storeowner_name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `sold_card` varchar(100) DEFAULT NULL,
  `recharge_amount` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `storeowner_management_table`
--

INSERT INTO `storeowner_management_table` (`store_id`, `store_name`, `storeowner_name`, `location`, `sold_card`, `recharge_amount`, `status`) VALUES
('s11234', 'Aminur Collections', 'Aminur Rahman', 'Jatrabari, Dhaka, BD', '350', '10000', 'pending'),
('s12345', 'Karim Electronics', 'Abdul Karim', 'Uttara, Dhaka, BD', '500', '15000', 'active'),
('s22234', 'Ayesha Groceries', 'Ayesha Siddiqua', 'Shahbagh, Dhaka, BD', '120', '4000', 'active'),
('s22345', 'Shahid Enterprise', 'Shahidul Islam', 'Uttara Sector 10, Dhaka, BD', '250', '8000', 'active'),
('s23456', 'Rahman Groceries', 'Habibur Rahman', 'Banani, Dhaka, BD', '400', '12000', 'pending'),
('s33456', 'Anisur Groceries', 'Anisur Rahman', 'Tejgaon, Dhaka, BD', '150', '3000', 'active'),
('s34567', 'Mizan Super Shop', 'Mizanur Rahman', 'Gulshan, Dhaka, BD', '100', '2500', 'inactive'),
('s44567', 'Lutfar Super Shop', 'Lutfar Rahman', 'Pallabi, Dhaka, BD', '80', '2000', 'pending'),
('s45678', 'Sharmin Fashion', 'Sharmin Akter', 'Dhanmondi, Dhaka, BD', '200', '5000', 'active'),
('s55678', 'Fazlur Traders', 'Fazlur Rahman', 'Shyamoli, Dhaka, BD', '300', '8000', 'inactive'),
('s56789', 'Faruk Traders', 'Faruk Hossain', 'Motijheel, Dhaka, BD', '150', '4000', 'pending'),
('s66789', 'Mostafa Mart', 'Mostafa Kamal', 'Khilgaon, Dhaka, BD', '100', '3000', 'active'),
('s67890', 'Nasima Mart', 'Nasima Begum', 'Mirpur, Dhaka, BD', '120', '3500', 'inactive'),
('s77890', 'Nusrat Fashion', 'Nusrat Jahan', 'Badda, Dhaka, BD', '250', '7000', 'pending'),
('s78901', 'Kamal Stationery', 'Kamal Uddin', 'Mohammadpur, Dhaka, BD', '350', '10000', 'active'),
('s88901', 'Rubina Collections', 'Rubina Begum', 'Rampura, Dhaka, BD', '400', '11000', 'inactive'),
('s89012', 'Rubel Electronics', 'Rubel Mia', 'Farmgate, Dhaka, BD', '500', '12000', 'pending'),
('s90123', 'Parvez Mart', 'Parvez Alam', 'Bashundhara, Dhaka, BD', '250', '8000', 'active'),
('s99012', 'Mamun Electronics', 'Mamun Hossain', 'Hatirjheel, Dhaka, BD', '350', '9000', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `storeowner_table`
--

CREATE TABLE `storeowner_table` (
  `store_id` varchar(100) NOT NULL,
  `store_name` varchar(100) DEFAULT NULL,
  `phone` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `storeowner_name` varchar(100) DEFAULT NULL,
  `nid` varchar(20) DEFAULT NULL,
  `trade_license_number` varchar(50) DEFAULT NULL,
  `payment` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `storeowner_table`
--

INSERT INTO `storeowner_table` (`store_id`, `store_name`, `phone`, `location`, `storeowner_name`, `nid`, `trade_license_number`, `payment`, `status`) VALUES
('s11123', 'Farhana Mart', '', 'Green Road, Dhaka, BD', 'Farhana Rahman', '90123845678901234', '9012384567', NULL, NULL),
('s11234', 'Aminur Collections', '', 'Jatrabari, Dhaka, BD', 'Aminur Rahman', '01234567890123456', '0123456789', NULL, NULL),
('s12345', 'Karim Electronics', '', 'Uttara, Dhaka, BD', 'Abdul Karim', '12345678901234567', '1234567890', NULL, NULL),
('s22234', 'Ayesha Groceries', '', 'Shahbagh, Dhaka, BD', 'Ayesha Siddiqua', '01234956789012345', '0123495678', NULL, NULL),
('s22345', 'Shahid Enterprise', '', 'Uttara Sector 10, Dhaka, BD', 'Shahidul Islam', '12345067890123456', '1234506789', NULL, NULL),
('s23456', 'Rahman Groceries', '', 'Banani, Dhaka, BD', 'Habibur Rahman', '23456789012345678', '2345678901', NULL, NULL),
('s33456', 'Anisur Groceries', '', 'Tejgaon, Dhaka, BD', 'Anisur Rahman', '23456178901234567', '2345617890', NULL, NULL),
('s34567', 'Mizan Super Shop', '', 'Gulshan, Dhaka, BD', 'Mizanur Rahman', '34567890123456789', '3456789012', NULL, NULL),
('s44567', 'Lutfar Super Shop', '', 'Pallabi, Dhaka, BD', 'Lutfar Rahman', '34567289012345678', '3456728901', NULL, NULL),
('s45678', 'Sharmin Fashion', '', 'Dhanmondi, Dhaka, BD', 'Sharmin Akter', '45678901234567890', '4567890123', NULL, NULL),
('s55678', 'Fazlur Traders', '', 'Shyamoli, Dhaka, BD', 'Fazlur Rahman', '45678390123456789', '4567839012', NULL, NULL),
('s56789', 'Faruk Traders', '', 'Motijheel, Dhaka, BD', 'Faruk Hossain', '56789012345678901', '5678901234', NULL, NULL),
('s66789', 'Mostafa Mart', '', 'Khilgaon, Dhaka, BD', 'Mostafa Kamal', '56789401234567890', '5678940123', NULL, NULL),
('s67890', 'Nasima Mart', '', 'Mirpur, Dhaka, BD', 'Nasima Begum', '67890123456789012', '6789012345', NULL, NULL),
('s77890', 'Nusrat Fashion', '', 'Badda, Dhaka, BD', 'Nusrat Jahan', '67890512345678901', '6789051234', NULL, NULL),
('s78901', 'Kamal Stationery', '', 'Mohammadpur, Dhaka, BD', 'Kamal Uddin', '78901234567890123', '7890123456', NULL, NULL),
('s88901', 'Rubina Collections', '', 'Rampura, Dhaka, BD', 'Rubina Begum', '78901623456789012', '7890162345', NULL, NULL),
('s89012', 'Rubel Electronics', '', 'Farmgate, Dhaka, BD', 'Rubel Mia', '89012345678901234', '8901234567', NULL, NULL),
('s90123', 'Parvez Mart', '', 'Bashundhara, Dhaka, BD', 'Parvez Alam', '90123456789012345', '9012345678', NULL, NULL),
('s99012', 'Mamun Electronics', '', 'Hatirjheel, Dhaka, BD', 'Mamun Hossain', '89012734567890123', '8901273456', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `busowner_management_table`
--
ALTER TABLE `busowner_management_table`
  ADD KEY `busowner_id` (`busowner_id`);

--
-- Indexes for table `busowner_table`
--
ALTER TABLE `busowner_table`
  ADD PRIMARY KEY (`busowner_id`);

--
-- Indexes for table `bus_management_table`
--
ALTER TABLE `bus_management_table`
  ADD KEY `bus_id` (`bus_id`),
  ADD KEY `busowner_id` (`busowner_id`);

--
-- Indexes for table `bus_table`
--
ALTER TABLE `bus_table`
  ADD PRIMARY KEY (`bus_id`),
  ADD KEY `busowner_id` (`busowner_id`);

--
-- Indexes for table `driver_management_table`
--
ALTER TABLE `driver_management_table`
  ADD KEY `driver_id` (`driver_id`),
  ADD KEY `fk_assigned_bus` (`assigned_bus_id`);

--
-- Indexes for table `driver_table`
--
ALTER TABLE `driver_table`
  ADD PRIMARY KEY (`driver_id`);

--
-- Indexes for table `employee_table`
--
ALTER TABLE `employee_table`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `passenger_management_table`
--
ALTER TABLE `passenger_management_table`
  ADD PRIMARY KEY (`passenger_id`);

--
-- Indexes for table `passenger_table`
--
ALTER TABLE `passenger_table`
  ADD PRIMARY KEY (`passenger_id`);

--
-- Indexes for table `payment_table`
--
ALTER TABLE `payment_table`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `storeowner_management_table`
--
ALTER TABLE `storeowner_management_table`
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `storeowner_table`
--
ALTER TABLE `storeowner_table`
  ADD PRIMARY KEY (`store_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `busowner_management_table`
--
ALTER TABLE `busowner_management_table`
  ADD CONSTRAINT `busowner_management_table_ibfk_1` FOREIGN KEY (`busowner_id`) REFERENCES `busowner_table` (`busowner_id`);

--
-- Constraints for table `bus_management_table`
--
ALTER TABLE `bus_management_table`
  ADD CONSTRAINT `bus_management_table_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `bus_table` (`bus_id`),
  ADD CONSTRAINT `bus_management_table_ibfk_2` FOREIGN KEY (`busowner_id`) REFERENCES `busowner_table` (`busowner_id`);

--
-- Constraints for table `bus_table`
--
ALTER TABLE `bus_table`
  ADD CONSTRAINT `bus_table_ibfk_1` FOREIGN KEY (`busowner_id`) REFERENCES `busowner_table` (`busowner_id`);

--
-- Constraints for table `driver_management_table`
--
ALTER TABLE `driver_management_table`
  ADD CONSTRAINT `driver_management_table_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `driver_table` (`driver_id`),
  ADD CONSTRAINT `fk_assigned_bus` FOREIGN KEY (`assigned_bus_id`) REFERENCES `bus_table` (`bus_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `passenger_management_table`
--
ALTER TABLE `passenger_management_table`
  ADD CONSTRAINT `passenger_management_table_ibfk_1` FOREIGN KEY (`passenger_id`) REFERENCES `passenger_table` (`passenger_id`);

--
-- Constraints for table `storeowner_management_table`
--
ALTER TABLE `storeowner_management_table`
  ADD CONSTRAINT `storeowner_management_table_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `storeowner_table` (`store_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
