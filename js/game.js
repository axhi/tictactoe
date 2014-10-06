//game function that initialize an empty board as well as a status indicator
function Game() {
  this.board = {
    col0: [0,0,0],
    col1: [0,0,0],
    col2: [0,0,0],
    row0: function() {
      return [this.col0[0], this.col1[0], this.col2[0]];
    },
    row1: function() {
      return [this.col0[1], this.col1[1], this.col2[1]];
    },
    row2: function() {
      return [this.col0[2], this.col1[2], this.col2[2]];
    },
    diagL: function() {
      return [this.col0[0], this.col1[1], this.col2[2]];
    },
    diagR: function() {
      return [this.col2[0], this.col1[1], this.col0[2]];
    },
    corners: function() {
      return [this.col0[0], this.col0[2], this.col2[0], this.col2[2]];
    }
  };
  this.status = false;
  $('.board').show();  
  $('.new').hide();
}

//This registers a move from the player
  //loc = td that was clicked
  //par = parent of td clicked
  //spot = jquery object of location for printing 
Game.prototype.move = function(loc,par,spot) {
  if (this.board['col'+loc][par] == 0) {
    this.board['col'+loc][par] = 1
    this.render(spot, "X");
    // Enters area for computer move
    this.computerMove(loc, par);
  } else {
    $('.alerts').prepend("Sorry, that space is occupied!");
    $('.alerts').fadeTo(2000, 100).slideUp(500, function() {
      $('.alerts').empty();
    });
  }
}

//Renders to the board on screen
Game.prototype.render = function(spot, player) {
  $(spot).html(player)
  $('.board').children('tbody').children('tr').children().each(function () {});
}

//Sets up computer move, and enters logic
Game.prototype.computerMove = function(loc, par) {
  this.status = false;
  this.logic(loc,par);
}

//Outputs to screen when game is over
  //dig is parameter to say if it was a win or tie; 0 is tie, 1 is win; 
Game.prototype.over = function(dig) {
  if (dig == 0) {
    $('.alerts').prepend("Sorry, you lost. But then again, I'm pretty smart. Try again!");
    $('.alerts').fadeTo(2000, 100).slideUp(500, function() {
      $('.alerts').empty();
      $('.reset').trigger('click');
    });
  } else {
    $('.alerts').prepend("Catch Scratch Fever! Try again!");
    $('.alerts').fadeTo(2000, 100).slideUp(500, function() {
      $('.alerts').empty();
      $('.reset').trigger('click');
    });
  }
}

//game over check, runs through columns, rows, and diagonals to see if there is a winner
Game.prototype.gameOver = function() {
  var cols = [this.board.col0, this.board.col1, this.board.col2];
  var rows = [this.board.row0(), this.board.row1(), this.board.row2()];
  var diags = [this.board.diagR(), this.board.diagL()];
  var total = 0;

  // this checks for tie game
  for (var i in cols) {
    total += (countElement(0, cols[i])); 
  }
  if (total == 0) {this.status = true; return this.over(1);}

  for (var i in cols) {
    if (sumNum(cols[i]) === -3) {
      this.status = true;
      return this.over(0);
    }
  }
  for (var i in rows) {
    if (sumNum(rows[i]) === -3) {
      this.status = true;
      return this.over(0);
    }
  }
  for (var i in diags) {
    if (sumNum(diags[i]) === -3) {
      this.status = true;
      return this.over(0);
    }
  }
}

//Runs game logic; checks to see if game is over
  //if false, runs through logic scenarios
    //If center is open, computer takes it
    //If computer can win, wins
    //if computer can block, blocks
    //if computer can forks
Game.prototype.logic = function(loc,par) {
 this.gameOver();
 if (this.status == false) {
  if (this.status == false) { this.centerChecker(loc,par); }
  if (this.status == false) { this.winChecker(); }
  if (this.status == false) { this.blockChecker(); }
  if (this.status == false) { this.forkChecker(); }
  this.gameOver();
 }
}

