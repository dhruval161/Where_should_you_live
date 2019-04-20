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

if (! (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("user_email").value)))
{
window.alert("The email address is badly formatted");
return; 
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

/*
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
*/


function showmyprop()
{

        var prev;
        // read user details
        console.log("users/" + getuserdetails() + "/property/");
        var userdet = firebase.database().ref("users/" + getuserdetails() + "/property/");
        var iterator = 0;
        var first_id;
        userdet.on("value", function(data) {
        let val = data.val();
            for(x in val)
            {
                console.log(data.numChildren());
                if(iterator>data.numChildren()){iterator=0;}



                let propdet = firebase.database().ref("properties/" + val[x] )
                propdet.on("value", function(propdata) {

                    let property = propdata.val();
                    let view = Math.floor(Math.random() * 70) + 2;
                    document.getElementById("prop").style.visibility = "visible";
                    document.getElementById("property").innerText = property.name;
                    document.getElementById("price").innerText = "$ "+property.price;
                    document.getElementById("location").innerText = property.city;
                    document.getElementById("views").innerHTML = view;

                    //console.log(propdet.getKey());
                    console.log(iterator);
                    if(iterator==0)
                    {document.getElementById('del' + (iterator).toString()).id = propdet.getKey();first_id=propdet.getKey();}
                    else
                    {document.getElementById(prev).id = propdet.getKey()}
                    prev = propdet.getKey();
                    console.log(prev);



                    document.getElementById("eye_prop").href = "properties-details.html?id="+prev;

                    iterator += 1;
                    if(iterator== data.numChildren())
                    {return;}



                    $clone = $('#prop').clone();
                    $clone.attr("id","123456789");
                    $clone.insertAfter('#prop');

                });
            }
        });




}



function getdelelement(result)
{
console.log(result.id)


var userRef = firebase.database().ref("users/" + getuserdetails() + "/property/");
userRef.on("value", function(data) {
let val = data.val();
    for(x in val)
    {
        //console.log(val[x]);userRef.child(x).remove();document.getElementsByClassName("deletebuttons")[0].id = "del0";
        if(val[x]===result.id)
        {
            console.log("Property Found!!");
        console.log(x);
        console.log(val[x]);
        var propRef = firebase.database().ref("properties/" + val[x]);       
        userRef.child(x).remove();
        document.getElementsByClassName("deletebuttons")[0].id = "del0";
        propRef.remove();

        window.location.href='my-properties.html';
                return;

        }
    }
    });    

    console.log("property deleted!!");
            return;

  
   
}


function show_random_properties()
{
console.log("Reached in random prop")
var propdet = firebase.database().ref("properties/");
let iterator_num = 0;
propdet.on("value", function(data) {
let val = data.val();

for(x in val)
{
if(iterator_num==4)
{return;}
//console.log(val[x]);
document.getElementById("recname" + (iterator_num+1).toString()).innerText = val[x].name;
document.getElementById("recloc" + (iterator_num+1).toString()).innerText = val[x].address;
document.getElementById("recbed" + (iterator_num+1).toString()).innerText = val[x].bedroom + " Beds";
document.getElementById("recbath" + (iterator_num+1).toString()).innerText = val[x].bathroom + " Baths";
document.getElementById("recarea" + (iterator_num+1).toString()).innerText = val[x].area;
document.getElementById("img" + (iterator_num+1).toString()).src = "https://firebasestorage.googleapis.com/v0/b/where-should-you-live.appspot.com/o/images%2F"+ x +"?alt=media&token=3e4b4997-6a52-4106-bc9e-34b0cd025e04";
document.getElementById("recname" + (iterator_num+1).toString()).href = "properties-details.html?id=" + x;
iterator_num++;

}


});

}

function addmyprop(arr,num_child,indexes)
{
    let prop_iterator = 0;
    var userdet = firebase.database().ref("users/" + getuserdetails() + "/property/");
    userdet.on("value", function(data_prop) {
    if(data_prop.numChildren()==0){console.log("No myprop");find_similar_houses(arr,num_child,indexes);}

    let val = data_prop.val();
        for(x in val)
        {
            console.log(val[x]);
            indexes.push(val[x])
            prop_iterator++;

            if(prop_iterator==data_prop.numChildren())
            {
            console.log(arr);
            console.log(num_child);
            console.log(indexes);
            find_similar_houses(arr,num_child,indexes);
            return;
            }
        }



});
return;
}