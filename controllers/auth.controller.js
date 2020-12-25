var express = require('express');

var md5 = require('md5');
var db = require('../db');

module.exports.logout = function(req, res) {

    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }

    res.redirect('/');
};

module.exports.login = function(req, res) {
    var user = db.get('users').find({ id: req.cookies.userId }).value();
    res.locals.user = user;

    if(!user){
        res.render('auth/login');
    }
    else {
        res.redirect('/game');
    }
};

module.exports.postLogin = function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    var user = db.get('users').find({ username: username }).value();

    if(!user) {
        res.render('auth/login', {
            errors: [
                'User does not exit.'
            ]
        });
        return;
    }

    var hashedPassword = md5(password);

    if(user.password !== hashedPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password.'
            ]
        });
        return;
    }

    res.cookie('userId', user.id), {
        signed: true
    };
    res.redirect('/game');
};

