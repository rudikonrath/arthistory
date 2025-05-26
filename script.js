const map = L.map('map', {
  minZoom: 2,
  maxZoom: 18,
  maxBounds: [
    [-90, -180],
    [90, 180]
  ],
  maxBoundsViscosity: 1.0
}).setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

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
        layer.bindPopup(feature.properties.name);

        layer.on('click', () => {
          const country = feature.properties.name;
          window.location.href = `timeline.html?country=${encodeURIComponent(country)}`;
        });
      }
    }).addTo(map); 
  })
  .catch(err => console.error("Failed to load GeoJSON", err));
