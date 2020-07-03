var mongoose = require('mongoose');
var {
	bookImg
} = require('../untils/config.js');
var url = require('url');


var BookSchema = new mongoose.Schema({
	bookname: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		ref:'user'
	},
	booksort: {
		type: String,
		required: true
	},
	bookmsg: {
		type: String
	},
	tel: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now()
	},
	bookimg: {
		type: String,
		default: url.resolve(bookImg.baseUrl, 'default.jpg')
	}
});

var BookModel = mongoose.model('book', BookSchema);


var save = (data) => {
	var book = new BookModel(data);
	return book.save()
		.then(() => {
			return true;
		})
		.catch(() => {
			return false;
		});
};

var bookList = () => {
	return BookModel.find().sort({date:-1});
};

var bookListP = () => {
	return BookModel.find({
		booksort: '专业书籍'
	}).sort({date:-1});
};

var bookListE = () => {
	return BookModel.find({
		booksort: '课外书籍'
	}).sort({date:-1});
};

var bookListbyUser = (username) => {
	return BookModel.find(
		username
	).sort({date:-1});
};

var search = (newVal) => {
	return BookModel.find(newVal).sort({date:-1})
}

var deleteBook = (id) => {
	return BookModel.deleteOne({
		_id:id
	});
}

var uploadbookImg = (bookid, bookimg) => {
	return BookModel.update({
			_id:bookid
		}, {
			$set: {
				bookimg
			}
		})
		.then(() => {
			return true;
		})
		.catch(() => {
			return false;
		});
}

module.exports = {
	save,
	bookList,
	bookListP,
	bookListE,
	bookListbyUser,
	search,
	deleteBook,
	uploadbookImg
};
