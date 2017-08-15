let node_xj = require("xls-to-json");

node_xj({
    input: "com.xls",
    output: "computer.js",
    // sheet: "sheetname"
}, function(err, result) {
    if(err) {
        console.error(err);
    } else {
        console.log(result);
    }
});