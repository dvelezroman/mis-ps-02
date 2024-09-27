const { createContainer, asFunction, asValue } = require('awilix');
const db = require('../services/db');
const productosService = require('../services/productos.service');
const productosController = require('../controllers/productos.controller');
const usuariosService = require('../services/usuarios.service');
const authController = require('../controllers/auth.controller');

// Crear el contenedor
const container = createContainer();

// Registrar las dependencias correctamente
container.register({
    db: asValue(db),
    productosService: asFunction(productosService).singleton(),
    usuariosService: asFunction(usuariosService).singleton(),
    productosController: asFunction(productosController).singleton(),
    authController: asFunction(authController).singleton()
});

module.exports = container;
