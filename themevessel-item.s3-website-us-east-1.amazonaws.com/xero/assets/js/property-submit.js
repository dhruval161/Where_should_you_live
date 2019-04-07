function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("location not supported in browser");
    }
}

var latitude,longitude;

function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    latitude = position.coords.latitude;
    longitude= position.coords.longitude;
}

// initialize storage reference
const storageService = firebase.storage();
const storageRef = storageService.ref();

// handle upload change
document.querySelector('#fileupload').addEventListener('change', handleFileUploadChange);
let selectedFile;
function handleFileUploadChange(e){
  selectedFile = e.target.files[0];
}

function addProperty()
{
    //create a child directory called images, and place the file inside this directory
    const uploadTask = storageRef.child(`images/${localStorage.UID}`).put(selectedFile); 

    uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        }, (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        }, () => {
           // Do something once upload is complete
           console.log('success');
        });
      

    console.log(""+latitude + longitude );
}