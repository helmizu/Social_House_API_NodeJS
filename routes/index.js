var express = require('express');
var router = express.Router();

router.get('/getopen', function (req, res) {
  res.status(200).json({
    msg : "get success",
    data : "open"
  })
})

router.post('/open', function (req, res) {
  var data = req.body
  
  res.status(201).json({
    msg : "post success",
    data : data
  })
})

module.exports = router;
