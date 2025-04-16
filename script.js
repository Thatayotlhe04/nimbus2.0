

function initMap() {
    const defaultLocation = { lat: 24.6580, lng: 25.9077 }; 
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: defaultLocation,
    });
  
    new google.maps.Marker({
      position: defaultLocation,
      map: map,
      title: "Housing Location",
    });
  }
  
  window.initMap = initMap;
  // Load the Google Maps script dynamically
  const script = document.createElement("script");
  console.log("Google Maps initialized.");
  