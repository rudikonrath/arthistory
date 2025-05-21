// Initialize the map and set the view to a global zoom
const map = L.map('map').setView([20, 0], 2);

// Add a base layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load the GeoJSON data for countries
fetch('countries.geo.json')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#444",
        weight: 1,
        fillColor: "#ccc",
        fillOpacity: 0.7
      },
      onEachFeature: (feature, layer) => {
        // Bind popup with country name
        layer.bindPopup(feature.properties.name);

        // Make it clickable
        layer.on('click', () => {
          const country = feature.properties.name;
          window.location.href = `timeline.html?country=${encodeURIComponent(country)}`;
        });
      }
    }).addTo(map); // ✅ This is the correct closing point
  })
  .catch(err => console.error("Failed to load GeoJSON", err));
