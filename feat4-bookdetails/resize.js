jQuery(document).ready(function($){
    var current_width = $(window).width();
    if(current_width < 769){
      $('#second-half').detach().insertAfter('#first-half h1');
    }
   
    $(window).resize(function(){
    var current_width = $(window).width();
    if(current_width < 769){
      $('#second-half').detach().insertAfter('#first-half h1');
    }
    else{
      $('#second-half').detach().insertAfter('#first-half');
    }
    });
  });