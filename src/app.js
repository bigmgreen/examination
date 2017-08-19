
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
var computerChoice = require('./data/review/computer/computer-choice');
var computerJudge = require('./data/review/computer/computer-judge');
var computerFill = require('./data/review/computer/computer-fill');

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
app.get('/review/computerChoice', (req, res)=> {
    res.json(computerChoice);
});
app.get('/review/computerJudge', (req, res)=> {
    res.json(computerJudge);
});
app.get('/review/computerFill', (req, res)=> {
    res.json(computerFill);
});

app.get('/reviewEnglish', function (req, res) {
    res.sendFile(__dirname + '/view/review/english.html');
});
app.get('/reviewComputerChoice', function (req, res) {
    res.sendFile(__dirname + '/view/review/computer-choice.html');
});
app.get('/reviewComputerJudge', function (req, res) {
    res.sendFile(__dirname + '/view/review/computer-judge.html');
});
app.get('/reviewComputerFill', function (req, res) {
    res.sendFile(__dirname + '/view/review/computer-fill.html');
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

/*   考试题  start   */

function getRandom(_item, count) {

    count = count || 100;
    var items = [];
    while (true) {

        var max = _item.length - 1;
        parseInt(Math.random() * (max + 1), 10);
        var num = Math.floor(Math.random() * (max + 1));

        items.push(_item.splice(num, 1)[0]);

        if (items.length >= count) {
            break;
        }
    }

    return items;
}

app.get('/real/english', function (req, res) {
    res.json({
        english: {
            items: getRandom(reviewEnglish.english.items),
            title: "﻿北京大学入学测试题",
            subTitle: "专升本 英语 入学测试题"
        }
    });
});
app.get('/real/computer', function (req, res) {
    var items = [].concat(
        getRandom(computerJudge.computer.items, 10),
        getRandom(computerFill.computer.items, 10),
        getRandom(computerChoice.computer.items, 80)
    );


    res.json({
        computer: {
            items: items,
            title: "﻿北京大学入学测试题",
            subTitle: "专升本 计算机 入学测试题"
        }
    });
});
app.get('/real/math', function (req, res) {

    var items = [].concat(reviewMath_1.math_1.items
        , reviewMath_2.math_2.items, reviewMath_3.math_3.items);

    res.json({
        math: {
            items: getRandom(items),
            title: "﻿北京大学入学测试题",
            subTitle: "专升本 数学 入学测试题"
        }
    });
});

app.get('/realEnglish', function (req, res) {
    res.sendFile(__dirname + '/view/real/english.html');
});
app.get('/realComputer', function (req, res) {
    res.sendFile(__dirname + '/view/real/computer.html');
});
app.get('/realMath', function (req, res) {
    res.sendFile(__dirname + '/view/real/math.html');
});

/*   考试题  end   */

module.exports = app;