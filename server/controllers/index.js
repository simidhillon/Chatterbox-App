var Promise = require('bluebird');
var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, messages) => {
        if (err) {
          res.status(400).json(err);
        }
        res.status(200).json(messages);
      });
    },
    post: function (req, res) {
      models.messages.post(req.body, (err, message) => {
        if (err) { throw err; }
        res.status(201).json(JSON.stringify([message]));
      });
    }
  },

  users: {
    get: function (req, res) {
      models.users.get(req.body, (err, user) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(user);
        }
      });
    },
    post: function (req, res) {

      models.users.post(req.body, (err, user) => {
        res.status(201).json(user);
      });
    }
  }
};

