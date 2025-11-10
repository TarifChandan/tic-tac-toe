(function () {
  const ticTacToe = {
    winningLines: {
      firstRow: "",
      secondRow: "",
      thirdRow: "",
      firstCol: "",
      secondCol: "",
      thirdCol: "",
      firstCross: "",
      secondCross: "",
    },
    init: function () {
      this.player1 = ["", "X"];
      this.player2 = ["", "O"];
      this.currentPlayer = this.player1;
      this.cacheDom();
      this.bindEvents();
      this.dialog.showModal();
    },
    cacheDom: function () {
      this.container = document.querySelector(".container");
      this.boxes = document.querySelectorAll(".box");
      this.gameStatus = document.querySelector(".game-status-box p");
      this.restartBtn = document.querySelector(".game-status-box button");
      this.form = document.querySelector("form");
      this.dialog = document.querySelector("dialog");
      this.player1Input = document.querySelector("#player1");
      this.player2Input = document.querySelector("#player2");
      this.player1Name = document.querySelector(".name-1");
      this.player2Name = document.querySelector(".name-2");
      this.player1AvatarInput = document.querySelector("#player1-avatar");
      this.player2AvatarInput = document.querySelector("#player2-avatar");
      this.player1Avatar = document.querySelector(".player-img-1");
      this.player2Avatar = document.querySelector(".player-img-2");
    },
    bindEvents: function () {
      this.container.addEventListener("click", (e) => {
        this.addMark(e.target);
        this.displayMark(e.target);
        this.determineWinner();
        this.switchPlayer();
      });

      this.restartBtn.addEventListener("click", this.restartGame.bind(this));

      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.startGame(
          this.player1,
          this.player2,
          this.player1Avatar,
          this.player2Avatar
        );

        this.dialog.close();
      });
    },
    switchPlayer: function () {
      this.currentPlayer =
        this.currentPlayer === this.player1 ? this.player2 : this.player1;
    },
    addMark: function (target) {
      if (!target.innerHTML && target.classList.contains("box")) {
        const boxLines = target.dataset.name.split("-");
        boxLines.forEach((item) => {
          this.winningLines[item] += this.currentPlayer[1];
        });
      }
    },
    determineWinner: function () {
      let i = 0;
      for (let item in this.winningLines) {
        if (this.winningLines[item] === "XXX") {
          this.displayResult(this.player1[0], item);
        } else if (this.winningLines[item] === "OOO") {
          this.displayResult(this.player2[0], item);
        } else if (this.winningLines[item].length === 3) {
          i++;
        }
      }

      if (i === 8) {
        this.displayResult(false);
      }
    },

    displayMark: function (target) {
      if (!target.innerHTML && target.classList.contains("box")) {
        const img = document.createElement("img");
        if (this.currentPlayer[1] === "X") {
          img.setAttribute("src", "images/close-thick-2.svg");
          target.style.backgroundColor = "#a8e78e";
          this.gameStatus.textContent = `${this.player2[0]}'s turn to strike!`;
        } else {
          img.setAttribute("src", "images/circle-outline-2.svg");
          target.style.backgroundColor = "#F9D45B";
          this.gameStatus.textContent = `${this.player1[0]}'s turn to strike!`;
        }
        img.setAttribute("class", `mark-${this.currentPlayer[1]}`);
        target.appendChild(img);
      }
    },

    displayResult: function (winner, winningLine) {
      if (winner) {
        this.gameStatus.textContent = `${winner} claims victory!`;
        this.boxes.forEach((box) => {
          if (!box.dataset.name.includes(winningLine)) {
            box.style.backgroundColor = "transparent";
          }
        });
      } else {
        this.gameStatus.textContent = "Too smart for each other! It's a tie.";
      }
      this.gameStatus.style.backgroundColor = "#0D0D29";
      this.container.style.pointerEvents = "none";
      this.restartBtn.style.display = "block";
    },

    restartGame: function () {
      for (let item in this.winningLines) {
        this.winningLines[item] = "";
      }

      this.boxes.forEach((box) => {
        box.innerHTML = "";
        box.style.backgroundColor = "transparent";
      });

      this.container.style.pointerEvents = "auto";
      this.currentPlayer = this.player1;
      this.gameStatus.textContent = `${this.currentPlayer[0]}'s turn to strike!`;
      this.gameStatus.style.backgroundColor = "#F34854";
      this.restartBtn.style.display = "none";
    },

    startGame: function (p1Name, p2Name, p1Avatar, p2Avatar) {
      p1Name[0] = this.player1Input.value;
      p2Name[0] = this.player2Input.value;

      if (this.player1AvatarInput.files[0]) {
        p1Avatar.style.backgroundImage = `url("${URL.createObjectURL(
          this.player1AvatarInput.files[0]
        )}")`;
      }

      if (this.player2AvatarInput.files[0]) {
        p2Avatar.style.backgroundImage = `url("${URL.createObjectURL(
          this.player2AvatarInput.files[0]
        )}")`;
      }

      this.player1Input.value = "";
      this.player2Input.value = "";

      this.gameStatus.textContent = `${this.currentPlayer[0]}'s turn to strike!`;
      this.player1Name.textContent = p1Name[0];
      this.player2Name.textContent = p2Name[0];
    },
  };

  ticTacToe.init();
})();
