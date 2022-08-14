// used to select all of the divs that have a class of 'box in the HTML file.
const boxes = document.querySelectorAll('.box');

// used to check the game status
const statusNotification = document.querySelector('#game-status');

// used to check if the play again button has been pressed.
const playAgain = document.querySelector('#play-again');

// this is an array of arrays that is used to check all of the possible winning combinations that there could be in the game.
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// an array that sets all of the boxes as blanks.
let boxChoices = ['','','','','','','','',''];
// sets the current player and can be changed depending on whos turn it is.
let currentPlayer = 'X';
// set if the game has started or not.
let gameRunning = false;

gameStart();

// this funtion will start the game 
function gameStart(){
    boxes.forEach(box => box.addEventListener('click', boxClicked));
    playAgain.addEventListener('click', newGame);
    statusNotification.textContent = `${currentPlayer}'s turn.`
    gameRunning = true;
};

// this will check that as long as the box emty it can be clicked and it will update the shape based on whos turn it is
// this will be done by calling the updateBox function and then the checkWhoWins funtion after each click.
// if there is no winner the checkWhoWins function will continue until there is a winner or there is a tie.
function boxClicked(){
    const boxIndex = this.getAttribute("box-index");

    if(boxChoices[boxIndex] != '' || !gameRunning){
        return;
    }

    updateBox(this, boxIndex);
    checkWhoWins();
};

// this will update a box that is clicked
function updateBox(box,index){
    boxChoices[index] = currentPlayer;
    box.textContent = currentPlayer;
};

// this will act as a flip switch and will change between X and O, it uses the ternary operator.
function playerChange(){
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    statusNotification.textContent = `${currentPlayer}'s turn.`;
};

// this will run throw every possible winning condition that has already been declared above an will determine if there is a winner or a tie.
function checkWhoWins(){
    let roundWon = false;

    for(let i = 0; i < winningCombinations.length; i++){
        const condition = winningCombinations[i];
        const boxA = boxChoices[condition[0]];
        const boxB = boxChoices[condition[1]];
        const boxC = boxChoices[condition[2]];

        if(boxA == '' || boxB == '' || boxC == ''){
            continue;
        }
        if(boxA == boxB && boxB == boxC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusNotification.textContent = `${currentPlayer} Wins!`;
        gameRunning = false;
    }
    else if(!boxChoices.includes('')){
        statusNotification.textContent = `Its a Tie`;
        gameRunning = false;
    }else{
        playerChange();
    }
};

// this function is used to start a new game after the play again button is clicked. it will set the current player back to X, it will
// clear the board and it will set the game as running  again.
function newGame(){
    currentPlayer = 'X';
    boxChoices = ['','','','','','','','',''];
    statusNotification.textContent = `${currentPlayer}'s turn.`;
    boxes.forEach(box => box.textContent = '');
    gameRunning = true;
};