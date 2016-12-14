/*
展示图片
*/
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/57-57.png', function (req, res) {
	fs.readFile('./public/57-57.png', "binary", function (err, file) {
		if (!err) {
			res.write(file, 'binary');
			res.end();
		} else {
			console.log(err);
		}
	})
})
router.get('/512-512.png', function (req, res) {
	fs.readFile('./public/512-512.png', "binary", function (err, file) {
		if (!err) {
			res.write(file, 'binary');
			res.end();
		} else {
			console.log(err);
		}
	})
})
router.get('/512-512.jpg', function (req, res) {
	fs.readFile('./public/512-512.jpg', "binary", function (err, file) {
		if (!err) {
			res.write(file, 'binary');
			res.end();
		} else {
			console.log(err);
		}
	})
})
router.get('/angiosisHos.ipa', function (req, res) {
	fs.readFile('./public/angiosisHos.ipa', "binary", function (err, file) {
		if (!err) {
			res.write(file, 'binary');
			res.end();
		} else {
			console.log(err);
		}
	})
})

module.exports = router;