//forkchecker runs through columns, board, and diagonals 
Game.prototype.forkChecker = function() {
  var cols = [this.board.col0, this.board.col1, this.board.col2];
  var rows = [this.board.row0(), this.board.row1(), this.board.row2()];
  var diags = [this.board.diagR(), this.board.diagL()];
  var temp = false;
  var a = Math.round(Math.random()*2);
  var b = Math.round(Math.random()*2); 
  while (temp === false) {
    //first check is columns; set empty column space to -1
    for (var i in cols) {
      for (var v in cols[i]) {
        if (cols[i][v] === 0) {
          cols[i][v] = -1;
          //checks to see if opening that space creates a row/column combination to staisfy -2 to fork
          if (this.checkOkay(cols,rows,diags) === true) {
            // checks left diagonal for a single computer move 
            cols[i][v] = 0;
            if ((sumNum(this.board.diagL()) === -1) && (countElement(1, this.board.corners()) > 1) && this.board.col1[0] === 0) {
              this.board.col1[0] = -1;
              this.findSpot(0,1); 
              temp = true;
              this.status = true;
              return;
            } 
            // checks right diagonal for presence of one player and one computer move
            else if ((sumNum(this.board.diagR()) === -1) && (sumNum(this.board.corners()) > 1)) { 
              this.board.col1[2] = -1;
              this.findSpot(2,1); 
              temp = true;
              this.status = true;
              return;
            } 
            // sets fork on odd case, bottom right
            else if ((countElement(0, this.board.corners()) === 2) && (countElement(1, this.board.row0()) < 2) && this.board.col2[0] === 0) {
              this.board.col2[0] = -1;
              this.findSpot(0,2); 
              temp = true;
              this.status = true;
              return;
            }
            // sets the fork number if corner checks fail
            else if (countElement(0, this.board.corners()) === 4) {
              cols[0][2] = -1;
              this.findSpot(2,0);
              temp = true;
              this.status = true;
              return; 
            }
            else {
              if ((countElement(1, this.board.corners()) === 1) && (this.board.col2[1] === 1) ) {
                cols[2][2] = -1;
                this.findSpot(2,2);
              }
              else {
                cols[i][v] = -1;
                this.findSpot(v,i);
              }
              temp = true;
              this.status = true;
              return;
            }
          } else {cols[i][v] = 0;}
        }
      }
    }
    for (var i in rows) {
      for (var v in rows[i]) {
        if (rows[i] === 0) {
          rows[i] = -1;
          // if row fork is availalb,e it takes it
          if (this.checkOkay(cols,rows,diags) === true) {
            this.findSpot(i,v);
            temp = true;
            this.status = true;
            return;
          } else {rows[i][v] = 0;}
        }
      }
    }
    for (var i in diags) {
      for (var v in diags[i]) {
        if (diags[i] === 0) {
          diags[i] = -1;
          //if diagonal fork is available, computer takes it
          if (this.checkOkay(cols,rows,diags) === true) {
            this.findSpot(v,i);
            temp = true;
            this.status = true;
            return;
          } else {diags[i][v] = 0;}
        }
      }
    }
    //if no good fork option is available
      //if no corner has been taken, takes corner after fork fail
    if (countElement(0, this.board.corners()) === 4) {
      this.findSpot(0,0);
      this.board.col0[0] = -1;
      temp = true;
      return;
    }
      //to save computing power, a guess for open space is made first, then iteration happens if guess is off 
    else if (eval('this.board.col' + a)[b] === 0) {
      this.findSpot(b,a);
      eval('this.board.col' + a)[b] = -1;
      this.status = true;
      temp = true;
      return;
    } 
    else {
      for (var i in cols) {
        var a = cols[i].indexOf(0);
        if (a == 0) {
          eval('this.board.col'+i)[a] = -1;
          this.findSpot(a, i);
          temp = true;
          this.status = true;
          return;
        }
      }
    }
  }
}

