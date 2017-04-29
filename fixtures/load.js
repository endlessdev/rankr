"use strict";
var fixtures = require('pow-mongodb-fixtures').connect('test');
var data_1 = require("./data");
function loadData(cb) {
    fixtures.clearAndLoad({
        test: data_1.data
    }, cb);
}
exports.loadData = loadData;
