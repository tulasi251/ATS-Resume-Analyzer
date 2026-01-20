/* ===============================
   FILE UPLOAD
================================ */
function openFile() {
    document.getElementById("resumeFile").click();
}

function showFileName() {
    const fileInput = document.getElementById("resumeFile");
    const fileNameDisplay = document.getElementById("fileName");

    fileNameDisplay.textContent =
        fileInput.files.length > 0
            ? "Selected file: " + fileInput.files[0].name
            : "No file selected";
}

/* ===============================
   STEP 1 → SAVE DATA
================================ */
function validateForm() {
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

    localStorage.setItem("jobTitle", jobTitle);
    localStorage.setItem("resumeFileName", resumeInput.files[0].name);

    window.location.href = "resume.html";
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
function analyzeJob() {
    const jd = document.getElementById("jobDescription").value.trim();

    if (!jd) {
        alert("Please paste job description");
        return;
    }

    localStorage.setItem("jobDescription", jd.toLowerCase());
    window.location.href = "result.html";
}

/* ===============================
   ATS ANALYSIS + EXCEL SPEEDOMETER
================================ */
document.addEventListener("DOMContentLoaded", function () {

    // Run ONLY on result.html
    if (!document.getElementById("needle")) return;

    /* ===== SIMULATED RESUME SKILLS ===== */
    const resumeSkills = [
        "python",
        "django",
        "html",
        "css",
        "javascript"
    ];

    /* ===== JOB REQUIRED SKILLS ===== */
    const jdSkills = [
        "python",
        "django",
        "html",
        "css",
        "javascript",
        "sql",
        "rest api",
        "git"
    ];

    let matched = [];
    let missing = [];

    jdSkills.forEach(skill => {
        if (resumeSkills.includes(skill)) {
            matched.push(skill);
        } else {
            missing.push(skill);
        }
    });

    const score = Math.round((matched.length / jdSkills.length) * 100);

    /* ===== EXCEL-STYLE SPEEDOMETER + ANIMATION ===== */
    const needle = document.getElementById("needle");
    const gaugeValue = document.getElementById("gaugeValue");

    // Convert score (0–100) → angle (-90° to +90°)
    const angle = (score / 100) * 180 - 90;

    // Smooth needle animation
    setTimeout(() => {
        needle.style.transform = `rotate(${angle}deg)`;
    }, 300);

    // Animated score counter
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
    document.getElementById("matchedSkills").textContent =
        matched.length ? matched.join(", ") : "No skills matched";

    document.getElementById("missingSkills").textContent =
        missing.length ? missing.join(", ") : "No missing skills";

    document.getElementById("grammarIssues").textContent =
        "Grammar check will be handled using Python NLP backend.";
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
