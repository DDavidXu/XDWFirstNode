/*
数据库操作模块

*/
	var uuid1 = require('uuid/v1');//UUID (time-based)

  	var mongoose = require('mongoose');
 	//连接数据库
  	mongoose.connect('mongodb://localhost/database');
  	var db = mongoose.connection;
  	db.on('error', console.error.bind(console, '连接错误'));
  	db.once('open', function () {
    	console.log('open success');
  	});
  	var UserSchema = new mongoose.Schema ({
  		userid: { type: String, unique: true },
  		name: { type: String, default: 'hahaha'},
  		phonenumber: {type: Number, length:11},
  		password: {type: String},
  		age: {type: Number, default: 18},
  		time:{type: String}
  		
  	})

  	var UserModel = mongoose.model('user', UserSchema);

	//插入数据
	var insert = function (data, callback) {

	  	var UserEntity = new UserModel(data);

	  	UserEntity.save(function (err) {
	  		
	  		callback(err);
	  		
	  	})
	}
	
	//删除数据
	var deletedata = function (userId, callback) {
		UserModel.findOne({'userid': userId},  function (err, userOne) {
			if (!err) {
				if (userOne) {
					userOne.remove(function (err) {
					callback(err);
					})
				} else {
					callback('can not find');
				}
				
			} else {
				callback(err);
			}
		})
	}
	//更改数据
	var updata = function (userId, data, callback) {
		UserModel.findOne({'userid': userId},  function (err, userOne) {
			if (!err) {
				if (userOne) {
					userOne.name = data.name;
					userOne.phonenumber = data.phonenumber;
					userOne.password = data.password;
					userOne.age = data.age;
					userOne.time = data.time;
					userOne.save(function (err) {
						callback(err);
					})
				} else {
					callback('can not find ');
				}
			} else {
				callback(err);
			}
		})
	}
	//根据userid查找数据
	var queryByUserId = function (userId, callback) {
		UserModel.findOne({'userid': userId},  function (err, userOne) {
			callback(err,userOne);
		})
	}
	//根据手机号查看是否存在用户
	var queryByPhoneNum = function (phoneNumber, callback) {
		UserModel.findOne({'phonenumber': phoneNumber}, 'some select', function (err, userOne) {
			callback(err, userOne);
		})
	}

	//批量查找用户 条件查找 mintimestamp最小时间戳，maxtimestamp最大时间戳，limit数量限制
	var queryUsers = function (mintimestamp, maxtimestamp, limit, callback) {
		UserModel.find({'time':{$lt:maxtimestamp, $gt:mintimestamp}}, null, {limit:limit},function (err, users) {
			callback(err, users);
		})
	}

	module.exports.insert 			= insert;
	module.exports.updata 			= updata;
	module.exports.deletedata	 	= deletedata;
	module.exports.queryByUserId 	= queryByUserId;
	module.exports.queryByPhoneNum  = queryByPhoneNum;
	module.exports.queryUsers       = queryUsers;








