/*
登陆
*/
var express = require('express');
var router = express.Router();
var utility = require('utility');//MD5
var uuid1 = require('uuid/v1');//UUID (time-based)
var mongo = require('../models/mongo');
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, function (req, res) {
	var codeV = 0;
	var msgV = 'error';

	var phoneNumber = req.body.phoneNumber;
	var sign = req.body.sign;
	var passWord = req.body.password;
	
	
	if (checkPhone(phoneNumber) && passWord.length <= 20 && passWord.length >= 6) {
		var md5Valve = utility.md5(phoneNumber + 'crocodile' + '!@#$%^&*');
		if (md5Valve == sign) {
			mongo.queryUserByPhoneNum(phoneNumber, function (err,userOne) {
				if (!err) {
					if (userOne) {
						var md5Password = utility.md5(passWord + 'crocodile' + '!@#$%^&*');
						if (md5Password == userOne.password) {
							codeV = 1;
							msgV = {
								userid: userOne.userid,
								phonenumber: userOne.phonenumber,
								age: userOne.age,
								name: userOne.name
							}
							response = {
								code: codeV,
								msg: msgV
							}
							res.send(JSON.stringify(response));
						} else {
							msgV = 'password wrong';
							response = {
								code: codeV,
								msg: msgV
							}
							res.send(JSON.stringify(response));
						}
					}
				} else {
					msgV = 'unknown error';
					response = {
						code: codeV,
						msg: msgV
					}
					res.send(JSON.stringify(response));
				}
			})
		} else {
			msgV = 'check fail'
			response = {
				code: codeV,
				msg: msgV
			}
			res.send(JSON.stringify(response));
		} 
	} else {
		msgV = 'error input';
		response = {
			code: codeV,
			msg: msgV
		}
		res.send(JSON.stringify(response));
	}
})

//校验手机号
function checkPhone(phone){ 
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        return false; 
    }
    return true; 
}

module.exports = router;








