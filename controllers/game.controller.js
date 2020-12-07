var express = require('express');

var db = require('../db');

module.exports.game = function(req, res) {
    res.render('game/game', {title: "Chơi Nhỏ"});
};

module.exports.postGame =function(req,res) {

    var soCuoc = req.body.soCuoc;
    var tienCuoc = req.body.tienCuoc;
    var money1 = db.get('users').find( { id: req.cookies.userId } ).value().money;

    var random = Math.floor(Math.random() * 5) + 1; 

    if( soCuoc == random) {
        money1 = tienCuoc * 3 + money1;
    }

    else {
        money1 = money1 - tienCuoc;
    }

    db.get('users')
        .find({ id: req.cookies.userId })
        .assign({ money: money1})
        .write();
    console.log(random);
    res.redirect('/game' );
    
};

module.exports.BigGame = function(req, res) {
    res.render('game/biggame', {title: "Chơi Lớn"});
};

module.exports.postBigGame =function(req,res) {

    var soCuoc = req.body.soCuoc;
    var tienCuoc = req.body.tienCuoc;
    var money1 = db.get('users').find( { id: req.cookies.userId } ).value().money;

    var random = Math.floor(Math.random() * 100); // tra ve mot so nguyen ngau nhien tu 0 den 99

    if( soCuoc == random) {
        money1 = tienCuoc * 69 + money1;
    }

    else {
        money1 = money1 - tienCuoc;
    }

    db.get('users')
        .find({ id: req.cookies.userId })
        .assign({ money: money1})
        .write();

    console.log(random);
    res.redirect('/game/biggame' );
    
};