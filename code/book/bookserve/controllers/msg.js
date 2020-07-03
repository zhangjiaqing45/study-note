var MsgModel = require('../models/msg.js');


var uploadMsg = async (req,res,next)=>{
	var {
		username,
		title,
		tel,
		text
	} = req.body;
	
	var result = await MsgModel.save({
		username,
		title,
		tel,
		text
	});
	
	if (result) {
		res.send({
			msg: '发表成功',
			status: 0
		});
	} else {
		res.send({
			msg: '发表失败',
			status: -2
		});
	}
};

var msgList = async (req,res,next)=>{
	
	var result = await MsgModel.msgList();
	if(result){
		res.send({
			msg : 'ok',
			status : 0,
			data : {
				msgList : result
			}
		});
	}
	else{
		res.send({
			msg : '获取书籍信息失败',
			status : -1
		});
	}
}

var msgtext = async (req,res,next)=>{
	var msgid = req.query;
	var result = await MsgModel.msgtext(msgid);
	
	if (result) {
		res.send({
			msg: 'ok',
			status: 0,
			data: {
				msgList: result
			}
		});
	} else {
		res.send({
			msg: '获取留言信息失败',
			status: -1
		});
	};
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

var msgListbyUser = async (req, res, next) => {
	var username = req.query;
	var result = await MsgModel.msgListbyUser(username);
	if (result) {
		res.send({
			msg: 'ok',
			status: 0,
			data: {
				msgList: result
			}
		});
	} else {
		res.send({
			msg: '获取书籍信息失败',
			status: -1
		});
	};
};


module.exports = {
	uploadMsg,
	msgList,
	msgtext,
	deleteMsg,
	msgListbyUser
}