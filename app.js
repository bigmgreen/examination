const fs = require('fs');
var lineReader = require('line-reader');

var eachLine = function (filename, options, iteratee) {
    return new Promise(function (resolve, reject) {
        lineReader.eachLine(filename, options, iteratee, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

let index = 0;
let papers = {
    items: []
};
let item = {};
eachLine('computer1.txt', function (line, done) {
    if (index == 0) {
        papers.title = line;
    } else if (index == 1) {
        papers.subTitle = line;
    } else {
        line = line.trim();
        let str = line.trim().substr(0, 4).toUpperCase();

        if (/^\d*、/.test(str)) {
            item.title = line.replace(/^\d*、/g, '');
        } else if (/^A./.test(str)) {
            item.A = line;
        }
        else if (/^B./.test(str)) {
            item.B = line;
        }
        else if (/^C./.test(str)) {
            item.C = line;
        }
        else if (/^D./.test(str)) {
            item.D = line;
        } else if (/^标准答案：/.test(line)) {
            item.answer = line.substr(-1).toUpperCase();
            papers.items.push(item);
            item = {};
        }
    }

    if (done) {
        fs.writeFileSync('./en.json', JSON.stringify(papers));
    }
    index++;
}).then(function () {
    console.log('done');
}).catch(function (err) {
    console.error(err);
});