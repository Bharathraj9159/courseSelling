
  // review-section.js

(function() {
  // Initialize all review-related functionality
  function initReviewSection() {
    // --- Animate Progress Bars ---
    const totalReviews = 120;
    document.querySelectorAll('.rating-row').forEach(row => {
      const count = row.getAttribute('data-count');
      const percentage = (count / totalReviews) * 100;
      const progressFill = row.querySelector('.progress-fill');
      // Trigger CSS transition with a slight delay
      setTimeout(() => {
        progressFill.style.width = percentage + '%';
        progressFill.style.transition = 'width 1.5s ease-out';
      }, 100);
    });

    // --- Star Rating for New Review ---
    let currentRating = 0;
    let stars = document.querySelectorAll('.input-review-star');

    // Remove any existing listeners by cloning nodes (to avoid duplicates)
    stars.forEach(star => {
      star.replaceWith(star.cloneNode(true));
    });
    // Re-select stars after cloning
    stars = document.querySelectorAll('.input-review-star');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        currentRating = star.getAttribute('data-value');
        updateStars(currentRating);
      });
    });

    function updateStars(rating) {
      stars.forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
          star.classList.add('input-review-selected');
        } else {
          star.classList.remove('input-review-selected');
        }
      });
    }

    // --- Post Review Button ---
    const postReviewBtn = document.querySelector('.input-review-post-review');
    if (postReviewBtn) {
      // Replace the button to remove previous event listeners if needed
      postReviewBtn.replaceWith(postReviewBtn.cloneNode(true));
      const newPostReviewBtn = document.querySelector('.input-review-post-review');
      newPostReviewBtn.addEventListener('click', () => {
        const reviewText = document.querySelector('.input-review-review-content').value;
        console.log("Rating:", currentRating, "Review:", reviewText);
        alert(`Review submitted!\nRating: ${currentRating}\nReview: ${reviewText}`);
        // Optionally clear the review content and reset stars
        document.querySelector('.input-review-review-content').value = '';
        currentRating = 0;
        updateStars(currentRating);
      });
    }

    // --- Dummy Extra Reviews and "Load More" Functionality ---
    const extraReviews = [
      { name: "Fiona Green", image: "profile6.jpg", rating: 3, content: "Great service overall." },
      { name: "George King", image: "profile7.jpg", rating: 4, content: "Very satisfied with the quality." },
      { name: "Hannah Scott", image: "profile8.jpg", rating: 5, content: "Excellent! Highly recommend." },
      { name: "Ivan Lopez", image: "profile9.jpg", rating: 4, content: "Good experience, will return." },
      { name: "Jenny Blue", image: "profile10.jpg", rating: 4, content: "Solid performance." },
      { name: "Kevin Parker", image: "profile11.jpg", rating: 2, content: "Could be improved." },
      { name: "Laura May", image: "profile12.jpg", rating: 3, content: "Average, nothing special." },
      { name: "Michael Brown", image: "profile13.jpg", rating: 5, content: "Outstanding work and service." },
      { name: "Natalie Cruz", image: "profile14.jpg", rating: 5, content: "Loved it, exceeded expectations." },
      { name: "Oscar Wilde", image: "profile15.jpg", rating: 4, content: "Great, but room for improvement." }
    ];

    // Use a global variable to maintain the index across reinitializations
    window.currentExtraIndex = 0;
    const increment = 3; // Number of reviews to load per click

    function fetchExtraReviews() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const reviewsToReturn = extraReviews.slice(window.currentExtraIndex, window.currentExtraIndex + increment);
          window.currentExtraIndex += reviewsToReturn.length;
          resolve(reviewsToReturn);
        }, 500); // Simulated network delay
      });
    }

    function createReviewItem(review) {
      const div = document.createElement('div');
      div.classList.add('review-customers-item');

      const headerDiv = document.createElement('div');
      headerDiv.classList.add('review-customers-header');

      const img = document.createElement('img');
      img.classList.add('review-customers-image');
      img.src = review.image;
      img.alt = 'Profile';

      const nameSpan = document.createElement('span');
      nameSpan.classList.add('review-customers-name');
      nameSpan.textContent = review.name;

      headerDiv.appendChild(img);
      headerDiv.appendChild(nameSpan);

      const ratingDiv = document.createElement('div');
      ratingDiv.classList.add('review-customers-rating');
      const ratingSpan = document.createElement('span');
      let starsStr = "";
      const fullStars = Math.round(review.rating);
      for (let i = 0; i < 5; i++) {
        starsStr += i < fullStars ? "★" : "☆";
      }
      ratingSpan.textContent = starsStr;
      ratingDiv.appendChild(ratingSpan);

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('review-customers-content');
      contentDiv.textContent = review.content;

      div.appendChild(headerDiv);
      div.appendChild(ratingDiv);
      div.appendChild(contentDiv);

      return div;
    }

    // --- Load More Reviews Button ---
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
      // Remove previous event listeners by replacing the button
      loadMoreBtn.replaceWith(loadMoreBtn.cloneNode(true));
      const newLoadMoreBtn = document.getElementById('loadMoreBtn');
      newLoadMoreBtn.addEventListener('click', async function() {
        this.disabled = true;
        this.textContent = "Loading...";

        const reviews = await fetchExtraReviews();
        const container = document.getElementById('reviewContainer');
        reviews.forEach(review => {
          container.appendChild(createReviewItem(review));
        });

        if (window.currentExtraIndex >= extraReviews.length) {
          this.style.display = "none";
        } else {
          this.disabled = false;
          this.textContent = "Load More Reviews";
        }
      });
    }
  }

  // Expose the initialization function globally so it can be called on route changes.
  window.initReviewSection = initReviewSection;

  // Automatically initialize if the DOM is ready.
  if (document.readyState !== 'loading') {
    initReviewSection();
  } else {
    document.addEventListener('DOMContentLoaded', initReviewSection);
  }
})();
