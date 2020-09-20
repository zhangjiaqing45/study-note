var crypto = require('crypto');
var captcha = require('trek-captcha');

//密码加密
var setCrypto = (info)=>{
	return crypto.createHmac('sha256', '$%$%^jfdkf')
					.update(info)
                    .digest('hex');
};

var createVerify = (req,res)=>{
	return captcha().then((info)=>{
		//验证码具体的值
		req.session.verifyImg = info.token;
		////验证码二进制
		return info.buffer;
	}).catch(()=>{
		return false;
	});
}

module.exports = {
	setCrypto,
	createVerify
};