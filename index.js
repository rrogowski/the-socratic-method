let lastKnownScrollPosition = 0;
let ticking = false;

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".menu-toggle").forEach((element) => {
    if ("ontouchstart" in document.documentElement) {
      element.addEventListener("touchstart", function (event) {
        document.querySelector("#menu").classList.toggle("visible");
        event.preventDefault();
      });
    } else {
      element.addEventListener("click", () => {
        document.querySelector("#menu").classList.toggle("visible");
      });
    }
  });

  document.querySelectorAll("#menu a").forEach((element) => {
    element.addEventListener("click", () => {
      requestAnimationFrame(() => {
        const menubarHeight = document
          .querySelector("#menubar")
          .getBoundingClientRect().height;
        window.scrollTo({ top: window.scrollY - menubarHeight });
        document.querySelector("#menu").classList.toggle("visible");
      });
    });
  });

  window.addEventListener("scroll", () => {
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const opacity = Math.min(100, lastKnownScrollPosition) / 100;
        document.querySelector(
          "#menubar"
        ).style.backgroundColor = `rgba(4, 38, 48, ${opacity})`;
        ticking = false;
      });
      ticking = true;
    }
  });
});
