// Global variables


let sYear = "2018";
let sMonth = "01";
let sDay = "01";
let dateObj = new Date();
let eMonth = dateObj.getUTCMonth() + 1; //months from 1-12
let eDay = dateObj.getUTCDate();
let eYear = dateObj.getUTCFullYear();
let key = "eS6qfDZDKtwmh83Q5oGPjIyiUL3so4NOGVV2ixSH";
const moonSearch = "http://api.usno.navy.mil/moon/phase?date=01/01/2018&nump=99"
//Require
const request = require('request');
const cron = require('node-cron');
const express = require('express');
let app = express();
var fs = require('fs');

// Connection to database
let mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '229535Jkz',
  database: 'RaUser'
});

con.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + con.threadId);
});

//  Function for downloading API data to JSON file, this can be used as a back up if api call fails to keep site operational
navySearch = function () {
  request(moonSearch, {
    json: true
  }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body)
    var content = JSON.stringify(body);
    fs.writeFile("navy.json", content, function (err) {
      if (err) {
        console.log(err);
      }
    });
  });

  //Cron job for checking navy API for new objects, updates once a year and adds to json file that can update data base with one year worth of moon data
  // cron.schedule('0 1 1 1 *', () => {
  //   console.log('Runing a job at 01:00 at America/Los_Angeles timezone');
  //   navySearch();
  // }, {
  //   scheduled: true,
  //   timezone: "America/Los_Angeles"
  // });
};

 
// Console log for checking api data
/* var index;
   for (index = 0; index < body.length; ++index) {
     console.log(
       body[index].beginTime,
       body[index].endTime,
       body[index].peakTime,
       body[index].classType
       );

 };  */

 module.export = moonSearch;