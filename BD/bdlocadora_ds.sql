-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 30-Ago-2024 às 14:46
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bdlocadora_ds`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE `categoria` (
  `CatCod` int(11) NOT NULL,
  `CatNome` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `clienteCPF` int(9) NOT NULL,
  `clienteNome` varchar(40) NOT NULL,
  `clienteEnde` varchar(60) NOT NULL,
  `clienteTel` varchar(15) NOT NULL,
  `clienteCidade` varchar(60) NOT NULL,
  `clienteDataNasc` date NOT NULL,
  `clienteCNH` int(11) NOT NULL,
  `clienteCNHCat` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `combustivel`
--

CREATE TABLE `combustivel` (
  `CombTipo` varchar(1) NOT NULL,
  `CombNome` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `departamento`
--

CREATE TABLE `departamento` (
  `DeptoCod` int(11) NOT NULL,
  `DeptoNome` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionarios`
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `ordem_de_servico`
--

CREATE TABLE `ordem_de_servico` (
  `OsNum` int(11) NOT NULL,
  `OsFuncMat` int(4) NOT NULL,
  `OsClienteCPF` int(9) NOT NULL,
  `OsVeicPlaca` varchar(7) NOT NULL,
  `OsDataRetirada` date NOT NULL,
  `OsDataDevolucao` date DEFAULT NULL,
  `OsKMRetirada` decimal(8,2) NOT NULL,
  `OsKMDevolucao` decimal(8,2) NOT NULL,
  `OsStatus` tinyint(1) NOT NULL,
  `OsValorPgto` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `usuarioLogin` int(11) NOT NULL,
  `usuarioSenha` varchar(8) NOT NULL,
  `usuarioFuncMat` int(4) DEFAULT NULL,
  `usuarioSetor` int(11) NOT NULL,
  `usuarioStatus` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `veiculos`
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
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`CatCod`);

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`clienteCPF`);

--
-- Índices para tabela `combustivel`
--
ALTER TABLE `combustivel`
  ADD PRIMARY KEY (`CombTipo`);

--
-- Índices para tabela `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`DeptoCod`);

--
-- Índices para tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`funcMatricula`),
  ADD KEY `funcDepto` (`funcDepto`);

--
-- Índices para tabela `ordem_de_servico`
--
ALTER TABLE `ordem_de_servico`
  ADD PRIMARY KEY (`OsNum`),
  ADD KEY `OsVeicPlaca` (`OsVeicPlaca`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuarioLogin`);

--
-- Índices para tabela `veiculos`
--
ALTER TABLE `veiculos`
  ADD PRIMARY KEY (`veicPlaca`),
  ADD KEY `veicCat` (`veicCat`),
  ADD KEY `veicComb` (`veicComb`);

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`funcDepto`) REFERENCES `departamento` (`DeptoCod`);

--
-- Limitadores para a tabela `ordem_de_servico`
--
ALTER TABLE `ordem_de_servico`
  ADD CONSTRAINT `ordem_de_servico_ibfk_1` FOREIGN KEY (`OsVeicPlaca`) REFERENCES `veiculos` (`veicPlaca`);

--
-- Limitadores para a tabela `veiculos`
--
ALTER TABLE `veiculos`
  ADD CONSTRAINT `veiculos_ibfk_1` FOREIGN KEY (`veicCat`) REFERENCES `categoria` (`CatCod`),
  ADD CONSTRAINT `veiculos_ibfk_2` FOREIGN KEY (`veicComb`) REFERENCES `combustivel` (`CombTipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
