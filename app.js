'use strict';
const express      = require("express");
const app          = express();
//const router       = require("./routers/router.js");//const path         = require('path');
const bodyParser   = require('body-parser');
//const ejs          = require('ejs');
//const ueditor      = require('ueditor');
const session      = require('express-session');
//require('./proxy');

//使用session
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true
}));


app.use(bodyParser.json());

app.use(express.static("./public"));

console.log("Server running");
// console.log('数据库是否连接成功');

app.listen(3000);

var uri = 'http://localhost:3000';
console.log('> Listening at 本地调试接口：3000\n')
console.log('> F11 进入全屏显示\n')
