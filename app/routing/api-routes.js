var bodyParser = require('body-parser');
var path = require('path');

var liberalsTable = require('../data/liberals.js');

module.exports = function(app) {

    app.get('/api/liberals', function(request, result) {
        result.json(liberalsTable);
    });

    app.post("/api/liberals", function(request, result) {
        var you = request.body;
        var newLiberal = -1;
        var newLiberalScore = 100;
        var currentLiberalScore = 0;
        for (i = 0; i < liberalsTable.length; i++) {

            if (you.sex != liberalsTable[i].sex) {
                for (j = 0; j < you.scores.length; j++) {

                    currentLiberalScore = currentLiberalScore + Math.abs(liberalsTable[i].scores[j] - you.scores[j]);
                }
                if (currentLiberalScore <= newLiberalScore) {
                    newLiberal = i;
                    newLiberalScore = currentLiberalScore;
                }
                currentLiberalScore = 0;
            }
        }
        liberalsTable.push(you);
        newLiberalDetails = liberalsTable[newLiberal];
        result.json(newLiberalDetails);

    });


};
