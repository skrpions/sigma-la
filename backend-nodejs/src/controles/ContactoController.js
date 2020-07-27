const controles = {}

// Importando los modelo necesarios y el sequelize
var sequelize = require('../modelos/Database');
var Contacto = require('../modelos/Contacto');

// sequelize.sync() para migrar las tablas si no existen
sequelize.sync()


// Start :: Funcion testdata y list
controles.testdata = async (req, res) => {
    const response = await sequelize.sync().then(function(){
        
      // create contacto
      Contacto.create({
        name: 'Nestor Martínez',
        email: 'sks@gmail.com',
        state: 'Cauca',
        city: 'Popoyán'
      });
      
      // Consulto todos los datos del contacto
        const data = Contacto.findAll();
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success:true, data:response});
}

controles.list = async ( req, res) => {

  const data = await Contacto.findAll()
  .then(function(data){
    return data;
  })
  .catch(error => {
    return error;
  })

  res.json({success:true, data:data});
}
// End :: Funcion testdata y list


// Registrar Nuevo Contacto en la Base de Datos
controles.create = async (req,res) => {
    
  // Datos: Parametros deSde POST
    const { name, email, state, city } = req.body;
    
    // Función para registrar el contacto
    const data = await Contacto.create({
      name: name,
      email: email,
      state: state,
      city: city
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      console.log(error)
      return error;
    })
    // return respuesta del Servidor
    res.status(200).json({
      success: true,
      message:"Guardado Éxitosamente",
      data: data
    });
  }
module.exports = controles;