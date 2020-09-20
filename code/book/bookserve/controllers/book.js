var BookModel = require('../models/book.js');
var fs = require('fs');
var url = require('url');
var {
	bookImg
} = require('../untils/config.js');

var uploadBook = async (req, res, next) => {
	var {
		username,
		bookname,
		bookmsg,
		booksort,
		tel
	} = req.body;

	var result = await BookModel.save({
		username,
		bookname,
		bookmsg,
		booksort,
		tel
	});

	if (result) {
		res.send({
			msg: '上传成功',
			status: 0
		});
	} else {
		res.send({
			msg: '上传失败',
			status: -2
		});
	}

};

var bookList = async (req, res, next) => {

	var result = await BookModel.bookList();
	if (result) {
		res.send({
			msg: 'ok',
			status: 0,
			data: {
				bookList: result
			}
		});
	} else {
		res.send({
			msg: '获取书籍信息失败',
			status: -1
		});
	};
};

var bookListP = async (req, res, next) => {

	var result = await BookModel.bookListP();
	if (result) {
		res.send({
			msg: 'ok',
			status: 0,
			data: {
				bookListP: result
			}
		});
	} else {
		res.send({
			msg: '获取书籍信息失败',
			status: -1
		});
	};
};

var bookListE = async (req, res, next) => {

	var result = await BookModel.bookListE();
	if (result) {
		res.send({
			msg: 'ok',
			status: 0,
			data: {
				bookListE: result
			}
		});
	} else {
		res.send({
			msg: '获取书籍信息失败',
			status: -1
		});
	};
};

var bookListbyUser = async (req, res, next) => {
	var username = req.query;
	var result = await BookModel.bookListbyUser(username);
	if (result) {
		res.send({
			msg: 'ok',
			status: 0,
			data: {
				bookList: result
			}
		});
	} else {
		res.send({
			msg: '获取书籍信息失败',
			status: -1
		});
	};
};

var deleteBook = async (req,res,next)=>{
	var { id } = req.body;
	console.log(id)
	var result = await BookModel.deleteBook(id);
	if(result){
		res.send({
			msg : '书籍删除成功',
			status : 0
		});
	}
	else{
		res.send({
			msg : '书籍删除失败',
			status : -1
		});
	}
}

var search = async (req, res, next) =>{
	
	var newVal = req.query;
	
	var result = await BookModel.search(newVal);
	
	if (result) {
		res.send({
			msg: 'ok',
			status: 0,
			data: {
				bookList: result
			}
		});
	} else {
		res.send({
			msg: '获取书籍信息失败',
			status: -1
		});
	};
}

var uploadbookImg = async (req, res, next) => {
	
	var id = req.body.param;

	await fs.rename('public/bookimg/' + req.file.filename, 'public/bookimg/' + id + '.jpg',function(err){
		console.log(err)
	});

	var result = await BookModel.uploadbookImg(id, url.resolve(bookImg.baseUrl, id +'.jpg'));
	
	if (result) {
		res.send({
			msg: '图片上传成功',
			status: 0,
			data: {
				bookimg: url.resolve(bookImg.baseUrl, id +'.jpg')
			}
		});
	} else {
		res.send({
			msg: '图片上传失败',
			status: -1
		});
	}

}

module.exports = {
	uploadBook,
	bookListP,
	bookListE,
	bookListbyUser,
	uploadbookImg,
	bookList,
	search,
	deleteBook
}
