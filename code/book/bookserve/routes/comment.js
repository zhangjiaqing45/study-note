var express = require('express');
var commentController = require('../controllers/comment.js');
var router = express.Router();


router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/uploadComment', commentController.uploadComment);
router.get('/commentList', commentController.commentList);

module.exports = router;