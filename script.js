// Prevent animation on load
setTimeout(() => {
    document.body.classList.remove("preload");
  }, 500);
  
  // DOM
  const btnRules = document.querySelector(".rules-btn");
  const btnClose = document.querySelector(".close-btn");
  const modalRules = document.querySelector(".modal");
  
  const CHOICES = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissors",
    },
  ];
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const gameDiv = document.querySelector(".game");
  const resultsDiv = document.querySelector(".results");
  const resultDivs = document.querySelectorAll(".results__result");
  
  const resultWinner = document.querySelector(".results__winner");
  const resultText = document.querySelector(".results__text");
  
  const playAgainBtn = document.querySelector(".play-again");
  const nextBtn = document.querySelector(".next");
  const rulesBtn = document.querySelector(".rules-btn");
  const scoreNumber = document.querySelector(".score__number");
  const cmpNumber = document.querySelector(".cmp__number");
  let cmpScore = 0;
  let score = 0;

  // Load scores from local storage
if (localStorage.getItem("userScore")) {
  score = parseInt(localStorage.getItem("userScore"));
  scoreNumber.innerText = score;
}

if (localStorage.getItem("cmpScore")) {
  cmpScore = parseInt(localStorage.getItem("cmpScore"));
  cmpNumber.innerText = cmpScore;
}

  
  // Game Logic
  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choiceName = button.dataset.choice;
      const choice = CHOICES.find((choice) => choice.name === choiceName);
      choose(choice);
    });
  });
  
  function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
  }
  
  function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
  }
  
  function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="images/${results[idx].name}.png" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * 1000);
    });
  
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  }
  
  function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());
  
      if (userWins) {
        resultText.innerText = "you win against pc";
        resultDivs[0].classList.toggle("winner");
        keepScore(1);
        cmpKeepScore(-1);
        nextBtn.style.display = "block";
        rulesBtn.style.right = "200px";

      } else if (aiWins) {
        resultText.innerText = "you lose against pc";
        resultDivs[1].classList.toggle("winner");
        keepScore(-1);
        cmpKeepScore(1);
        nextBtn.style.display = "none";
        rulesBtn.style.right = "2rem";
      } else {
        resultText.innerText = "tie up";
        nextBtn.style.display = "none";
        rulesBtn.style.right = "2rem";
      }
      resultWinner.classList.toggle("hidden");
      resultsDiv.classList.toggle("show-winner");
    }, 1000);
  }
  
  function isWinner(results) {
    return results[0].beats === results[1].name;
  }
  
  function keepScore(point) {
    score += point;
    scoreNumber.innerText = score;
    localStorage.setItem("userScore", score);

  }

  function cmpKeepScore(points) {
    cmpScore += points;
    cmpNumber.innerText = cmpScore;
    localStorage.setItem("cmpScore", cmpScore);

  }
  
  // Play Again
  playAgainBtn.addEventListener("click", () => {
    nextBtn.style.display = "none";
    rulesBtn.style.right = "2rem";
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
  
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  });
  
  // Show/Hide Rules
  btnRules.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
  });
  btnClose.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
  });
