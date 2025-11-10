const gameRendering = (() => {
  const container = document.querySelector(".container");
  const boxes = document.querySelectorAll(".box");
  const gameStatus = document.querySelector(".game-status-box p");
  const restartBtn = document.querySelector(".game-status-box button");

  // UI interactions
  container.addEventListener("click", (e) =>
    PubSub.publish("boxClicked", e.target)
  );

  restartBtn.addEventListener("click", () => PubSub.publish("restartGame"));

  // Subscriptions
  PubSub.subscribe("boxMarked", ({ target, player }) => {
    const img = document.createElement("img");
    img.src =
      player[1] === "X"
        ? "images/close-thick-2.svg"
        : "images/circle-outline-2.svg";
    img.classList.add(`mark-${player[1]}`);
    target.style.backgroundColor = player[1] === "X" ? "#a8e78e" : "#F9D45B";
    target.appendChild(img);
  });

  PubSub.subscribe("playerSwitched", (player) => {
    gameStatus.textContent =
      player[1] === "X"
        ? `${gameBoard.player1[0]}'s turn to strike!`
        : `${gameBoard.player2[0]}'s turn to strike!`;
    gameStatus.style.backgroundColor = "#F34854";
  });

  PubSub.subscribe("gameOver", ({ winner, line }) => {
    if (winner) {
      gameStatus.textContent = `${winner[0]} claims victory!`;
      boxes.forEach((box) => {
        if (!box.dataset.name.includes(line)) {
          box.style.backgroundColor = "transparent";
        }
      });
    } else {
      gameStatus.textContent = "Too smart for each other! It's a tie.";
    }
    gameStatus.style.backgroundColor = "#0D0D29";
    container.style.pointerEvents = "none";
    restartBtn.style.display = "block";
  });

  PubSub.subscribe("restartGame", () => {
    boxes.forEach((box) => {
      box.innerHTML = "";
      box.style.backgroundColor = "transparent";
    });
    container.style.pointerEvents = "auto";
    gameStatus.style.backgroundColor = "#F34854";
    restartBtn.style.display = "none";
    PubSub.publish("playerSwitched", gameBoard.player1);
  });
})();
