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

function sendchanges()
{
console.log("Reached sendchanges");

if(document.getElementById("user_name").value.length == 0)
{
window.alert("Enter the name field");
return ;
}

if(document.getElementById("user_email").value.length == 0)
{
window.alert("Enter the email field");
return ;
}



var userdet = firebase.database().ref("users/" + getuserdetails());
userdet.set({
    name : document.getElementById("user_name").value,
    job_desc : document.getElementById("user_job").value,
    phone : document.getElementById("user_phone").value,
    email : document.getElementById("user_email").value,
    msg : document.getElementById("user_msg").value
});
location.href = "user-profile.html";
}