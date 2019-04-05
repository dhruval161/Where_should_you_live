
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;
   
    global1 = user.email;
    window.location.href = 'index.html';
    localStorage.setItem("UID",user.uid)
    console.log(localStorage.getItem(("UID")));

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

if(r_password != r_confirm_password)
{
console.log(r_name.length);
window.alert("Passswords not matching");
}

if(r_name.length==0 || r_password.length==0 || r_email.length==0)
{
window.alert("Complete the data fields");
}

else
{

firebase.auth().createUserWithEmailAndPassword(r_email, r_password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error : " + errorMessage);

  // ...
});
}

}

function getuserdetails()
{
  return localStorage.getItem("UID");
  /*var user = firebase.auth().currentUser;
  console.log(firebase.auth().currentUser);
  if (user) {

  } else {
    // No user is signed in.
  }*/

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


function logout(){
  firebase.auth().signOut();
  localStorage.removeItem("UID");
}

   