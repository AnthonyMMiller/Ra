// Global variables
let sYear = "2018";
let sMonth = "01";
let sDay = "01";
let dateObj = new Date();
let eMonth = dateObj.getUTCMonth() + 1; //months from 1-12
let eDay = dateObj.getUTCDate();
let eYear = dateObj.getUTCFullYear();
let key = "eS6qfDZDKtwmh83Q5oGPjIyiUL3so4NOGVV2ixSH";
const solarSearch = "https://api.nasa.gov/DONKI/FLR?startDate=" + sYear + '-' + sMonth + '-' + sDay + "&endDate=" + eYear + '-' + eMonth + '-' + eDay + "&api_key=" + key;

//Require
const request = require('request');
const cron = require('node-cron');
const express = require('express');
let app = express();
let fs = require('fs');

//Connection to database
let mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ra_db'
});

con.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + con.threadId);
});

//  Function for downloading API data to JSON file, this can be used as a back up if api call fails to keep site operational
nasaSearch = function () {
  request(solarSearch, {
    json: true
  }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    var content = JSON.stringify(body);
    fs.writeFile("/JSON_data/nasa.json", content, function (err) {
      if (err) {
        console.log(err);
      }
    });

    // Cron job for checking nasa API for new objects once a day
    cron.schedule('0 1 * * *', () => {
      console.log('Runing a job at 01:00 at America/Los_Angeles');
      nasaSearch();
    }, {
      scheduled: true,
      timezone: "America/Los_Angeles"
    });


  })
};


// Console log for checking api data
//console.log(
//  body[index].beginTime,
//   body[index].endTime,
//   body[index].peakTime,
//    body[index].classType);
//var index;
//for (index = 0; index < body.length; ++index) {