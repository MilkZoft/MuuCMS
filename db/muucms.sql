-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 30-08-2018 a las 02:54:02
-- Versión del servidor: 5.7.19
-- Versión de PHP: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `muucms`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blog`
--

CREATE TABLE `blog` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(250) NOT NULL,
  `slug` varchar(250) NOT NULL,
  `category` varchar(150) NOT NULL DEFAULT '',
  `categorySlug` varchar(150) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `codes` text NOT NULL,
  `author` varchar(50) NOT NULL,
  `day` varchar(2) NOT NULL,
  `month` varchar(2) NOT NULL,
  `year` varchar(4) NOT NULL,
  `language` varchar(20) NOT NULL DEFAULT 'es',
  `activeComments` tinyint(1) NOT NULL DEFAULT '1',
  `state` varchar(15) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `blog` (`id`, `title`, `slug`, `category`, `categorySlug`, `content`, `codes`, `author`, `day`, `month`, `year`, `language`, `activeComments`, `state`) VALUES
(1, 'Welcome to MuuCMS', 'welcome-to-muucms', 'blog', '', '<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://localhost:3000/media/Codejobs-mVcQF.png\" alt=\"Codejobs-mVcQF.png\" width=\"603\" height=\"339\" /></p>\r\n<p>Hello, his is your first post...</p>', '', 'admin', '04', '09', '2018', 'en', 1, 'Active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) UNSIGNED NOT NULL,
  `category` varchar(150) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `state` varchar(15) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(11) UNSIGNED NOT NULL,
  `comment` text NOT NULL,
  `language` varchar(2) NOT NULL,
  `date` datetime NOT NULL,
  `type` varchar(20) NOT NULL,
  `state` varchar(25) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuration`
--

CREATE TABLE `configuration` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `theme` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `application` varchar(50) NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en',
  `languages` varchar(255) NOT NULL,
  `comments` tinyint(1) NOT NULL DEFAULT '1',
  `state` varchar(25) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `configuration`
--

