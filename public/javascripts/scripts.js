//generate randon message
// Array of love quotes
quotes = [];
const loveQuotes = [
  {
    text: "You're my sunshine on a cloudy day. ☀️",
  },
  {
    text: "You're a blooming flower in my garden of life. 🌸",
  },
  {
    text: "You're the reason my heart skips a beat. 💖",
  },
  {
    text: "With you, every day feels like a rainbow after the rain. 🌈",
  },
  {
    text: "You shine brighter than all the stars in the sky. ⭐",
  },
  {
    text: "You’re my favorite kind of magic. ✨",
  },
  {
    text: "You’re the melody to my heart's song. 🎶",
  },
  {
    text: "Like a sunflower, you always bring warmth and light. 🌻",
  },
  {
    text: "You make the world smell sweeter just by being in it. 🌼",
  },
  {
    text: "You color my life with endless joy. 🎨",
  },
  {
    text: "You're as sweet as honey, and twice as golden. 🍯",
  },
  {
    text: "You’re the strawberry on top of life’s sundae. 🍓",
  },
  {
    text: "Being with you feels like butterflies dancing in my heart. 🦋",
  },
  {
    text: "Your smile is my favorite kind of happiness. 😊",
  },
  {
    text: "You’re a rare gem in this world. 💎",
  },
  {
    text: "You light up my life like a flame in the dark. 🔥",
  },
  {
    text: "Your love is a wave that sweeps me off my feet. 🌊",
  },
  {
    text: "You’re the love letter my heart has been waiting to open. 💌",
  },
  {
    text: "You are my moon when the night feels too long. 🌙",
  },
  {
    text: "You're my soft place to land, always comforting. 🛏️",
  },
  {
    text: "You’re sweeter than the finest chocolate. 🍫",
  },
  {
    text: "You’re one of a kind, like a magical unicorn. 🦄",
  },
  {
    text: "You lift me up like a balloon soaring in the sky. 🎈",
  },
  {
    text: "Your kindness is like a field of blooming daisies. 🌼",
  },
  {
    text: "You leave little pawprints on my heart. 🐾",
  },
  {
    text: "You make every season feel like autumn—cozy and warm. 🍂",
  },
  {
    text: "You're the reason my inbox is full of love. 📧",
  },
  {
    text: "Your presence is like a breath of fresh air. 🌬️",
  },
  {
    text: "You're the sweetest slice of life. 🍰",
  },
  {
    text: "In my book, you win the gold medal in everything. 🥇",
  },
  {
    text: "You’re the best gift life has ever given me. 🎁",
  },
  {
    text: "You're the icing on my cupcake. 🧁",
  },
  {
    text: "You’re my lucky charm, always bringing good vibes. 🍀",
  },
  {
    text: "Even when the stars fade, you’re my brightest light. 🌟",
  },
  {
    text: "You're refreshing, like a cool summer breeze. 🍃",
  },
  {
    text: "Your love feels like a warm hug for my soul. 🤗",
  },
  {
    text: "Like autumn leaves, you bring beauty in every step. 🍁",
  },
  {
    text: "You paint the world with your kindness. 🎨",
  },
  {
    text: "Every moment with you is like catching a butterfly. 🦋",
  },
  {
    text: "You're the apple of my eye, always perfect. 🍏",
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
