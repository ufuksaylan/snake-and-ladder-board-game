
let gameData = undefined;




function startGame(data){
  gameData = {
    "nfields": data.nfields, "snakes": data.snakes, "ladders": data.ladders
    , "players": data.players 
  }

  drawBoard();

  console.log(gameData);
}

function drawBoard(){
  const board = document.querySelector('.board');

  for (let i = 1; i <= gameData.nfields; i++) {
    let block = document.createElement( 'div' );
    block.id = `number${i}`; 
    if (i % 2 == 0) {
      block.classList.add('even');
    } else {
      block.classList.add('odd');
    }
    board.appendChild(block);
  }


  // add snakes
  addSnakes();

  addLadders();

  addPlayers();

}

function addPlayers(){
  for (let i = 0; i < gameData.players.length; i++) {

    let playerR = document.createElement( 'h5' );
    playerR.textContent = `${gameData.players[i][0]}`;

    console.log(playerR);
    console.log(gameData.players[i][1]);
    let temp = document.querySelector(`#number${gameData.players[i][1]}`);
    temp.appendChild(playerR);
    console.log(temp);
  }
}

function addSnakes(){
  for (let i = 0; i < gameData.snakes.length; i++) {

    for (let j = 0; j < 2; j++) {
      let snakeHeader = document.createElement( 'h3' );
      snakeHeader.textContent = `S${i}`;

      console.log(gameData.snakes[i][j]);
      let temp = document.querySelector(`#number${gameData.snakes[i][j]}`);

      temp.appendChild(snakeHeader);

    }    
  }
}

function addLadders(){
  for (let i = 0; i < gameData.ladders.length; i++) {

    for (let j = 0; j < 2; j++) {
      let ladderL = document.createElement( 'h3' );
      ladderL.textContent = `L${i}`;

      console.log(gameData.snakes[i][j]);
      let temp = document.querySelector(`#number${gameData.ladders[i][j]}`);

      temp.appendChild(ladderL);

    }    
  }
}

function rollDice() {
  return 1 + Math.floor(Math.random() * 6);
}

function getJson() {
  fetch('./data.json').then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    startGame(data);
  }).catch(err => {
    // Do something for an error here
  });
}



document.querySelector("#json").addEventListener("click", getJson, {once:true});

