const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq__question");

  question.addEventListener("click", () => {
    const answer = item.querySelector(".faq__answer");
    const isActive = question.classList.contains("active");

    // Opcional: Cerrar todos los demás antes de abrir el nuevo
    // faqItems.forEach(otherItem => {
    //   if (otherItem !== item) {
    //     otherItem.querySelector('.faq__question').classList.remove('active');
    //     otherItem.querySelector('.faq__answer').style.maxHeight = null;
    //   }
    // });

    if (isActive) {
      // Si ya está activo, lo cerramos
      question.classList.remove("active");
      answer.style.maxHeight = null;
    } else {
      // Si está cerrado, lo abrimos
      question.classList.add("active");
      // Usamos scrollHeight para darle la altura exacta que necesita el contenido
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
// ===================================
// Lógica para el Menú Hamburguesa
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav-links a");

  // 1. Abrir/Cerrar menú con el botón
  hamburgerBtn.addEventListener("click", () => {
    header.classList.toggle("nav-open");
  });

  // 2. Cerrar el menú al hacer clic en un enlace (para SPAs de una página)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (header.classList.contains("nav-open")) {
        header.classList.remove("nav-open");
      }
    });
  });
});
