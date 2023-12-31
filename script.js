// IIFE gameboard
const GameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    // let gameboard = ["", "", "", "", "", "", "test1", "tst2", "test3"];
    // let gameboard = ['x','o','x',
    //                 'o','x','o',
    //                 'x','o','x',];
  
    // const monitorGameboardLength = () => {
    //   if (gameboard.length > 9) {
    //     gameboard.length = 9;
    //   }
    //   return gameboard;
    // };
  
    const renderBoard = () => {
      // monitorGameboardLength();
      let board = document.getElementById("gameboard");
      board.innerHTML = "";
      for (item in gameboard) {
        let box = document.createElement("div");
        board.append(box);
        box.textContent = gameboard[item];
        // box.textContent = item;
        box.setAttribute("class", "box");
        box.setAttribute("id", item);
        box.addEventListener("click", Game.gridClicked);
      }
      // return {
      //   item,
      // }
    };
  
    const updateBoard = (index, mark) => {
      // console.log("This is updateBoard()");
      // let player_index = index;
      // let player_mark = mark;
  
      // console.log("the player is trying to put an " + mark + " at " + index);
  
      gameboard[index] = mark;
      renderBoard();
    };
  
    return {
      gameboard,
      renderBoard,
      updateBoard,
    };
  })();
  
  // player factory
  const Player = (name, mark) => {
    // console.log(name + " is using " + mark);
    return {
      name,
      mark,
    };
  };
  
  // IIFE Game
  const Game = (() => {
    let players = [];
    let gameOver;
    let currentPlayerIndex;
    let roundCount;
  
    const gameStart = () => {
      gameOver = false;
      currentPlayerIndex = 0;
      roundCount = 1;
  
      GameBoard.renderBoard();
      createPlayers();
  
      updateMessages.gamestatusmessage("it is Round:" + " " + roundCount);
  
      updateMessages.playermessage(
        "it is player" + " " + players[currentPlayerIndex].name + "'s turn",
      );
  
      // console.log(`current player index is ` + currentPlayerIndex);
      // console.log(players);
      // console.log("I have began");
    };
  
    const createPlayers = () => { 
      players = [
        Player(document.getElementById("player1").value, "x"),
        Player(document.getElementById("player2").value, "o"),
      ]; 
      if (players[0].name === "") {
        players[0].name = "player 1";
      } 
      if (players[1].name === "") {
        players[1].name = "player 2";
      } 
      // console.log(`we have player 1 ${player1.name} with ${player1.mark} and player 2 ${player2.name} with ${player1.mark} `);
      // return players;
    };
  
    const gridClicked = (event) => {
      // console.log(event.target);
      let index = event.target.id;
      let mark = event.target.innerText;
      // console.log(
      //   "the grid information is number: " + index + " and text: " + mark,
      // );
      // GameBoard.renderBoard();
      playRound(index, mark);
      // return {
      //   index, mark,
      // };
    };
  
    const roundUpdater = () => {
      console.log("Round count was: " + roundCount);
      roundCount += 1;
      console.log("Round count is: " + roundCount);
  
      updateMessages.gamestatusmessage("it is Round:" + " " + roundCount);
    };
  
    const winnerChecker = () => {
      // console.log("winner tracker activated");
      let board = GameBoard.gameboard;
  
      const reportWin = () => {
        gameOver = true;
        playerUpdater();
        updateMessages.gamestatusmessage(
          "The game has been won by " + players[currentPlayerIndex].name,
        );
        playerUpdater();
        updateMessages.playermessage(
          players[currentPlayerIndex].name + " cannot play. Please Restart.",
        );
      };
  
      const reportStalemate = () => {
        console.log("Stalemate");
  
        gameOver = true;
        updateMessages.gamestatusmessage("The game has not been won");
        updateMessages.playermessage("No players can play. Please Restart.");
      };
  
      // console.log(board);
      // horiz rows
      if (board[0] !== "" && board[0] === board[1] && board[1] === board[2]) {
        console.log("row 1 accounted for");
        reportWin();
      } else if (
        board[3] !== "" &&
        board[3] === board[4] &&
        board[4] === board[5]
      ) {
        console.log("row 2 accounted for");
        reportWin();
      } else if (
        board[6] !== "" &&
        board[6] === board[7] &&
        board[7] === board[8]
      ) {
        console.log("row 3 accounted for");
        reportWin();
      }
      // vert rows
      else if (
        board[0] !== "" && board[0] === board[3] && board[3] === board[6]
      ) {
        console.log("row 1a vertical accounted for");
        reportWin();
      } else if (
        board[1] !== "" && board[1] === board[4] && board[4] === board[7]
      ) {
        console.log("row 2a vertical accounted for");
        reportWin();
      } else if (
        board[2] !== "" && board[2] === board[5] && board[5] === board[8]
      ) {
        console.log("row 3 vertical accounted for");
        reportWin();
      }
      // 2 diagonals
      else if ( board[0] !== "" && board[0] === board[4] && board[4] === board[8]
      ) {
        console.log("left right diagonal accounted for");
        reportWin();
      } else if ( board[2] !== "" && board[2] === board[4] && board[4] === board[6]
      ) {
        console.log("right left diagonal accounted for");
        reportWin();
      } else if (roundCount === 10) {
        reportStalemate();
      }
    };
  
    const playRound = (index, mark) => {
      if (gameOver) {
        return;
      }
  
      if (mark !== "") {
        return;
      }
  
      roundUpdater();
  
      GameBoard.updateBoard(index, players[currentPlayerIndex].mark);
  
      GameBoard.renderBoard();
  
      playerUpdater();
  
      const playerDisplayUpdater = (() => {
        updateMessages.playermessage(
          "it is player" + " " + players[currentPlayerIndex].name + "'s turn",
        );
  
        // console.log("next is player" + " " + players[currentPlayerIndex].name);
      })();
  
      winnerChecker();
      //note
      // console.log("Also this is the playRound() func")
    };
  
    const updateMessages = ((string) => {
      let playerStatus = document.getElementById("player-message");
      let gameStatus = document.getElementById("game-status");
      const gamestatusmessage = (string) => {
        gameStatus.innerText = string;
        // console.log(string);
      };
      const playermessage = (string) => {
        playerStatus.innerText = string;
        // console.log(string);
      };
      return {
        gamestatusmessage,
        playermessage,
      };
    })();
  
    const playerUpdater = () => {
      if (currentPlayerIndex === 0) {
        currentPlayerIndex = 1;
      } else {
        currentPlayerIndex = 0;
      }
    };
  
    return {
      createPlayers,
      gameStart,
      playRound,
      gridClicked,
      playerUpdater,
    };
  })();
  
  const startbutton = document.getElementById("start");
  startbutton.addEventListener("click", () => {
    startbutton.style.display = "none";
    Game.gameStart();
  });
  
  const restartbutton = document.getElementById("restart");
  restartbutton.addEventListener("click", () => {
    for (i = 0; i < 9; i++) {
      GameBoard.updateBoard(i, "");
    }
    // startbutton.style.display = "inline-block";
    Game.gameStart();
  });