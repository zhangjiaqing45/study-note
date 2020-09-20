var CommentModel = require('../models/comment.js');


var uploadComment = async (req,res,next)=>{
	var {
		username,
		comment,
		msgid
	} = req.body;
	
	var result = await CommentModel.save({
		username,
		comment,
		msgid
	});
	
	if (result) {
		res.send({
			msg: '评论成功',
			status: 0
		});
	} else {
		res.send({
			msg: '评论失败',
			status: -2
		});
	}
};

var commentList = async (req,res,next)=>{
	
	var msgid = req.query;
	
	var result = await CommentModel.commentList(msgid);
	if(result){
		res.send({
			msg : 'ok',
			status : 0,
			data : {
				commentList : result
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


module.exports = {
	uploadComment,
	commentList
}