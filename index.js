var CronJob = require('cron').CronJob;
var config = require('./config');

function init(){
  for (var i = 0; i < config.cronjobs.length; i++) {
    var cron = config.cronjobs[i];
    var job = new CronJob(cron, function() {
      var result = checkTeamcity();
      performIntegrations(result);
    }, null,
      true
    );
  }
}

function checkTeamcity(){
  return {"msg":"go look at team city"};
}

function performIntegrations(buildStatus){
  console.log(buildStatus.msg);
}

init();
