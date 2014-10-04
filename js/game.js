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
    }
  };
  this.status = false;
  $('.board').show();  
  $('.new').hide();
}

Game.prototype.move = function(loc,par,spot) {
  if (this.board['col'+loc][par] == 0) {
    this.board['col'+loc][par] = 1
    this.render(spot, "X");
    this.computerMove(loc, par);
  } else {
    alert('already there');
  }
}

Game.prototype.render = function(spot, player) {
  $(spot).html(player)
  $('.board').children('tbody').children('tr').children().each(function () {});
}

Game.prototype.computerMove = function(loc, par) {
  this.status = false;
  this.logic(loc,par);
}

Game.prototype.gameOver = function() {
  var cols = [this.board.col0, this.board.col1, this.board.col2];
  var rows = [this.board.row0(), this.board.row1(), this.board.row2()];
  console.log('cols');
  for (var i in cols) {
    console.log(cols[i]);
  }
  console.log('rows');
  for (var i in rows) {
    console.log(rows[i]);
  }
}

Game.prototype.logic = function(loc,par) {
 if (this.status == false) { this.centerChecker(loc,par); }
 if (this.status == false) { this.winChecker(); }
 if (this.status == false) { this.blockChecker(); }
 if (this.status == false) { this.forkChecker(); }
 this.gameOver();
}

Game.prototype.forkChecker = function() {
  alert('workin here');
}

Game.prototype.findSpot = function(f,s) {
  var spot = $($.find('tr')[f]).children("#"+s); 
  this.render(spot, "O");
}

Game.prototype.winChecker = function() {
  this.rowChecker(2);
  this.colChecker(2);
  this.diagChecker(2);
}

Game.prototype.blockChecker = function() {
  this.rowChecker(1);
  this.colChecker(1);
  this.diagChecker(1);
}

Game.prototype.centerChecker = function(loc,par) {
  if (isCorner(loc,par) === true){
    if (this.board.col1[1] === 0) {
      this.board.col1[1] = 2;  
      this.findSpot(1,1);
      this.status = true;
    } 
  }
}

Game.prototype.diagChecker = function(dig) {
  if (countElement(dig, this.board.diagL()) > 1) {
    this.findSpot(0, this.board.diagL().indexOf(0));
    this.board.diagL()[this.board.diagL().indexOf(0)] = 2;
    this.status = true;
  } 
  else if (countElement(dig, this.board.diagR()) > 1) {
    this.findSpot(this.board.diagR().indexOf(0), 2);
    this.board.diagR()[this.board.diagR().indexOf(0)] = 2;
    this.status = true;
  }
}

Game.prototype.rowChecker = function(dig) {
  if (countElement(dig, this.board.row0()) > 1) {
    this.findSpot(0, this.board.row0().indexOf(0));
    this.board.row0()[this.board.row0().indexOf(0)] = 2;
    this.status = true;
  }
  else if (countElement(dig, this.board.row1()) > 1) {
    this.findSpot(1, this.board.row1().indexOf(0));
    this.board.row1()[this.board.row0().indexOf(0)] = 2;
    this.status = true;
  }
  else if (countElement(dig, this.board.row2()) > 1) {
    this.findSpot(2, this.board.row2().indexOf(0));
    this.board.row2()[this.board.row2().indexOf(0)] = 2;
    this.status = true;
  }
}

Game.prototype.colChecker = function(dig) {
  if (countElement(dig,this.board.col0) > 1) {
    this.findSpot(this.board.col0.indexOf(0), 0);
    this.board.col0[this.board.col0.indexOf(0)] = 2;
    this.status = true;
  }
  else if (countElement(dig,this.board.col1) > 1) {
    this.findSpot(this.board.col1.indexOf(0), 1);
    this.board.col1[this.board.col1.indexOf(0)] = 2;
    this.status = true;
  }
  else if (countElement(dig,this.board.col2) > 1) {
    this.findSpot(this.board.col2.indexOf(0), 2);
    this.board.col2[this.board.col2.indexOf(0)] = 2;
    this.status = true;
  }
}

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

function countElement(item,array) {
  var count = 0;
  $.each(array, function(i,v) { if (v === item) count++; });
  return count;
}
