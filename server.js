var request = require('request')
  , express = require('express')
  , qs = require('qs')
  , app = express();

// set the params to get friends
var params = {
      screen_name: 'indexzero' // try replacing with your screename
    }
  , output = '<h1>'+params.screen_name+'\'s friends</h1>'
  , getFriendsURL = 'http://api.twitter.com/1/friends/ids.json?'
                  + qs.stringify(params);


// send request to get list of friends
request.get(getFriendsURL, function (err, res, friends) {
  if (err) console.log(err); // Print out error

  friends = JSON.parse(friends);
  // only iterate through at most 5 friends
  var len = (friends.ids.length > 5) ? 5 : friends.ids.length;


  // loop through friends (the first 5 in the list)
  for(var i=0; i<len; i++) {
    // set the params to get user details
    params = {
      user_id: friends.ids[i]
    };

    var getUserDetailsURL = 'https://api.twitter.com/1/users/show.json?'
                          + qs.stringify(params);

    //send request to get details for each friend
    request.get(getUserDetailsURL, function (err, res, friend) {
      if (err) console.log(err); // Print out error

      friend = JSON.parse(friend);
      //create list of friends profile pic, name, and Twitter screen name
      output += '<img src="'+friend.profile_image_url+'" alt="'+friend.name+'" />'
              + '<p>'+friend.name+'<br />'
              + '<span class="screenname">@'+friend.screen_name+'</span></p>';
    });
  }
});

// attach stylesheet to output
app.use(express.static(__dirname));
output = '<link rel="stylesheet" href="styles.css" />' + output;

app.get('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(output); //send output
}).listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);

console.log('http server started on port: '+ process.env.OPENSHIFT_NODEJS_PORT);