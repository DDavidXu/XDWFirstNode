/*
注册
*/
var express = require('express');
var router = express.Router();
var utility = require('utility');//MD5
var uuid1 = require('uuid/v1');//UUID (time-based)
var mongo = require('../models/mongo');

//校验是否登陆 未补充
//
router.get('/', function (req, res, next) {

	var codeV = 0;
	var msgV = 'error';

	var phoneNumber = req.query.phoneNumber;
	var	checkCode = req.query.checkCode;
	var sign = req.query.sign;
	var passWord = req.query.password;
	
	//验证码还未添加，暂时使用123456
	if (checkPhone(phoneNumber) && checkCode.length == 6 && passWord.length <= 20 && passWord.length >= 6) {

		var md5Valve = utility.md5(phoneNumber + checkCode);
		if (md5Valve == sign) {
			storeDatabase(phoneNumber, passWord, function (bcode, bmsgV) {
				codeV = bcode;
				msgV = bmsgV;
				response = {
					code: codeV,
					msg: msgV
				}
				res.send(JSON.stringify(response));
			});
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

	
});

//校验手机号
function checkPhone(phone){ 
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        return false; 
    }
    return true; 
}

function storeDatabase(phoneNumber, passWord, callback) {
	var codeV = 0;
	var msgV = 'error';

	mongo.queryByPhoneNum(phoneNumber, function (err,userOne) {
		
		if (!err) {
			if (!userOne) {
				var times = String(new Date().getTime());
				var timestamp = times.substring(0, 10);
				var uuid = uuid1();
				var md5Password = utility.md5(passWord + 'crocodile' + '!@#$%^&*');
				//存数据库
				var data = {
					userid: uuid,
				  	name: uuid.substring(0, 8),
				  	phonenumber: phoneNumber,
				  	password: md5Password,
				  	// age: 18,
				  	time:timestamp
				}
				mongo.insert(data, function (err) {
					if (!err) {
						mongo.queryByUserId(uuid, function (err, userOne) {
							if (!err && userOne) {
								codeV = 1;
								msgV = {
									userid: userOne.userid,
									phonenumber: userOne.phonenumber,
									age: userOne.age,
									name: userOne.name
								}
								callback(codeV, msgV);
							}
						})						
						
					} else {
						msgV = '注册失败';
						callback(codeV, msgV);
					}
					
				});
			} else {
				msgV = '用户已存在,请更换手机号';
				callback(codeV, msgV);
			}
		} 
		
	})
}

module.exports = router;
