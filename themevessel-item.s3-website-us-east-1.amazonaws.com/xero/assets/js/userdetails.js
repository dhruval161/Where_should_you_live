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

function delete_property()
{
    var prop_name = document.getElementById("delete_name").value;
    var prop_price = document.getElementById("delete_price").value;
    console.log(prop_name);
    var userdet = firebase.database().ref("users/" + getuserdetails() + "/property/");
    let iterator = 0;
    userdet.on("value", function(data) {
    let val = data.val();
        for(x in val)
        {
            let propdet = firebase.database().ref("properties/" + val[x] )
            propdet.on("value", function(propdata) {
            if(prop_name == propdata.val().name && prop_price == propdata.val().price)
            {
            console.log(propdata.val().name);
            console.log(x);
            userdet.child(x).remove();
            console.log("Property Removed");
            window.location.href = "my-properties.html";
            return;
            }


        });

        }
});


}