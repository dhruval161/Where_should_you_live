let page = 0;
let totalprop = 0;
let propertylist = [];
let currentIds =[];
function next()
{
    console.log("nex");
    console.log(page,totalprop)  
    if((page+1)*10 <totalprop)
    {
        $('#prv').css('background-color','white');
        console.log("rem");
        
        page++;
        $('#pageno').text(page+1+"");
        
        for(id of currentIds)
        {
            $('#prop'+id).css('display','none');
        }
        currentIds.length = 0;
        //$('#item').attr('hidden','true');

        let iterator = 0;
        let num =0;
        for(x in propertylist)
        {
            console.log(x);
            console.log(iterator+' '+page);
            if(num>= page*10 && num< (page+1)*10 )
            {
                $("#name").text(propertylist[x].name);
                $("#name").attr("href","properties-details.html?id="+x);          
                $("#area").text(propertylist[x].area);
                $("#detail").text(propertylist[x].detail.substring(0,100)+"...");
                $("#price").text("$ " +propertylist[x].price);
                $("#bed").text(propertylist[x].bedroom);
                $("#bath").text(propertylist[x].bathroom);
                $("#address").text(propertylist[x].address);


                $("#imageref").attr("src","https://firebasestorage.googleapis.com/v0/b/where-should-you-live.appspot.com/o/images%2F"+ x +"?alt=media&token=3e4b4997-6a52-4106-bc9e-34b0cd025e04");
                if(propertylist[x].rent == true)
                {
                    $("#sell").text("for Rent");
                }
                if(propertylist[x].sale == true)
                {
                    $("#sell").text("for Sale");
                }

                
                
                $clone = $('#item').clone();
                
                $clone.attr("id","prop"+x);
                currentIds.push(x);
                console.log(iterator);
                $clone.find('#fav0').attr('id',x);
                $clone.appendTo('#contain');

                $('#prop'+x).css('display','block');
                checkfav(x);
                iterator++;
            }

            num++;
            
        }
        if((page+1)*10 >=totalprop)
        $('#nxt').css('background-color','#274CBF');
    }
    else
    {
        $('#nxt').css('background-color','#274CBF');
    }
}

function prev()
{
    console.log("prev");
    if(page!= 0)
    {
        $('#nxt').css('background-color','white');
        console.log("rem");
        
        page--;
        $('#pageno').text(page+1+"");
        
        for(id of currentIds)
        {
            $('#prop'+id).css('display','none');
        }
        currentIds.length = 0;
        //$('#item').attr('hidden','true');

        let iterator = 0;
        let num =0;
        for(x in propertylist)
        {
            console.log(x);
            console.log(iterator+' '+page);
            if(num>= page*10 && num< (page+1)*10 )
            {
                console.log('running');
                $("#name").text(propertylist[x].name);
                $("#name").attr("href","properties-details.html?id="+x);          
                $("#area").text(propertylist[x].area);
                $("#detail").text(propertylist[x].detail.substring(0,100)+"...");
                $("#price").text("$ " +propertylist[x].price);
                $("#bed").text(propertylist[x].bedroom);
                $("#bath").text(propertylist[x].bathroom);
                $("#address").text(propertylist[x].address);


                $("#imageref").attr("src","https://firebasestorage.googleapis.com/v0/b/where-should-you-live.appspot.com/o/images%2F"+ x +"?alt=media&token=3e4b4997-6a52-4106-bc9e-34b0cd025e04");
                if(propertylist[x].rent == true)
                {
                    $("#sell").text("for Rent");
                }
                if(propertylist[x].sale == true)
                {
                    $("#sell").text("for Sale");
                }

                
                
                $clone = $('#item').clone();
                
                $clone.attr("id","prop"+x);
                currentIds.push(x);
                console.log(iterator);
                $clone.find('#fav0').attr('id',x);
                $clone.appendTo('#contain');


                $('#prop'+x).css('display','block')
                checkfav(x);
                iterator++;
            }

            num++;
        }
        if(page == 0)
        $('#prv').css('background-color','#274CBF');
    }
    else
    {
        
    }
}



function getProperty(result)
{
    var refAddress = "properties"
    var userdet = firebase.database().ref(refAddress);
    
    userdet.on("value", function(data) {
        let val = data.val();
        propertylist = val;
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

            
            

            $("#imageref").attr("src","https://firebasestorage.googleapis.com/v0/b/where-should-you-live.appspot.com/o/images%2F"+ x +"?alt=media&token=3e4b4997-6a52-4106-bc9e-34b0cd025e04");
            if(val[x].rent == true)
            {
                $("#sell").text("for Rent");
            }
            if(val[x].sale == true)
            {
                $("#sell").text("for Sale");
            }

            iterator += 1;
            if(iterator> Math.min(data.numChildren(),10) )
            {  break;}
            
            $clone = $('#item').clone();
            
            $clone.attr("id","prop"+x);
            currentIds.push(x);
            console.log(iterator);
            $clone.find('#fav0').attr('id',x);
            $clone.appendTo('#contain');
            
            
            checkfav(x);
            $('#prop'+x).css('display','block')

        }

        $('#prv').css('background-color','#274CBF');
        if(data.numChildren() <= 10)
            $('#nxt').css('background-color','#274CBF');
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
            {
                console.log("Present here");document.getElementById(propnm).className="fa fa-heart";return;
            }   
        }
    });
    console.log("Not here");
    return;
}