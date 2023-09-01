const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-project', 'root','Nr@011297',{dialect:'mysql', host:'localhost'})

module.exports = sequelize