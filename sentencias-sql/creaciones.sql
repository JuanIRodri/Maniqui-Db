CREATE DATABASE IF NOT EXISTS `Maniqui`;
USE `Maniqui`;

-- Estructura de tabla para `Boca`
CREATE TABLE `Boca` (
  `idBoca` int(11) NOT NULL AUTO_INCREMENT,
  `Forma` varchar(45) DEFAULT NULL,
  `Tamanio` varchar(45) DEFAULT NULL,
  `Color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idBoca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Cabello`
CREATE TABLE `Cabello` (
  `idCabello` int(11) NOT NULL AUTO_INCREMENT,
  `Corte` varchar(45) NOT NULL,
  `Tinte` varchar(45) NOT NULL,
  PRIMARY KEY (`idCabello`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Cejas`
CREATE TABLE `Cejas` (
  `idCejas` int(11) NOT NULL AUTO_INCREMENT,
  `Tinte` varchar(45) DEFAULT NULL,
  `Forma` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCejas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Cuernos`
CREATE TABLE `Cuernos` (
  `idCuernos` int(11) NOT NULL AUTO_INCREMENT,
  `Cantidad` varchar(45) DEFAULT NULL,
  `Tamanio` varchar(45) DEFAULT NULL,
  `Color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCuernos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `FormaBrazo`
CREATE TABLE `FormaBrazo` (
  `idFormaBrazo` int(11) NOT NULL AUTO_INCREMENT,
  `Tamanio` int(11) NOT NULL,
  `Tipo` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  PRIMARY KEY (`idFormaBrazo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Nariz`
CREATE TABLE `Nariz` (
  `idNariz` int(11) NOT NULL AUTO_INCREMENT,
  `Forma` varchar(45) NOT NULL,
  `Tamanio` varchar(45) NOT NULL,
  PRIMARY KEY (`idNariz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Pestanias`
CREATE TABLE `Pestanias` (
  `idPestanias` int(11) NOT NULL AUTO_INCREMENT,
  `Forma` varchar(45) DEFAULT NULL,
  `Tamanio` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPestanias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Pierna`
CREATE TABLE `Pierna` (
  `idPierna` int(11) NOT NULL AUTO_INCREMENT,
  `Tamanio` int(11) NOT NULL,
  `Tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`idPierna`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Torso`
CREATE TABLE `Torso` (
  `idTorso` int(11) NOT NULL AUTO_INCREMENT,
  `Forma` varchar(45) DEFAULT NULL,
  `Tamanio` varchar(45) DEFAULT NULL,
  `Bello` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idTorso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Brazo`
CREATE TABLE `Brazo` (
  `idBrazo` int(11) NOT NULL AUTO_INCREMENT,
  `Cantidad` int(11) DEFAULT NULL,
  `idFormaBrazo` int(11) NOT NULL,
  PRIMARY KEY (`idBrazo`),
  KEY `fk_brazo_formabrazo` (`idFormaBrazo`),
  CONSTRAINT `fk_brazo_formabrazo` FOREIGN KEY (`idFormaBrazo`) REFERENCES `FormaBrazo` (`idFormaBrazo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Ojos`
CREATE TABLE `Ojos` (
  `idOjos` int(11) NOT NULL AUTO_INCREMENT,
  `idPestanias` int(11) NOT NULL,
  `idCejas` int(11) NOT NULL,
  `Color` varchar(45) NOT NULL,
  `Forma` varchar(45) NOT NULL,
  `Tamanio` varchar(45) NOT NULL,
  PRIMARY KEY (`idOjos`),
  KEY `fk_ojos_pestanias` (`idPestanias`),
  KEY `fk_ojos_cejas` (`idCejas`),
  CONSTRAINT `fk_ojos_cejas` FOREIGN KEY (`idCejas`) REFERENCES `Cejas` (`idCejas`),
  CONSTRAINT `fk_ojos_pestanias` FOREIGN KEY (`idPestanias`) REFERENCES `Pestanias` (`idPestanias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Cabeza`
CREATE TABLE `Cabeza` (
  `idCabeza` int(11) NOT NULL AUTO_INCREMENT,
  `idOJos` int(11) NOT NULL,
  `idCabello` int(11) NOT NULL,
  `idBoca` int(11) NOT NULL,
  `idNariz` int(11) NOT NULL,
  `idCuernos` int(11) NOT NULL,
  `Forma` varchar(45) NOT NULL,
  PRIMARY KEY (`idCabeza`),
  KEY `fk_cabeza_ojos` (`idOJos`),
  KEY `fk_cabeza_cabello` (`idCabello`),
  KEY `fk_cabeza_boca` (`idBoca`),
  KEY `fk_cabeza_nariz` (`idNariz`),
  KEY `fk_cabeza_cuernos` (`idCuernos`),
  CONSTRAINT `fk_cabeza_boca` FOREIGN KEY (`idBoca`) REFERENCES `Boca` (`idBoca`),
  CONSTRAINT `fk_cabeza_cabello` FOREIGN KEY (`idCabello`) REFERENCES `Cabello` (`idCabello`),
  CONSTRAINT `fk_cabeza_cuernos` FOREIGN KEY (`idCuernos`) REFERENCES `Cuernos` (`idCuernos`),
  CONSTRAINT `fk_cabeza_nariz` FOREIGN KEY (`idNariz`) REFERENCES `Nariz` (`idNariz`),
  CONSTRAINT `fk_cabeza_ojos` FOREIGN KEY (`idOJos`) REFERENCES `Ojos` (`idOjos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Cuerpo`
CREATE TABLE `Cuerpo` (
  `idCuerpo` int(11) NOT NULL AUTO_INCREMENT,
  `idBrazo` int(11) NOT NULL,
  `idPierna` int(11) NOT NULL,
  `idTorso` int(11) NOT NULL,
  `idCabeza` int(11) NOT NULL,
  PRIMARY KEY (`idCuerpo`),
  KEY `fk_cuerpo_brazo` (`idBrazo`),
  KEY `fk_cuerpo_pierna` (`idPierna`),
  KEY `fk_cuerpo_torso` (`idTorso`),
  KEY `fk_cuerpo_cabeza` (`idCabeza`),
  CONSTRAINT `fk_cuerpo_brazo` FOREIGN KEY (`idBrazo`) REFERENCES `Brazo` (`idBrazo`),
  CONSTRAINT `fk_cuerpo_cabeza` FOREIGN KEY (`idCabeza`) REFERENCES `Cabeza` (`idCabeza`),
  CONSTRAINT `fk_cuerpo_pierna` FOREIGN KEY (`idPierna`) REFERENCES `Pierna` (`idPierna`),
  CONSTRAINT `fk_cuerpo_torso` FOREIGN KEY (`idTorso`) REFERENCES `Torso` (`idTorso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para `Personaje`
CREATE TABLE `Personaje` (
  `idPersonaje` int(11) NOT NULL AUTO_INCREMENT,
  `altura` int(11) DEFAULT NULL,
  `musculatura` int(11) DEFAULT NULL,
  `idCuerpo` int(11) NOT NULL,
  PRIMARY KEY (`idPersonaje`),
  KEY `fk_personaje_cuerpo` (`idCuerpo`),
  CONSTRAINT `fk_personaje_cuerpo` FOREIGN KEY (`idCuerpo`) REFERENCES `Cuerpo` (`idCuerpo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
