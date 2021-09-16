require('dotenv').config();

var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

var userRoute = require('./routers/user.router');
var authRoute = require('./routers/auth.router');
var gameRoute = require('./routers/game.router');

var port = process.env.PORT || 3000;

var app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static(path.join(__dirname, 'public')));
app.use("/stylesheets", express.static(__dirname + "/stylesheets"));
app.use("/javascripts", express.static(__dirname + "/javascripts"));
app.use("/images", express.static(__dirname + "/images"));

app.use(morgan('combined'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/game', gameRoute);

app.get('/', function(req, res) {
  var user = db.get('users').find({ id: req.cookies.userId }).value();
  res.locals.user = user  ;
    
  res.render('home', {
    title: "Trang chủ"
  } );
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
