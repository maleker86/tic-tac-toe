// 26 mins into https://www.youtube.com/watch?v=kVE4xX-OkJo 
const GameBoard = (() => {
  
    let gameboard = ['','','',
                    '','','',
                    '','','',];
    
    const renderBoard = () => {
      let boardHTML = "";
      gameboard.forEach((box, index) => {
        boardHTML += `<div class="box" onclick="Game.handleClick(${index})" data-number-type="${index}">${box}</div>`;
      }); 
      document.getElementById("board").innerHTML = boardHTML; 
    };
  
    // omg 16 - 27 is literally a programming issue, come back later xD 
    const freeSquare = (item) => {
      if (item === "") {
        // console.log("open space found");
        // console.log(item);
        return true;
      } else {
        // console.log("this space isn't open");
        // console.log(item);
        return false;
      }
    };
    
    const update = (index, mark) => {  
        // console.log(`the gameboard says ` + gameboard[index]);
        // console.log(`the spot ${index} has a ${mark}`);
        gameboard[index] = mark;
        // console.log(index, value);
        // console.log(gameboard);
        renderBoard();
    };
  
    const changeMsg = (text) => {
      // console.log("This works rn");
      let msg = document.getElementById("message");
      msg.textContent = `${text}`;
    };
  
    return {
      gameboard,
      freeSquare,
      renderBoard,
      update,
      changeMsg,
    }
  })();
  
  const createPlayer = (name, mark) => {
    return {
      name,
      mark,
    }
  };
  
  const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;
    
    const gameStart = () => {
      players = [
        createPlayer(document.querySelector("#player1").value, "x"),
        createPlayer(document.querySelector("#player2").value, "o"),
      ]
      currentPlayerIndex = 0;
      gameOver = false;
      GameBoard.renderBoard();
      GameBoard.changeMsg(`the current player is ${players[currentPlayerIndex].name}. they are ${players[currentPlayerIndex].mark}`);
    };
  
    const restartGame = () => {
      for (i = 0; i < 9; i++) {
        GameBoard.update(i, "");
      }
      GameBoard.renderBoard();
      gameStart();
    }
    
    const handleClick = (index) => {
      // console.log("Hi");
      // let index = box.getAttribute("data-number-type");
      // console.log(`the index is ` + index);
      //i want to stop the index update Here but I don't Think that I Can :) Sorry! 
      
      if (!GameBoard.freeSquare(GameBoard.gameboard[index])) {
        return;
      };
      GameBoard.update(index, players[currentPlayerIndex].mark);
      Game.playerSelector();
    };
  
    const playerSelector = () => {    
      if (currentPlayerIndex === 0) {
      GameBoard.changeMsg(`the previous player is ${players[currentPlayerIndex].name}. they are ${players[currentPlayerIndex].mark}`);
      currentPlayerIndex = 1;
      // console.log(`the previous player is ${currentPlayerIndex}`);
      // console.log(`current player index is ${currentPlayerIndex}`);
        GameBoard.changeMsg(`the current player is ${players[currentPlayerIndex].name}. they are ${players[currentPlayerIndex].mark}`);
        // console.log(`it is next the turn of ` + players[currentPlayerIndex].name);
      } else {
      GameBoard.changeMsg(`the previous player is ${players[currentPlayerIndex].name}. they are ${players[currentPlayerIndex].mark}`);
      currentPlayerIndex = 0;
      // console.log(`the previous player is ${currentPlayerIndex}`);
      // console.log(`current player index is ${currentPlayerIndex}`);
        GameBoard.changeMsg(`the current player is ${players[currentPlayerIndex].name}. they are ${players[currentPlayerIndex].mark}`);
        // console.log(`it is next the turn of ` + players[currentPlayerIndex].name);
      };
      return {currentPlayerIndex};
    }; 
    
    return {
      gameStart, 
      restartGame,
      handleClick, 
      playerSelector, 
    };
  })();
  
  // UI rendered stuff
  const startButton = document.getElementById("start");
  startButton.addEventListener("click", () => {
    Game.gameStart();
    startButton.style.display = "none";
  });
  
  const restartButton = document.getElementById("restart");
  restartButton.addEventListener("click", () => {
    Game.restartGame();
    console.log("Made it this far kid. Game Restarted.")
    startButton.style.display = "block";
  });