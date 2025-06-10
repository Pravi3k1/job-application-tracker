const BACKEND_URL = "http://localhost:5000/api/jobs";

async function fetchJobs() {
  try {
    const response = await fetch(BACKEND_URL);
    const jobs = await response.json();

    const jobList = document.getElementById("job-list");
    jobList.innerHTML = "";

    jobs.forEach(job => {
      const jobCard = document.createElement("div");
      jobCard.className = "job-card";
      jobCard.innerHTML = `
        <h3>${job.companyName}</h3>
        <p><strong>Position:</strong> ${job.position}</p>
        <p><strong>Status:</strong> ${job.status}</p>
        <p><strong>Applied Date:</strong> ${new Date(job.appliedDate).toLocaleDateString()}</p>
        <button onclick="deleteJob('${job._id}')">Delete</button>
      `;
      jobList.appendChild(jobCard);
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
}

async function addJob() {
  const companyName = document.getElementById("companyName").value;
  const position = document.getElementById("position").value;
  const status = document.getElementById("status").value;
  const appliedDate = document.getElementById("appliedDate").value;

  if (!companyName || !position || !appliedDate) {
    alert("Please fill in all fields.");
    return;
  }

  const newJob = { companyName, position, status, appliedDate };

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob)
    });

    if (response.ok) {
      fetchJobs();
      document.querySelectorAll('.add-form input').forEach(input => input.value = '');
    } else {
      alert("Failed to add job");
    }
  } catch (error) {
    console.error("Error adding job:", error);
  }
}

async function deleteJob(id) {
  try {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      fetchJobs();
    } else {
      alert("Failed to delete job");
    }
  } catch (error) {
    console.error("Error deleting job:", error);
  }
}

function filterJobs() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".job-card");

  cards.forEach(card => {
    const content = card.textContent.toLowerCase();
    card.style.display = content.includes(input) ? "block" : "none";
  });
}

window.onload = fetchJobs;
window.onload = () => {
  fetchJobs();
  document.getElementById("searchInput").value = ""; // clear search field on load
};


window.onload = () => {
  fetchJobs();
  document.getElementById("searchInput").value = ""; // clear search input on page load
};

function filterJobs() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".job-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(query) ? "block" : "none";
  });
}

window.onload = () => {
  fetchJobs();
  document.getElementById("searchInput").value = "";
};

function filterJobs() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".job-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(query) ? "block" : "none";
  });
}

// On page load
window.onload = () => {
  fetchJobs();
  document.getElementById("searchInput").value = "";
  setupDarkModeToggle();
};

function setupDarkModeToggle() {
  const toggle = document.getElementById("toggleDarkMode");

  // Check saved preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
  });
}
