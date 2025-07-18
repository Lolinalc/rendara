const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq__question");

  question.addEventListener("click", () => {
    const answer = item.querySelector(".faq__answer");
    const isActive = question.classList.contains("active");

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.querySelector(".faq__question").classList.remove("active");
        otherItem.querySelector(".faq__answer").style.maxHeight = null;
      }
    });

    if (isActive) {
      question.classList.remove("active");
      answer.style.maxHeight = null;
    } else {
      question.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav-links a");

  hamburgerBtn.addEventListener("click", () => {
    header.classList.toggle("nav-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (header.classList.contains("nav-open")) {
        header.classList.remove("nav-open");
      }
    });
  });
});
