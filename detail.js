document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const country = urlParams.get('country');
  const period = urlParams.get('period');

  if (!country || !period) {
    document.getElementById('detail-container').textContent = "Invalid URL parameters.";
    return;
  }

  const countryFile = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();

  fetch(`data/${countryFile}.json`)
    .then(res => {
      if (!res.ok) throw new Error("Data file not found.");
      return res.json();
    })
    .then(data => {
      const periodObj = data.find(entry => entry.period.toLowerCase() === period.toLowerCase());
      if (!periodObj) {
        document.getElementById('detail-container').textContent = `No details found for period: ${period}`;
      } else {
        document.getElementById('detail-container').innerHTML = `
          <h2>${periodObj.period}</h2>
          <p><strong>${periodObj.start} - ${periodObj.end}</strong></p>
          <p>${periodObj.details}</p>
        `;
      }
    })
    .catch(err => {
      document.getElementById('detail-container').textContent = `Error loading data: ${err.message}`;
    });
});
