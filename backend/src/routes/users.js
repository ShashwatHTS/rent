var express = require('express');
var router = express.Router();
const { createUser,logIn } = require('../controller/user.controller')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/create', createUser);
router.post('/login',logIn)

module.exports = router;
