$(document).ready(function(){
  $('.slider-carousel').owlCarousel({
      loop:true,
      margin:20,
      responsiveClass:true,
      responsive:{
          0:{
              items:2,
              nav:false
          },
          768:{
              items:3,
              nav:false
          },
          1200:{
              items:5,
              nav:true,
              loop:false
          }
      }
  });
    $('.owl-carousel').owlCarousel({
        responsiveClass:true,
        items:1,
        loop:true,
        responsive: {
            375:{
                nav:true
            }

        }
    });
});

$(".next_button").click(function(){
    owl.trigger("next.owl.carousel");
});

$(".prev_button").click(function(){
    owl.trigger("prev.owl.carousel");
});