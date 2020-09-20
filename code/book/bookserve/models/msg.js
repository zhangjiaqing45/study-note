var mongoose = require('mongoose');

var MsgSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	username: {
		type: String,
		ref:'user'
	},
	tel: {
		type: String
	},
	text: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

var MsgModel = mongoose.model('msg', MsgSchema);

var save = (data) => {
	var msg = new MsgModel(data);
	return msg.save()
		.then(() => {
			return true;
		})
		.catch(() => {
			return false;
		});
};

var msgList = () => {
	return MsgModel.find().sort({
		date: -1
	});
};

var msgtext = (msgid) => {
	return MsgModel.find(msgid)
};

var deleteMsg = (id) => {
	return MsgModel.deleteOne({
		_id: id
	});
}

var msgListbyUser = (username) => {
	return MsgModel.find(
		username
	).sort({
		date: -1
	});
};


module.exports = {
	save,
	msgList,
	msgtext,
	deleteMsg,
	msgListbyUser
};
