//Load the Facebook JS SDK
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));

// Init the SDK upon load
window.fbAsyncInit = function() {
  FB.init({
    appId      : 'FACEBOOK_APP_ID', // App ID
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });


// Specify the extended permissions needed to view user data
// The user will be asked to grant these permissions to the app (so only pick those that are needed)
        var permissions = [
          'email',
          'user_likes',
          'friends_likes',
          'user_about_me',
          'friends_about_me',
          'user_birthday',
          'friends_birthday',
          'user_education_history',
          'friends_education_history',
          'user_hometown',
          'friends_hometown',
          'user_relationships',
          'friends_relationships',
          'user_relationship_details',
          'friends_relationship_details',
          'user_location',
          'friends_location',
          'user_religion_politics',
          'friends_religion_politics',
          'user_website',
          'friends_website',
          'user_work_history',
          'friends_work_history'
          ].join(',');

// Specify the user fields to query the OpenGraph for.
// Some values are dependent on the user granting certain permissions
        var fields = [
          'id',
          'name',
          'first_name',
          'middle_name',
          'last_name',
          'gender',
          'locale',
          'languages',
          'link',
          'username',
          'third_party_id',
          'installed',
          'timezone',
          'updated_time',
          'verified',
          'age_range',
          'bio',
          'birthday',
          'cover',
          'currency',
          'devices',
          'education',
          'email',
          'hometown',
          'interested_in',
          'location',
          'political',
          'payment_pricepoints',
          'favorite_athletes',
          'favorite_teams',
          'picture',
          'quotes',
          'relationship_status',
          'religion',
          'significant_other',
          'video_upload_limits',
          'website',
          'work'
          ].join(',');

  function showDetails() {
    FB.api('/me', {fields: fields}, function(details) {
      // output the response
      $('#userdata').html(JSON.stringify(details, null, '\t'));
      $('#fb-login').attr('style', 'display:none;');
    });
  }


  $('#fb-login').click(function(){
    //initiate OAuth Login
    FB.login(function(response) { 
      // if login was successful, execute the following code
      if(response.authResponse) {
          showDetails();
      }
    }, {scope: permissions});
  });

};