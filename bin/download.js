/*
下载文件
*/
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	console.log('正在下载');
	res.download('public/N.zip', function (err) {
		if (!err) {
			console.log('download yes');
		}
	});

})

module.exports = router;