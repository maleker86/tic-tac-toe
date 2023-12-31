// const playerController = (playerChoice) => {
//   const displayChoice = () => console.log(`The player chose ${playerChoice}`);

//   return { 
//     playerChoice,
//     displayChoice 
//   };
// };

// const playerOne = playerController("x");
// const playerTwo = playerController("o");

// const Game = () => {

// }

// const GameBoard = () => {
//   let gameBoard = [
//     ['.', '.', '.'],
//     ['.', '.', 'x'],
//     ['.', '.', '.']
//   ];

//   let gameBoardShitty = {".",".",".",
//                         "o",".",".",
//                         ".",".","."};


//   return {gameBoardShitty};
// }

// console.log(GameBoard()){};

const GameBoard = function() {

    const Intialize = () => {
      let choices = [
        'x', 'o', 'x',
        'o', 'x', 'o',
        'o', 'o', 'x',
      ];
  
      return choices;
    }
  
    const DisplayGame = () => {
      let ShowGameBoard = Initialize();
  
      for (let i = 0; i < ShowGameBoard.length; i++) {
        let gameboard = document.querySelector("#gameboard");
        let box = document.createElement("div");
  
        gameboard.append(box);
        box.innerText = (ShowGameBoard[i]);
        // console.log(ShowGameBoard[i]);
      };
    };
  
    return { Initialize, DisplayGame };
  }();
  
  
  
  let Player = () => {
    // let button = document.querySelector("button");
    // button.addEventListener("click", Click);
  
    // function Click() {
    //   console.log(button.innerText);
    // }
  
    let clicky = document.getElementById("gameboard").querySelectorAll('div');
  
    clicky.onclick = function() {
      Hello('hi');
    }
  
    function Hello(text) {
      console.log(text);
    }
  
    // clicky.onclick = function() {Hi()};
  
    function Hi() {
      console.log("hi");
    };
  };
  
  GameBoard.Initialize();
  GameBoard.DisplayGame();
  // GameBoard.DisplayGame();