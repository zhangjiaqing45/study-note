var UserModel = require('../models/users.js');
var BookModel = require('../models/book.js');
var MsgModel = require('../models/msg.js');
var CommentModel = require('../models/comment.js');

var index = async (req,res,next)=>{
	res.send({
		msg : '管理员权限',
		status : 0
	});
}

var usersList = async (req,res,next)=>{
	
	var result = await UserModel.usersList();
	if(result){
		res.send({
			msg : '所有用户信息',
			status : 0,
			data : {
				usersList : result
			}
		});
	}
	else{
		res.send({
			msg : '获取用户信息失败',
			status : -1
		});
	}
}

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

var msgList = async (req,res,next)=>{
	
	var result = await MsgModel.msgList();
	if(result){
		res.send({
			msg : '所有用户信息',
			status : 0,
			data : {
				msgList : result
			}
		});
	}
	else{
		res.send({
			msg : '获取用户信息失败',
			status : -1
		});
	}
}

var updateFreeze = async (req,res,next)=>{
	
	var { email , isFreeze } = req.body;

	var result = await UserModel.updateFreeze(email , isFreeze);
	
	if(result){
		res.send({
			msg : '账号冻结操作成功',
			status : 0
		});
	}
	else{
		res.send({
			msg : '账号冻结操作失败',
			status : -1
		});
	}

}

var deleteUser = async (req,res,next)=>{
	var { email } = req.body;
	var result = await UserModel.deleteUser(email);
	if(result){
		res.send({
			msg : '账号删除操作成功',
			status : 0
		});
	}
	else{
		res.send({
			msg : '账号删除操作失败',
			status : -1
		});
	}
}

var deleteMsg = async (req,res,next)=>{
	var { id } = req.body;
	var result = await MsgModel.deleteMsg(id);
	if(result){
		res.send({
			msg : '评论删除成功',
			status : 0
		});
	}
	else{
		res.send({
			msg : '评论删除失败',
			status : -1
		});
	}
}

var deleteBook = async (req,res,next)=>{
	var { id } = req.body;
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


module.exports = {
	index,
	usersList,
	bookList,
	msgList,
	updateFreeze,
	deleteUser,
	deleteMsg,
	deleteBook
};