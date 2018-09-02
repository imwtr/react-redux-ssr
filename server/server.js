const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');

// 常规路由页面
let home = require('./routes/home');
let message = require('./routes/message');

// 用于SSR服务端渲染的页面
let homeSSR = require('./routes/homeSSR');
let messageSSR = require('./routes/messageSSR');

app.use(express.static(path.join(__dirname, '../')));

// 自定义ejs模板
app.engine('html', ejs.__express);
app.set('view engine', 'html');
ejs.delimiter = '|';

app.set('views', path.join(__dirname, '../views/'));

app.get('/home', home);
app.get('/message', message);

app.get('/ssr/home', homeSSR);
app.get('/ssr/message', messageSSR);

let port = 12345;

app.listen(port, function() {
    console.log(`Server listening on ${port}`);
});
