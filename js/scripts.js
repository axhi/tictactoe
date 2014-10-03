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
  this.board = [[0,0,0],[0,0,0],[0,0,0]];
  $('.board').toggle();  
  $('.new').hide();
}

Game.prototype.move = function(loc,par,spot) {
  if (this.board[loc][par] == 0) {
    this.board[loc][par] = 1
    this.render(spot, "X");
    this.computerMove();
  } else {
    alert('already there');
  }
}

Game.prototype.render = function(spot, player) {
  $(spot).html(player)
  $('.board').children('tbody').children('tr').children().each(function () {
  });
}

Game.prototype.computerMove = function() {
  if (this.board[1][1] == 0) {
    this.board[1][1] = 2;  
    this.findSpot(1,1);
  } else {
    this.logic();
  }
}

Game.prototype.logic = function() {
  debugger;
  this.board.forEach(function(main) {
     
    debugger;
    //main.forEach(function(value) {
    //  
    //  console.log(value);
    //});
  }, bind(this));
}

Game.prototype.findSpot = function(f,s) {
  var spot = $($.find('tr')[f]).children("#"+s); 
  this.render(spot, "O");
}
