-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 10 nov. 2020 à 15:50
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dogmann`
--

-- --------------------------------------------------------

--
-- Structure de la table `advertisements`
--

DROP TABLE IF EXISTS `advertisements`;
CREATE TABLE IF NOT EXISTS `advertisements` (
  `IdAd` int NOT NULL AUTO_INCREMENT,
  `NameAd` varchar(50) NOT NULL,
  `CreateAd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ContentAd` varchar(20000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CompanyAd` varchar(50) NOT NULL,
  `ContratAd` varchar(50) NOT NULL,
  `WhereAd` varchar(100) NOT NULL,
  PRIMARY KEY (`IdAd`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `advertisements`
--

INSERT INTO `advertisements` (`IdAd`, `NameAd`, `ContentAd`, `CompanyAd`, `ContratAd`, `WhereAd`) VALUES
(11, 'LOREM', 'hbfivezrifbziryfbçzbrfvyzbrfvbzçrfbzr fzerfyi zef zyfgçzgf çzhe fçugezfç zeçfugezçfg çezygfçzue fçuezgfçu zerhfuç g zerçufh zhirgfçuz hdfvoyzgçfh riofiufrvbo b ipdsbcviyzgdvcyzbvioyezrfv_zrhvc uzrklvygzrià vzbiphyfv zyorfcb zrfuiozbyfizoh fvhizrfvç  zrufzhrfv oiyzrgv àzrfvziyrfbà _zrfi zhrfoiyzrgf pz bzirhfzoyrf àzfb zprihfvz_f z)ubzipryfgvàz_rfbizrhfziyorf zbziyrgf ozpf pizhbfoiyzrf rfboiyrzg fpizbhfpiy zrfozb fhkzbvfoi yzb fpzhbfiphzr gfoipzb fuzbeyizgbf_zerfb hzfbpiyzf zbfmhzbf _zf yizbefiypzerf yzrfbihzrfbouzf àizhbfhzref_à zrf hjzfihozrfà _zrefbmzrehfbpi yzrgfzpirb zrbfpizrygfàz bfhzrfipyzrgfà_ zrfobfiypgrz fà', 'Ipsum CO', 'CDI', 'Lyon'),
(12, 'LOREM', ' vihezrvo opihvzr ihuzrà fvezrhvyuàervihzr zrpivh zdvcbdzihfvbdz izdhbv zàb)z hzihb iyzf cizdcyidzb àicb zdàiycvbzdtu cbsdgjbvoqds buoqdb ojqdsbouqds cjqsbd ocubdsougcvbqdstufc qdohf quof ojhqdbf uqbfohbvfut zsdgfv ugdbcougsqdv fcqdsbuyb fohdb fodsb cufovdqdsufv dzfbpzd ifhedfb zouufb zdifbc odzfboih zb fhzebdfiy zdfhbzdf yozdihf ziygfhzidf izbfizhdb fo zb dfioydzgfoizdbf yzdfoihbzd oufzoihfbzuf oidzf zyfbzohifb zyfoihzfh yizdbfioh z fuzbfihozd fcohihzbfuy zrfoihzrf ihzbfiohzb àfb izyfb ', 'testcompany', 'CDI', 'Marseille'),
(13, 'TOURNEUR (H/F) TRADITIONNEL ET/OU C.N. H/F', 'Vous réaliserez l\'usinage de pièces de petites dimensions. \r\nVous devrez connaître les principes de programmation numérique, les techniques d\'usinage et les vitesses de coupe, les instruments de mesure et de contrôle (jauge, palmer, pied à  coulisse, colonne de mesure ...)  ainsi que la technologie des matériaux Vous devez savoir lire et interpréter un plan technique et un dossier de fabrication. \r\nPas de travail le vendredi après-midi', 'SARL FERRIERE HUBERT', 'CDI', 'Montceau-les-Mines');

-- --------------------------------------------------------

--
-- Structure de la table `application`
--

DROP TABLE IF EXISTS `application`;
CREATE TABLE IF NOT EXISTS `application` (
  `IdAp` int NOT NULL AUTO_INCREMENT,
  `MailsSentAp` varchar(50) NOT NULL,
  `PeopleAp` varchar(50) NOT NULL,
  `AdvertisementsAp` varchar(50) NOT NULL,
  PRIMARY KEY (`IdAp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `candidatures`
--

DROP TABLE IF EXISTS `candidatures`;
CREATE TABLE IF NOT EXISTS `candidatures` (
  `IdCa` int NOT NULL AUTO_INCREMENT,
  `NameCa` varchar(255) NOT NULL,
  `LastNameCa` varchar(255) NOT NULL,
  `EmailCa` varchar(255) NOT NULL,
  `PhoneCa` int NOT NULL,
  `MotivationsCa` text NOT NULL,
  `CvCa` varchar(255) NOT NULL,
  `DateCa` datetime DEFAULT CURRENT_TIMESTAMP,
  `AddId` int NOT NULL,
  PRIMARY KEY (`IdCa`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `candidatures`
--

INSERT INTO `candidatures` (`IdCa`, `NameCa`, `LastNameCa`, `EmailCa`, `PhoneCa`, `MotivationsCa`, `CvCa`, `DateCa`, `AddId`) VALUES
(1, 'HERMANN', 'KUATE', 'wkuate@yahoo.fr', 640607230, 'zaszasaz', 'T-WEB-500_Day10.pdf', '2016-10-20 00:00:00', 0),
(2, 'Agnès Manuella', 'Same', 'Manuella.ndomesame@gmail.com', 768205912, 'ospgheoufgdsjfoiubfiezgsrfejzghrfezoufeziufvieaugrfiouerfiuerlfubeurfaeourfouefhpzelnbfiuyzhbfjhezfhbvzfhsdifgifgosiyugfoizugfae', 'Flixbus.pdf', '2016-10-20 00:00:00', 0),
(7, 'dogan', 'calli', 'dogan.calli@epitech.eu', 781719249, 'lettre de motivation', 'CV', '2020-11-06 11:36:52', 0),
(16, '', '', '', 0, '', '', '2020-11-06 13:44:09', 0),
(17, '', '', '', 0, '', '', '2020-11-06 13:48:16', 0),
(18, 'doganmaster', '', '', 0, '', '', '2020-11-06 14:23:03', 0),
(19, '', '', '', 0, '', '', '2020-11-09 10:25:58', 0),
(20, 'dogan', 'calli', 'calli.dogan.71@gmail.com', 781719249, 'hello i would like to apply to this job because i\'m litteraly born for this.', '', '2020-11-09 10:26:11', 5),
(21, 'dogan', 'TEST Final', 'calli.dogan.71@gmail.com', 781719249, 'hello i would like to apply to this job because i\'m litteraly born for this.', '', '2020-11-09 13:36:51', 5),
(22, 'test', 'calli', 'calli.dogan.71@gmail.com', 781719249, 'hello i would like to apply to this job because i\'m litteraly born for this.', '', '2020-11-09 13:40:04', 5),
(23, 'testtest', 'calli', 'calli.dogan.71@gmail.com', 781719249, 'hello i would like to apply to this job because i\'m litteraly born for this.', '', '2020-11-09 13:41:32', 5),
(24, 'dogan calli', 'TEST Final', 'calli.dogan.71@gmail.com', 781719249, 'hello i would like to apply to this job because i\'m litteraly born for this.', '', '2020-11-09 13:45:35', 5),
(25, 'dogan calli', 'calli', 'calli.dogan.71@gmail.com', 781719249, 'hello i would like to apply to this job because i\'m litteraly born for this.', '', '2020-11-09 13:49:39', 5),
(26, 'dogan calli', 'TEST Final', 'calli.dogan.71@gmail.com', 781719249, 'isrhguerluighfuoghwsfughqroumgmoqsghomu', '', '2020-11-09 14:14:08', 1),
(27, 'dogan calli', 'calli', 'calli.dogan.71@gmail.com', 781719249, 'isrhguerluighfuoghwsfughqroumgmoqsghomu', '', '2020-11-09 14:14:43', 1),
(28, 'dogan calli', 'TEST Final', 'calli.dogan.71@gmail.com', 781719249, 'hello i would like to apply to this job because i\'m litteraly born for this.', '', '2020-11-09 14:15:34', 1),
(29, 'dogan calli', 'TEST Final', 'calli.dogan.71@gmail.com', 781719249, 'hello i would like to apply to this job because i\'m litteraly born for this.', '', '2020-11-09 14:17:33', 1),
(30, 'dogan calli', 'TEST Final', 'calli.dogan.71@gmail.com', 781719249, 'hello i would like to apply to this job because i\'m litteraly born for this.', '', '2020-11-09 14:17:59', 2);

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
  `IdCo` int NOT NULL AUTO_INCREMENT,
  `NameCo` varchar(40) NOT NULL,
  `sector_of_activityCo` varchar(50) NOT NULL,
  `SiretCo` int NOT NULL,
  `number_of_employeesCo` int NOT NULL,
  `Localisation` varchar(20) NOT NULL,
  PRIMARY KEY (`IdCo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `companies`
--

INSERT INTO `companies` (`IdCo`, `NameCo`, `sector_of_activityCo`, `SiretCo`, `number_of_employeesCo`, `Localisation`) VALUES
(1, '', '', 0, 0, ''),
(2, '', '', 0, 0, ''),
(3, '', '', 0, 0, '');

-- --------------------------------------------------------

--
-- Structure de la table `people`
--

DROP TABLE IF EXISTS `people`;
CREATE TABLE IF NOT EXISTS `people` (
  `IdPe` int NOT NULL AUTO_INCREMENT,
  `FirstNamePe` varchar(40) NOT NULL,
  `LastNamePe` varchar(40) NOT NULL,
  `EmailPe` varchar(40) NOT NULL,
  `PhonePe` varchar(20) NOT NULL,
  `RolePe` varchar(20) NOT NULL,
  `statut` varchar(255) NOT NULL DEFAULT '''0''',
  `CV` int NOT NULL,
  PRIMARY KEY (`IdPe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `IdUt` int NOT NULL AUTO_INCREMENT,
  `pseudoUt` varchar(100) NOT NULL,
  `EmailUt` varchar(100) NOT NULL,
  `PasswordUt` varchar(255) NOT NULL,
  `statutUt` tinyint(1) NOT NULL,
  `Date_inscription_Ut` datetime DEFAULT CURRENT_TIMESTAMP,
  `roleUt` int NOT NULL,
  PRIMARY KEY (`IdUt`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`IdUt`, `pseudoUt`, `EmailUt`, `PasswordUt`, `statutUt`, `Date_inscription_Ut`, `roleUt`) VALUES
(13, 'tony', 'tony@test.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 1, '2020-10-15 10:29:02', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
