//UI Elements
const openExplanationPopup = document.getElementById("openExplanation-popup");
const explanationPopup = document.getElementById("explanation-popup");
const closeExplanationPopup = document.getElementById("close-popupButton");
const welcomePage = document.getElementById("welcome");
const startGame = document.getElementById("start-button");
const levelSelectionButton = document.getElementById("levelSelection-button");
const levelSelectionDisplay = document.getElementById("levelSelection");
const backMenuButton = document.getElementById("backToWelcome-button");
const buttonLoadLvl1 = document.getElementById("lvl1Button");
const buttonLoadLvl2 = document.getElementById("lvl2Button");
const boardGame = document.getElementById("container");

function endGame() {
  boardGame.classList.add("hidden");
  firstLevel.classList.add("hidden");
  welcomePage.classList.remove("hidden");
}

//WELCOME PAGE//
//Pops up explanation
openExplanationPopup.addEventListener("click", () => {
  explanationPopup.classList.remove("hidden");
});

//Close explanation
closeExplanationPopup.addEventListener("click", () => {
  explanationPopup.classList.add("hidden");
});

//Starts Game
function startNewGame() {
  welcomePage.classList.add("hidden");
  boardGame.classList.remove("hidden");
  levelSelectionDisplay.classList.add("hidden");
  firstLevel.classList.remove("hidden");

  loadLevel1();
}

startGame.addEventListener("click", () => startNewGame());

//SELECTION GAME GRID
//Opens selection game-grid
levelSelectionButton.addEventListener("click", () => {
  welcomePage.classList.add("hidden");
  levelSelectionDisplay.classList.remove("hidden");
});

//Back menu button
backMenuButton.addEventListener("click", () => {
  levelSelectionDisplay.classList.add("hidden");
  welcomePage.classList.remove("hidden");
});

buttonLoadLvl1.addEventListener("click", () => startNewGame());

buttonLoadLvl2.addEventListener("click", () => {
  const overlay = document.createElement("div");
  overlay.classList.add("feedback-overlay");
  overlay.textContent = "Level 2 is still in construction!";
  document.body.appendChild(overlay);

  // Remove the overlay after 1.5 seconds
  setTimeout(() => {
    overlay.classList.add("fade-out");
    setTimeout(() => {
      overlay.remove();
    }, 500);
  }, 1600);
});
