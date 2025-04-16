

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
document.addEventListener("DOMContentLoaded", () => {
  const listings = [
    {
      name: "Tsholofelo Apartments",
      price: 1200,
      location: "Block 9",
      lat: -24.656,
      lng: 25.913,
      image: "https://via.placeholder.com/300x200?text=Tsholofelo"
    },
    {
      name: "Phase 2 Housing",
      price: 950,
      location: "Phase 2",
      lat: -24.654,
      lng: 25.901,
      image: "https://via.placeholder.com/300x200?text=Phase+2"
    }
  ];

  const listingsContainer = document.createElement("div");
  listingsContainer.style.display = "flex";
  listingsContainer.style.flexWrap = "wrap";
  listingsContainer.style.justifyContent = "center";
  listingsContainer.style.margin = "2rem";

  listings.forEach(listing => {
    const card = document.createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "10px";
    card.style.margin = "1rem";
    card.style.padding = "1rem";
    card.style.width = "300px";
    card.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
    card.innerHTML = `
      <img src="${listing.image}" alt="${listing.name}" style="width: 100%; border-radius: 8px;" />
      <h3>${listing.name}</h3>
      <p>📍 ${listing.location}</p>
      <p>💰 BWP ${listing.price}/month</p>
    `;
    listingsContainer.appendChild(card);
  });

  document.body.insertBefore(listingsContainer, document.querySelector("footer"));
});

  
