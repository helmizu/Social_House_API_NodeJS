const express = require('express');
const router = express.Router();
const ctrl = require('../controller/thread');
const passport = require('passport');

router.post('/posting', passport.authenticate('jwt', {session : false }), ctrl.posting)
router.post('/comment/:tid', passport.authenticate('jwt', {session : false }), ctrl.comment)
router.post('/like/:tid', passport.authenticate('jwt', {session : false }), ctrl.like)

module.exports = router;