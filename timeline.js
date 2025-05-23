// Parse country from URL
const urlParams = new URLSearchParams(window.location.search);
let country = urlParams.get('country');

if (!country) {
  document.getElementById('timeline-container').textContent = "No country specified!";
} else {

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

function displayTimeline(data) {
  const container = document.getElementById('timeline-container');
  container.innerHTML = '';

  // Group entries by period
  const grouped = {};
  data.forEach(entry => {
    if (!grouped[entry.period]) {
      grouped[entry.period] = [];
    }
    grouped[entry.period].push(entry);
  });

  // Loop through each period
  for (const period in grouped) {
    const detailsWrapper = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = period;
    detailsWrapper.appendChild(summary);

    // Sort entries by start date (just in case)
    const sortedEntries = grouped[period].sort((a, b) => parseInt(a.start) - parseInt(b.start));

    sortedEntries.forEach(entry => {
      const entryDiv = document.createElement('div');
      entryDiv.classList.add('timeline-entry');
      entryDiv.innerHTML = `
        <h4>${entry.start} – ${entry.end}</h4>
        <p>${entry.details}</p>
        <div class="category-boxes">
          <button data-category="literature">Literature</button>
          <button data-category="film">Film</button>
          <button data-category="theatre">Theatre</button>
          <button data-category="paintings">Paintings</button>
          <button data-category="sculptures">Sculptures</button>
        </div>
      `;

      // Add button listeners
      entryDiv.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const category = button.getAttribute('data-category');
          const periodEncoded = encodeURIComponent(entry.period);
          const countryEncoded = encodeURIComponent(country);
          const categoryEncoded = encodeURIComponent(category);
          window.location.href = `info.html?country=${countryEncoded}&period=${periodEncoded}&category=${categoryEncoded}`;
        });
      });

      detailsWrapper.appendChild(entryDiv);
    });

    container.appendChild(detailsWrapper);
  }
}

