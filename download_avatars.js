var request = require('request');
var git_token = require('./secret.js')
var fs = require('fs');

var repoOwner = process.argv[2];
var repoName = process.argv[3];


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



function downloadImageByURL(url, filePath) {
  request.get(url)

         .on('error', function (err) {
        throw err;
       })

       .on('response', function (response) {
        console.log('Response status code: ', response.statusCode , ' Response message: ', response.statusMessage , ' Response content type: ', response.headers['content-type']);
       })

       .on('end', function(){
        console.log("download complete!");

       })

       .pipe(fs.createWriteStream(filePath));
}



getRepoContributors(repoOwner, repoName, function(err, result) {
  if (!repoOwner || !repoName) {
    console.log("error")
  } else {
    var jsObject = JSON.parse(result);
  for (var user of jsObject) {
    // return user.avatar_url
    // console.log(user.avatar_url)
    downloadImageByURL(user.avatar_url, "./avatars/"+ user.login+'.jpeg')
  }
  }

});

