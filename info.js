document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const country = urlParams.get('country');
  const period = urlParams.get('period');
  const category = urlParams.get('category');

  if (!country || !period || !category) {
    document.getElementById('info-container').textContent = "Missing parameters.";
    return;
  }

  fetch(`data/${country}.json`)
    .then(res => {
      if (!res.ok) throw new Error("Data file not found.");
      return res.json();
    })
    .then(data => {
      const match = data.find(entry => entry.period.toLowerCase() === period.toLowerCase());

      if (!match) {
        document.getElementById('info-container').textContent = `No data found for period: ${period}`;
        return;
      }

      const categoryContent = match[category.toLowerCase()];
      if (!categoryContent) {
        document.getElementById('info-container').textContent = `No data available for ${category} in ${period}`;
        return;
      }

      document.getElementById('info-container').innerHTML = `
        <h2>${period} – ${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        <p>${categoryContent}</p>
      `;
    })
    .catch(err => {
      document.getElementById('info-container').textContent = `Error: ${err.message}`;
    });
});

