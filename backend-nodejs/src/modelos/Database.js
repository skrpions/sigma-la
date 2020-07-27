var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'admin_sigmatest', // DataBase
    'admin_sigmauser', // Usuario
    'pfaDKIJyPF', // Password
  {
    host: '178.128.146.252',
    dialect: 'mysql'
  }
);

module.exports = sequelize;
  