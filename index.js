var CronJob = require('cron').CronJob;
var config = require('./config');
var request = require('request');
var Promise = require('promise');

function init() {
  for (var i = 0; i < config.cronjobs.length; i++) {
    var cronPattern = config.cronjobs[i];
    var job = new CronJob(cronPattern, function() {
        var result = checkTeamcity();
      }, null,
      true
    );
  }
}

function getConfigurationsForProjects(){
  return Promise.all(config.projects.map(getConfigurationsForProject));
}

function getConfigurationsForProject(project){
  var options = {
    url: config.teamcity_host + '/httpAuth/app/rest/projects/id:' + project + '/buildTypes',
    headers: {
      accept: 'application/json'
    }
  };
  return new Promise(function(resolve){
    request.get(options, function(error, response, body){
      var buildTypes = JSON.parse(body).buildType;
      resolve(buildTypes);
    }).auth(config.teamcity_username, config.teamcity_password, false);
  });
}

function getFailingBuildsForBuildType(buildType){
    var options = {
    url: config.teamcity_host + '/httpAuth/app/rest/buildTypes/id:' + buildType.id + '/builds?locator=count:1',
    headers: {
      accept: 'application/json'
    }
  };

  return new Promise(function(resolve){
    request.get(options, function(error, response, body){
      var build = JSON.parse(body).build;
      if (build.length > 0 && build[0].status === 'FAILURE'){
        resolve(build[0].buildTypeId);
      }
      resolve();
    }).auth(config.teamcity_username, config.teamcity_password, false);
  });
}

function getFailingBuildsForRegisteredProjects(){
  return new Promise(function(resolve){
    getConfigurationsForProjects().then(function(buildTypes){
      var flattenedTypes = [].concat.apply([], buildTypes);
      Promise.all(flattenedTypes.map(getFailingBuildsForBuildType)).then(function(values) {
        var failingBuilds = [];
        for (var i = 0; i < values.length; i++) {
          if (values[i]){
            failingBuilds.push(values[i]);
          }
        }
        resolve(failingBuilds);
      }, function(reason){
        console.log(reason);
      });
    });
  })
}

// getConfigurationsForProjects().then(function(res){
//   getFailingBuildsForRegisteredProjects
// });

getFailingBuildsForRegisteredProjects().then(function(res){
  console.log(res);
});
