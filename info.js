document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const country = urlParams.get('country');
  const period = urlParams.get('period');
  const category = urlParams.get('category');

  if (!country || !period || !category) {
    document.getElementById('info-container').textContent = "Missing parameters.";
    return;
  }

  // Capitalize country to match JSON filename e.g. France.json
  const countryFile = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();

  fetch(`data/${countryFile}.json`)
    .then(res => {
      if (!res.ok) throw new Error("Data file not found.");
      return res.json();
    })
    .then(data => {
      const periodObj = data.find(entry => entry.period.toLowerCase() === period.toLowerCase());
      if (!periodObj) {
        document.getElementById('info-container').textContent = `No data for period: ${period}`;
        return;
      }

      const categoryContent = periodObj[category.toLowerCase()];
      if (!categoryContent) {
        document.getElementById('info-container').textContent = `No information for category: ${category}`;
        return;
      }

      document.getElementById('info-container').innerHTML = `
        <h2>${periodObj.period} — ${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        <p>${categoryContent}</p>
      `;
    })
    .catch(err => {
      document.getElementById('info-container').textContent = `Error loading data: ${err.message}`;
    });
});
