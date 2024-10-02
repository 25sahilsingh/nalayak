//generate randon message
// Array of love quotes
quotes = [];
const loveQuotes = [
  {
    text: "Love is composed of a single soul inhabiting two bodies.",
  },
  {
    text: "The best thing to hold onto in life is each other.",
  },
  {
    text: "You know you’re in love when you can’t fall asleep because reality is finally better than your dreams.",
  },
  {
    text: "Love is not about how many days, months, or years you’ve been together. Love is about how much you love each other every day.",
  },
  {
    text: "To love and be loved is to feel the sun from both sides.",
  },
  // Add more quotes here...
];

// Function to generate a random quote
function getRandomLoveQuote() {
  const randomIndex = Math.floor(Math.random() * loveQuotes.length);
  return loveQuotes[randomIndex];
}
for (var a = 0; a <= 14; a++) {
  quotes.push(getRandomLoveQuote().text);
}
// -------------------------------------------------------------------------------------------------------------------------------
// Debounce function to prevent rapid keypress triggering
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Handle key press events (ArrowLeft, ArrowRight)
document.addEventListener(
  "keydown",
  debounce(function (e) {
    const radios = document.querySelectorAll('input[name="photo-slider"]');
    if (radios.length === 0) return; // Exit if no radio buttons

    // Find the index of the currently checked radio button
    let currentIndex = Array.from(radios).findIndex((radio) => radio.checked);

    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % radios.length;
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + radios.length) % radios.length;
    } else {
      return; // Exit if key is not ArrowLeft or ArrowRight
    }

    radios[currentIndex].checked = true;
    updatePhotoTransitions(); // Trigger the image transition
  }, 150)
);

const container = document.querySelector(".messtext");
const text = document.querySelector(".paratext");

function adjustFontSize() {
  let fontSize = 50; // Start with a large font size
  text.style.fontSize = `${fontSize}px`;

  // Decrease font size until it fits within the container's width and height
  while (
    (text.scrollHeight > container.clientHeight ||
      text.scrollWidth > container.clientWidth) &&
    fontSize > 10
  ) {
    fontSize -= 1;
    text.style.fontSize = `${fontSize}px`;
  }
}

// Call the function initially and on window resize
adjustFontSize();
window.addEventListener("resize", adjustFontSize);

/*----------------------*/
// Photo transitions for the current, previous, and next photos
const radios = document.querySelectorAll('input[name="photo-slider"]');
const photoViews = document.querySelectorAll(".photo-card");
var paratext = document.getElementById("textpara");
function updatePhotoTransitions() {
  if (radios.length === 0 || photoViews.length === 0) return; // Exit if no radios or photos
  // Reset all photo views
  photoViews.forEach((view) => {
    view.style.transform = "translateX(0%) scale(0)";
    view.style.opacity = "0.4";
    view.style.zIndex = "0";
  });

  // Find the currently checked radio button
  const currentIndex = Array.from(radios).findIndex((radio) => radio.checked);
  paratext.innerHTML = quotes[currentIndex];
  if (currentIndex === -1) return; // Exit if no radio is checked

  // Set the current photo to be active
  const currentPhoto = photoViews[currentIndex];
  if (currentPhoto) {
    currentPhoto.style.transform = "translateX(0) scale(1)";
    currentPhoto.style.opacity = "1";
    currentPhoto.style.zIndex = "1";
  }

  // Handle the previous photo (moving left)
  const previousIndex = (currentIndex - 1 + radios.length) % radios.length;
  const previousPhoto = photoViews[previousIndex];
  if (previousPhoto) {
    previousPhoto.style.transform = "translateX(-40%) scale(0.8)";
    previousPhoto.style.opacity = "0.4";
    previousPhoto.style.zIndex = "0";
  }

  // Handle the next photo (moving right)
  const nextIndex = (currentIndex + 1) % radios.length;
  const nextPhoto = photoViews[nextIndex];
  if (nextPhoto) {
    nextPhoto.style.transform = "translateX(40%) scale(0.8)";
    nextPhoto.style.opacity = "0.4";
    nextPhoto.style.zIndex = "0";
  }
}

// Add event listeners to the radio buttons
radios.forEach((radio) => {
  radio.addEventListener("change", updatePhotoTransitions);
});

// Initial update to set the correct state
updatePhotoTransitions();
