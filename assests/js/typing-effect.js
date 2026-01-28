document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target); // Stop observing once animation starts
        }
      });
    },
    {
      threshold: 0.1, // Start animation when 10% of the element is visible
    }
  );

  // Observe all elements with class 'typing-text'
  document.querySelectorAll(".typing-text").forEach((text) => {
    observer.observe(text);
  });
});
