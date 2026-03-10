fetch("data/timeline.json")
  .then((response) => response.json())
  .then((data) => {
    // Process the loaded JSON data
    setExperience(data.timeline.experience);
    setEducation(data.timeline.education);
    setSkills(data.timeline.skills);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function setExperience(data) {
  const dataContainer = document.getElementById("timeline-experience");
  // Iterate over the data array and create HTML elements
  data.forEach((item) => {
    const timelineItemDiv = document.createElement("div");
    timelineItemDiv.className = "timeline-item";
    timelineItemDiv.innerHTML = `
    <div class="timeline-item-inner outer-shadow">
      <i class="fas fa-briefcase icon"></i>
      <span>${item.start} - ${item.end}</span>
      <h3>${item.position}</h3>
      <h4>${item.company}, ${item.location}</h4>
      <p>${item.summary}</p>
    </div>
      `;
    dataContainer.appendChild(timelineItemDiv);
  });
}

function setEducation(data) {
  const dataContainer = document.getElementById("timeline-education");
  // Iterate over the data array and create HTML elements
  data.forEach((item) => {
    const timelineItemDiv = document.createElement("div");
    timelineItemDiv.className = "timeline-item";
    timelineItemDiv.innerHTML = `
        <div class="timeline-item-inner outer-shadow">
          <span>${item.start} - ${item.end}</span>
          <h3>${item.position}</h3>
          <h4>${item.company}, ${item.location}</h4>
          <p>${item.summary}</p>
        </div>
      `;
    dataContainer.appendChild(timelineItemDiv);
  });
}
function setSkills(data) {
  const dataContainer = document.getElementById("timeline-skills");
  // Iterate over the data array and create HTML elements
  data.forEach((item) => {
    const timelineItemDiv = document.createElement("div");
    timelineItemDiv.className = "skill-item";
    timelineItemDiv.innerHTML = `
    <p>${item.name}</p>
    <div class="progress inner-shadow">
        <div class="progress-bar" style="width: calc(${item.value_percent}% - 14px);">
            <span>${item.value_percent}%</span>
        </div>
    </div>
      `;
    dataContainer.appendChild(timelineItemDiv);
  });
}
