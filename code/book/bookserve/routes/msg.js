var express = require('express');
var msgController = require('../controllers/msg.js');
var router = express.Router();


router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/uploadMsg', msgController.uploadMsg);
router.get('/msgList', msgController.msgList);
router.get('/msgtext', msgController.msgtext);
router.post('/deleteMsg', msgController.deleteMsg);
router.get('/msgListbyUser', msgController.msgListbyUser);

module.exports = router;
