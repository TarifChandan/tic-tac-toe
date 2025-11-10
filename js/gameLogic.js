const gameBoard = (() => {
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

  const player1 = ["", "X"];
  const player2 = ["", "O"];
  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    PubSub.publish("playerSwitched", currentPlayer);
  };

  const reset = () => {
    for (let key in winningLines) {
      winningLines[key] = "";
    }
    currentPlayer = player1;
  };

  const markBox = (target) => {
    if (!target.innerHTML && target.classList.contains("box")) {
      const lines = target.dataset.name.split("-");
      lines.forEach((line) => (winningLines[line] += currentPlayer[1]));
      PubSub.publish("boxMarked", { target, player: currentPlayer });
      switchPlayer();
      checkWinner();
    }
  };

  const checkWinner = () => {
    let draws = 0;
    for (let line in winningLines) {
      if (winningLines[line] === "XXX") {
        PubSub.publish("gameOver", { winner: player1, line });
        return;
      } else if (winningLines[line] === "OOO") {
        PubSub.publish("gameOver", { winner: player2, line });
        return;
      } else if (winningLines[line].length === 3) {
        draws++;
      }
    }
    if (draws === 8) PubSub.publish("gameOver", { winner: false });
  };

  PubSub.subscribe("restartGame", reset);
  PubSub.subscribe("boxClicked", markBox);
  PubSub.subscribe("gameStarted", ({ p1Name, p2Name }) => {
    player1[0] = p1Name;
    player2[0] = p2Name;
    PubSub.publish("playerSwitched", currentPlayer);
  });

  return { player1, player2 };
})();
