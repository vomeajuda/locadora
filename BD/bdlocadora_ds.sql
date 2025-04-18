-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2024 at 06:02 PM
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
-- Database: `bdlocadora_ds`
--

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `CatCod` int(11) NOT NULL,
  `CatNome` varchar(20) NOT NULL,
  `CatValor_km` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`CatCod`, `CatNome`, `CatValor_km`) VALUES
(1, 'Basico', 0.49),
(2, 'Utilitario', 0.51),
(3, 'Luxo', 0.53),
(4, 'Especial', 0.55);

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `clienteCPF` int(9) NOT NULL,
  `clienteNome` varchar(40) NOT NULL,
  `clienteEnde` varchar(60) NOT NULL,
  `clienteTel` varchar(15) NOT NULL,
  `clienteCidade` varchar(60) NOT NULL,
  `clienteDataNasc` date NOT NULL,
  `clienteCNH` bigint(12) NOT NULL,
  `clienteCNHCat` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`clienteCPF`, `clienteNome`, `clienteEnde`, `clienteTel`, `clienteCidade`, `clienteDataNasc`, `clienteCNH`, `clienteCNHCat`) VALUES
(111222333, 'Pedro Santos', 'Rua da Praia, 789', '(21) 98765-1234', 'Rio de Janeiro', '1978-11-30', 11122233344, 'A'),
(123456789, 'João Silva', 'Rua das Flores, 123', '(11) 98765-4321', 'São Paulo', '1985-04-12', 12345678900, 'B'),
(222333444, 'Laura Mendes', 'Avenida Brasil, 303', '(41) 91234-5678', 'Curitiba', '1988-12-10', 22233344411, 'B'),
(333444555, 'Gustavo Rocha', 'Avenida Sete, 606', '(11) 93456-7890', 'São Paulo', '1980-01-20', 33344455544, 'C'),
(444555666, 'Ana Costa', 'Rua dos Jacarandás, 101', '(31) 92345-6789', 'Belo Horizonte', '1982-05-16', 44455566677, 'B'),
(555666777, 'Lucas Almeida', 'Rua das Palmeiras, 404', '(21) 99876-5432', 'Rio de Janeiro', '1993-03-05', 55566677722, 'A'),
(666777888, 'Juliana Campos', 'Rua dos Girassóis, 707', '(31) 91567-8901', 'Belo Horizonte', '1991-06-12', 66677788855, 'B'),
(777888999, 'Carlos Pereira', 'Rua das Acácias, 202', '(61) 98765-4321', 'Brasília', '1995-07-25', 77788899900, 'C'),
(888999000, 'Fernanda Lima', 'Rua das Orquídeas, 505', '(71) 98765-6789', 'Salvador', '1987-09-17', 88899900033, 'AB'),
(987654321, 'Maria Oliveira', 'Avenida Paulista, 456,', '(11) 91234-5678', 'São Paulo', '1990-08-22', 98765432101, 'A');

-- --------------------------------------------------------

--
-- Table structure for table `combustivel`
--

