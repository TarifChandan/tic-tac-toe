const ticTacToe = (function () {
  const winningLines = {
    firstRow: "",
    secondRow: "",
    thirdRow: "",
    firstCol: "",
    secondCol: "",
    thirdCol: "",
    firstCross: "",
    secondCross: "",
  };

  // cacheDom
  const container = document.querySelector(".container");
  const boxes = document.querySelectorAll(".box");
  const gameStatus = document.querySelector(".game-status-box p");
  const restartBtn = document.querySelector(".game-status-box button");
  const form = document.querySelector("form");
  const dialog = document.querySelector("dialog");
  const player1Input = document.querySelector("#player1");
  const player2Input = document.querySelector("#player2");
  const player1Name = document.querySelector(".name-1");
  const player2Name = document.querySelector(".name-2");
  const player1AvatarInput = document.querySelector("#player1-avatar");
  const player2AvatarInput = document.querySelector("#player2-avatar");
  const player1Avatar = document.querySelector(".player-img-1");
  const player2Avatar = document.querySelector(".player-img-2");

  // Init
  const player1 = ["", "X"];
  const player2 = ["", "O"];
  let currentPlayer = player1;
  dialog.showModal();

  // FUNCTIONS
  const switchPlayer = function () {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const addMark = function (target) {
    if (!target.innerHTML && target.classList.contains("box")) {
      const boxLines = target.dataset.name.split("-");
      boxLines.forEach((item) => {
        winningLines[item] += currentPlayer[1];
      });
    }
  };

  const determineWinner = function () {
    let i = 0;
    for (let item in winningLines) {
      if (winningLines[item] === "XXX") {
        displayResult(player1[0], item);
      } else if (winningLines[item] === "OOO") {
        displayResult(player2[0], item);
      } else if (winningLines[item].length === 3) {
        i++;
      }
    }

    if (i === 8) {
      displayResult(false);
    }
  };

  const displayMark = function (target) {
    if (!target.innerHTML && target.classList.contains("box")) {
      const img = document.createElement("img");
      if (currentPlayer[1] === "X") {
        img.setAttribute("src", "images/close-thick-2.svg");
        target.style.backgroundColor = "#a8e78e";
        gameStatus.textContent = `${player2[0]}'s turn to strike!`;
      } else {
        img.setAttribute("src", "images/circle-outline-2.svg");
        target.style.backgroundColor = "#F9D45B";
        gameStatus.textContent = `${player1[0]}'s turn to strike!`;
      }
      img.setAttribute("class", `mark-${currentPlayer[1]}`);
      target.appendChild(img);
    }
  };

  const displayResult = function (winner, winningLine) {
    if (winner) {
      gameStatus.textContent = `${winner} claims victory!`;
      boxes.forEach((box) => {
        if (!box.dataset.name.includes(winningLine)) {
          box.style.backgroundColor = "transparent";
        }
      });
    } else {
      gameStatus.textContent = "Too smart for each other! It's a tie.";
    }
    gameStatus.style.backgroundColor = "#0D0D29";
    container.style.pointerEvents = "none";
    restartBtn.style.display = "block";
  };

  const restartGame = function () {
    for (let item in winningLines) {
      winningLines[item] = "";
    }

    boxes.forEach((box) => {
      box.innerHTML = "";
      box.style.backgroundColor = "transparent";
    });

    container.style.pointerEvents = "auto";
    currentPlayer = player1;
    gameStatus.textContent = `${currentPlayer[0]}'s turn to strike!`;
    gameStatus.style.backgroundColor = "#F34854";
    restartBtn.style.display = "none";
  };

  const startGame = function (p1Name, p2Name, p1Avatar, p2Avatar) {
    p1Name[0] = player1Input.value;
    p2Name[0] = player2Input.value;

    if (player1AvatarInput.files[0]) {
      p1Avatar.style.backgroundImage = `url("${URL.createObjectURL(
        player1AvatarInput.files[0]
      )}")`;
    }

    if (player2AvatarInput.files[0]) {
      p2Avatar.style.backgroundImage = `url("${URL.createObjectURL(
        player2AvatarInput.files[0]
      )}")`;
    }

    player1Input.value = "";
    player2Input.value = "";

    gameStatus.textContent = `${currentPlayer[0]}'s turn to strike!`;
    player1Name.textContent = p1Name[0];
    player2Name.textContent = p2Name[0];
  };

  // Bind Events
  container.addEventListener("click", (e) => {
    addMark(e.target);
    displayMark(e.target);
    determineWinner();
    switchPlayer();
  });

  restartBtn.addEventListener("click", restartGame);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    startGame(player1, player2, player1Avatar, player2Avatar);
    dialog.close();
  });

  return { addMark };
})();
