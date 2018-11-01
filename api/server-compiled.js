'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _data = require('./data/data.js');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _cors2.default)());

var odds = _data2.default.bets;

function filterOddsOnMoreThan(array, filteredValue, moreThan) {
    var filteredArray = array.map(function (arr) {
        return {
            name: arr.name,
            odds: arr.odds.filter(function (x) {
                return moreThan === true ? x.oddsDecimal > filteredValue : x.oddsDecimal < filteredValue;
            })
        };
    });

    return filteredArray.filter(function (player) {
        return player.odds.length > 0;
    });
}

app.get('/decimalOddsMoreThanTwo', function (req, res) {
    res.json(filterOddsOnMoreThan(odds, 2, true));
});

app.get('/decimalOddsLessThanTwo', function (req, res) {
    res.json(filterOddsOnMoreThan(odds, 2, false));
});

app.listen(4000, function () {
    console.log('App listening on port 4000!');
});
