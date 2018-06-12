var request = require('request');
var git_token = require('./secret.js')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'git_token'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors('jquery', 'jquery', function(err, result) {
  var jsObject = JSON.parse(result);
  for (var user of jsObject) {
    console.log(user.avatar_url)
  }


});

