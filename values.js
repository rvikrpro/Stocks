//Enter to search
var input = document.getElementById("search");
input.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
  event.preventDefault();
  if(!(document.getElementById('search').value===''))
  func()
}});
//Make text field required before searching
const submitBtn = document.getElementById('submit');
const uName = document.getElementById('search');
const checkEnableButton = () => {
  submitBtn.disabled = !(uName.value  !== 'Choose');
}
uName.addEventListener('change', checkEnableButton);
//location retreiver
getPositionobject1('first');
function getPositionobject1(objectid) {
			if (navigator.geolocation) {
				  var timeoutVal = 10 * 1000 * 1000;
				  navigator.geolocation.watchPosition(
					function(position) {displayPosition(position, objectid)},
					displayError,
					{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
				  );
		}}

//send location data to global variable
		function displayPosition(position, objectid) {
		  //alert(objectid + " ##  Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
		  var geometry = (position.coords.latitude).toString();
      var geo=(position.coords.longitude).toString();
		  sendToServer(objectid, geometry,geo);
		}
//Errors while retreiving location
		function displayError(error) {
		  var errors = {
			1: 'Permission denied',
			2: 'Position unavailable',
			3: 'Request timeout'
		  };
		  alert("Error: " + errors[error.code]);
		}
      var a,b;
		function sendToServer(id, geom,g) {
			a=geom;
      b=g;
		}
//calc on search
function func(){
  //get user text
      var x=document.getElementById("search").value;
      x.toLowerCase();
      x = x.replace(/[ ,./!@\\%$*&#(){}[\]+=-?<>]/g, "");
//Check if location enabled
      if(!a)
       {alert('allow location to proceed,accept location and reload page');return;}
      document.getElementById("demo").style.display="block";
      document.getElementById("demo0").innerHTML="";
      document.getElementById("demo1").innerHTML="";
      document.getElementById("demo2").innerHTML="";
      document.getElementById("demo3").innerHTML="";
      document.getElementById("demo4").innerHTML="";
      //Find distance
    for(let ra of shops){
        lat1=parseFloat(a);
        lon1=parseFloat(b);
        lat2=ra.data.latitudes;
        lon2=ra.data.longitudes;
        lon1 =  lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let aa = Math.pow(Math.sin(dlat / 2), 2)
                 + Math.cos(lat1) * Math.cos(lat2)
                 * Math.pow(Math.sin(dlon / 2),2);
        let c = 2 * Math.asin(Math.sqrt(aa));
        let r = 6371;
        ra.data.distance=c*r;
       }
  //Sort by distance
shops.sort((ad, bd) => (ad.data.distance > bd.data.distance) ? 1 : ((bd.data.distance > ad.data.distance) ? -1 : 0));     
     //If items available,display
      var w=0;
      for(let k of shops){
        if(w==5)break;
        let machine = k.data[x];
        if(machine){
        document.getElementById(`demo${w}`).innerHTML
        ="<p style='font-style:bold;font-size:20px'>"+k.data["name"]+
        " </p>"+
        "<img style='cursor:text;align:right;height:20px;width:20px'src='./images/arrow.png'><span> "
        +k.data.distance.toFixed(2)+" km from here</span><hr><p style='color:purple;'>"+machine+
        "</p><a style='font-family:Comfortaa;'href='shop"+`${k.id}`+".html target='_self'>"
        +"View all other products</a><br>";
        w++;
        }
      }
      if(document.getElementById("demo0").innerHTML===''){
        document.getElementById("demo0").innerHTML="Oops not available / try again"
      }
    }
    //till here time complexity O(nlog(n))