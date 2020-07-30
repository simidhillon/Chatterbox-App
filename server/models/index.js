// CODE BELOW IS FOR SEQUELIZE ORM:
// (scroll down to look at original mySQL code, commented out):

var db = require('../db');
var Promise = require('bluebird');
var Sequelize = require('sequelize'); // sequelize ORM

module.exports = {
  messages: {
    get: function (callback) { // a function which produces all the messages
      db.Message.findAll({
        order: [['id', 'DESC']]
      }).then(function(messages) {
        callback(null, messages);
      }).catch(function(err) {
        callback(err, null);
      });
    },
    post: function (data, callback) {
      // a function which can be used to insert a message into the database
      var username = data.username || 'Anonymous';
      var roomname = data.roomname;
      var message = data.message;
      console.log('USERNAME:', username);
      console.log('ROOMNAME:', roomname);
      console.log('MESSAGE:', message);
      module.exports.users.post(data, (err, user) => {
      // check if room already exists:
        db.Room.create({ roomname })
          .then(function(success) {
            db.Message.create({username, message, roomname})
              .then(function(success) {
                callback(null, data);
              })
              .catch(function(err) {
                callback(err, null);
              });
          })
          .catch(function(err) {
            // if room exists:
            db.Message.create({username, message, roomname})
              .then(function(success) {
                callback(null, data);
              })
              .catch(function(err) {
                callback(err, null);
              });
          });
      });
    }
  },
  users: {
    get: function (user, callback) { // get all messages from that user
      db.Message.findAll({
        where: {
          username: user.username
        }
      }).then(function(success) {
        callback(err, success);
      }).catch(function(err) {
        callback(err, null);
      });
    },
    post: function (user, callback) { // inserts row into mysql db using SQL query
      var username = user.username || 'Anonymous';
      db.User.create({ username })
        .then(function(success) {
          console.log('Success, new user added!');
          callback(null, user);
        })
        .catch(function(err) {
          callback(err, null);
        });
    }
  }
};

// EVERYTHING ABOVE THIS LINE IS SEQUELIZE.


// UNCOMMENT BELOW FOR mySQL DB CODE
// everything below is for regular mySQL database connection, instead of Sequelize ORM.

// var db = require('../db');
// var Promise = require('bluebird');

// module.exports = {
//   messages: {
//     get: function (callback) { // a function which produces all the messages

//       db.connection.query('SELECT * FROM messages ORDER BY id desc;', function(err, rows) {
//         if (err) { throw err; }
//         callback(err, rows);
//       });
//     },
//     post: function (data, callback) {
//       // a function which can be used to insert a message into the database
//       var username = data.username || 'Anonymous';
//       var roomname = data.roomname;
//       var message = data.message;
//       // check if username exists. If it doesn't, then call users.post.
//       // this.users.post(data, (err, user) => {
//       // });

//       module.exports.users.post(data).then((user) => {
//         // check if room already exists:
//         db.connection.query(`select exists (select * from rooms where roomname = "${roomname}");`,
//           function(err, rows, fields) {
//             if (err) { throw err; }
//             var roomExists = Object.values(rows[0])[0];
//             if (roomExists === 0) {
//               db.connection.query(`INSERT INTO rooms (roomname) VALUES ("${roomname}");`,
//                 function (err, rows, fields) {
//                   if (err) { throw err; }
//                 });
//             }
//             db.connection.query(`INSERT INTO messages (username, message, roomname) VALUES ("${username}", "${message}", "${roomname}");`,
//               function (err, rows) {
//                 if (err) { throw err; }
//                 callback(err, data);
//               });
//             // callback(err, data);
//           });
//       }).catch((err) => {
//         throw err;
//       });


//       // db.connection.query(`INSERT INTO rooms (roomname) VALUES ("${roomname}");`, function (err, rows, fields) {
//       //   if (err) throw err;

//       //   db.connection.query(`INSERT INTO messages (username, message, roomname) VALUES ("${username}", "${message}", "${roomname}");`, function (err, rows) {
//       //     if (err) throw err;
//       //     callback(err, data);
//       //   });
//       // });
//     }
//   },

//   users: {
//     // Ditto as above.
//     get: function () { // get user info!
//       // db.connection.connect();
//     },
//     post: function (user) { // inserts row into mysql db using SQL query
//       // db.connection.connect();
//       var username = user.username || 'Anonymous'; // if no username is selected
//       //var testing = "select exists (select * from users where username = 'hello');";


//       var myPromise = new Promise((resolve, reject) => {
//         // `select exists (select * from users where username = "${username}");`
//         var string = 'select exists (select * from users where username = ' + db.connection.escape(username) + ');';
//         db.connection.query(string,
//           function(err, rows, fields) {
//             if (err) {
//               reject(err);
//             } else {

//               var roomExists = Object.values(rows[0])[0];
//               resolve(roomExists);
//             }
//           });
//       }); //end promise

//       return myPromise.then((roomExists) => {
//         return new Promise((resolve, reject) => {
//           if (roomExists === 0) {
//             // `INSERT INTO users(username) VALUES("${username}");`
//             var string2 = 'INSERT INTO users (username) VALUES = ' + db.connection.escape(username);
//             db.connection.query(string2, function(err, rows, fields) {
//               if (err) { reject(err); }
//               else { resolve(user); }
//             });
//           } else {
//             resolve(user);
//           }
//         });
//       });
//     }
//   }
// };
// // UNCOMMENT ABOVE FOR mySQL DB CONNECTION

