var CronJob = require('cron').CronJob;
var config = require('./config');
var request = require('request');

function init(){
  for (var i = 0; i < config.cronjobs.length; i++) {
    var cron = config.cronjobs[i];
    var job = new CronJob(cron, function() {
      var result = checkTeamcity();
      performIntegrations({
        ""
      });
    }, null,
      true
    );
  }
}

function checkTeamcity(){
  var teamcity_host = config.teamcity_host;
  var session = getTeamcitySession(teamcity_host, teamcity_username, teamcity_password);

  var buildConfigurations = [];

  buildConfigurations.push(getConfigurationsForProjects(config.projects));
  buildConfigurations.push(config.buildConfigurations);

  return {
    "totalBuildConfigurations": buildConfigurations.length,
    "failingBuilds": getFailingBuilds(buildConfigurations);
  }
}

function getTeamcitySession(host, username, password){
  request.get('http://some.server.com/').auth('username', 'password', false);

}

function constructTeamcityRequest(){
  return request.get()
}

function performIntegrations(buildStatus){
  console.log(buildStatus.msg);
}

init();