CREATE TABLE `combustivel` (
  `CombTipo` varchar(1) NOT NULL,
  `CombNome` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `combustivel`
--

INSERT INTO `combustivel` (`CombTipo`, `CombNome`) VALUES
('A', 'Alcool'),
('D', 'Diesel'),
('F', 'Flex'),
('G', 'Gasolina');

-- --------------------------------------------------------

--
-- Table structure for table `departamento`
--

CREATE TABLE `departamento` (
  `DeptoCod` int(11) NOT NULL,
  `DeptoNome` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `departamento`
--

INSERT INTO `departamento` (`DeptoCod`, `DeptoNome`) VALUES
(1, 'Atendimento'),
(2, 'Administrativo'),
(3, 'Financeiro'),
(4, 'Diretoria'),
(5, 'Copa');

-- --------------------------------------------------------

--
-- Table structure for table `funcionarios`
--

CREATE TABLE `funcionarios` (
  `funcMatricula` int(4) NOT NULL,
  `funcNome` varchar(40) NOT NULL,
  `funcDepto` int(1) NOT NULL,
  `funcSalario` decimal(8,2) NOT NULL,
  `funcAdmissao` date NOT NULL,
  `funcFilho` int(1) NOT NULL,
  `funcSexo` varchar(1) NOT NULL,
  `funcAtivo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `funcionarios`
--

INSERT INTO `funcionarios` (`funcMatricula`, `funcNome`, `funcDepto`, `funcSalario`, `funcAdmissao`, `funcFilho`, `funcSexo`, `funcAtivo`) VALUES
(1001, 'Francisco de Oliveira', 1, 1800.00, '2001-11-20', 0, 'M', 1),
(1002, 'Ana Maria Andrade', 2, 3200.00, '1999-02-13', 1, 'F', 1),
(1003, 'Antônio Andrade de Oliveira', 3, 4800.00, '2007-11-05', 3, 'M', 1),
(1004, 'Maria Abelarda da Silva', 5, 937.00, '1997-03-01', 5, 'F', 1),
(1005, 'Manoel Trindade', 4, 7850.50, '1997-01-02', 3, 'M', 1),
(1006, 'Alexandre Barbosa', 1, 1800.00, '2000-06-08', 2, 'M', 1),
(1007, 'Rosana Campoy', 2, 3020.00, '2004-07-24', 3, 'F', 1),
(1008, 'Janaína Albuquerque', 3, 4500.00, '1999-03-25', 0, 'F', 1),
(1009, 'Roberto Silva Junior', 1, 1810.00, '2003-07-07', 0, 'M', 1),
(1010, 'Carlos Eduardo Siqueira', 4, 7890.00, '2009-08-04', 1, 'M', 1),
(1011, 'Heitor Sampaio', 1, 3450.00, '2011-03-05', 1, 'M', 1),
(1012, 'Célia Menezes', 1, 1980.00, '2008-07-18', 0, 'F', 1),
(1013, 'José Alves Costa', 1, 1650.00, '2000-09-11', 1, 'M', 1),
(1014, 'Arlinda Medeiros', 5, 937.00, '2000-05-03', 5, 'F', 1),
(1015, 'Josefina Sarmento', 4, 6789.00, '1997-01-02', 1, 'F', 1),
(1016, 'Wendell Navarro Perez', 3, 1212.00, '2004-04-15', 2, 'M', 1),
(1017, 'Rodolfo Rodrigues', 1, 8500.00, '2022-09-10', 2, 'M', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ordem_de_servico`
--

CREATE TABLE `ordem_de_servico` (
  `OsNum` int(11) NOT NULL,
  `OsFuncMat` int(4) NOT NULL,
  `OsClienteCPF` int(9) NOT NULL,
  `OsVeicPlaca` varchar(7) NOT NULL,
  `OsDataRetirada` date NOT NULL,
  `OsDataDevolucao` date DEFAULT NULL,
  `OsKMRetirada` decimal(8,2) NOT NULL,
  `OsKMDevolucao` decimal(8,2) DEFAULT NULL,
  `OsStatus` tinyint(1) NOT NULL,
  `OsValorPgto` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ordem_de_servico`
--

INSERT INTO `ordem_de_servico` (`OsNum`, `OsFuncMat`, `OsClienteCPF`, `OsVeicPlaca`, `OsDataRetirada`, `OsDataDevolucao`, `OsKMRetirada`, `OsKMDevolucao`, `OsStatus`, `OsValorPgto`) VALUES
(1, 1001, 987654321, 'ABW4007', '2024-08-01', '2024-08-07', 12345.67, 13000.00, 1, 250.00),
(2, 1002, 111222333, 'AQW1234', '2024-08-05', '2024-08-10', 23456.78, 24000.00, 1, 300.00),
(3, 1003, 444555666, 'ACZ3243', '2024-08-10', '2024-08-15', 34567.89, 38000.00, 0, 1887.66),
(4, 1004, 777888999, 'AWS2365', '2024-08-12', '2024-08-20', 45678.90, 47000.00, 1, 400.00),
(5, 1005, 222333444, 'AWY4546', '2024-08-15', '2024-08-22', 56789.01, 58000.00, 1, 350.00),
(6, 1006, 555666777, 'AZX3273', '2024-08-18', '2024-08-25', 67890.12, 69000.00, 0, 0.00),
(7, 1007, 888999000, 'AQY2005', '2024-08-20', '2024-08-27', 78901.23, 80000.00, 1, 450.00),
(8, 1008, 333444555, 'ADE3456', '2024-08-22', '2024-08-30', 89012.34, 91000.00, 1, 500.00),
(9, 1009, 666777888, 'AWQ3703', '2024-08-25', '2024-09-01', 90123.45, 92000.00, 1, 550.00),
(10, 1010, 987654321, 'AQX3451', '2024-08-28', '2024-09-05', 12345.67, 13000.00, 0, 0.00);

--
-- Triggers `ordem_de_servico`
--
DELIMITER $$
CREATE TRIGGER `TR_UPDATE_calcular` BEFORE INSERT ON `ordem_de_servico` FOR EACH ROW BEGIN
SET @idCat := (SELECT veicCat FROM veiculos WHERE veicPlaca = NEW.OsVeicPlaca);
SET @valorCat := (SELECT CatValor_km FROM categoria WHERE CatCod = @idCat);
SET @difereca := NEW.OsKMDevolucao - NEW.OsKMRetirada;
SET NEW.OsValorPgto = @difereca * @valorCat;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TR_UPDATE_ocupado` AFTER UPDATE ON `ordem_de_servico` FOR EACH ROW BEGIN
IF NEW.OsDataDevolucao IS NOT NULL AND OLD.OsDataDevolucao IS NULL THEN
UPDATE `veiculos`
SET `veiculos.veicStatusAlocado` = 0
WHERE veicPlaca = NEW.OsVeicPlaca;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `usuarioLogin` varchar(30) NOT NULL,
  `usuarioSenha` varchar(8) NOT NULL,
  `usuarioFuncMat` int(4) DEFAULT NULL,
  `usuarioSetor` int(1) NOT NULL,
  `usuarioStatus` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`usuarioLogin`, `usuarioSenha`, `usuarioFuncMat`, `usuarioSetor`, `usuarioStatus`) VALUES
('fein@yahoo.com.br', 'fomfom', NULL, 5, 1),
('glimacarniatto@gmail.com', 'bemLegal', NULL, 1, NULL),
('japinha.delicia@terra.com.br', 'gym', NULL, 3, NULL),
('leogugo9@gmail.com', '87654321', NULL, 4, 1),
('rafvalentina@gmail.com', '12345', NULL, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `veiculos`
--

CREATE TABLE `veiculos` (
  `veicPlaca` varchar(7) NOT NULL,
  `veicMarca` varchar(15) NOT NULL,
  `veicModelo` varchar(15) NOT NULL,
  `veicCor` varchar(15) DEFAULT NULL,
  `veicAno` int(4) NOT NULL,
  `veicComb` varchar(1) DEFAULT NULL,
  `veicCat` int(1) DEFAULT NULL,
  `veicStatusAlocado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `veiculos`
--

INSERT INTO `veiculos` (`veicPlaca`, `veicMarca`, `veicModelo`, `veicCor`, `veicAno`, `veicComb`, `veicCat`, `veicStatusAlocado`) VALUES
('ABW4007', 'VW', 'Jetta', 'Preto', 2022, 'F', 3, 1),
('ACZ3243', 'VW', 'Fusca', 'Rosa', 1956, 'G', 4, 1),
('ADE3456', 'Chevrolet', 'Camaro', 'Amarelo', 2022, 'G', 4, 1),
('ADW2456', 'VW', 'Gol', 'Vermelho', 2021, 'A', 1, 1),
('ADX1473', 'Ford', 'Ka', 'Branco', 2021, 'A', 1, 1),
('AQW1234', 'Ford', 'Fusion', 'Preto', 2022, 'F', 3, 1),
('AQX3451', 'Porsche', 'Carrera', 'Preto', 2022, 'G', 4, 1),
('AQY2005', 'Chevrolet', 'S10', 'Branco', 2022, 'D', 2, 1),
('ASX3232', 'Ford', 'Ka', 'Marrom', 2022, 'F', 1, 1),
('AVX4003', 'VW', 'Amarok', 'Preto', 2022, 'D', 2, 1),
('AWQ3703', 'Chevrolet', 'Omega', 'Preto', 2022, 'G', 3, 1),
('AWS2365', 'Chevrolet', 'Cruze', 'Azul', 2022, 'F', 3, 1),
('AWV1234', 'Fiat', 'Palio', 'Branco', 2021, 'F', 1, 0),
('AWV1323', 'VW', 'Gol', 'Branco', 2022, 'F', 1, 0),
('AWY4546', 'Fiat', 'Fiorino', 'Branco', 2021, 'A', 2, 1),
('AZX3273', 'VW', 'Fox', 'Azul', 2021, 'F', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`CatCod`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`clienteCPF`);

--
-- Indexes for table `combustivel`
--
ALTER TABLE `combustivel`
  ADD PRIMARY KEY (`CombTipo`);

--
-- Indexes for table `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`DeptoCod`);

--
-- Indexes for table `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`funcMatricula`),
  ADD KEY `funcDepto` (`funcDepto`);

--
-- Indexes for table `ordem_de_servico`
--
ALTER TABLE `ordem_de_servico`
  ADD PRIMARY KEY (`OsNum`),
  ADD KEY `OsClienteCPF` (`OsClienteCPF`),
  ADD KEY `OsFuncMat` (`OsFuncMat`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuarioLogin`),
  ADD KEY `usuarioFuncMat` (`usuarioFuncMat`);

--
-- Indexes for table `veiculos`
--
ALTER TABLE `veiculos`
  ADD PRIMARY KEY (`veicPlaca`),
  ADD KEY `veicCat` (`veicCat`),
  ADD KEY `veicComb` (`veicComb`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`funcDepto`) REFERENCES `departamento` (`DeptoCod`);

--
-- Constraints for table `ordem_de_servico`
--
ALTER TABLE `ordem_de_servico`
  ADD CONSTRAINT `ordem_de_servico_ibfk_1` FOREIGN KEY (`OsVeicPlaca`) REFERENCES `veiculos` (`veicPlaca`),
  ADD CONSTRAINT `ordem_de_servico_ibfk_2` FOREIGN KEY (`OsClienteCPF`) REFERENCES `clientes` (`clienteCPF`),
  ADD CONSTRAINT `ordem_de_servico_ibfk_3` FOREIGN KEY (`OsFuncMat`) REFERENCES `funcionarios` (`funcMatricula`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`usuarioFuncMat`) REFERENCES `funcionarios` (`funcMatricula`);

--
-- Constraints for table `veiculos`
--
ALTER TABLE `veiculos`
  ADD CONSTRAINT `veiculos_ibfk_1` FOREIGN KEY (`veicCat`) REFERENCES `categoria` (`CatCod`),
  ADD CONSTRAINT `veiculos_ibfk_2` FOREIGN KEY (`veicComb`) REFERENCES `combustivel` (`CombTipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
