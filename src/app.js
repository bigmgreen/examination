var express = require('express');
var path = require('path');
var app = express();

app.use('/static', express.static('src/data/mock/math/img'));
app.use('/static', express.static('src/data/review/math/img1'));
app.use('/static', express.static('src/data/review/math/img2'));
app.use('/static', express.static('src/data/review/math/img3'));
app.use('/static', express.static('src/data/'));
app.use('/static', express.static('src/view/static'));

//首页
app.get(['/', '/index'], function (req, res) {
    res.sendFile(__dirname + '/view/index.html');
});

/*   模拟题  start   */
var mockMath = require('./data/mock/math/math');
var mockEnglish = require('./data/mock/english/english');
var mockComputer = require('./data/mock/computer/computer');
app.get('/mock/english', (req, res)=> {
    res.json(mockEnglish);
});
app.get('/mock/math', (req, res)=> {
    res.json(mockMath);
});
app.get('/mock/computer', (req, res)=> {
    res.json(mockComputer);
});

app.get('/mockEnglish', function (req, res) {
    res.sendFile(__dirname + '/view/mock/english.html');
});
app.get('/mockComputer', function (req, res) {
    res.sendFile(__dirname + '/view/mock/computer.html');
});
app.get('/mockMath', function (req, res) {
    res.sendFile(__dirname + '/view/mock/math.html');
});
/*   模拟题  end   */

/*   题库   start   */
var reviewMath_1 = require('./data/review/math/math_1');
var reviewMath_2 = require('./data/review/math/math_2');
var reviewMath_3 = require('./data/review/math/math_3');
var reviewEnglish = require('./data/review/english/english');
var reviewComputer = require('./data/review/computer/computer');

app.get('/review/math_1', (req, res)=> {
    res.json(reviewMath_1);
});
app.get('/review/math_2', (req, res)=> {
    res.json(reviewMath_2);
});
app.get('/review/math_3', (req, res)=> {
    res.json(reviewMath_3);
});
app.get('/review/english', (req, res)=> {
    res.json(reviewEnglish);
});
app.get('/review/computer', (req, res)=> {
    res.json(reviewComputer);
});

app.get('/reviewEnglish', function (req, res) {
    res.sendFile(__dirname + '/view/review/english.html');
});
app.get('/reviewComputer', function (req, res) {
    res.sendFile(__dirname + '/view/review/computer.html');
});
app.get('/reviewMath_1', function (req, res) {
    res.sendFile(__dirname + '/view/review/math_1.html');
});
app.get('/reviewMath_2', function (req, res) {
    res.sendFile(__dirname + '/view/review/math_2.html');
});
app.get('/reviewMath_3', function (req, res) {
    res.sendFile(__dirname + '/view/review/math_3.html');
});

/*   题库   end   */

module.exports = app;