//checking sum in forks, if total between column, row, or diagonal (with added number) equals -2, the computer takes that move
Game.prototype.checkOkay = function(c,r,d) {
  var temp = false;
  for (var i in c) {
    for (var a in r) {
      if (sumNum(c[i]) + sumNum(r[a]) === -2) {
        temp = true;
        return temp; 
      }
    }
    for (var g in d) {
      if (sumNum(c[i]) + sumNum(d[g]) === -2) {
        temp = true;
        return temp; 
      }
    }
  }
  for (var aa in r) {
    for (var bb in d) {
      if (sumNum(r[aa]) + sumNum(d[bb]) === -2) {
        temp = true;
        return temp;
      }
    }
  }
  return temp;   
}
//jquery spot in HTML
Game.prototype.findSpot = function(f,s) {
  var spot = $($.find('tr')[f]).children("#"+s); 
  this.render(spot, "O");
}
//looks through board for a winner
Game.prototype.winChecker = function() {
  if (this.status === false) {this.rowChecker(-2);}
  if (this.status === false) {this.colChecker(-2);}
  if (this.status === false) {this.diagChecker(-2);}
}
//looks through board for a block move
Game.prototype.blockChecker = function() {
  if (this.status === false) {this.rowChecker(2);}
  if (this.status === false) {this.colChecker(2);}
  if (this.status === false) {this.diagChecker(2);}
}
//takes center if it is available
Game.prototype.centerChecker = function(loc,par) {
  if (this.board.col1[1] === 0) {
    this.board.col1[1] = -1;  
    this.findSpot(1,1);
    this.status = true;
  } 
}
//checks through diagonal rows to see the sum creates a possible move
  //dig is -2 for winning, +2 for blocking
Game.prototype.diagChecker = function(dig) {
  if (sumNum(this.board.diagL()) === dig) {
    var index = this.board.diagL().indexOf(0);
    this.findSpot(index,index);
    eval('this.board.col'+index)[index] = -1;
    this.status = true;
    return;
  } 
  else if (sumNum(this.board.diagR()) === dig) {
    var index = this.board.diagR().indexOf(0);
    if (index == 1) {
      this.findSpot(1,1);
      this.board.col1[1] = -1;
      this.status = true;
      return;
    }
    else if (index == 0) {
      this.findSpot(0,2);
      this.board.col2[0] = -1;
      this.status = true;
      return;
    } else {
      this.findSpot(2,0);
      this.board.col0[2] = -1;
      this.status = true;
      return;
    }
    return;
    this.status = true;
  }
}
//same logic as diag, looking for sum
  //dig is sum parameter
Game.prototype.rowChecker = function(dig) {
  if (sumNum(this.board.row0()) === dig) {
    this.findSpot(0, this.board.row0().indexOf(0));
    eval('this.board.col' + this.board.row0().indexOf(0))[0] = -1;
    this.status = true;
    return;
  }
  else if (sumNum(this.board.row1()) === dig) {
    this.findSpot(1, this.board.row1().indexOf(0));
    eval('this.board.col' + this.board.row1().indexOf(0))[1] = -1;
    this.status = true;
    return;
  }
  else if (sumNum(this.board.row2()) === dig) {
    this.findSpot(2, this.board.row2().indexOf(0));
    eval('this.board.col' + this.board.row2().indexOf(0))[2] = -1;
    this.status = true;
    return;
  }
}
//same logic as diag, looking for sum
  //dig is sum parameter
Game.prototype.colChecker = function(dig) {
  if (sumNum(this.board.col0) === dig) {
    this.findSpot(this.board.col0.indexOf(0), 0);
    this.board.col0[this.board.col0.indexOf(0)] = -1;
    this.status = true;
    return;
  }
  else if (sumNum(this.board.col1) === dig) {
    this.findSpot(this.board.col1.indexOf(0), 1);
    this.board.col1[this.board.col1.indexOf(0)] = -1;
    this.status = true;
    return;
  }
  else if (sumNum(this.board.col2) === dig) {
    this.findSpot(this.board.col2.indexOf(0), 2);
    this.board.col2[this.board.col2.indexOf(0)] = -1;
    this.status = true;
    return;
  }
}
//checks location to see if it is a corner spot
function isCorner(loc, par) {
  var a = [loc,par]
  if (loc === "1") {
    return false;
  }
  else if (par === "1") {
    return false;
  } else {
    return true;
  }
}
//sum function used throughout
function sumNum(array) {
  var count=0;
  for (var i=array.length; i--;) {
    count+=array[i];
  }
  return count;
}
//count function used to look for items
function countElement(item,array) {
  var count = 0;
  $.each(array, function(i,v) { if (v === item) count++; });
  return count;
}
