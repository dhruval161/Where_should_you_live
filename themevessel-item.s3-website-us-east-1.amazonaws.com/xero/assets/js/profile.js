
var database = firebase.database();

var ref = database.ref();

ref.on("value",function(snapshot){
    console.log(snapshot.val());
},function(err){
    console.log("error");
});
