var express = require('express');
var router = express.Router();
var config = require('../public/_s/config')
var sha1 = require('sha1')
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query)
  var token = config.token 
  var signature = req.query.signature 
  var timestamp = req.query.timestamp 
  var nonce = req.query.nonce 
  var echostr = req.query.echostr 

  var list = [ token , timestamp , nonce ]
  console.log(list)
  list.sort()
  var tempStr = ''
  list.forEach(function (item) {
    tempStr += item
  })
  var sha1Str = sha1(tempStr)
  console.log(sha1Str)
  if(sha1Str === signature){
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.write(echostr);
    res.end();
  }else{
    return false
  }
});

module.exports = router;
