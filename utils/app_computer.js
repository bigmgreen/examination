let computer = require('./computer');
const fs = require('fs');
const path = require('path');

let choice = {
    title: "﻿北京大学入学测试题",
    subTitle: "专升本 计算机应用 入学测试题",
    items: []
};
let judge = {
    title: "﻿北京大学入学测试题",
    subTitle: "专升本 计算机应用 入学测试题",
    items: []
};
let fill = {
    title: "﻿北京大学入学测试题",
    subTitle: "专升本 计算机应用 入学测试题",
    items: []
};

let _data = computer.items;
console.log(computer);
_data.forEach(function (item, index) {
    if (item.A && item.B && item.C && item.D) {
        choice.items.push(item);
    } else if (item.A && item.B) {
        judge.items.push(item)
    } else {
        fill.items.push(item)
    }
});

fs.writeFile(path.join(__dirname, 'computer-fill.js'), JSON.stringify(fill), function (err) {
    if (err) throw err;
    console.log("Export Account Success!");
});

console.log('选择题:', choice);
console.log('判断题:', judge);
console.log('填空题:', fill);