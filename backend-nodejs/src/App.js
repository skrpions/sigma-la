// Importando Express
const express = require('express');
const app = express();

// Configurando Puerto
app.set('port',process.env.POST || 3002);

// Middlewares
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Start :: Importando Mis Rutas
const contactoRouters = require('./rutas/ContactoRuta');
// Route
app.use('/contacto',contactoRouters);

app.listen(app.get('port'),() => {
    console.log("starting server node.js");
})