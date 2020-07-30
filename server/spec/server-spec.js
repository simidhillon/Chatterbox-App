var mysql = require('mysql');
var request = require('request');
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'student',
      password: process.env['MYSQL_PASSWORD'] || 'student',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages';

    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  // **********TESTS BELOW**********:

  it('Should post user KAUR with MESSAGES to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'KAUR',
        message: 'Done is better than perfect',
        roomname: 'Cal'
      }
    }, function (err, response, body) {
      request({
        method: 'GET',
        uri: 'http://127.0.0.1:3000/classes/users',
        json: { username: 'KAUR' }
      }, function (err, res, bod) {
        body = JSON.parse(body);
        expect(body.length).to.equal(1);
        expect(body[0].message).to.equal('Done is better than perfect');
        expect(body[0].roomname).to.equal('Cal');
        expect(body[0].username).to.equal('KAUR');

        var queryString = 'SELECT * FROM messages where username = "KAUR"';

        dbConnection.query(queryString, function(err, results) {
          console.log('RESULTS:', results);
          expect(results.length).to.equal(1);
          expect(results[0].message).to.equal('Done is better than perfect');
          expect(results[0].roomname).to.equal('Cal');
          expect(results[0].username).to.equal('KAUR');
          done();
        });
      });
    });
  });

  it('Should check if username KAUR only exists once in users table', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'KAUR' }
    }, function () {
      var queryString = 'SELECT * FROM users where username = "KAUR"';

      dbConnection.query(queryString, function(err, results) {
        console.log('results:', results)
        expect(results.length).to.equal(1);
        done();
      });
    });
  });
