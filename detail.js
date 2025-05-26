document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const country = urlParams.get('country');
  const period = urlParams.get('period');
  const category = urlParams.get('category');

  if (!country || !period || !category) {
    document.getElementById('detail-container').textContent = "Missing parameters.";
    return;
  }

  const countryFile = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();


  const filePath = `data/${countryFile}/${category.toLowerCase()}.json`;

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error("Data file not found.");
      return res.json();
    })
    .then(data => {

      const periodObj = data.find(entry => entry.period.toLowerCase() === period.toLowerCase());
      if (!periodObj) {
        document.getElementById('detail-container').textContent = `No details found for ${period} in category ${category}`;
      } else {
        document.getElementById('detail-container').innerHTML = `
          <h2>${periodObj.period} - ${category}</h2>
          <p><strong>${periodObj.start} - ${periodObj.end}</strong></p>
          <div>${periodObj.details}</div>
        `;
      }
    })
    .catch(err => {
      document.getElementById('detail-container').textContent = `Error loading data: ${err.message}`;
    });
});
