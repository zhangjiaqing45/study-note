var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		ref:'users'
	},
	comment: {
		type: String,
		required: true
	},
	msgid: {
		type: String,
		required: true,
		ref:'msg'
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

var CommentModel = mongoose.model('comment', CommentSchema);

var save = (data) => {
	var comment = new CommentModel(data);
	return comment.save()
		.then(() => {
			return true;
		})
		.catch(() => {
			return false;
		});
};



var commentList = (msgid) => {
	return CommentModel.find(msgid).sort({date:-1});
}

module.exports = {
	save,
	commentList
};
