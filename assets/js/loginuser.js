firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;

    // check whether the user details already exist otherwise add it
    var ref = firebase.database().ref("users/");




    ref.on("value", function(snapshot) {
    console.log(snapshot.val());


    if(user.uid in snapshot.val())
    {
    console.log(user.uid + "is in snapshot");

    console.log(user.emailVerified);
    if(user.emailVerified==false)
    {
        send_verification(user);
        window.alert("Verify your account!! Verification mail is sent!!");
        return;
    }
    localStorage.setItem("UID",user.uid);
    console.log(localStorage.getItem(("UID")));

    window.location.href = 'index.html';
    }

    else
    {
    console.log(user.uid + "is not present in snippet");
    console.log(user.emailVerified);

    var userref = firebase.database().ref("users/" + user.uid);
    userref.set({
        name : document.getElementById("r_name_field").value,
        email: document.getElementById("r_email_field").value
    });

    if(user.emailVerified==false)
    {        
        logout();
        return;
    }

    }

    }, function (error) {
    console.log("Error: " + error.code);
    });

    if(user != null){
      
      
      var email_id = user.email;
    }

  } else {
  console.log("no user logged in");
    // No user is signed in.

    //document.getElementById("user_div").style.display = "none";
   // document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;


  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...

    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(userEmail, userPass);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);

  });

  /*
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });*/

}

function createaccount()
{
  console.log(document.getElementById("r_password_field").value);
  console.log(document.getElementById("r_confirm_password_field").value);

  var r_name = document.getElementById("r_name_field").value
  var r_password = document.getElementById("r_password_field").value
  var r_email = document.getElementById("r_email_field").value
  var r_confirm_password = document.getElementById("r_confirm_password_field").value
  let count = 0;

  if(r_password != r_confirm_password)
  {
    console.log(r_name.length);
    window.alert("Passswords not matching");
    return ;
  }

  if(r_name.length==0 || r_password.length==0 || r_email.length==0)
  {
    window.alert("Complete the data fields");
    return ;
  }

  for(i=0;i<r_name.length;i++)
  {
  var c = r_name.charAt(i);
  if(c.toLowerCase() != c.toUpperCase())
  {count+=1;}
  }
  if(count==0){window.alert("Invalid username!!!");return;}

  else
  {


    var ret = firebase.auth().createUserWithEmailAndPassword(r_email, r_password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
    // ...
    });
    var user = firebase.auth().currentUser;

  }
}

function loggedin()
{
  if(localStorage.getItem("UID"))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function password_reset()
{
var auth = firebase.auth();

document.getElementById("send_email_here").setAttribute("readonly", "true");
var emailAddress = document.getElementById("send_email_here").value;
console.log(emailAddress);

    var ref = firebase.database().ref("users/");
    var arr = [];
    let flag=0;

ref.on("value", function(data) {
let val =data.val();
    for(x in val)
    {
        if(val[x].email === emailAddress)
        {
        flag = 1;
        }
        if(flag==1)
        {
        console.log("email present in database");
        auth.sendPasswordResetEmail(emailAddress).then(function() {
        console.log("Email sent")}).catch(function(error) {
        console.log(error);
          // An error happened.
        });
        document.getElementById("email_sent").style.visibility="visible";
        break;
        }
        else
        {
        console.log("email not present in database");
        }

    }
});

}

function send_verification(user)
{
user.sendEmailVerification().then(function() {
    console.log("Email Sent");
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
}


   