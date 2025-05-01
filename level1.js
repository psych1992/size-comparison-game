// Game elements
const imagesGame1 = document.querySelectorAll(".gameImagesLvl1");
const ball1 = document.getElementById("ball1");
const ball2 = document.getElementById("ball2");
const cow1 = document.getElementById("cow1");
const cow2 = document.getElementById("cow2");
const questionLvl1 = document.getElementById("questionLvl1");
const feedbackDisplay = document.getElementById("feedback");
const firstLevel = document.getElementById("firstLevel");

//Object with the properties of each task of level 1
const levelData = [
  {
    prompt: "Which is the biggest ball?",
    correctAnswer: "ball2",
    ball1: { size: 1 },
    ball2: { size: 1.2 },
    image1: "ball1",
    image2: "ball2",
  },
  {
    prompt: "Which is the tallest cow?",
    correctAnswer: "cow1",
    cow1: { height: 1.1 },
    cow2: { height: 1 },
    image1: "cow1",
    image2: "cow2",
  },
  {
    prompt: "Which is the smallest ballon?",
    correctAnswer: "ball2",
    ball1: { size: 1.2 },
    ball2: { size: 1 },
    image1: "ball1",
    image2: "ball2",
  },

  {
    prompt: "Which is the shortest cow?",
    correctAnswer: "cow2",
    cow1: { height: 1.1 },
    cow2: { height: 1 },
    image1: "cow1",
    image2: "cow2",
  },
];

let task = 0;
let currentQuestion = "";

//Load level 1 from the start
function loadLevel1() {
  task = 0;
  currentQuestion = "";
  loadTaskLvl1();
}

function loadTaskLvl1() {
  // Check if all tasks are completed
  if (task >= levelData.length) {
    // Handle level completion
    endGame(); // eventually: nextLevel()
    return;
  }

  let currentTask = levelData[task];
  currentQuestion = currentTask.prompt;
  questionLvl1.textContent = currentQuestion;

  // Reset all images
  imagesGame1.forEach((image) => {
    image.classList.add("hidden");
    image.classList.remove("animationHover");
  });

  // Setup images for current task
  imagesGame1.forEach((image) => {
    const imageId = image.id;
    const imageData = currentTask[imageId];

    if (imageId === currentTask.image1 || imageId === currentTask.image2) {
      //Visibility and hover
      image.classList.remove("hidden");
      image.classList.add("animationHover");
      image.addEventListener("click", () => checkAnswer(imageId, currentTask));

      //Array preparing the rules for modifying the images with short-circuiting &&
      const imgTransforms = [
        imageData?.size && `scale(${imageData.size})`,
        imageData?.height && `scaleY(${imageData.height})`,
      ].filter(Boolean); //Removes falsy values

      //Apply transformations if any exists
      if (imgTransforms.length) {
        ////CSS custom variable for storing the transform info for css, to use it in hover states
        image.style.setProperty("--current-transform", imgTransforms.join(" "));
        //Makes the image's transformation effective
        image.style.transform = imgTransforms.join(" ");
      } else {
        image.style.transform = ""; //Clear if no transformations
      }
    }
  });
}

function checkAnswer(imageId, currentTask) {
  if (imageId === currentTask.correctAnswer) {
    console.log(imageId, " is the right answer");
    rightAnswer();
  } else {
    console.log(imageId, " is the wrong answer");
    wrongAnswer(imageId, currentTask);
  }
}

function rightAnswer() {
  // Hide game level and show feedback
  firstLevel.classList.add("hidden");
  feedbackDisplay.classList.remove("hidden");
  feedbackDisplay.classList.add("show");

  // After 2 seconds, hide feedback
  setTimeout(() => {
    feedbackDisplay.classList.remove("show");
    // After additional 0.5 seconds, show game level and load next task
    setTimeout(() => {
      feedbackDisplay.classList.add("hidden");
      firstLevel.classList.remove("hidden");
      loadNextTask();
    }, 500);
  }, 2000);
}

function wrongAnswer(imageId, currentTask) {
  // Create fixed-position feedback overlay (thus avoiding layout shifts)
  const overlay = document.createElement("div");
  overlay.classList.add("feedback-overlay");
  overlay.textContent = "Try again!";
  document.body.appendChild(overlay);

  // Remove the overlay after 1.5 seconds
  setTimeout(() => {
    overlay.classList.add("fade-out");
    setTimeout(() => {
      overlay.remove();
    }, 500);
  }, 1500);
}

function loadNextTask() {
  task++;
  currentQuestion = "";
  loadTaskLvl1();
}
