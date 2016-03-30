var CronJob = require('cron').CronJob;
var config = require('./config');

var cron = config.cronjobs[0];

var job = new CronJob(cron, function() {
  checkTeamcity();
}, null,
  true
);


function checkTeamcity(){
  console.log('go look at teamcity');
}
