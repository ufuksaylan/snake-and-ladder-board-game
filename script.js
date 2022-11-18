let images = [
  "img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png"
];

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
    playerR.id = `player${gameData.players[i][0]}`;
    
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

    for (let j = 0; j < gameData.snakes[i].length; j++) {
      let snakeHeader = document.createElement( 'h3' );
      snakeHeader.textContent = `S${i}`;

      let temp = document.querySelector(`#number${gameData.snakes[i][j]}`);

      temp.appendChild(snakeHeader);

    }    
  }
}

function addLadders(){
  for (let i = 0; i < gameData.ladders.length; i++) {

    for (let j = 0; j < gameData.ladders[i].length; j++) {
      let ladderL = document.createElement( 'h3' );
      ladderL.textContent = `L${i}`;

      let temp = document.querySelector(`#number${gameData.ladders[i][j]}`);

      temp.appendChild(ladderL);
    }    
  }
}


function rollDice() {
  if(gameData == undefined){
    alert("start a game first")
    return; 
  }

  let x = 1 + Math.floor(Math.random() * 6);

  document.querySelector("#diceimg").setAttribute("src", images[x-1]);
  console.log(x);

  movePlayers(x);

  return x;
}
function removeElement(id) {
  var elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}

function movePlayers(x){
  
  for (let i = 0; i < gameData.players.length; i++) {
    if (gameData.players[i][2]) {
      removeElement(`player${gameData.players[i][0]}`);
      gameData.players[i][2] = false; 

      gameData.players[i][1] += x; 
      
      if (gameData.players[i][1] == gameData.nfields) {
        alert(`player ${gameData.players[i][0]} won the game. refresh to play again!`);

        removeElement('board');
        gameData = undefined;
        return; 
      }

      if (gameData.players[i][1] > gameData.nfields) {
        gameData.players[i][1] = 1;
      }

      gameData.players[i][1] = arrangePosition(gameData.players[i][1]);

      let playerR = document.createElement( 'h5' );
      playerR.id = `player${gameData.players[i][0]}`;
      
      playerR.textContent = `${gameData.players[i][0]}`;

      console.log(`anan anan ${gameData.players[i][1]}`);
      let temp = document.querySelector(`#number${gameData.players[i][1]}`);
      temp.appendChild(playerR);





      if (i+1 >= gameData.players.length)
        gameData.players[0][2] = true;
      else
        gameData.players[i+1][2] = true;    

      return; 
    }
  }
}
function arrangePosition(player) {

  for (let i = 0; i < gameData.snakes.length; i++) {
    if (player == gameData.snakes[i][0]) {
      player = gameData.snakes[i][1];
    }
  }
  for (let i = 0; i < gameData.ladders.length; i++) {
    if (player == gameData.ladders[i][0]) {
      player = gameData.ladders[i][1];
    }
  }

  return player; 
}

function getJson() {
  fetch('./data.json').then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    if (gameData != undefined) {
      alert("You already have a field! feel free to edit from edit section");
      return;
    }
    startGame(data);
  }).catch(err => { 
    // Do something for an error here
  });
}

function CustomGameStart() {
  if ( gameData != undefined) {
    alert("You already have a field! feel free to edit from edit section");
    return;
  }

  let fieldNumber = document.querySelector('input[type="range"]').value;
  let playersNumber = document.querySelector('#numberOfPlayers').value;

  const tempArray = [];

  for (let i = 1; i <= playersNumber; i++) {
    if (i == 1)
      tempArray.push([i, 1, true]);
    else 
      tempArray.push([i, 1, false]);
  }

  let tempData = {
    "nfields": fieldNumber, "snakes": [], "ladders": []
    , "players": tempArray 
  }
  startGame(tempData);
}

document.querySelector("#json").addEventListener("click", getJson, {once:true});


document.querySelector("#roll").addEventListener("click", rollDice);

function rangeValue(){
  let newValue = elem.value;
  let target = document.querySelector('.value');
  target.innerHTML = `n = ${newValue}`;
}
function addladder(){
  let begginning = document.querySelector('#Beginning').value;
  let end = document.querySelector('#end').value;

  gameData.ladders.push([begginning, end]);
  alert("click on edit the game to see the results");
}

function addSnake(){
  let head = document.querySelector('#numberHead').value;
  let tail = document.querySelector('#numberTail').value;

  gameData.snakes.push([head, tail]);
  alert("click on edit the game to see the results");
}
function editGame(){
  addLadders();
  addSnakes();
}
let elem = document.querySelector('input[type="range"]');
elem.addEventListener("input", rangeValue);


document.querySelector("#customGame").addEventListener("click", CustomGameStart);
document.querySelector("#addLadder").addEventListener("click", addladder);
document.querySelector("#addSnake").addEventListener("click", addSnake);
document.querySelector("#edit").addEventListener("click", editGame);


