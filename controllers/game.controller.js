var express = require('express');

var db = require('../db');

module.exports.game = function(req, res) {
    var user = db.get('users').find({ id: req.cookies.userId }).value();
    res.locals.user = user  ;

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

    if( soCuoc == random) {

        setTimeout(function(){
            var user = db.get('users').find({ id: req.cookies.userId }).value();
            res.locals.user = user  ;

            res.render('game/game', {
                thongbao : [
                    'Chúc mừng, bạn đã đoán trúng.'
                ],
                random : random
            });

        }, 4000);
        return;
    }

    
    else {
        setTimeout(function(){
            var user = db.get('users').find({ id: req.cookies.userId }).value();
            res.locals.user = user  ;

            res.render('game/game', {
                thongbao : [
                    'Chia buồn, bạn đã đoán sai.'
                ],
                random : random
            });

        }, 4000);
        return;
    }
    
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

    if( soCuoc == random) {

        setTimeout(function(){
            var user = db.get('users').find({ id: req.cookies.userId }).value();
            res.locals.user = user  ;

            res.render('game/biggame', {
                thongbao : [
                    'Chúc mừng, bạn đã đoán trúng.'
                ],
                random : random
            });

        }, 4000);
        return;
    }

    
    else {
        setTimeout(function(){
            var user = db.get('users').find({ id: req.cookies.userId }).value();
            res.locals.user = user  ;

            res.render('game/biggame', {
                thongbao : [
                    'Chia buồn, bạn đã đoán sai.'
                ],
                random : random
            });

        }, 4000);
        return;
    }
};


module.exports.leaderboard = function(req, res) {
    var userss = db.get('users').value();

    var user = db.get('users').find({ id: req.cookies.userId }).value();
    res.locals.user = user;

    function GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] < b[prop]) {    
                return 1;    
            } else if (a[prop] > b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }    
       
    userss.sort(GetSortOrder("money"));

    res.render('game/leaderboard', {
        title : "Bảng xếp hạng",
        userss : userss,
        user : user,
        i : 1
    });
};

module.exports.about = function(req, res) {

    res.render('game/about', {
        title : "About"
    });
};