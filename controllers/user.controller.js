const md5 = require('md5');
var shortid = require('shortid');
var db = require('../db');

module.exports.contact = function(req, res) {
    res.render('users/contact', {title: "Kết nối với tôi!"});
};

module.exports.create = function(req, res) {
    res.render('users/create', {title: "Đăng ký"});
};

module.exports.postCreate =function(req,res) {
    req.body.id = shortid.generate();
    req.body.money = 10000;
    req.body.password = md5(req.body.password);

    db.get('users').push(req.body).write();

    res.redirect('../auth/login');

};
