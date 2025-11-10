const formController = (() => {
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

  dialog.showModal();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const p1Name = player1Input.value || "Player X";
    const p2Name = player2Input.value || "Player O";
    player1Name.textContent = p1Name;
    player2Name.textContent = p2Name;

    if (player1AvatarInput.files[0]) {
      player1Avatar.style.backgroundImage = `url("${URL.createObjectURL(
        player1AvatarInput.files[0]
      )}")`;
    }

    if (player2AvatarInput.files[0]) {
      player2Avatar.style.backgroundImage = `url("${URL.createObjectURL(
        player2AvatarInput.files[0]
      )}")`;
    }

    dialog.close();
    PubSub.publish("gameStarted", { p1Name, p2Name });
  });
})();
