document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const country = urlParams.get('country');
  const period = urlParams.get('period');

  if (!country || !period) {
    document.getElementById('page-title').textContent = "Missing parameters.";
    return;
  }

  const filePath = `data/${country}.json`;
  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error("Data file not found.");
      return res.json();
    })
    .then(data => {
      const periodData = data.find(entry => entry.period.toLowerCase() === period.toLowerCase());
      if (!periodData) {
        document.getElementById('info-container').innerHTML = `<p>No data available for ${period}.</p>`;
        return;
      }

      document.getElementById('page-title').textContent = `${periodData.period} in ${country}`;

      renderCategorySections(periodData);
    })
    .catch(err => {
      document.getElementById('info-container').innerHTML = `<p>Error loading data: ${err.message}</p>`;
    });
});

function renderCategorySections(data) {
  const container = document.getElementById('info-container');

  // Loop through all properties except period/start/end/details
  const excludedKeys = ['period', 'start', 'end', 'details'];
  for (const key in data) {
    if (excludedKeys.includes(key)) continue;

    const category = data[key];
    const categorySection = document.createElement('section');

    const heading = document.createElement('h2');
    heading.textContent = category.heading;
    categorySection.appendChild(heading);

    category.sections.forEach(section => {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = section.title;

      const para = document.createElement('p');
      para.textContent = section.content;

      details.appendChild(summary);
      details.appendChild(para);
      categorySection.appendChild(details);
    });

    container.appendChild(categorySection);
  }
}
