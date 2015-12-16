// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //location.reload();
      document.getElementById('status').innerHTML = "<img src='loader.gif'>";
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      //document.getElementById('status').innerHTML = 'Not Authorized ' +
        //'into this app.';
        testAPI();
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //document.getElementById('status').innerHTML = 'Please log ' +
        //'into Facebook.';
        testAPI();
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });


  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '172926226392606',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the sessionhttp://cryptlife.com/prayforchennai/final/11188408_10203590676722346_2902175288860155625_n.jpg
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  }
  );

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      //document.getElementById("status").innerHTML = "";
      getDP();
    });
  }

  function getDP() {
    FB.api('/me/picture?height=500&width=500',function(response) {
          console.log(response.data.url);
          $.ajax({
            type: "POST",
            url: "store.php",
            data: { img: response.data.url },
            success: function(img) {
              console.log("stored!");
              displayImg(img);
            }
          });
      });
  }
  function displayImg(img) {
    console.log(img);
    document.getElementById("status").innerHTML = "<img src='" + img + "' width='450'><br><br>" + 
      "<textarea placeholder='Enter a caption...' id='msg'></textarea>"
      +"<br><br><button type='button' id='pf' class='uibutton large' onclick='postImg(" + "&apos;" + img + "&apos;" + ",0)'><span class='glyphicon glyphicon-bullhorn'></span> Post to Facebook</button> <button type='button' id='pfc' class='uibutton large' onclick='postImg(" + "&apos;" + img + "&apos;" + ",1)'><span class='glyphicon glyphicon-picture'></span> Post and Set Profile Photo</button>";
  }

  function postImg(imgurl,dpset) {
    var pid;
    console.log("Data received: " + imgurl);
    if(dpset == 0) {
      var old = document.getElementById('pf').innerHTML;
      document.getElementById('pf').innerHTML = "Posting...";
      $('#pf').css('disabled','disabled');
    }
    else if(dpset == 1) {
      var old = document.getElementById('pfc').innerHTML;
      document.getElementById('pfc').innerHTML = "Please wait...";
      $('#pfc').css('disabled','disabled');
    }
    var msg = document.getElementById('msg').value;
    FB.api("/me/photos","POST",
    {
      "url": imgurl,
      "caption": msg,
    },function(re){
      if (re && !re.error) {
        console.log('Posted!');
      }
      else console.log(re.error);
      console.log(re.id);
      pid = re.id;
      if(dpset == 1) {
        document.getElementById('pfc').innerHTML = old;
        window.open("https://www.facebook.com/photo.php?fbid="+pid+"&makeprofile=1");
        $('#pfc').removeAttr('disabled');
        alert("Photo posted to your timeline. If you have not blocked pop-ups, you should see a window that fires up for you to change your profile photo.");
      }
      else if (dpset == 0){
        document.getElementById('pf').innerHTML = old;
        $('#pf').removeAttr('disabled');
        alert("Photo posted!");
      }
    });

    
  }