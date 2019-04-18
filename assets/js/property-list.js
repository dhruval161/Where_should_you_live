let page = 0;
let totalprop = 0;
let propertylist = [];
let allproperties = [] ;
let currentIds =[];
let allprop
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
                if(propertylist[x].detail)
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
        propertylist = Object.assign(val,{});
        allproperties = Object.assign(val,{});
        console.log(allproperties)
        console.log(val);
        
        let iterator = 0;
        totalprop = data.numChildren();
        allprop = data.numChildren();
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
if(loggedin())
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

else
{
    console.log("redirect");
    setTimeout(function(){
        location.href = "login.html";
    },100);

}
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

function search()
{
    search_min_price = document.getElementById('select_price').getElementsByTagName('span')[0].innerHTML;
    search_max_price = document.getElementById('select_price').getElementsByTagName('span')[1].innerHTML;
    search_area = document.getElementById('select_area').value;
    search_status = document.getElementById('select_status').value;
    search_location = document.getElementById('select_location').value;
    search_bedrooms = document.getElementById('select_bedrooms').value;
    search_bathrooms = document.getElementById('select_bathrooms').value;
    console.log(search_area);
    console.log(search_status);
    console.log(search_location);
    console.log(search_bedrooms);
    console.log(search_bathrooms);


    let countSearch = 0;
    if(search_area!== 'Area From')
    countSearch++;
    if(search_bathrooms!== 'Bathrooms')
    countSearch++;
    if(search_bedrooms!== 'Bedrooms')
    countSearch++;
    if(search_status!== 'Property Status')
    countSearch++;
    if(search_location!== 'Location')
    countSearch++;

    // for Price
    countSearch++;
    search_max_price = search_max_price.substr(0,search_max_price.length -4);
    search_min_price = search_min_price.substr(0,search_min_price.length -4);
    console.log(search_min_price);
    console.log(search_max_price);

    propertylist =  JSON.parse(JSON.stringify(allproperties));
    totalprop = allprop;
    console.log(propertylist)
    console.log(allproperties);
    
    for(x in propertylist)
    {
        let curRes = 0;
        if(search_area!== 'Area From')
        {
            if(parseInt(propertylist[x].area) >= parseInt(search_area))
            {
                curRes++;
            }
        }
        if(search_bathrooms!== 'Bathrooms')
        {
            if(parseInt(propertylist[x].bathroom) === parseInt(search_bathrooms))
            {
                curRes++;
            }
        }
        if(search_bedrooms!== 'Bedrooms')
        {
            if(parseInt(propertylist[x].bedroom) === parseInt(search_bedrooms))
            {
                curRes++;
            }
        }
        if(search_location!== 'Location')
        {
            if(propertylist[x].city === search_location)
            {
                curRes++;
            }
        }
        if(search_status!== 'Property Status')
        {
            if(search_status=== 'For Rent' && propertylist[x].rent == true)
            curRes++;
            else if(search_status==='For Sale' && propertylist[x].sale == true)
            curRes++;
        }
        if( parseInt(propertylist[x].price) <= parseInt(search_max_price) && parseInt(propertylist[x].price) >= parseInt(search_min_price) )
        {
            curRes++;
        }
        if(curRes !== countSearch)
        {
            delete propertylist[x];
            totalprop--;
        }
    }
    
    $("#totalprop").text(totalprop + " Result found");

    for(id of currentIds)
    {
        $('#prop'+id).css('display','none');
    }
    currentIds.length = 0;

    let iterator = 0;
    let num =0;
    page = 0;
    $('#pageno').text(page+1+"");
    for(x in propertylist)
    {
        console.log(x);
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

    

    $('#prv').css('background-color','#274CBF');
    if(totalprop <= 10)
        $('#nxt').css('background-color','#274CBF');

    
}