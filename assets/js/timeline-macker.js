fetch("data/career.json")
  .then((response) => response.json())
  .then((data) => {
    // Process the loaded JSON data
    setHTMLValues(data.timeline.item);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function setHTMLValues(data) {
  const dataContainer = document.getElementById("timeline-row");
  // Iterate over the data array and create HTML elements
  data.forEach((item) => {
    const timelineItemDiv = document.createElement("div");
    timelineItemDiv.className = "timeline-item";
    timelineItemDiv.innerHTML = `
    <div class="timeline-item-inner outer-shadow">
    <i class="fas fa-briefcase icon"></i>
    <span>${item.start}-${item.end}</span>
    <h3>${item.position}</h3>
    <h4>${item.company}, ${item.location}</h4>
    <p>${item.summary}</p>
   </div>
      `;
    dataContainer.appendChild(timelineItemDiv);
  });
}
