let page = 0;
let totalprop = 0;
let propertylist;

function next()
{
    console.log("nex");
    
       
    if((page+1)*10 <totalprop)
    {
        $('.property-box-5').empty();
        page++;
        $('#pageno').text(page+1+"");
        let iterator = 0;
        for(x in propertylist)
        {
            if(iterator>= page*10 && iterator<= (page+1)*10 )
            {
                console.log(iterator);
                $clone = $('.property-box-5:last').clone();
                $clone.insertAfter('.property-box-5:last');
            }

            iterator++;
        }
        
    }
    else
    {

    }
}

function prev()
{
    console.log("prev");
    if(page!= 0)
    {
        
    }
    else
    {
        
    }
}



function getProperty(result)
{
    var refAddress = "properties"
    var userdet = firebase.database().ref(refAddress);
    var prev;
    
    userdet.on("value", function(data) {
        let val = data.val();
        properties = val;
        console.log(val);
        
        let iterator = 0;
        totalprop = data.numChildren();
        $("#totalprop").text(totalprop + " Result found");
        //console.log(data.numChildren());
        for(x in val)
        {
            
            
            //console.log(val[x]);

            //document.getElementById("item").style.visibility = "visible";
            $("#name").text(val[x].name);
            $("#name").attr("href","properties-details.html?id="+x);          
            $("#area").text(val[x].area);
            $("#detail").text(val[x].detail.substring(0,100)+"...");
            $("#price").text("$ " +val[x].price);
            $("#bed").text(val[x].bedroom);
            $("#bath").text(val[x].bathroom);
            $("#address").text(val[x].address);

            if(iterator==0)
            {document.getElementById('fav' + (iterator).toString()).id = x}
            else
            {document.getElementById(prev).id = x}
            prev = x;

            checkfav(document.getElementById(prev).id);

            $("#imageref").attr("src","https://firebasestorage.googleapis.com/v0/b/where-should-you-live.appspot.com/o/images%2F"+ x +"?alt=media&token=3e4b4997-6a52-4106-bc9e-34b0cd025e04");
            //document.getElementById("name").innerText = val[x].name;
            //document.getElementById("price").innerText = propdata.val().price;
            //document.getElementById("location").innerText = propdata.val().city;
            //document.getElementById("views").innerHTML = view;
            if(val[x].rent == true)
            {
                $("#sell").text("for Rent");
            }
            if(val[x].sale == true)
            {
                $("#sell").text("for Sale");
            }

            iterator += 1;
            if(iterator== Math.min(data.numChildren(),10) )
            {return;}
            $clone = $('#item').clone();
            
            $clone.attr("id","random");
            console.log(iterator);
            $clone.appendTo('#contain');
            


        }
    });
}

function favorite(result)
{
console.log(result);
if(result.className == "fa fa-heart-o" )
{
//console.log($("#result.className"))
result.className = "fa fa-heart";

var userRef = firebase.database().ref("users/" + localStorage.UID + "/favorites");
userRef.push(result.id);
console.log("favorite pushed!!");
}

else
{
result.className = "fa fa-heart-o";
var userRef = firebase.database().ref("users/" + localStorage.UID + "/favorites");
userRef.on("value", function(data) {
let val = data.val();
    for(x in val)
    {
        if(val[x]==result.id){console.log("Property Found!!");userRef.child(x).remove();}
    }
    });    
console.log("favorite deleted!!");
}


//class="fa fa-heart"
//var userRef = firebase.database().ref("users/" + localStorage.UID + "/favorites");
//userRef.push(result.id);
//console.log("favorite pushed!!")

}

function checkfav(propnm)
{
var userRef = firebase.database().ref("users/" + localStorage.UID + "/favorites");
userRef.on("value", function(data) {
let val = data.val();
    //console.log(propnm);
    for(x in val)
    {
    if(val[x]==propnm)
    {console.log("Present here");document.getElementById(propnm).className="fa fa-heart";return;}
    }
    });
    console.log("Not here");
    return;
}