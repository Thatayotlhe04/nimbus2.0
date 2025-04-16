

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
listingsContainer.id = "listingsContainer";
  listingsContainer.style.display = "flex";
  listingsContainer.style.flexWrap = "wrap";
  listingsContainer.style.justifyContent = "center";
  listingsContainer.style.margin = "2rem";
  document.body.insertBefore(listingsContainer, document.querySelector("footer"));

  const searchInput = document.getElementById("searchInput");
  const priceInput = document.getElementById("priceInput");

  function displayListings(filtered) {
    listingsContainer.innerHTML = "";
    filtered.forEach(listing => {
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
  }

  function filterListings() {
    const location = searchInput.value.toLowerCase();
    const maxPrice = parseInt(priceInput.value);

    const filtered = listings.filter(listing => {
      const matchesLocation = listing.location.toLowerCase().includes(location);
      const matchesPrice = isNaN(maxPrice) || listing.price <= maxPrice;
      return matchesLocation && matchesPrice;
    });

    displayListings(filtered);
  }

  searchInput.addEventListener("input", filterListings);
  priceInput.addEventListener("input", filterListings);

  displayListings(listings);
});

let map; // global map
let markers = []; // store markers
let infoWindow;

function initMap() {
  const gaborone = { lat: -24.6580, lng: 25.9077 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: gaborone,
  });

  infoWindow = new google.maps.InfoWindow();

  const listings = [
    {
      name: "Tsholofelo Apartments",
      lat: -24.656,
      lng: 25.913,
    },
    {
      name: "Phase 2 Housing",
      lat: -24.654,
      lng: 25.901,
    }
  ];

  listings.forEach((listing, index) => {
    const marker = new google.maps.Marker({
      position: { lat: listing.lat, lng: listing.lng },
      map: map,
      title: listing.name,
    });

    marker.addListener("click", () => {
      infoWindow.setContent(`<strong>${listing.name}</strong>`);
      infoWindow.open(map, marker);
    });

    markers.push({ marker, index });
  });

  connectCardsToMarkers();
}

function connectCardsToMarkers() {
  // Wait a bit for cards to load in DOM
  setTimeout(() => {
    const cards = document.querySelectorAll("#listingsContainer > div");
    cards.forEach((card, index) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        const { marker } = markers[index];
        map.setCenter(marker.getPosition());
        map.setZoom(14);
        infoWindow.setContent(`<strong>${marker.getTitle()}</strong>`);
        infoWindow.open(map, marker);
      });
    });
  }, 500);
}



  
