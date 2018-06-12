var request = require('request');
var git_token = require('./secret.js')
var fs = require('fs');


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




getRepoContributors('jquery', 'jquery', function(err, result) {
  var jsObject = JSON.parse(result);
  for (var user of jsObject) {
    // return user.avatar_url
    // console.log(user.avatar_url)
    downloadImageByURL(user.avatar_url, "./avatars/"+ user.login+'.jpeg')
  }
});

