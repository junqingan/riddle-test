var express = require('express');
var app = express();

const port = '80';


app.use(express.static('dist'));

// 首页
app.get('/', function(req, res) {
    res.sendfile('./dist/page/index.html');
});
// 关于我们
app.get('/about', function(req, res) {
    res.sendfile('./dist/page/about.html');
});

// 产品介绍
app.get('/Products', function(req, res) {
    res.sendfile('./dist/page/Products.html');
});

// 门店展示
app.get('/Store_list', function(req, res) {
    res.sendfile('./dist/page/Store_list.html');
});

// 联系我们
app.get('/ContactUs', function(req, res) {
    res.sendfile('./dist/page/ContactUs.html');
});

// 招聘信息
app.get("/Join_Us", function(req, res) {
    res.sendfile('./dist/page/Join_Us/index.html');
});


// 新闻活动板块 --暂未开发
app.get("/information", function(req, res) {
    res.sendfile('./dist/page/information/index.html');
});

app.listen(port, function() {
    console.log(`server on http://localhost:${port}`);
})