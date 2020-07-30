// SEQUELIZE (scroll down & uncomment for mySQL db connection):

var Sequelize = require('sequelize'); // sequelize ORM

var connection = new Sequelize('chat', 'root', 'simi', {
  host: 'localhost',
  dialect: 'mysql'
});

var User = connection.define('users', {
  username: {
    type: Sequelize.STRING(20),
    primaryKey: true,
  }
}, {timestamps: false});

var Room = connection.define('rooms', {
  roomname: {
    type: Sequelize.STRING(20),
    allowNull: false,
    primaryKey: true
  }
}, {timestamps: false});

var Message = connection.define('messages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(20),
  },
  roomname: {
    type: Sequelize.STRING(20),
  },
  message: Sequelize.TEXT
}, {timestamps: false});

connection.sync();

exports.connection = connection;
exports.User = User;
exports.Room = Room;
exports.Message = Message;


// UNCOMMENT BELOW FOR mySQL DB CODE
// everything below is code for a mySQL database connection, instead of Sequelize:

// var mysql = require('mysql');
// // mysql module is what allows the webserver to communicate with the mysql server. It's like a translator.

// var connection = mysql.createConnection( {
//   host: 'localhost',
//   user: 'root',
//   password: 'simi',
//   database: 'chat'
// });

// connection.connect();

// exports.connection = connection;

// // https://expressjs.com/en/guide/database-integration.html#annotations:HDqEcg9nEeq5LQuk5L3f0Q

