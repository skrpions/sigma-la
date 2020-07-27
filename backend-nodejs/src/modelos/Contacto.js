//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('./Database');


var Contacto = sequelize.define('Contacts', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  state: Sequelize.STRING,
  city: Sequelize.STRING
},
{
	 timestamps: false,
});

module.exports = Contacto