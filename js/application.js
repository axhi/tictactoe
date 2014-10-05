$( document ).ready(function() {
  $('.board').on('click', 'td', function(event) {
    var loc = $(this).attr('id');
    var par = $(this).parent().attr('id');
    currentGame.move(loc, par, $(this)); 
  });
  $('.new').on('click', function(event) {
    currentGame = new Game;
    $('.reset').toggle();
  });
  $('.reset').on('click', function(event) {
    currentGame = new Game;
    $('.board').html("<tr class='top' id='0'><td id='0'>&nbsp</td><td id='1'>&nbsp</td><td id='2'>&nbsp</td></tr><tr class='middle' id='1'><td id='0'>&nbsp</td><td id='1'>&nbsp</td><td id='2'>&nbsp</td></tr><tr class='bottom' id='2'><td id='0'>&nbsp</td><td id='1'>&nbsp</td><td id='2'>&nbsp</td></tr>")
  });
});
