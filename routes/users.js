const express = require('express');
const router = express.Router();
const ctrl = require('../controller/users');
const passport = require('passport');

/* GET users listing. */
router.post('/login', ctrl.login);
router.post('/register', ctrl.signup);
router.get('/current', passport.authenticate('jwt', {session : false}), (req, res) => {
  res.json(req.user)
})

module.exports = router;