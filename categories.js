document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const country = urlParams.get('country');
  const period = urlParams.get('period');

  if (!country || !period) {
    document.getElementById('category-container').textContent = "Missing parameters.";
    return;
  }

  const countryFormatted = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();

  document.getElementById('category-title').textContent = `Select category for ${period} in ${countryFormatted}`;

  const categories = ['Books', 'Film', 'Theatre']; // Adjust as needed

  const container = document.getElementById('category-container');
  container.innerHTML = '';

  categories.forEach(cat => {
    const box = document.createElement('div');
    box.classList.add('category-box');
    box.textContent = cat;
    box.style.border = "1px solid #333";
    box.style.padding = "15px";
    box.style.margin = "10px 0";
    box.style.cursor = "pointer";
    box.style.width = "200px";
    
    box.addEventListener('click', () => {
      const catEncoded = encodeURIComponent(cat);
      const periodEncoded = encodeURIComponent(period);
      const countryEncoded = encodeURIComponent(country);
      window.location.href = `detail.html?country=${countryEncoded}&period=${periodEncoded}&category=${catEncoded}`;
    });

    container.appendChild(box);
  });
});
