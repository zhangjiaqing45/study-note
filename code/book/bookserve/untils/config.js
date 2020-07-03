var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

mongoose.Promise = global.Promise;
var Mongoose = {
	url: 'mongodb://192.168.43.160:27017/book',
	connect() {
		mongoose.connect(this.url, {
			useNewUrlParser: true
		}, (err) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log('数据库连接成功');
		});
	}
};

var Email = {
	config: {
		host: "smtp.qq.com",
		port: 587,
		auth: {
			user: '690306059@qq.com',
			pass: 'mkvesqhfvdvjbahi'
		}
	},
	get transporter() {
		return nodemailer.createTransport(this.config);
	},
	get verify() {
		return Math.random().toString().substring(2, 6);
	},
	get time() {
		return Date.now();
	}
};

var Head = {
	baseUrl: 'http://192.168.43.160:3000/uploads/'
}

var bookImg = {
	baseUrl: 'http://192.168.43.160:3000/bookimg/'
}

module.exports = {
	Mongoose,
	Email,
	Head,
	bookImg
};
