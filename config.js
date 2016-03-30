var config = {};

config.teamcity_host = '';
config.teamcity_username = '';
config.teamcity_password = '';

config.active_period_start_utc = "";
config.active_period_end_utc = ""

config.cronjobs = ["* * * * * *"];

config.monitor = [];
config.period_in_minutes = 30;

// var vader = {
//   "name": "Vader",
//   "projects":[
//     "IDA", "PVAM", "Personalization"
//   ],
//   buildConfigurations: [
//     "MW - VaderQA"
//   ]
// };

// integrations:
// {
//   "name":"Vader Hipchat",
//   "type":"hipchat",
//   "config": {
//     "apiKey":"dfdfsdfsdfsdfsdf",
//     "roomId":"3939473"
//   }
// }

module.exports = config;
