const player1 = "X";
const player2 = "O";

let currentPlayer = player1;

const spots = {
  firstRow: "",
  secondRow: "",
  thirdRow: "",
  firstCol: "",
  secondCol: "",
  thirdCol: "",
  firstCross: "",
  secondCross: "",
};

function addMark(firstSpot, secondSpot, thirdSpot, fourthSpot) {
  spots[firstSpot] += currentPlayer;
  spots[secondSpot] += currentPlayer;
  if (thirdSpot === undefined) {
    spots["firstCross"] += "";
  } else {
    spots[thirdSpot] += currentPlayer;
  }

  if (fourthSpot === undefined) {
    spots["firstCross"] += "";
  } else {
    spots[fourthSpot] += currentPlayer;
  }

  console.log(spots);
}

function turn() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

function whoWon() {
  const spotsArray = Object.values(spots);
  const winningItem = spotsArray.filter((item) =>
    item.includes("XXX" || item.includes("OOO"))
  );

  if (winningItem.toString().includes("X")) {
    console.log("Player 1 has Won.");
  } else if (winningItem.toString().includes("O")) {
    console.log("Player 2 has Won.");
  } else {
    console.log("It's a tie.");
  }
}

// addMark("firstRow", "firstCol", "firstCross");
// turn();
// addMark("firstRow", "secondCol");
// turn();
// addMark("firstRow", "thirdCol", "secondCross");
// turn();
// addMark("secondRow", "secondCol", "firstCross", "secondCross");
// turn();
// addMark("thirdRow", "secondCol");
// turn();
// whoWon(); // From the fifth turn onward, we check for a winner.
// addMark("secondRow", "thirdCol");
// turn();
// whoWon();
// addMark("secondRow", "firstCol");
// turn();
// whoWon();
// addMark("thirdRow", "firstCol", "secondCross");
// turn();
// whoWon();
// addMark("thirdRow", "thirdCol", "firstCross");

addMark("firstRow", "firstCol", "firstCross");
turn();
addMark("secondRow", "secondCol", "firstCross", "secondCross");
turn();
addMark("secondRow", "firstCol");
turn();
addMark("firstRow", "thirdCol", "secondCross");
turn();
addMark("thirdRow", "firstCol");
turn();
whoWon(); // From the fifth turn onward, we check for a winner.

/*
FEATURES
1. Players thakbe
2. Current Player thakbe
3. Each turn e player change hobe
4. Specific spot thakbe click korar jonno
5. Click korle mark add korte hobe
6. Judge korte ke jitlo

*/

// Find a way to know get the property name of the winningItem
if (item.dataset.name.includes("firstCol")) {
  console.log(item.dataset.name);
}

/* for (let item in spots) {
            if(spots[item] === "XXX") {
              console.log("player1 won")
            } else if ("OOO") {
              console.log("player2 won") 
            }
          }

          for (let item in spots) {
          let i = 0;
            if(spots[item].length === 3) {
              i++
            }

            if(i === 9) {
              console.log("Draw")
            }
          }
          
          
          
          */

const spotsArray = Object.values(this.spots);
const winningItem = spotsArray.filter(
  (item) => item.includes("XXX") || item.includes("OOO")
);
console.log(winningItem);

if (winningItem.toString().includes("X")) {
  this.gameStatus.textContent = `${this.player1[0]} claims victory!`;
  this.gameStatus.style.backgroundColor = "#0D0D29";
  this.container.style.pointerEvents = "none";
  this.restartBtn.style.display = "block";

  this.boxes.forEach((item) => {
    // Eita ekta problematic jinish.
    // if (
    //   item.hasChildNodes() &&
    //   item.childNodes[0].getAttribute("class") === "mark-O"
    // ) {
    //   item.style.backgroundColor = "transparent";
    // }

    // Find a way to know get the property name of the winningItem
    // Tumi dekho kon property ta jitse
    // Then oi property je koyta box e ase, oder color rakho ar bakider ta muche dao.
    if (item.dataset.name.includes("firstCol")) {
      console.log(item.dataset.name);
    }

    /* for (let item in spots) {
          let i = 0
            if(spots[item] === "XXX") {
              console.log("player1 won")
              winLocation = item; (property name paya gelam)
            } else if (spots[item] === "OOO") {
              console.log("player2 won") 
            } else if(spots[item].length === 3) {
              i++;
            }
          }

          if(i === 9) {
            console.log("draw")
          }
          
          boxes.forEach(box) {
            if(!box.dataset.name.includes(winLocation)) {
              box.style.backgroundColor = "transparent"
            }
          }
          
          
          
          */
  });
} else if (winningItem.toString().includes("O")) {
  this.gameStatus.textContent = `${this.player2[0]} claims victory!`;
  this.gameStatus.style.backgroundColor = "#0D0D29";

  this.container.style.pointerEvents = "none";
  this.restartBtn.style.display = "block";

  this.boxes.forEach((item) => {
    if (
      item.hasChildNodes() &&
      item.childNodes[0].getAttribute("class") === "mark-X"
    ) {
      item.style.backgroundColor = "transparent";
    }
  });
} else if (winningItem.length === 0) {
  const isEverySpotFilled = spotsArray.every(
    (item) => item.toString().length === 3
  );

  if (isEverySpotFilled) {
    this.gameStatus.textContent = "Too smart for each other! It's a tie.";
    this.gameStatus.style.backgroundColor = "#0D0D29";
    this.container.style.pointerEvents = "none";
    this.restartBtn.style.display = "block";
  }
}
