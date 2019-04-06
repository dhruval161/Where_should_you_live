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