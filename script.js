
let gameData;




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
    block.id = i; 
    if (i % 2 == 0) {
      block.classList.add('even');
    } else {
      block.classList.add('odd');
    }
    board.appendChild(block);
  }
}

// function drawBoard(){
//   const board = document.querySelector('.board');


  // for (let i = 1; i <= gameData.nfields; i++) {
  //   let block = document.createElement( 'div' );

  //   if (i % 2 == 0) {
  //     block.classList.add('even');
  //   } else {
  //     block.classList.add('odd');
  //   }
  //   board.appendChild(block);
  // }
// }




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



document.querySelector("#json").addEventListener("click", getJson);

