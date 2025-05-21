// Parse country from URL
const urlParams = new URLSearchParams(window.location.search);
let country = urlParams.get('country');

if (!country) {
  document.getElementById('timeline-container').textContent = "No country specified!";
} else {
  // Capitalize first letter, lowercase rest (to match filename)
  country = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();

  // Show country name in heading
  document.getElementById('country-name').textContent = `Timeline for ${country}`;

  // Fetch country JSON file
  fetch(`data/${country}.json`)
    .then(response => {
      if (!response.ok) throw new Error("No data found");
      return response.json();
    })
    .then(data => {
      displayTimeline(data);
    })
    .catch(error => {
      document.getElementById('timeline-container').innerHTML = `
        <p>No timeline data found for <strong>${country}</strong>.</p>
      `;
    });
}

// Function to display timeline with clickable entries
function displayTimeline(data) {
  const container = document.getElementById('timeline-container');
  container.innerHTML = ''; // Clear loading text

  data.forEach(entry => {
    const div = document.createElement('div');
    div.classList.add('timeline-entry');
    div.innerHTML = `
      <h3>${entry.period}</h3>
      <p><strong>${entry.start} - ${entry.end}</strong></p>
      <p>${entry.summary || entry.details || ''}</p>
    `;
    // Click leads to detail page with country & period params
    div.addEventListener('click', () => {
      const periodEncoded = encodeURIComponent(entry.period);
      const countryEncoded = encodeURIComponent(country);
      window.location.href = `detail.html?country=${countryEncoded}&period=${periodEncoded}`;
    });

    container.appendChild(div);
  });
}
