var controller = require('./controllers');
var router = require('express').Router();

router.get('/messages', controller.messages.get);

router.post('/messages', controller.messages.post);

router.get('/users', controller.users.get); // path: /classes/users

router.post('/users', controller.users.post); // path: /classes/users

module.exports = router;
