/* =======================
   TAB SWITCHING
======================= */
const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".page");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    pages.forEach(p => {
      p.classList.remove("active");
      p.style.animation = "none";
    });

    tab.classList.add("active");
    const page = document.getElementById(tab.dataset.page);
    page.classList.add("active");
    page.style.animation = "fadeUp 0.6s ease";
  });
});

const projects = document.querySelectorAll(".project-card");
const loadMoreBtn = document.getElementById("loadMore");

let visibleCount = 3;

// hide extra projects
projects.forEach((card, index) => {
  if (index >= visibleCount) card.style.display = "none";
});

loadMoreBtn.addEventListener("click", () => {
  let shown = 0;

  projects.forEach(card => {
    if (card.style.display === "none" && shown < 3) {
      card.style.display = "block";
      shown++;
    }
  });

  if ([...projects].every(p => p.style.display === "block")) {
    loadMoreBtn.style.display = "none";
  }
});


/* =======================
   CONTACT FORM (EmailJS)
======================= */
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  emailjs.sendForm('service_9h9j7rz', 'template_7ehmf4p', this)
    .then(() => {
      alert('Message sent successfully!');
      this.reset();
    }, (error) => {
      console.error('FAILED...', error);
      alert('Oops! Something went wrong.');
    });
});

const phrases = [
  "Web Developer.",
  "Android App Developer.",
  "Machine Learning.",
  "Power BI.",
  "Problem Solver.."
];

let i = 0; // current phrase index
let j = 0; // current character index
const speed = 60; // typing speed in ms
const pause = 500; // pause after full phrase

const element = document.getElementById("about-text");

function typePhrase() {
  if (j < phrases[i].length) {
    element.innerHTML += phrases[i].charAt(j);
    j++;
    setTimeout(typePhrase, speed);
  } else {
    // After completing the phrase, wait and then start deleting
    setTimeout(deletePhrase, pause);
  }
}

function deletePhrase() {
  if (j > 0) {
    element.innerHTML = phrases[i].substring(0, j - 1);
    j--;
    setTimeout(deletePhrase, speed / 2);
  } else {
    // Move to next phrase
    i = (i + 1) % phrases.length;
    setTimeout(typePhrase, speed);
  }
}

// Start typing when page loads
window.addEventListener("load", typePhrase);
