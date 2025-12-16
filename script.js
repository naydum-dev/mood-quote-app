// STEP 1: Get all the elements we need from HTML
const moodButtons = document.querySelectorAll(".mood-btn");
const quoteText = document.getElementById("quote-text");
const newQuoteBtn = document.getElementById("new-quote-btn");
const streakCount = document.getElementById("streak-count");

// STEP 2: Create quote collections for each mood
const quotes = {
  happy: [
    "Your smile is contagious! Keep spreading joy today! 😊",
    "Happiness looks gorgeous on you! Shine bright! ✨",
    "You're radiating positive energy! Keep it up! 🌟",
    "Your joy is inspiring others around you! 💛",
    "What a beautiful day to be happy! Celebrate it! 🎉",
  ],
  sad: [
    "It's okay to not be okay. Tomorrow is a new day. 🌅",
    "Storms don't last forever. Sunshine is coming. ☀️",
    "You are stronger than you think. This too shall pass. 💪",
    "Be gentle with yourself. You're doing your best. 🤗",
    "Even the darkest night will end and the sun will rise. 🌄",
  ],
  stressed: [
    "Take a deep breath. You've got this! 💨",
    "One step at a time. You don't have to do it all today. 🚶",
    "Pressure makes diamonds. You're becoming stronger! 💎",
    "It's okay to take a break. Rest is productive too. ☕",
    "You've overcome 100% of your bad days so far. Keep going! 🎯",
  ],
  motivated: [
    "Your determination is unstoppable! Go crush those goals! 🚀",
    "The only limit is the one you set yourself. Break it! 🔥",
    "Success is the sum of small efforts repeated daily! 💯",
    "You're not just dreaming, you're DOING! Keep pushing! ⚡",
    "Greatness is within you. Today is your day! 👑",
  ],
};

// STEP 3: Variable to track currently selected mood
let currentMood = null;

// STEP 4: Load streak from browser storage when page loads
let streak = localStorage.getItem("moodStreak") || 0;
streakCount.textContent = streak;

// STEP 5: Function to display a random quote based on mood
function displayQuote(mood) {
  const moodQuotes = quotes[mood];
  const randomIndex = Math.floor(Math.random() * moodQuotes.length);
  const randomQuote = moodQuotes[randomIndex];
  quoteText.textContent = randomQuote;
}

// STEP 6: Function to update streak counter
function updateStreak() {
  const today = new Date().toDateString();
  const lastCheckIn = localStorage.getItem("lastCheckIn");

  if (lastCheckIn !== today) {
    // New day, increment streak
    streak++;
    localStorage.setItem("moodStreak", streak);
    localStorage.setItem("lastCheckIn", today);
    streakCount.textContent = streak;
  }
}

// STEP 7: Add click event to each mood button
moodButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove 'active' class from all buttons
    moodButtons.forEach((btn) => btn.classList.remove("active"));

    // Add 'active' class to clicked button
    this.classList.add("active");

    // Get the mood from data attribute
    currentMood = this.getAttribute("data-mood");

    // Display quote for selected mood
    displayQuote(currentMood);

    // Update streak counter
    updateStreak();
  });
});

// STEP 8: Add click event to "Get Another Quote" button
newQuoteBtn.addEventListener("click", function () {
  if (currentMood) {
    displayQuote(currentMood);
  } else {
    quoteText.textContent = "Please select a mood first! 😊";
  }
});
