\// Parse country from URL
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

  data.forEach(entry => {
    const div = document.createElement('div');
    div.classList.add('timeline-entry');
    div.innerHTML = `
      <h3>${entry.period}</h3>
      <p><strong>${entry.start} - ${entry.end}</strong></p>
      <p>${entry.details}</p>
      <div class="category-boxes">
        <button data-category="literature">Literature</button>
        <button data-category="film">Film</button>
        <button data-category="theatre">Theatre</button>
        <button data-category="paintings">Paintings</button>
        <button data-category="sculptures">Sculptures</button>
      </div>
    `;

    // Add event listeners to buttons
    div.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent any other click behavior
        const category = button.getAttribute('data-category');
        const periodEncoded = encodeURIComponent(entry.period);
        const countryEncoded = encodeURIComponent(country);
        const categoryEncoded = encodeURIComponent(category);
        window.location.href = `info.html?country=${countryEncoded}&period=${periodEncoded}&category=${categoryEncoded}`;
      });
    });

    container.appendChild(div);
  });
}

