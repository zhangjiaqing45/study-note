var express = require('express');
var bookController = require('../controllers/book.js');
var router = express.Router();

var multer  = require('multer');
var upload = multer({ dest: 'public/bookimg/' });

var multer  = require('multer');
var upload = multer({ dest: 'public/bookimg/' });


router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/uploadBook', bookController.uploadBook);
router.get('/bookList', bookController.bookList);
router.get('/bookListP', bookController.bookListP);
router.get('/bookListbyUser', bookController.bookListbyUser);
router.get('/search', bookController.search);
router.get('/bookListE', bookController.bookListE);
router.post('/deleteBook', bookController.deleteBook);
router.post('/uploadbookImg', upload.single('file'), bookController.uploadbookImg);

module.exports = router;
