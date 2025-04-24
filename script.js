


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
let listings = [];
let map;
let markers = [];
let infoWindow;

function saveListingsToStorage() {
  localStorage.setItem("listings", JSON.stringify(listings));
}

function loadListingsFromStorage() {
  const stored = localStorage.getItem("listings");
  if (stored) {
    listings = JSON.parse(stored);
    listings.forEach((listing) => {
      addListingToMap(listing);
      addListingToPage(listing);
    });
  }
}

function initMap() {
  const gaborone = { lat: -24.6580, lng: 25.9077 };
  map = new google.maps.Map(document.getElementById("map"), 
                            window.map = map;
infoWindow = new google.maps.InfoWindow();
loadListingsFromStorage();
{
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
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("listingForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("listingName").value;
    const description = document.getElementById("listingDescription").value;
    const lat = parseFloat(document.getElementById("listingLat").value);
    const lng = parseFloat(document.getElementById("listingLng").value);

    if (!name || !description || isNaN(lat) || isNaN(lng)) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const newListing = {
      name,
      description,
      lat,
      lng,
    };

    addListingToMap(newListing);
    addListingToPage(newListing);
      listings.push(newListing);
saveListingsToStorage();


    form.reset();
  });
});

function addListingToMap(listing) {
  const marker = new google.maps.Marker({
    position: { lat: listing.lat, lng: listing.lng },
    map: map,
    title: listing.name,
  });

  marker.addListener("click", () => {
    infoWindow.setContent(`<strong>${listing.name}</strong><br>${listing.description}`);
    infoWindow.open(map, marker);
  });

  markers.push({ marker, index: markers.length });
}

function addListingToPage(listing) {
  const container = document.getElementById("listingsContainer");

  const card = document.createElement("div");
  card.innerHTML = `
    <h4>${listing.name}</h4>
    <p>${listing.description}</p>
  `;
  card.style.cursor = "pointer";
  card.addEventListener("click", () => {
    const marker = markers[markers.length - 1].marker;
    map.setCenter(marker.getPosition());
    map.setZoom(14);
    infoWindow.setContent(`<strong>${marker.getTitle()}</strong><br>${listing.description}`);
    infoWindow.open(map, marker);
  });

  container.appendChild(card);
}
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const container = document.getElementById("listingsContainer");
  container.innerHTML = "";

  listings
    .filter((l) => l.name.toLowerCase().includes(query))
    .forEach((listing) => {
      addListingToPage(listing);
    });
});
fetch('listings.json')
  .then(response => response.json())
  .then(data => {
    const listingsContainer = document.getElementById('listings');
    data.forEach(listing => {
      const listingElement = document.createElement('div');
      listingElement.className = 'listing-card';
      listingElement.innerHTML = `
        <img src="${listing.image}" alt="${listing.title}">
        <h3>${listing.title}</h3>
        <p>${listing.price}</p>
        <p>${listing.location}</p>
        <p>${listing.description}</p>
      `;
      listingsContainer.appendChild(listingElement);
    });
  })
  .catch(error => console.error('Error fetching listings:', error));

  
