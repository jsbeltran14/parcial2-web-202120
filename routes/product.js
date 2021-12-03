var express = require('express');
var router = express.Router();
let data = require('../assets/data');

/* GET products listing. Please establish connection with getProduct function from controllers/product.js  */
router.get('/', function (req, res, next) {
  res.send(
    res.json(data)
  );
});

module.exports = router;