INSERT INTO `configuration` (`id`, `title`, `theme`, `email`, `application`, `language`, `languages`, `comments`, `state`) VALUES
(1, 'Codejobs', 'Codejobs', 'carlos@milkzoft.com', 'blog', 'en', 'en, es', 1, 'Active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact`
--

CREATE TABLE `contact` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(60) NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `state` varchar(15) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `content`
--

CREATE TABLE `content` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` text NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en',
  `state` varchar(25) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `content`
--

INSERT INTO `content` (`id`, `name`, `value`, `language`, `state`) VALUES
(1, 'Site.language', 'en', 'en', 'Active'),
(2, 'Site.title', 'MakingDevelopers', 'en', 'Active'),
(3, 'Site.meta.abstract', 'Learn to code', 'en', 'Active'),
(4, 'Site.meta.description', 'Learn to code', 'en', 'Active'),
(5, 'Site.meta.keywords', 'HTML5, JavaScript, Node.js', 'en', 'Active'),
(6, 'Site.language', 'es', 'es', 'Active'),
(7, 'Site.title', 'MakingDevelopers', 'es', 'Active'),
(8, 'Site.meta.abstract', 'Aprende a programar', 'es', 'Active'),
(9, 'Site.meta.description', 'Aprende a programar', 'es', 'Active'),
(10, 'Site.meta.keywords', 'HTML5, JavaScript, Node.js', 'es', 'Active'),
(11, 'Dashboard.forms.fields.activeComments', 'Active Comments?', 'en', 'Active'),
(12, 'Dashboard.forms.fields.author', 'Author', 'en', 'Active'),
(13, 'Dashboard.forms.fields.codes', 'Codes', 'en', 'Active'),
(14, 'Dashboard.forms.fields.content', 'Content', 'en', 'Active'),
(15, 'Dashboard.forms.fields.excerpt', 'Excerpt', 'en', 'Active'),
(16, 'Dashboard.forms.fields.language', 'Language', 'en', 'Active'),
(17, 'Dashboard.forms.fields.save', 'Save', 'en', 'Active'),
(18, 'Dashboard.forms.fields.selects.decision', '1:Yes|0:No', 'en', 'Active'),
(19, 'Dashboard.forms.fields.selects.languages', 'en:English|es:Spanish', 'en', 'Active'),
(20, 'Dashboard.forms.fields.selects.state', 'Active:Active|Inactive:Inactive', 'en', 'Active'),
(21, 'Dashboard.forms.fields.slug', 'Friendly URL', 'en', 'Active'),
(22, 'Dashboard.forms.fields.state', 'State', 'en', 'Active'),
(23, 'Dashboard.forms.fields.tags', 'Tags', 'en', 'Active'),
(24, 'Dashboard.forms.fields.title', 'Title', 'en', 'Active'),
(25, 'Dashboard.modules.dashboard.name', 'Dashboard', 'en', 'Active'),
(26, 'Dashboard.modules.blog.name', 'Blog', 'en', 'Active'),
(27, 'Dashboard.modules.blog.action', 'Add new post', 'en', 'Active'),
(28, 'Dashboard.modules.config.name', 'Configuration', 'en', 'Active'),
(29, 'Dashboard.modules.feedback.name', 'Feedback', 'en', 'Active'),
(30, 'Dashboard.modules.users.name', 'Users', 'en', 'Active'),
(31, 'Dashboard.modules.logout.name', 'Logout', 'en', 'Active'),
(32, 'Users.register.success', 'Your account have been created correctly, enjoy our site!', 'en', 'Active'),
(33, 'Users.register.fail', 'There was a problem trying to create your account, please try again.', 'en', 'Active'),
(34, 'Db.errors.exists:username', 'The username already exists', 'en', 'Active'),
(35, 'Db.errors.exists:email', 'The email is already registered', 'en', 'Active'),
(36, 'Db.errors.exists:social:networkId', 'This social user already exists', 'en', 'Active'),
(37, 'Db.errors.invalid:email', 'Invalid Email', 'en', 'Active'),
(38, 'Db.errors.invalid:number:subscribed', 'Subscribed should be 1 or 0', 'en', 'Active'),
(39, 'Db.errors.undefined:avatar', 'Avatar is undefined', 'en', 'Active'),
(40, 'Db.errors.undefined:networkId', 'NetworkId is undefined', 'en', 'Active'),
(41, 'Db.errors.undefined:username', 'Username is undefined', 'en', 'Active'),
(42, 'Db.success.inserted:website:username', 'User created successfuly', 'en', 'Active'),
(43, 'Db.success.inserted:social:username', 'Social User created successfuly', 'en', 'Active'),
(44, 'Dashboard.forms.fields.activeComments', '¿Activar Comentarios?', 'es', 'Active'),
(45, 'Dashboard.forms.fields.author', 'Autor', 'es', 'Active'),
(46, 'Dashboard.forms.fields.codes', 'Códigos', 'es', 'Active'),
(47, 'Dashboard.forms.fields.content', 'Contenido', 'es', 'Active'),
(48, 'Dashboard.forms.fields.excerpt', 'Extracto', 'es', 'Active'),
(49, 'Dashboard.forms.fields.language', 'Idioma', 'es', 'Active'),
(50, 'Dashboard.forms.fields.save', 'Guardar', 'es', 'Active'),
(51, 'Dashboard.forms.fields.selects.decision', '1:Si|0:No', 'es', 'Active'),
(52, 'Dashboard.forms.fields.selects.languages', 'es:Español|en:Inglés', 'es', 'Active'),
(53, 'Dashboard.forms.fields.selects.state', 'Active:Activo|Inactive:Inactivo', 'es', 'Active'),
(54, 'Dashboard.forms.fields.slug', 'URL Amigable', 'es', 'Active'),
(55, 'Dashboard.forms.fields.state', 'Estado', 'es', 'Active'),
(56, 'Dashboard.forms.fields.tags', 'Etiquetas', 'es', 'Active'),
(57, 'Dashboard.forms.fields.title', 'Título', 'es', 'Active'),
(58, 'Dashboard.modules.blog.action', 'Agregar nueva publicación', 'es', 'Active'),
(59, 'Dashboard.modules.blog.name', 'Blog', 'es', 'Active'),
(60, 'Dashboard.modules.config.name', 'Configuración', 'es', 'Active'),
(61, 'Dashboard.modules.dashboard.name', 'Dashboard', 'es', 'Active'),
(62, 'Dashboard.modules.feedback.name', 'Contacto', 'es', 'Active'),
(63, 'Dashboard.modules.logout.name', 'Desconectar', 'es', 'Active'),
(64, 'Dashboard.modules.users.name', 'Usuarios', 'es', 'Active'),
(65, 'Db.errors.exists:email', 'El correo electrónico ya está registrado', 'es', 'Active'),
(66, 'Db.errors.exists:social:networkId', 'Este usuario social ya existe', 'es', 'Active'),
(67, 'Db.errors.exists:username', 'El usuario ya existe', 'es', 'Active'),
(68, 'Db.errors.invalid:email', 'Email Inválido', 'es', 'Active'),
(69, 'Db.errors.invalid:number:subscribed', 'El campo Subscribed debe ser 1 o 0', 'es', 'Active'),
(70, 'Db.errors.undefined:avatar', 'El avatar no esta definido', 'es', 'Active'),
(71, 'Db.errors.undefined:networkId', 'El NetworkId no está definido', 'es', 'Active'),
(72, 'Db.errors.undefined:username', 'El Usuario no está definido', 'es', 'Active'),
(73, 'Db.success.inserted:social:username', 'Usuario social creado exitosamente', 'es', 'Active'),
(74, 'Db.success.inserted:website:username', 'Usuario creado exitosamente', 'es', 'Active'),
(75, 'Users.register.fail', 'Hubo un error al intentar crear tu cuenta, por favor intenta más tarde.', 'es', 'Active'),
(76, 'Users.register.success', '¡Tu cuenta ha sido creada exitosamente, disfruta nuestro sitio!', 'es', 'Active'),
(77, 'Dashboard.modules.blog.messages.add.success', 'The post was created correctly', 'en', 'Active'),
(78, 'Dashboard.modules.blog.messages.add.fail', 'There was a problem trying to create the post', 'en', 'Active'),
(79, 'Dashboard.modules.blog.messages.add.success', 'La publicación fue creada exitosamente', 'es', 'Active'),
(80, 'Dashboard.modules.blog.messages.add.fail', 'Hubo un problema al intentar crear la publicación', 'es', 'Active'),
(81, 'Dashboard.modules.blog.messages.add.exists', 'The post already exists', 'en', 'Active'),
(82, 'Dashboard.modules.blog.messages.add.exists', 'La publicación ya existe', 'es', 'Active'),
(83, 'Users.email.label', 'Email', 'en', 'Active'),
(84, 'Users.email.label', 'Correo electrónico', 'es', 'Active'),
(85, 'Users.subscribe', 'Subscribe', 'en', 'Active'),
(86, 'Users.subscribe', 'Suscribirme', 'es', 'Active'),
(87, 'Users.register.label', 'Register', 'en', 'Active'),
(88, 'Users.register.label', 'Registrar', 'es', 'Active'),
(89, 'Users.email.placeholder', 'email@example.com', 'en', 'Active'),
(90, 'Users.email.placeholder', 'email@dominio.com', 'es', 'Active'),
(91, 'Users.hello', 'Hello', 'en', 'Active'),
(92, 'Users.hello', 'Hola', 'es', 'Active'),
(93, 'Site.errors.error404', 'Error 404: Página no encontrada', 'es', 'Active'),
(94, 'Site.errors.error404', 'Error 404: Page Not Found', 'en', 'Active'),
(95, 'Dashboard.forms.fields.error.title', 'You need to write a title', 'en', 'Active'),
(96, 'Dashboard.forms.fields.error.title', 'Necesitas escribir un título', 'es', 'Active'),
(97, 'Dashboard.forms.fields.error.slug', 'The friendly url is missing', 'en', 'Active'),
(98, 'Dashboard.forms.fields.error.slug', 'La URL amigable es obligatoria', 'es', 'Active'),
(99, 'Dashboard.forms.fields.error.excerpt', 'The excerpt is missing', 'en', 'Active'),
(100, 'Dashboard.forms.fields.error.excerpt', 'El abstracto es obligatorio', 'es', 'Active'),
(101, 'Dashboard.forms.fields.error.content', 'Write some content', 'en', 'Active'),
(102, 'Dashboard.forms.fields.error.content', 'Escribe algún contenido', 'es', 'Active'),
(103, 'Dashboard.forms.fields.error.author', 'Who is writing this post?', 'en', 'Active'),
(104, 'Dashboard.forms.fields.error.author', '¿Quién está escribiendo esta publicación?', 'es', 'Active'),
(105, 'Dashboard.table.action', 'Action', 'en', 'Active'),
(106, 'Dashboard.table.action', 'Acción', 'es', 'Active'),
(107, 'Dashboard.table.title', 'Title', 'en', 'Active'),
(108, 'Dashboard.table.title', 'Título', 'es', 'Active'),
(109, 'Dashboard.table.author', 'Author', 'en', 'Active'),
(110, 'Dashboard.table.author', 'Autor', 'es', 'Active'),
(111, 'Dashboard.table.state', 'State', 'en', 'Active'),
(112, 'Dashboard.table.state', 'Estado', 'es', 'Active'),
(113, 'Dashboard.table.id', 'ID', 'en', 'Active'),
(114, 'Dashboard.table.id', 'ID', 'es', 'Active'),
(115, 'Dashboard.table.pending', 'Pending', 'en', 'Active'),
(116, 'Dashboard.table.pending', 'Pendiente', 'es', 'Active'),
(117, 'Dashboard.table.deleted', 'Deleted', 'en', 'Active'),
(118, 'Dashboard.table.deleted', 'Eliminado', 'es', 'Active'),
(119, 'Dashboard.table.inactive', 'Inactive', 'en', 'Active'),
(120, 'Dashboard.table.inactive', 'Borrador', 'es', 'Active'),
(121, 'Dashboard.table.active', 'Active', 'en', 'Active'),
(122, 'Dashboard.table.active', 'Publicado', 'es', 'Active'),
(123, 'Dashboard.modules.blog.list', 'List of Posts', 'en', 'Active'),
(124, 'Dashboard.modules.blog.list', 'Lista de Publicaciones', 'es', 'Active'),
(125, 'Dashboard.modules.blog.create', 'Create New Post', 'en', 'Active'),
(126, 'Dashboard.modules.blog.create', 'Nueva Publicación', 'es', 'Active'),
(127, 'Dashboard.table.edit', 'Edit', 'en', 'Active'),
(128, 'Dashboard.table.edit', 'Editar', 'es', 'Active'),
(129, 'Dashboard.table.delete', 'Delete', 'en', 'Active'),
(130, 'Dashboard.table.delete', 'Eliminar', 'es', 'Active'),
(131, 'Dashboard.table.restore', 'Restore', 'en', 'Active'),
(132, 'Dashboard.table.restore', 'Restaurar', 'es', 'Active'),
(133, 'Dashboard.modules.blog.messages.update.fail', 'There was a problem trying to update the post', 'en', 'Active'),
(134, 'Dashboard.modules.blog.messages.update.fail', 'Hubo un problema al intentar actualizar la publicación', 'es', 'Active'),
(135, 'Dashboard.modules.blog.messages.update.success', 'The post was updated correctly', 'en', 'Active'),
(136, 'Dashboard.modules.blog.messages.update.success', 'La publicación fue actualizada correctamente', 'es', 'Active'),
(137, 'Dashboard.forms.fields.edit', 'Edit', 'en', 'Active'),
(138, 'Dashboard.forms.fields.edit', 'Editar', 'es', 'Active'),
(139, 'Dashboard.table.noData', 'No Data Found', 'en', 'Active'),
(140, 'Dashboard.table.noData', 'No hay elementos para mostrar', 'es', 'Active'),
(141, 'Dashboard.search.searching', 'Searching', 'en', 'Active'),
(142, 'Dashboard.search.searching', 'Buscando', 'es', 'Active'),
(143, 'Dashboard.search.label', 'Search', 'en', 'Active'),
(144, 'Dashboard.search.label', 'Buscar', 'es', 'Active'),
(145, 'Dashboard.search.placeholder', 'Type your search...', 'en', 'Active'),
(146, 'Dashboard.search.placeholder', 'Escribe tu búsqueda...', 'es', 'Active'),
(147, 'Dashboard.table.remove', 'Remove', 'en', 'Active'),
(148, 'Dashboard.table.remove', 'Remover', 'es', 'Active'),
(149, 'Dashboard.table.actions.delete.question', 'Do you want to send these records to the trash?', 'en', 'Active'),
(150, 'Dashboard.table.actions.delete.question', '¿Deseas enviar estos registros a la papelera?', 'es', 'Active'),
(151, 'Dashboard.table.actions.remove.question', 'Do you want to remove permanently these records?', 'en', 'Active'),
(152, 'Dashboard.table.actions.remove.question', '¿Deseas eliminar permanentemente estos registros?', 'es', 'Active'),
(153, 'Dashboard.table.actions.restore.question', 'Do you want to restore these records?', 'en', 'Active'),
(154, 'Dashboard.table.actions.restore.question', '¿Deseas recuperar estos registros?', 'es', 'Active'),
(155, 'Api.errors.noData', 'No data found', 'en', 'Active'),
(156, 'Api.errors.noData', 'No hay información para mostrar', 'es', 'Active'),
(157, 'Api.errors.invalidMethod', 'Invalid Method', 'en', 'Active'),
(158, 'Api.errors.invalidMethod', 'Método Inválido', 'es', 'Active'),
(159, 'Dashboard.media.upload.submit', 'Upload', 'en', 'Active'),
(160, 'Dashboard.media.upload.submit', 'Subir', 'es', 'Active'),
(161, 'Dashboard.media.upload.search.placeholder', 'Search files...', 'en', 'Active'),
(162, 'Dashboard.media.upload.search.placeholder', 'Buscar archivos...', 'es', 'Active'),
(163, 'Dashboard.media.insert', 'Insert', 'en', 'Active'),
(164, 'Dashboard.media.insert', 'Insertar', 'es', 'Active'),
(165, 'Dashboard.media.download', 'Download', 'en', 'Active'),
(166, 'Dashboard.media.download', 'Descargar', 'es', 'Active'),
(167, 'Dashboard.media.close', 'Close Media', 'en', 'Active'),
(168, 'Dashboard.media.close', 'Cerrar Media', 'es', 'Active'),
(169, 'Dashboard.media.title', 'Media', 'en', 'Active'),
(170, 'Dashboard.media.title', 'Media', 'es', 'Active'),
(171, 'Dashboard.modules.content.name', 'Content', 'en', 'Active'),
(172, 'Dashboard.modules.content.name', 'Contenido', 'es', 'Active'),
(173, 'Dashboard.modules.content.create', 'Add Content', 'en', 'Active'),
(174, 'Dashboard.modules.content.create', 'Nuevo Contenido', 'es', 'Active'),
(175, 'Dashboard.table.name', 'Name', 'en', 'Active'),
(176, 'Dashboard.table.name', 'Nombre', 'es', 'Active'),
(177, 'Dashboard.table.value', 'Value', 'en', 'Active'),
(178, 'Dashboard.table.value', 'Valor', 'es', 'Active'),
(179, 'Dashboard.forms.fields.name', 'Name', 'en', 'Active'),
(180, 'Dashboard.forms.fields.name', 'Nombre', 'es', 'Active'),
(181, 'Dashboard.forms.fields.value', 'Value', 'en', 'Active'),
(182, 'Dashboard.forms.fields.value', 'Valor', 'es', 'Active'),
(183, 'Dashboard.modules.content.list', 'List of Content', 'en', 'Active'),
(184, 'Dashboard.modules.content.list', 'Lista de Contenidos', 'es', 'Active'),
(185, 'Dashboard.modules.pages.name', 'Pages', 'en', 'Active'),
(186, 'Dashboard.modules.content.messages.add.success', 'The content was added correctly', 'en', 'Active'),
(187, 'Dashboard.modules.pages.name', 'Páginas', 'es', 'Active'),
(188, 'Dashboard.modules.content.messages.add.success', 'El contenido fue agregado correctamente', 'es', 'Active'),
(189, 'Dashboard.modules.content.messages.update.success', 'The content was updated correctly', 'en', 'Active'),
(190, 'Dashboard.modules.content.messages.update.success', 'El contenido fue actualizado correctamente', 'es', 'Active'),
(191, 'Dashboard.modules.content.backup', 'Backup', 'en', 'Active'),
(192, 'Dashboard.modules.content.backup', 'Respaldar Contenido', 'es', 'Active'),
(193, 'Dashboard.modules.content.messages.add.fail', 'There was a problem trying to add the content', 'en', 'Active'),
(194, 'Dashboard.modules.content.messages.add.exists', 'This content already exists (try to change the language)', 'en', 'Active'),
(195, 'Dashboard.modules.content.messages.add.exists', 'Este contenido ya existe (intenta cambiar el idioma)', 'es', 'Active'),
(196, 'Dashboard.forms.fields.error.name', 'The key name is required', 'en', 'Active'),
(197, 'Dashboard.forms.fields.error.name', 'El nombre del contenido es requerido', 'es', 'Active'),
(198, 'Dashboard.forms.fields.error.value', 'The content value is required', 'en', 'Active'),
(199, 'Dashboard.forms.fields.error.value', 'El valor del contenido es requerido', 'es', 'Active'),
(200, 'Dashboard.modules.content.messages.add.fail', 'Hubo un problema al intentar agregar el contenido', 'es', 'Active'),
(201, 'Dashboard.modules.pages.list', 'List of Pages', 'en', 'Active'),
(202, 'Dashboard.modules.pages.list', 'Lista de Páginas', 'es', 'Active'),
(203, 'Dashboard.modules.pages.create', 'Create New Page', 'en', 'Active'),
(204, 'Dashboard.modules.pages.create', 'Crear Nueva Página', 'es', 'Active'),
(205, 'Dashboard.modules.pages.messages.add.fail', 'There was a problem trying to create the page', 'en', 'Active'),
(206, 'Dashboard.modules.pages.messages.add.fail', 'Hubo un problema al intentar crear la página', 'es', 'Active'),
(207, 'Dashboard.modules.pages.messages.add.exists', 'This page already exists (try to change the language)', 'en', 'Active'),
(208, 'Dashboard.modules.pages.messages.add.exists', 'Esta página ya existe (intenta cambiar el idioma)', 'es', 'Active'),
(209, 'Dashboard.modules.pages.messages.update.success', 'The page was updated correctly', 'en', 'Active'),
(210, 'Dashboard.modules.pages.messages.update.success', 'La página fue actualizada correctamente', 'es', 'Active'),
(211, 'Header.signIn.label', 'Sign In', 'en', 'Active'),
(212, 'Header.signIn.label', 'Registro', 'es', 'Active'),
(213, 'Dashboard.modules.configuration.list', 'Configuration', 'en', 'Active'),
(214, 'Dashboard.modules.configuration.list', 'Configuración', 'es', 'Active'),
(215, 'Dashboard.table.theme', 'Theme', 'en', 'Active'),
(216, 'Dashboard.table.theme', 'Diseño', 'es', 'Active'),
(217, 'Dashboard.table.application', 'Main Application', 'en', 'Active'),
(218, 'Dashboard.table.application', 'Aplicación Principal', 'es', 'Active'),
(219, 'Dashboard.forms.fields.theme', 'Theme', 'en', 'Active'),
(220, 'Dashboard.forms.fields.theme', 'Diseño', 'es', 'Active'),
(221, 'Dashboard.forms.fields.email', 'Email', 'en', 'Active'),
(222, 'Dashboard.forms.fields.email', 'Correo Electrónico', 'es', 'Active'),
(223, 'Dashboard.forms.fields.application', 'Main Application', 'en', 'Active'),
(224, 'Dashboard.forms.fields.application', 'Aplicación Principal', 'es', 'Active'),
(225, 'Dashboard.forms.fields.languages', 'Available Languages', 'en', 'Active'),
(226, 'Dashboard.forms.fields.languages', 'Idiomas Disponibles', 'es', 'Active'),
(227, 'Dashboard.forms.fields.comments', 'Comments Validation', 'en', 'Active'),
(228, 'Dashboard.forms.fields.comments', 'Validación de Comentarios', 'es', 'Active'),
(229, 'Dashboard.modules.configuration.name', 'Configuración', 'es', 'Active'),
(230, 'Dashboard.modules.configuration.messages.update.success', 'The configuration was updated correctly', 'en', 'Active'),
(231, 'Dashboard.modules.configuration.messages.update.success', 'La configuración fue actualizada correctamente', 'es', 'Active'),
(232, 'Dashboard.modules.configuration.name', 'Configuration', 'en', 'Active'),
(233, 'Dashboard.modules.ads.name', 'Anuncios', 'es', 'Active'),
(234, 'Dashboard.modules.ads.name', 'Ads', 'en', 'Active'),
(235, 'Dashboard.modules.polls.name', 'Encuestas', 'es', 'Active'),
(236, 'Dashboard.modules.polls.name', 'Polls', 'en', 'Active'),
(237, 'Frontend.Global.Header.MainNav.topics', 'Temas', 'es', 'Active'),
(238, 'Frontend.Global.Header.MainNav.topics', 'Topics', 'en', 'Active'),
(239, 'Frontend.Global.Header.MainNav.advertising', 'Publicidad', 'es', 'Active'),
(240, 'Frontend.Global.Header.MainNav.advertising', 'Advertising', 'en', 'Active'),
(241, 'Frontend.Global.Header.MainNav.logout', 'Desconectar', 'es', 'Active'),
(242, 'Frontend.Global.Header.MainNav.logout', 'Logout', 'en', 'Active'),
(243, 'Frontend.Global.Header.MainNav.login', 'Conectar', 'es', 'Active'),
(244, 'Frontend.Global.Header.MainNav.login', 'Login', 'en', 'Active'),
(245, 'Frontend.Global.Header.MainNav.register', 'Registro', 'es', 'Active'),
(246, 'Frontend.Global.Header.MainNav.register', 'Register', 'en', 'Active'),
(247, 'Frontend.Global.Footer.copyRight', 'All rights reserved', 'en', 'Active'),
(248, 'Frontend.Global.Footer.copyRight', 'Todos los derechos reservados', 'es', 'Active'),
(249, 'Frontend.Page404.h1', '404 Page Not Found', 'en', 'Active'),
(250, 'Frontend.Page404.h1', '404 - Página no encontrada', 'es', 'Active'),
(251, 'Frontend.Page404.back', 'Go back', 'en', 'Active'),
(252, 'Frontend.Page404.back', 'Regresar', 'es', 'Active'),
(253, 'Frontend.Users.Email.placeholder', 'Email', 'en', 'Active'),
(254, 'Frontend.Users.Email.placeholder', 'Correo Electrónico', 'es', 'Active'),
(255, 'Frontend.Users.Buttons.completeRegister', 'Completar Registro', 'es', 'Active'),
(256, 'Frontend.Users.Buttons.completeRegister', 'Complete Registration', 'en', 'Active'),
(257, 'Frontend.Users.Social.registerWith', 'Regístrate con', 'es', 'Active'),
(258, 'Frontend.Users.Social.registerWith', 'Sign up with', 'en', 'Active'),
(259, 'Frontend.Users.Username.placeholder', 'Username', 'en', 'Active'),
(260, 'Frontend.Users.Username.placeholder', 'Usuario', 'es', 'Active'),
(261, 'Frontend.Users.Password.placeholder', 'Password (at least 8 characters)', 'en', 'Active'),
(262, 'Frontend.Users.Password.placeholder', 'Contraseña (minímo 8 caracteres)', 'es', 'Active'),
(263, 'Frontend.Users.Password.forgotPassword', 'Forgot Password?', 'en', 'Active'),
(264, 'Frontend.Users.Password.forgotPassword', 'Recuperar Contraseña', 'es', 'Active'),
(265, 'Frontend.Users.Buttons.login', 'Login', 'en', 'Active'),
(266, 'Frontend.Users.Buttons.login', 'Conectar', 'es', 'Active'),
(267, 'Frontend.Users.Buttons.register', 'Register', 'en', 'Active'),
(268, 'Frontend.Users.Buttons.register', 'Registro', 'es', 'Active'),
(269, 'Frontend.Users.Social.loginWith', 'Or login with', 'en', 'Active'),
(270, 'Frontend.Users.Social.loginWith', 'Conéctate con', 'es', 'Active'),
(271, 'Frontend.Blog.Post.publishedBy', 'Publicado por', 'es', 'Active'),
(272, 'Frontend.Blog.Post.publishedBy', 'Published by', 'en', 'Active'),
(273, 'Frontend.Blog.Post.readMore', 'Leer más', 'es', 'Active'),
(274, 'Frontend.Blog.Post.readMore', 'Read more', 'en', 'Active'),
(275, 'Lib.Utils.Date.Months.jan', 'Enero', 'es', 'Active'),
(276, 'Lib.Utils.Date.Months.jan', 'January', 'en', 'Active'),
(277, 'Lib.Utils.Date.Months.feb', 'Febrero', 'es', 'Active'),
(278, 'Lib.Utils.Date.Months.feb', 'February', 'en', 'Active'),
(279, 'Lib.Utils.Date.Months.mar', 'Marzo', 'es', 'Active'),
(280, 'Lib.Utils.Date.Months.mar', 'March', 'en', 'Active'),
(281, 'Lib.Utils.Date.Months.apr', 'Abril', 'es', 'Active'),
(282, 'Lib.Utils.Date.Months.apr', 'April', 'en', 'Active'),
(283, 'Lib.Utils.Date.Months.may', 'Mayo', 'es', 'Active'),
(284, 'Lib.Utils.Date.Months.may', 'May', 'en', 'Active'),
(285, 'Lib.Utils.Date.Months.jun', 'Junio', 'es', 'Active'),
(286, 'Lib.Utils.Date.Months.jun', 'June', 'en', 'Active'),
(287, 'Lib.Utils.Date.Months.jul', 'Julio', 'es', 'Active'),
(288, 'Lib.Utils.Date.Months.jul', 'July', 'en', 'Active'),
(289, 'Lib.Utils.Date.Months.aug', 'Agosto', 'es', 'Active'),
(290, 'Lib.Utils.Date.Months.aug', 'August', 'en', 'Active'),
(291, 'Lib.Utils.Date.Months.sep', 'Septiembre', 'es', 'Active'),
(292, 'Lib.Utils.Date.Months.sep', 'September', 'en', 'Active'),
(293, 'Lib.Utils.Date.Months.oct', 'Octubre', 'es', 'Active'),
(294, 'Lib.Utils.Date.Months.oct', 'October', 'en', 'Active'),
(295, 'Lib.Utils.Date.Months.nov', 'Noviembre', 'es', 'Active'),
(296, 'Lib.Utils.Date.Months.nov', 'November', 'en', 'Active'),
(297, 'Lib.Utils.Date.Months.dec', 'Diciembre', 'es', 'Active'),
(298, 'Lib.Utils.Date.Months.dec', 'December', 'en', 'Active'),
(299, 'Dashboard.forms.fields.error.exists', 'The username or email already exists', 'en', 'Active'),
(300, 'Dashboard.forms.fields.error.exists', 'El nombre de usuario ó correo electrónico ya existe', 'es', 'Active'),
(301, 'Frontend.Users.Login.error', 'La contraseña que ingresaste es incorrecta.', 'es', 'Active'),
(302, 'Frontend.Users.Login.error', 'The password you entered is incorrect.', 'en', 'Active'),
(303, 'Frontend.Layout.Header.search', 'Busca cualquier tema aquí...', 'es', 'Active'),
(304, 'Frontend.Layout.Header.search', 'Search any term here...', 'en', 'Active'),
(305, 'Dashboard.forms.fields.category', 'Categoría', 'es', 'Active'),
(306, 'Dashboard.forms.fields.category', 'Category', 'en', 'Active'),
(307, 'Dashboard.forms.fields.categorySlug', 'Categoría Amigable', 'es', 'Active'),
(308, 'Dashboard.forms.fields.categorySlug', 'Friendly Category', 'en', 'Active'),
(309, 'Dashboard.modules.categories.name', 'Categorías', 'es', 'Active'),
(310, 'Dashboard.modules.categories.name', 'Categories', 'en', 'Active'),
(311, 'Dashboard.modules.categories.messages.add.success', 'Categoría agregada satisfactoriamente', 'es', 'Active'),
(312, 'Dashboard.modules.categories.messages.add.success', 'The category was added correctly', 'en', 'Active'),
(313, 'Dashboard.modules.categories.create', 'Nueva Categoría', 'es', 'Active'),
(314, 'Dashboard.modules.categories.create', 'New Category', 'en', 'Active'),
(315, 'Dashboard.table.category', 'Categoría', 'es', 'Active'),
(316, 'Dashboard.table.category', 'Category', 'en', 'Active'),
(317, 'Dashboard.table.slug', 'Categoría Amigable', 'es', 'Active'),
(318, 'Dashboard.table.slug', 'Friendly Category', 'en', 'Active'),
(319, 'Dashboard.modules.categories.messages.update.success', 'La categoría fue actualizada correctamente', 'es', 'Active'),
(320, 'Dashboard.modules.categories.messages.update.success', 'The category was updated correctly', 'en', 'Active'),
(321, 'Dashboard.modules.pages.messages.add.success', 'La página fue creada correctamente', 'es', 'Active'),
(322, 'Dashboard.modules.pages.messages.add.success', 'The page was created correctly', 'en', 'Active'),
(323, 'Dashboard.modules.courses.create', 'Nuevo Curso', 'es', 'Active'),
(324, 'Dashboard.modules.courses.create', 'New Course', 'en', 'Active'),
(325, 'Dashboard.modules.courses.name', 'Cursos', 'es', 'Active'),
(326, 'Dashboard.modules.courses.name', 'Courses', 'en', 'Active'),
(327, 'Dashboard.forms.fields.temary', 'Temario', 'es', 'Active'),
(328, 'Dashboard.forms.fields.temary', 'Temary', 'en', 'Active'),
(329, 'Dashboard.modules.courses.messages.add.success', 'Curso agregado correctamente', 'es', 'Active'),
(330, 'Dashboard.modules.courses.messages.add.success', 'Course added correctly', 'en', 'Active'),
(331, 'Dashboard.table.excerpt', 'Extracto', 'es', 'Active'),
(332, 'Dashboard.table.temary', 'Temario', 'es', 'Active'),
(333, 'Dashboard.table.tags', 'Etiquetas', 'es', 'Active'),
(334, 'Dashboard.modules.courses.messages.update.success', 'Curso actualizado correctamente', 'es', 'Active'),
(335, 'Dashboard.modules.contact.name', 'Contacto', 'es', 'Active'),
(336, 'Dashboard.modules.contact.create', 'Nuevo Mensaje', 'es', 'Active'),
(337, 'Dashboard.forms.fields.message', 'Mensaje', 'es', 'Active'),
(338, 'Dashboard.modules.users.create', 'Nuevo Usuario', 'es', 'Active'),
(339, 'Dashboard.table.network', 'Red', 'es', 'Active'),
(340, 'Dashboard.table.username', 'Nombre de Usuario', 'es', 'Active'),
(341, 'Dashboard.table.email', 'Email', 'es', 'Active'),
(342, 'Dashboard.table.privilege', 'Privilegio', 'es', 'Active'),
(343, 'Dashboard.forms.fields.network', 'Red', 'es', 'Active'),
(344, 'Dashboard.forms.fields.networkId', 'Red ID', 'es', 'Active'),
(345, 'Dashboard.forms.fields.username', 'Nombre de Usuario', 'es', 'Active'),
(346, 'Dashboard.forms.fields.password', 'Contraseña', 'es', 'Active'),
(347, 'Dashboard.forms.fields.avatar', 'Avatar', 'es', 'Active'),
(348, 'Dashboard.forms.fields.subscribed', 'Suscrito', 'es', 'Active'),
(349, 'Dashboard.forms.fields.privilege', 'Privilegio', 'es', 'Active'),
(350, 'Dashboard.modules.diplomas.name', 'Diplomas', 'es', 'Active'),
(351, 'Dashboard.modules.diplomas.create', 'Nuevo Diploma', 'es', 'Active'),
(352, 'Dashboard.forms.fields.courseId', 'Curso', 'es', 'Active'),
(353, 'Dashboard.forms.fields.userId', 'Usuario', 'es', 'Active'),
(354, 'Dashboard.forms.fields.type', 'Tipo de Curso', 'es', 'Active'),
(355, 'Dashboard.modules.diplomas.messages.add.success', 'Diploma agregado correctamente', 'es', 'Active'),
(356, 'Dashboard.table.courseId', 'Curso Tomado', 'es', 'Active'),
(357, 'Dashboard.table.userId', 'Usuario', 'es', 'Active'),
(358, 'Dashboard.table.createdAt', 'Fecha de Creación', 'es', 'Active'),
(359, 'Dashboard.modules.diplomas.messages.update.success', 'Diploma actualizado correctamente', 'es', 'Active'),
(360, 'Dashboard.table.course', 'Curso', 'es', 'Active'),
(361, 'Dashboard.forms.fields.course', 'Curso', 'es', 'Active'),
(362, 'Dashboard.forms.fields.fullName', 'Nombre Completo', 'es', 'Active'),
(363, 'Dashboard.forms.fields.address', 'Dirección', 'es', 'Active'),
(364, 'Dashboard.modules.jobs.name', 'Empleos', 'es', 'Active'),
(365, 'Dashboard.modules.jobs.create', 'Nuevo Empleo', 'es', 'Active'),
(366, 'Dashboard.forms.fields.company', 'Empresa', 'es', 'Active'),
(367, 'Dashboard.forms.fields.job', 'Posición', 'es', 'Active'),
(368, 'Dashboard.forms.fields.country', 'País', 'es', 'Active'),
(369, 'Dashboard.forms.fields.city', 'Ciudad', 'es', 'Active'),
(370, 'Dashboard.forms.fields.phone', 'Teléfono', 'es', 'Active'),
(371, 'Dashboard.forms.fields.remote', '¿Es remoto?', 'es', 'Active'),
(372, 'Dashboard.forms.fields.salary', 'Salario', 'es', 'Active'),
(373, 'Dashboard.forms.fields.salaryCurrency', 'Moneda', 'es', 'Active'),
(374, 'Dashboard.forms.fields.allocationTime', 'Tiempo', 'es', 'Active'),
(375, 'Dashboard.forms.fields.description', 'Descripción', 'es', 'Active'),
(376, 'Dashboard.forms.fields.skills', 'Habilidades', 'es', 'Active'),
(377, 'Dashboard.forms.fields.allowCv', 'Permitir CV', 'es', 'Active'),
(378, 'Dashboard.forms.fields.endDate', 'Fecha de término', 'es', 'Active'),
(379, 'Dashboard.forms.fields.typeUrl', 'Tipo de URL', 'es', 'Active'),
(380, 'Dashboard.modules.ads.create', 'Nuevo Anuncio', 'es', 'Active'),
(381, 'Dashboard.forms.fields.position', 'Posición', 'es', 'Active'),
(382, 'Dashboard.forms.fields.banner', 'Banner', 'es', 'Active'),
(383, 'Dashboard.forms.fields.url', 'URL', 'es', 'Active'),
(384, 'Dashboard.forms.fields.code', 'Código', 'es', 'Active'),
(385, 'Dashboard.forms.fields.time', 'Tiempo', 'es', 'Active'),
(386, 'Dashboard.forms.fields.principal', 'Principal', 'es', 'Active'),
(387, 'Frontend.Users.Register.error', 'El usuario o email ya existe', 'es', 'Active'),
(388, 'Dashboard.modules.users.messages.update.success', 'Usuario actualizado correctamente', 'es', 'Active'),
(389, 'Dashboard.forms.fields.whatToLearn', '¿Qué voy a aprender?', 'es', 'Active'),
(390, 'Dashboard.forms.fields.schedule', 'Horario', 'es', 'Active'),
(391, 'Dashboard.forms.fields.technology', 'Tecnología', 'es', 'Active'),
(392, 'Dashboard.forms.fields.level', 'Nivel', 'es', 'Active'),
(393, 'Dashboard.forms.fields.hours', 'Horas', 'es', 'Active'),
(394, 'Dashboard.forms.fields.videos', 'Videos', 'es', 'Active'),
(395, 'Dashboard.forms.fields.mainVideo', 'Video introductorio', 'es', 'Active'),
(396, 'Dashboard.forms.fields.rating', ' Clasificación', 'es', 'Active'),
(397, 'Frontend.Contact.Buttons.send', 'Enviar mensaje', 'es', 'Active'),
(398, 'Frontend.Contact.Buttons.send', 'Send message', 'en', 'Active'),
(399, 'Frontend.Contact.forms.fields.name', 'Nombre', 'es', 'Active'),
(400, 'Frontend.Contact.forms.fields.name', 'Name', 'en', 'Active'),
(401, 'Frontend.Contact.forms.fields.email', 'Correo electrónico', 'es', 'Active'),
(402, 'Frontend.Contact.forms.fields.email', 'Email Address', 'en', 'Active'),
(403, 'Frontend.Contact.forms.fields.message', 'Message', 'en', 'Active'),
(404, 'Frontend.Contact.forms.fields.message', 'Mensaje', 'es', 'Active'),
(405, 'Frontend.Contact.Buttons.send', 'Enviar mensaje', 'es', 'Active'),
(406, 'Frontend.Contact.Buttons.send', 'Send message', 'en', 'Active'),
(407, 'Frontend.Contact.Buttons.home', 'Ir al blog', 'es', 'Active'),
(408, 'Frontend.Contact.Buttons.home', 'Go to blog', 'en', 'Active'),
(409, 'Frontend.ForgotPassword.forms.message', 'Ingrese la dirección de correo electrónico que utilizó cuando se unió y le enviaremos instrucciones para restablecer su contraseña.', 'es', 'Active'),
(410, 'Frontend.ForgotPassword.forms.message', 'Fill in the email address used in the registration and we will send you instructions to recover your password\n', 'en', 'Active'),
(411, 'Frontend.ForgotPassword.forms.fields.newPassword', 'Nueva contraseña', 'es', 'Active'),
(412, 'Frontend.ForgotPassword.forms.fields.newPassword', 'New password', 'en', 'Active'),
(413, 'Frontend.ForgotPassword.forms.fields.confirmPassword', 'Confirmar contraseña', 'es', 'Active'),
(414, 'Frontend.ForgotPassword.forms.fields.confirmPassword', 'Confirm password', 'en', 'Active'),
(415, 'Frontend.ForgotPassword.Buttons.send', 'Enviar', 'es', 'Active'),
(416, 'Frontend.ForgotPassword.Buttons.send', 'Send', 'en', 'Active'),
(417, 'Frontend.ForgotPassword.forms.message2', 'Fill in the new password', 'en', 'Active'),
(418, 'Frontend.ForgotPassword.forms.message2', 'Ingrese la nueva contraseña', 'es', 'Active'),
(419, 'Frontend.ForgotPassword.Buttons.resetPassword', 'Resetear contraseña', 'es', 'Active'),
(420, 'Frontend.ForgotPassword.Buttons.resetPassword', 'Reset password', 'en', 'Active'),
(421, 'Frontend.Global.Footer.aboutUs', 'Acerca de nosotros', 'es', 'Active'),
(422, 'Frontend.Global.Footer.aboutUs', 'About us', 'en', 'Active'),
(423, 'Frontend.Global.Footer.message', 'Codejobs es una comunidad de amantes a la tecnología que creemos que el conocimiento es la única forma de ser verdaderamente libres y autónomos.', 'es', 'Active'),
(424, 'Frontend.Global.Footer.message', 'Codejobs is a community of technology lovers who believe that knowledge is the only way to be truly free and autonomous.', 'en', 'Active'),
(425, 'Frontend.Comments.Textarea.placeholder', 'Escribe tu comentario...', 'es', 'Active'),
(426, 'Frontend.Comments.Textarea.placeholder', 'Write your comment...', 'en', 'Active'),
(427, 'Frontend.Comments.Submit.label', 'Comentar', 'es', 'Active'),
(428, 'Frontend.Comments.Submit.label', 'Comment', 'en', 'Active'),
(429, 'Frontend.Comments.Submit.noConnected', 'You need to <a href=\"/login\">login</a> or <a href=\"/register\">register</a> to comment', 'en', 'Active'),
(430, 'Frontend.Comments.Submit.noConnected', 'Necesitas <a href=\"/login\">conectarte</a> ó <a href=\"/register\">registrarte</a> para comentar', 'es', 'Active'),
(431, 'Dashboard.modules.contact.name', 'Contact', 'en', 'Active'),
(432, 'Dashboard.modules.contact.create', 'Create message', 'en', 'Active'),
(433, 'Dashboard.modules.users.create', 'Create user', 'en', 'Active'),
(434, 'Dashboard.table.network', 'Network', 'en', 'Active'),
(435, 'Dashboard.table.username', 'Username', 'en', 'Active'),
(436, 'Dashboard.table.email', 'Email', 'en', 'Active'),
(437, 'Dashboard.table.privilege', 'Privilege', 'en', 'Active'),
(438, 'Dashboard.forms.fields.network', 'Network', 'en', 'Active'),
(439, 'Dashboard.forms.fields.networkId', 'Network ID', 'en', 'Active'),
(440, 'Dashboard.forms.fields.username', 'Username', 'en', 'Active'),
(441, 'Dashboard.forms.fields.password', 'Password', 'en', 'Active'),
(442, 'Dashboard.forms.fields.avatar', 'Avatar', 'en', 'Active'),
(443, 'Dashboard.forms.fields.subscribed', 'Subscribed', 'en', 'Active'),
(444, 'Dashboard.forms.fields.privilege', 'Privilege', 'en', 'Active'),
(445, 'Dashboard.forms.fields.fullName', 'Full Name', 'en', 'Active'),
(446, 'Dashboard.forms.fields.address', 'Address', 'en', 'Active'),
(447, 'Dashboard.forms.fields.message', 'Message', 'en', 'Active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pages`
--

CREATE TABLE `pages` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(25) NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en',
  `state` varchar(25) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `polls`
--

CREATE TABLE `polls` (
  `id` int(11) UNSIGNED NOT NULL,
  `question` varchar(255) NOT NULL,
  `answers` text NOT NULL,
  `createdAt` varchar(25) NOT NULL,
  `state` varchar(15) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `re_comments_users_blog`
--

CREATE TABLE `re_comments_users_blog` (
  `userId` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `postId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `network` varchar(25) NOT NULL DEFAULT 'website',
  `networkId` varchar(25) NOT NULL DEFAULT '0',
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL DEFAULT '',
  `email` varchar(60) NOT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `subscribed` tinyint(1) NOT NULL DEFAULT '0',
  `privilege` varchar(5) NOT NULL DEFAULT 'user',
  `fullName` varchar(100) NOT NULL DEFAULT '',
  `address` text,
  `state` varchar(25) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `network`, `networkId`, `username`, `password`, `email`, `avatar`, `subscribed`, `privilege`, `fullName`, `address`, `state`) VALUES
(1, 'website', '0', 'admin', '4dd1bdce90eb812de7048db663f65493450bd111', 'admin@gmail.com', '', 0, 'god', '', NULL, 'Active');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `configuration`
--
ALTER TABLE `configuration`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `configuration`
--
ALTER TABLE `configuration`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `content`
--
ALTER TABLE `content`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=448;

--
-- AUTO_INCREMENT de la tabla `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `polls`
--
ALTER TABLE `polls`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
