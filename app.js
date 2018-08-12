var game = {
    count: 0,
    sound: {
        red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
        blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
        yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
    },
    color: ['red', 'blue', 'green', 'yellow'],
    currentGame: [],
    userChoice: [],
    userTurn: 'false',
    stop: 5
}

document.querySelector('.btn').addEventListener('click', init);


function init() {

    var num = document.getElementById('inputNum').value;
    
    startGame(num);
    addToGame(num);
    showMoves();
}

// add to arry currentGame 
// output => array with random colors
function addToGame(num) {
    for (var i = 0; i < num; i++) {
        game.currentGame.push(game.color[randomNumber(game.color.length)]);
    }
    console.log(game.currentGame);
}

function randomNumber(num) {
    var newNum = Math.floor(Math.random() * num);
    return newNum;
}

function startGame(num) {
    //console.log('new game start..');
    game.stop = num;
    game.currentGame = [];
    game.count = 0;

    var text = document.getElementById('textCount');
    text.innerHTML = 'Count: <span id="cur">0</span>';

    showCount();
    clearPlayer();
}

//for show moves of colors with order
function showMoves() {
    game.userTurn = 'false';
    userEvent();

    game.userChoice = [];

    var i = 0;
    var moves = setInterval(function () {
        showColor(game.currentGame[i], 500);
        i++;
        if (i > game.count) {
            game.userTurn = 'true';
            clearInterval(moves);
            userEvent();
        }
    }, 900);
}

//show each color 
function showColor(color, sec) {
    //select the correct box
    var box = document.querySelector(`.${color}`);
    box.style.backgroundColor = color;
    // add sound
    game.sound[color].play();
    setTimeout(function () {
        box.style.background = '';
    }, sec);
}

function clearPlayer() {
    game.userChoice = [];
}

//toggle event
function userEvent() {

    var con = document.querySelectorAll('.box');

    if (game.userTurn === 'true') {
        console.log('user can click now!!');
        for (var i = 0; i < con.length; i++) {
            con[i].addEventListener('click', userClick);
        }
    } else {
        console.log('wait pls');
        for (var i = 0; i < con.length; i++) {
            con[i].removeEventListener('click', userClick);
        }
    }

}

function userClick(e) {
    game.userChoice.push(e.target.innerHTML);

    //show color of box  
    var box = setInterval(function () {
        showColor(e.target.innerHTML, 300);
        clearInterval(box);
    }, 600);

    //send answers
    setTimeout(function () {
        if (game.userChoice.length > game.count) {
            checkAnswer();
        }
    }, 800);

}


function checkAnswer() {
    //console.log('check');

    var newarr = [];

    for (var i = 0; i < game.userChoice.length || i === 0; i++) {

        if (game.userChoice[i] == game.currentGame[i]) {
            newarr.push(true);
        } else {
            newarr.push(false);
        }
    }

    var check = newarr.every(function (a) {
        return a == true
    })

    if (check === true) {
        //console.log('correct');
        titleChange(true);
        game.count++;

        if (game.count == game.stop) {
            userWin();
        } else {
            showCount();
            showMoves();
        }

    } else {
        //console.log('wrong pls try again');

        titleChange(false);
        game.userChoice = [];
    }
}

//change title color 
function titleChange(check) {
    var title = document.getElementById('title');
    var currentColor = title.style.color;
    var color;
    if (check === true) {
        color = 'seagreen';
    } else {
        color = 'darkred';
    }

    title.style.color = color;
    setTimeout(function () {
        title.style.color = currentColor;
    }, 300);
}


function showCount() {
    var cur = document.getElementById('cur');
    cur.innerText = game.count;
}


function userWin() {
    var text = document.getElementById('textCount');
    text.innerHTML = 'User Win The Game!!!';
}