import "./styles.css";

var player = 1;
var winner = 0;
var progress = 100;
var time;

if (document.readyState !== "loading") {
  // Document ready, executing
  console.log("Document ready, executing");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    // Document was not ready, executing when loaded
    console.log("Document ready, executing after a wait");
    initializeCode();
  });
}

function initializeCode() {
  console.log("Initializing");
  const table = document.getElementById("board");
  table.addEventListener("mousedown", (event) => {
    boxclicked(event);
    event.stopPropagation();
  });
}

function boxclicked(event) {
  resettimer();
  //Set timer to calculate turn
  //console.log("Table clicked");
  var cell = event.target.id;
  //console.log(cell);
  var element = document.getElementById(cell);
  if (!isNaN(element.innerHTML)) {
    if (player === 1) {
      element.innerHTML = "X";
      element.style.backgroundColor = "rgb(124, 252, 0)";
      document.getElementById("playerid").innerHTML = "Player 2";
    } else if (player === 2) {
      element.innerHTML = "O";
      element.style.backgroundColor = "rgb(250, 128, 114)";
      document.getElementById("playerid").innerHTML = "Player 1";
    }
  }
  if (winner === 0) {
    if (checkwin() !== 0) {
      alert("Player " + winner + " won!");
    }
  } else {
    alert("Player " + winner + " won!");
  }
  if (player === 1) {
    player = 2;
  } else {
    player = 1;
  }
  time = setInterval(timer, 100);
}

function checkwin() {
  var rows = document.getElementsByClassName("row");
  var row;
  var cells;
  var counter;

  //Loop throw rows
  for (var i = 0, iLen = rows.length; i < iLen; i++) {
    counter = 0;
    row = rows[i];
    cells = row.getElementsByClassName("box");

    //Check if win in the row
    for (var k = 1, kLen = cells.length; k < kLen; k++) {
      if (!isNaN(cells[0].innerHTML)) {
        break;
      } else {
        if (cells[0].innerHTML === cells[k].innerHTML) {
          counter++;
          continue;
        }
      }
    }
    if (counter === 4) {
      //row
      winner = player;
    }
  }

  //Check if win in columns, loop throw cells in first row
  var firstrowcells = rows[0].getElementsByClassName("box");
  for (var i2 = 0, iLen2 = firstrowcells.length; i2 < iLen2; i2++) {
    var counter2 = 0;
    for (var rownb = 1; rownb < rows.length; rownb++) {
      var rowcells = rows[rownb].getElementsByClassName("box");
      if (!isNaN(firstrowcells[i2].innerHTML)) {
        break;
      } else {
        if (rowcells[i2].innerHTML === firstrowcells[i2].innerHTML) {
          counter2++;
          continue;
        }
      }
    }
    if (counter2 === 4) {
      winner = player;
    }
  }

  //Check diagonals
  var counter3 = 0;
  var counter4 = 0;
  for (var d = 0; d < rows.length - 1; d++) {
    var rowd = rows[d];
    var rowd2 = rows[d + 1];
    var cell = rowd.getElementsByClassName("box");
    var cell2 = rowd2.getElementsByClassName("box");
    var lastcell = rowd.getElementsByClassName("box").length - d - 1;
    if (!isNaN(cell[d].innerHTML)) {
    } else if (cell[d].innerHTML === cell[d + 1].innerHTML) {
      counter3++;
    }
    if (!isNaN(cell[lastcell].innerHTML)) {
    } else if (cell[lastcell].innerHTML === cell2[lastcell - 1].innerHTML) {
      counter4++;
    }
  }
  if (counter3 === 4) {
    //diagonal 1
    winner = player;
  }
  if (counter4 === 4) {
    //diafonal 2
    winner = player;
  }
  return winner;
}

function timeout() {
  resettimer();
  if (player === 1) {
    player = 2;
  } else {
    player = 1;
  }
  document.getElementById("playerid").innerHTML = "Player" + player;
}

function timer() {
  progress = progress - 1;
  document.getElementById("bar").style.width = progress + "%";
  if (progress === 0) {
    timeout();
  }
}

function resettimer() {
  clearInterval(time);
  progress = 100;
  document.getElementById("bar").style.width = progress + "%";
}
