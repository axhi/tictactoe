$( document ).ready(function() {
  $('.board').on('click', 'td', function(event) {
    var loc = $(this).attr('id');
    var par = $(this).parent().attr('id');
    currentGame.move(loc, par, $(this)); 
  });
  $('.new').on('click', function(event) {
    currentGame = new Game;
  });
});

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
    }
  };
  $('.board').toggle();  
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
  if (isCorner(loc,par) === true){
    this.board.col1[1] = 2;  
    this.findSpot(1,1);
  } else { 
    this.logic(loc,par);
  }
}

Game.prototype.logic = function(loc,par) {
 this.rowChecker();
 this.colChecker();
}

Game.prototype.findSpot = function(f,s) {
  var spot = $($.find('tr')[f]).children("#"+s); 
  this.render(spot, "O");
}

Game.prototype.rowChecker = function() {
  if (countElement(1,this.board.row0()) > 1) {
    this.findSpot(0, this.board.row0().indexOf(0));
  }
  else if (countElement(1,this.board.row1()) > 1) {
    this.findSpot(1, this.board.row1().indexOf(0));
  }
  else if (countElement(1,this.board.row2()) > 1) {
    this.findSpot(2, this.board.row2().indexOf(0));
  }
}

Game.prototype.colChecker = function() {
  if (countElement(1,this.board.col0) > 1) {
    this.findSpot(this.board.col0.indexOf(0), 0);
  }
  else if (countElement(1,this.board.col1) > 1) {
    this.findSpot(this.board.col1.indexOf(0), 1);
  }
  else if (countElement(1,this.board.col2) > 1) {
    this.findSpot(this.board.col2.indexOf(0), 2);
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
