// Importando Rutas
const express = require('express');
const router = express.Router();


const ContactoController = require('../controles/ContactoController');


// Listar todos los Contactos
router.get('/list',ContactoController.list);

// Creando un nuevo contacto
router.post('/create',ContactoController.create);

// Crear la Base de Datos
router.get('/testdata', ContactoController.testdata);


module.exports = router;