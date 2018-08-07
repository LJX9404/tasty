const fs = require('fs');
const path = require('path');
global.express = require('express');
const mysql = require('mysql');
global.ejs = require('ejs');
global.md5 = require('md5');
global.svgCaptcha = require('svg-captcha');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const server = express();

//设置模板引擎
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');
server.set('views', 'view');

global.mydb=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    database:'tasty'
});
mydb.connect();

//设置session
let cookiesigned='tasty.fengqi';
server.use(cookieParser(cookiesigned));
//启用session相关的中间件
server.use(session({
    secret: cookiesigned,
    name: 'sessid',
    resave: false, //每次发起请求的时候，有效时间要不要重新及时
    saveUninitialized: true,
    cookie: {maxAge: 1800 * 1000}
}));

//接收post过来的所有数据
server.use(bodyParser.urlencoded({
    extended: true
}));


server.use('/login',require('./module/login')())
// server.use('/',require('./module/index')());
server.use('/user', require('./module/user')());
//静态资源托管
server.use('/uploads', express.static('uploads'));
server.use(express.static('view'));
//404
server.use((req,res)=>{
    res.send('你访问的路径不存在');
});

server.listen(81);