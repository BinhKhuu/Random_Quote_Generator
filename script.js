var setBackground = function (){
  var height = $(window).height();
  var width = $(window).width();
  if (height <= 460) {
    $('#quote-container').removeClass('center-large');
    $('#quote-container').addClass('center-small');
  } else {
    $('#quote-container').removeClass('center-small');
    $('#quote-container').addClass('center-large');
  }
}
var getQuote = function (random_color) {
  $.getJSON("https://crossorigin.me/https://talaikis.com/api/quotes/random/", function(a) {
    var len = a.quote.length;
    if (len > 150 && len <= 290) {
      $('#quote-box').css({'width':'500px','height':'340px'});
    } else if (len > 290 ) {
      $('#quote-box').css({'width':'500px','height':'400px'});
    } else {
      $('#quote-box').css({'width':'450px','height':'250px'});
    }
    $('#text').text(" "+ a.quote).hide().fadeIn(1000);
    $('#text-auth').css({}).text("—" + a.author).hide().fadeIn(1000);
    $('.btn-footer').css({'background-color':random_color}).fadeTo('slow',0.9).fadeTo(400,1);
    $('.center-large').css({'background-color':random_color}).fadeTo('slow',0.9).fadeTo(400,1);
    $('.center-small').css({'background-color':random_color}).fadeTo('slow',0.9).fadeTo(400,1);
  });  
}
//on resize change height of center container
$(window).on('resize',function(){
  setBackground();
});

$('#btn-new').on('click', function() {
  var random_color = Math.floor(Math.random()*16777215).toString(16);
  random_color = '#'+random_color;
  while (random_color == '#FFFFFF') {
    random_color = Math.floor(Math.random()*16777215).toString(16);
    random_color = '#'+random_color; 
  }
  $('#text').text('Searching...').hide().fadeIn(100);
  $('#text-auth').text("").hide().fadeIn(100);
  getQuote(random_color);
});

$('#btn-tweet').on('click',function(){
  var url = "https://twitter.com/intent/tweet?hashtags=quotes&text="
  var auth = document.getElementById("text-auth").innerHTML.split(" ");
  var quote = document.getElementById("text").innerHTML.split(" "); 
  var url = url + quote.join("%20") + auth.join("%20");
  window.open(url);
});

$(document).ready(function(){
  setBackground(); 
  getQuote();
});