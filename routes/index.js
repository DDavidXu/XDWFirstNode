/*
路由器文件
*/

module.exports = function (app) {
	//当默认访问/时，设置自动访问/error
	app.get('/', function (req, res) {

		res.redirect('error');
	});
	app.use('/register', require('./register'));	
	app.use('/login', require('./login'));
	app.use('/qrcode', require('../bin/qrcode'));
	app.use('/download', require('../bin/download'));
	app.use('/showimage', require('../bin/showimage'));

};

