//Declare variables and get HTML elements within through DOM

var record = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //to keep tracking of the flipped cards. 0 means that the cards is not flipped, 1 means that the card is flipped.
var imgRec = []; //Record to keep track of the images that were loaded randomly and which were not yet for the shyffling option.
var rand; // keep track of the random numbers
var flipIdx = 0; // track the number of cards that is being flipped. when the user flip 1 card, it will be incremented by 1, when the second card get flipped it will be incremnted by another 1 which will be 2, then it will reset and go back to 0.
var cardTextRec = []; // images flipped will be stored in this variable as strings and compare them to see if they match.
var cardRec = []; // to track the images flipped using their id.
var cardNum;
var front;
var back;
var cardCheck = 0;
var match = 0; //keep tracking of the score
var status = 0; //keep track of the unique images that has been shuffled
var secsInput = 60; //the amount of time in seconds for the game.
var seconds = secsInput;
var gameOver = false;
var memory = document.querySelector("#game"); //parent of the entire game.
var timer = document.querySelector("#timer");
var score = document.querySelector("#score");
var newGame = document.querySelector("#new");
var result = document.querySelector("#result");
var backGroundRes = document.querySelector("#backgroundResult");
var h1Res = document.querySelector("#h1Res");
var pRes = document.querySelector("#pRes");
var greatBtn = document.getElementById("okayBtn");

//Code that flip cards

memory.addEventListener("click", function (event) {
  var parentEle = event.target.parentElement;
  var numId = parentEle.id;
  if (Number.isInteger(parseInt(numId.replace("back", ""), 10))) {
    cardClick(parentEle.parentElement.id);
  } else {
    cardClick(numId);
  }
});

function cardClick(cardId) {
  cardNum = cardId.replace("card", ""); //"1", "2", ..etc
  cardNum = parseInt(cardNum, 10); //1, 2, 3, etc.

  if (record[cardNum - 1] === 0 && cardCheck === 0 && gameOver === false) {
    front = document.getElementById("front" + cardNum);
    back = document.getElementById("back" + cardNum);
    front.style.transform = "rotateY(-180deg)";
    back.style.transform = "rotateY(0deg)";

    cardTextRec.push(back.innerHTML); //['<img src="""....>', <'img src=""....>']
    cardRec.push(cardNum); //[1, 2]
    flipIdx++;
    record[cardNum - 1] = 1;

    if (flipIdx === 2) {
      if(cardTextRec[0] === cardTextRec[1]) {
        match++;
        score.innerHTML = "Score: " + match;
        cardRec = [];
        cardTextRec = []
        flipIdx = 0;

        if (match === 10) {
          clearTimeout(setTimeout(function () {
            startTimer(secs);
          }, 1000));

          setTimeout(function(){
            displayResult();
          }, 600);
        }
        return;
      } else {
        cardCheck = 1
        setTimeout(function() {
          flipBack();
        }, 600);
        return;
      }
    }
  }

  if (gameOver === true) {
    alert("Game Over");
  }
}

//Code for the actual game but with no shuffling, timer. Just comparing the cards and send an alert for testing.

function flipBack() {
  front = document.getElementById("front" + cardRec[0]);
  back = document.getElementById("back" + cardRec[0]);
  front.style.transform = "rotateY(0deg)";
  back.style.transform = "rotateY(180deg)";

  front = document.getElementById("front" + cardRec[1]);
  back = document.getElementById("back" + cardRec[1]);
  front.style.transform = "rotateY(0deg)";
  back.style.transform = "rotateY(180deg)";

  record[cardRec[0] - 1] = 0;
  record[cardRec[1] - 1] = 0;
  cardTextRec = [];
  cardRec = [];
  flipIdx = 0;
  cardCheck = 0;

}

//Code for the new game button to work.

newGame.addEventListener("click", function() {
  window.location.reload();
});

//shuffle the cards on loading and create and array of all the cards we have in the game.

function shuffle() {
  for (var i = 0; i < 20; i++) {
    if (i == 0) {
      rand = Math.round(Math.random() * images.length);
      while(rand == images.length) {
        rand = Math.round(Math.random() * images.length);
      }
      imgRec[i] = rand;
    } else {
      while(status == 0) {
        rand = Math.round(Math.random() * images.length);
        if (rand !== images.length) {
          for (var j = 0; j < imgRec.length; j++) {
            if (rand == imgRec[j]) {
              break;
            } else if (j == imgRec.length - 1) {
              status = 1;
              imgRec[i] = rand;
            }
          }
        }
      }
    }
    status = 0;
    document.getElementById("back" + (i + 1)).innerHTML = images[rand];
  }
  timerStart(seconds);
}

//Code for the timer to work

function timerStart(s) {
  timer.innerHTML = "00:" + s;

  if (s >= 0) {
    s--;
    setTimeout(function () {
      timerStart(s);
    }, 1000);
  } else {
    displayResult();
    timer.innerHTML = "00:00";
    return;
  }

}

//Code for displaying the results.

function displayResult() {
  gameOver = true;

  var w = window.innerWidth;
  backGroundRes.style.display = "block";
  result.style.display = "block";
  result.style.left = (w/2) - (500/2) + "px";

  if (match === 10) {
    pRes.innerHTML = "You've scored " + match + "/10 in " + secsInput + " seconds."
  } else {
    h1Res.innerHTML = "Try Again!";
    pRes.innerHTML = "You've scored " + match + "/10 in " + secsInput + " seconds."

  }

}

greatBtn.addEventListener("click", function() {
  backGroundRes.style.display = "none";
  result.style.display = "none";
})


window.onload = shuffle();