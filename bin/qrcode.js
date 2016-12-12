/*
生成二维码
*/
var express = require('express');
var router = express.Router();
var qr_image = require('qr-image');
var url = 'https://itunes.apple.com/ca/app/bestvpn-wu-xian-liu-liang/id1124326618?mt=8';

router.get('/', function (req, res) {
	var qrcodeImg = qr_image.image(url);
	res.type('png');
	qrcodeImg.pipe(res);
})

module.exports = router;