var express = require('express');
var router = express.Router();

const path = require('path');

/* GET home page. */
router.get('/:fileName', function(req, res, next) {
  const file = path.join(__dirname, '../', 'clients', req.params.fileName);
  res.download(file);
});

module.exports = router;
