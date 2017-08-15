let express = require('express');
let path = require('path');
let app = express();

app.use('/static', express.static('src/data/mock/math/img'));
app.use('/static', express.static('src/data/review/math/img1'));
app.use('/static', express.static('src/data/review/math/img2'));
app.use('/static', express.static('src/data/review/math/img3'));

/*   模拟题  start   */
let mockMath = require('./data/mock/math/math');
let mockEnglish = require('./data/mock/english/english');
let mockComputer = require('./data/mock/computer/computer');
app.get('/mock/english', (req, res)=> {
    res.json(mockEnglish);
});
app.get('/mock/math', (req, res)=> {
    res.json(mockMath);
});
app.get('/mock/computer', (req, res)=> {
    res.json(mockComputer);
});
/*   模拟题  end   */

/*   题库   start   */
let reviewMath_1 = require('./data/review/math/math_1');
let reviewMath_2 = require('./data/review/math/math_2');
let reviewMath_3 = require('./data/review/math/math_3');
let reviewEnglish = require('./data/review/english/english');
let reviewComputer = require('./data/review/computer/computer');

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
/*   题库   end   */

module.exports = app;