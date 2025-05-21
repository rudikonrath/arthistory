document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const country = urlParams.get('country');
  const category = urlParams.get('category');
  const period = urlParams.get('period');

  if (!country || !category || !period) {
    document.getElementById('info-container').textContent = "Missing parameters.";
    return;
  }

  fetch(`data/${country}.json`)
    .then(res => {
      if (!res.ok) throw new Error("Data file not found.");
      return res.json();
    })
    .then(data => {
      // Find the period entry
      const periodObj = data.find(entry => entry.period.toLowerCase() === period.toLowerCase());
      if (!periodObj) {
        document.getElementById('info-container').textContent = `No details found for ${period}.`;
        return;
      }

      // Check if category exists inside that period entry
      if (!periodObj[category]) {
        document.getElementById('info-container').textContent = `No data available for ${category}.`;
        return;
      }

      // Display the content for the category
      document.getElementById('info-container').innerHTML = `
        <h2>${periodObj.period} - ${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        <p>${periodObj[category]}</p>
      `;
    })
    .catch(err => {
      document.getElementById('info-container').textContent = `Error loading data: ${err.message}`;
    });
});
