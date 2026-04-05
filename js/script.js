/* ===============================
   FILE UPLOAD
================================ */
let uploadedFile = null;
function openFile() {
    document.getElementById("resumeFile").click();
}

function showFileName() {
    const fileInput = document.getElementById("resumeFile");
    uploadedFile = fileInput.files[0];

    document.getElementById("fileName").textContent =
        uploadedFile
            ? "Selected file: " + uploadedFile.name
            : "No file selected";
}

/* ===============================
   STEP 1 → SAVE DATA
================================ */
async function validateForm() {
    const jobTitle = document.getElementById("jobTitle").value.trim();
    const resumeInput = document.getElementById("resumeFile");

    if (!jobTitle) {
        alert("Please enter desired job title");
        return;
    }

    if (resumeInput.files.length === 0) {
        alert("Please upload your resume file");
        return;
    }

    const file = resumeInput.files[0];

    const formData = new FormData();
    formData.append("resume", file);

    try {
    const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData
    });

    console.log("RESPONSE STATUS:", response.status);

    const data = await response.json();
    console.log("RESPONSE DATA:", data);

    if (!response.ok) {
        throw new Error(data.error || "Upload failed");
    }

    localStorage.setItem("jobTitle", jobTitle);
    localStorage.setItem("resumeFileName", data.file_name);

    window.location.href = "resume.html";

} catch (error) {
    console.error("UPLOAD ERROR:", error);
    alert("Upload failed: " + error.message);
}
}

/* ===============================
   AUTOCOMPLETE
================================ */
const jobTitles = [
    "Python Developer",
    "Python Full Stack Developer",
    "Data Analyst",
    "Data Scientist",
    "Machine Learning Engineer",
    "Backend Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "AI Engineer",
    "Software Engineer",
    "Django Developer"
];

function showSuggestions() {
    const input = document.getElementById("jobTitle").value.toLowerCase();
    const box = document.getElementById("suggestions");
    box.innerHTML = "";

    if (!input) {
        box.style.display = "none";
        return;
    }

    jobTitles
        .filter(job => job.toLowerCase().includes(input))
        .forEach(job => {
            const div = document.createElement("div");
            div.textContent = job;
            div.onclick = () => {
                document.getElementById("jobTitle").value = job;
                box.style.display = "none";
            };
            box.appendChild(div);
        });

    box.style.display = "block";
}

/* ===============================
   JOB DESCRIPTION PAGE
================================ */
async function analyzeJob() {
    const jd = document.getElementById("jobDescription").value;

    if (!jd) {
        alert("Please paste job description");
        return;
    }

    const fileName = localStorage.getItem("resumeFileName");

    const formData = new FormData();
    formData.append("file_name", fileName);
    formData.append("job_description", jd);

    const response = await fetch("http://localhost:8000/analyze/", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    localStorage.setItem("score", data.score);
    localStorage.setItem("matched", data.matched_skills);
    localStorage.setItem("missing", data.missing_skills);
    localStorage.setItem("experience", data.experience);
    localStorage.setItem("education", data.education);
    localStorage.setItem("suggestions", JSON.stringify(data.suggestions));
    window.location.href = "result.html";
}

/* ===============================
   ATS ANALYSIS + EXCEL SPEEDOMETER
================================ */
document.addEventListener("DOMContentLoaded", function () {

    // Run ONLY on result.html
    if (!document.getElementById("needle")) return;

    /* ===== GET REAL DATA FROM BACKEND ===== */
    const score = parseInt(localStorage.getItem("score")) || 0;
    const matched = localStorage.getItem("matched") || "None";
    const missing = localStorage.getItem("missing") || "None";

    /* ===== SPEEDOMETER ===== */
    const needle = document.getElementById("needle");
    const gaugeValue = document.getElementById("gaugeValue");

    const angle = (score / 100) * 180 - 90;

    setTimeout(() => {
        needle.style.transform = `rotate(${angle}deg)`;
    }, 300);

    let current = 0;
    const interval = setInterval(() => {
        current++;
        gaugeValue.textContent = current + "%";

        if (current >= score) {
            clearInterval(interval);
            gaugeValue.textContent = score + "%";
        }
    }, 15);

    /* ===== TEXT RESULTS ===== */
    document.getElementById("matchedSkills").textContent = matched;
    document.getElementById("missingSkills").textContent = missing;
    const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
    document.getElementById("suggestions").textContent =
        suggestions.length ? suggestions.join(", ") : "No suggestions";

    document.getElementById("grammarIssues").textContent =
        "Grammar check will be handled using Python NLP backend.";

    document.getElementById("experience").textContent =
        localStorage.getItem("experience")
            ? localStorage.getItem("experience") + " years"
            : "Not found";

    document.getElementById("education").textContent =
        localStorage.getItem("education") || "Not found";

});

 

  

/* ===============================
   CLOUD PLACEHOLDERS
================================ */
function uploadFromDropbox() {
    alert("Dropbox integration will be implemented in backend.");
}

function uploadFromGoogleDrive() {
    alert("Google Drive integration will be implemented in backend.");
}

/* ===============================
   STEP 2 → SAVE RESUME
================================ */
function saveResume() {
    alert("Resume saved successfully!");
    window.location.href = "job.html";
}
