/**
 * @description Snakes and ladders game, designed by: eng ahmed gamal mohamed
 */

let diceMap = {
  1: "./assets/img/dice1.png",
  2: "./assets/img/dice2.png",
  3: "./assets/img/dice3.png",
  4: "./assets/img/dice4.png",
  5: "./assets/img/dice5.png",
  6: "./assets/img/dice6.png",
};

let LadderConnections = {
  3: 21,
  8: 30,
  28: 84,
  58: 77,
  80: 100,
  75: 86,
  90: 91,
};

let snakeConnections = {
  17: 13,
  52: 29,
  57: 40,
  88: 18,
  62: 22,
  95: 51,
  97: 79,
};

let Player1 = {
  totoalPoints: 0,
  PlayerRole: true,
};

let player = document.getElementById("player");
let playBtn = document.getElementById("playBtn");
let leftDiceImg = document.getElementById("left-dice");
let rightDiceImg = document.getElementById("right-dice");

let counter = 1;

playBtn.addEventListener("click", function () {
  let leftDice = 0;
  let rightDice = 0;
  let tries = 0;
  let t = setInterval(() => {
    tries++;
    leftDice = randomIntFromInterval(1, 6);
    rightDice = randomIntFromInterval(1, 6);
    //updating the screen
    leftDiceImg.setAttribute("src", diceMap[leftDice]);
    rightDiceImg.setAttribute("src", diceMap[rightDice]);
    if (tries >= 20) {
      clearInterval(t);
      //call the player to move
      let playerMoves = Player1["totoalPoints"];
      let totalMoves = 0;
      if (playerMoves === 0) {
        totalMoves = leftDice + rightDice + playerMoves + 1;
      } else {
        totalMoves = leftDice + rightDice + playerMoves;
      }
      console.log(totalMoves);
      let t2 = setInterval(() => {
        if (playerMoves >= totalMoves) {
          Player1["totoalPoints"] = totalMoves;
          checkUserForLadderHelpOrSnakeBit(playerMoves);
          clearInterval(t2);
          return;
        }
        playerMoves++;
        document.getElementById(`${playerMoves}`).prepend(player);
      }, 700);
    }
  }, 100);
});

function checkUserForLadderHelpOrSnakeBit(playerMoves) {
  if (LadderConnections[playerMoves]) {
    document
      .getElementById(`${LadderConnections[playerMoves]}`)
      .prepend(player);
    Player1["totoalPoints"] = LadderConnections[playerMoves];
  } else if (snakeConnections[playerMoves]) {
    document.getElementById(`${snakeConnections[playerMoves]}`).prepend(player);
    Player1["totoalPoints"] = snakeConnections[playerMoves];
  } else {
    //dont touch me
  }
}

// player.addEventListener("click", function () {
//   if (counter >= 100) {
//     counter = 0;
//   }
//   counter++;
//   document.getElementById(`${counter}`).prepend(player);
// });

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
