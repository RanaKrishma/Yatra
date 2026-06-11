
(function($){

  "use strict";



// Mouse-enter dropdown
$('#navbar li').on("mouseenter", function() {
  $(this).find('ul').first().stop(true, true).delay(350).slideDown(500, 'easeInOutQuad');
});
// Mouse-leave dropdown
$('#navbar li').on("mouseleave", function() {
  $(this).find('ul').first().stop(true, true).delay(100).slideUp(150, 'easeInOutQuad');
});

/**
*  Arrow for Menu has sub-menu
*/
if ($(window).width() > 992) {
  $(".navbar-arrow ul ul > li").has("ul").children("a").append(" <i class='arrow-indicator fa fa-angle-right'></i>");
};

$(".searchtoggl a").attr("id","searchtoggl");$(function(){var $searchlink=$('#searchtoggl a');var $searchbar=$('#searchbar');$('#navbar li a').on('click',function(e){if($(this).attr('id')=='searchtoggl'){if(!$searchbar.is(":visible")){$searchlink.removeClass('fa-search').addClass('fa-search-minus');}else{$searchlink.removeClass('fa-search-minus').addClass('fa-search');}
  $searchbar.slideToggle(300,function(){});}});});

$(".searchtoggl a").attr("id","searchtoggl");$(function(){var $searchlink=$('#searchtoggl a');var $searchbar=$('#searchbar');$('.header-social-links-2 li a').on('click',function(e){if($(this).attr('id')=='searchtoggl'){if(!$searchbar.is(":visible")){$searchlink.removeClass('fa-search').addClass('fa-search-minus');}else{$searchlink.removeClass('fa-search-minus').addClass('fa-search');}
  $searchbar.slideToggle(300,function(){});}});});
/**
* Sticky Header
*/

$(window).scroll(function(){

  if( $(window).scrollTop() > 1 ){

    $('.navigation').addClass('navbar-sticky')

  } else {
    $('.navigation').removeClass('navbar-sticky')
  }
});

$(window).scroll(function(){

  if( $(window).scrollTop() > 1 ){

    $('.tabs-navbar').addClass('navbar-sticky')

  } else {
    $('.tabs-navbar').removeClass('navbar-sticky')
  }
});

/**
* Slicknav - a Mobile Menu
*/
var $slicknav_label;
$('#responsive-menu').slicknav({
  duration: 500,
  easingOpen: 'easeInExpo',
  easingClose: 'easeOutExpo',
  closedSymbol: '<i class="fa fa-plus"></i>',
  openedSymbol: '<i class="fa fa-minus"></i>',
  prependTo: '#slicknav-mobile',
  allowParentLinks: true,
  label:"" 
});


$(document).ready(function() {
  $('select').niceSelect();
});

     // Range sliders activation
     $(".range-slider-ui").each(function() {
      var minRangeValue = $(this).attr('data-min');
      var maxRangeValue = $(this).attr('data-max');
      var minName = $(this).attr('data-min-name');
      var maxName = $(this).attr('data-max-name');
      var unit = $(this).attr('data-unit');
      $(this).slider({
          range: true,
          min: minRangeValue,
          max: maxRangeValue,
          values: [minRangeValue, maxRangeValue],
          slide: function(event, ui) {
              event = event;
              var currentMin = parseInt(ui.values[0]);
              var currentMax = parseInt(ui.values[1]);
              $(this).children(".min-value").text(currentMin + " " + unit);
              $(this).children(".max-value").text(currentMax + " " + unit);
              $(this).children(".current-min").val(currentMin);
              $(this).children(".current-max").val(currentMax);
          }
        });
     });

$('#datetimepicker1').datepicker({
  format: "dd/mm/yyyy",
  language: "es",
  autoclose: true,
  todayHighlight: true
});

$('#datetimepicker2').datepicker({
  format: "dd/mm/yyyy",
  language: "es",
  autoclose: true,
  todayHighlight: true
});


$('#datetimepicker3').datepicker({
  format: "dd/mm/yyyy",
  language: "es",
  autoclose: true,
  todayHighlight: true
});

$('#datetimepicker4').datepicker({
  format: "dd/mm/yyyy",
  language: "es",
  autoclose: true,
  todayHighlight: true
});

$('#datetimepicker5').datepicker({
  format: "dd/mm/yyyy",
  language: "es",
  autoclose: true,
  todayHighlight: true
});


$('#datetimepicker6').datepicker({
  format: "dd/mm/yyyy",
  language: "es",
  autoclose: true,
  todayHighlight: true
});

$('#datetimepicker7').datepicker({
  format: "dd/mm/yyyy",
  language: "es",
  autoclose: true,
  todayHighlight: true
});


$('#datetimepicker8').datepicker({
  format: "dd/mm/yyyy",
  language: "es",
  autoclose: true,
  todayHighlight: true
});

window.FPConfig = {
    delay: 0,
    ignoreKeywords: [],
    maxRPS: 3,
    hoverDelay: 50
  };
 

$('.package-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  autoplay: true,
  responsive: [
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 2    
    }
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 1
    }
  }
  ]
});

$('.deals-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  dots: false,
  responsive: [
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 2    
    }
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 1
    }
  }
  ]
});

$('.sale-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
  dots: false,
  responsive: [
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 2    
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1
    }
  }
  ]
});

$('.flight-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
  dots: false,
  speed:2000,
  responsive: [
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 2    
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1
    }
  }
  ]
});


$('.banner-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  speed: 3000,
  dots: false,
  responsive: [
  {
    breakpoint: 1100,
    settings: {
      slidesToShow: 2   
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      arrows: false
    }
  }
  ]
});

$('.partners-slider').slick({
  infinite: true,
  slidesToShow: 7,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  dots: false,
  responsive: [
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 4   
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2
    }
  }
  ]
});

$('.room-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  autoplay: false,
  responsive: [
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 2    
    }
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 1
    }
  }
  ]
});


$('.partners-slider-1').slick({
  infinite: true,
  slidesToShow: 8,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  dots: false,
  responsive: [
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 4   
    }
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 2
    }
  }
  ]
});

$('.sidebar-slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  dots: false,
});

$('.slider-store').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-thumbs'
});
$('.slider-thumbs').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.slider-store',
  dots: false,
  centerMode: true,
  arrows: true,
  focusOnSelect: true
});


$('.slider-shop').slick({
  infinite: true,
  autoplay: true,
  arrows: true,
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
      {
      breakpoint: 900,
      settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
      }
      },
      {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }
    }
  ]
});


$('.slider-testimonail').slick({
  infinite: true,
  autoplay: true,
  arrows: false,
  dots: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
      {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 639,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    }
  ]
}); 

$("#contactform").validate({      
    submitHandler: function() {
      
      $.ajax({
        url : 'mail/contact.php',
        type : 'POST',
        data : {
          name : $('input[name="full_name"]').val(),
          email : $('input[name="email"]').val(),
          phone : $('input[name="phone"]').val(),
          comments : $('textarea[name="comments"]').val(),
        },
        success : function( result ){
          $('#contactform-error-msg').html( result );
          $("#contactform")[0].reset();
        }     
      });

    }
  });


/**
   * Sidebar Sticky
  */
   
  $('.sidebar-sticky').stickit({
    screenMinWidth: 992,
    top: 60,
    zIndex: 9995,
    className: 'when-sticky-on',
    overflowScrolling: true,
    extraHeight: 0
  });
  
  $('.sidebar-sticky.sidebar-sticky-extra-height').stickit({
    screenMinWidth: 992,
    top: 60,
    zIndex: 9995,
    className: 'when-sticky-on',
    overflowScrolling: true,
    extraHeight: 100
  });
  
  $('#sidebar-sticky').stickit({
    screenMinWidth: 992,
    top: 80,
    zIndex: 9995,
    className: 'when-sticky-on-id',
    overflowScrolling: true,
    extraHeight: 100,
  });


$(document).on( 'click', '#back-to-top, .back-to-top',function(){
  $('html, body').animate({ scrollTop:0 }, '500');
  return false;
});
$(window).on( 'scroll', function(){

  /* ------------------------------------------------------------------------ */
/* BACK TO TOP 
/* ------------------------------------------------------------------------ */

if( $(window).scrollTop() > 500 ){
  $("#back-to-top").fadeIn(200);
} else{
  $("#back-to-top").fadeOut(200);
}

/* ------------------------------------------------------------------------ */
/* BACK TO TOP 
/* ------------------------------------------------------------------------ */

});


//jQuery for page scrolling feature - requires jQuery Easing plugin
$(document).on('click', 'a.page-scroll', function(event) {
  var $anchor = $(this);
  $('html, body').stop().animate({
    scrollTop: $($anchor.attr('href')).offset().top
  }, 1500, 'easeInOutExpo');
  event.preventDefault();
});

}(jQuery));

/**
* Make height equal to screen
*/

jQuery(window).on( 'resize load', function () {
    resize_eb_slider();   
}).resize();

/**
* Resize slider
*/

function resize_eb_slider(){

  var bodyheight = jQuery(this).height();

  if( jQuery(window).width() > 1400 ){
    bodyheight = bodyheight * 0.75;
    jQuery(".slider").css( 'height',bodyheight+'px' );
    jQuery(".banner-style-1 #js_frm_040").css( 'max-height',bodyheight*1.25+'px' );
    jQuery('#home_banner_video').css( 'height',bodyheight*1.20+'px' );
  } 

}


  /* Counter js Start */
  let valueDisplays = document.querySelectorAll(".num");
  let interval = 1000;

  valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));
      let duration = Math.floor(interval / endValue);
      let counter = setInterval(function() {
          startValue += 1;
          valueDisplay.textContent = startValue;
          if (startValue == endValue) {
              clearInterval(counter);
          }
      }, duration);
  });
/* Counter js end */


/* Banner Slider for Index 5 */
document.addEventListener('DOMContentLoaded', () => {
  animateActiveSlide(); // Trigger animations on initial page load
});

const swiper = new Swiper('.swiper', {
  speed: 1200,
  spaceBetween: 10,
  // autoplay: {
  //   delay: 7000,
  // },
  allowSlideNext: true,
  allowSlidePrev: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: false
  },
  on: {
    slideChange: function () {
      animateActiveSlide(this); // Trigger animations when slide changes
    }
  }
});

// Function to handle animations
function animateActiveSlide(swiperInstance) {
  // Default to manual slides if no Swiper instance is provided
  const swiper = swiperInstance || { 
      slides: document.querySelectorAll('.swiper-slide'), 
      activeIndex: 0 
  };

  // Ensure there are slides and an activeIndex
  if (!swiper.slides || swiper.slides.length === 0 || swiper.activeIndex == null) {
      console.warn('No slides found or active index is not set.');
      return; // Exit function if slides or activeIndex are invalid
  }

  const activeSlide = swiper.slides[swiper.activeIndex];

  // Check if activeSlide exists
  if (!activeSlide) {
      console.warn('Active slide not found.');
      return;
  }

  // Find animated elements within the active slide
  const animatedElements = activeSlide.querySelectorAll('.fadeInDown');

  if (!animatedElements || animatedElements.length === 0) {
      console.warn('No animated elements found in the active slide.');
      return;
  }

  // Immediately hide all elements
  animatedElements.forEach(el => {
      el.style.opacity = '0'; // Hide the element
      el.style.transform = 'translateY(-50px)'; // Move element up initially
      el.style.transition = 'none'; // Reset any ongoing transition
  });

  // Use setTimeout to delay the visibility changes and apply animations
  setTimeout(() => {
      animatedElements.forEach((el, index) => {
          // Set up transition properties to animate elements
          el.style.transition = `opacity 1.5s ease, transform 1.5s ease`;
          el.style.transitionDelay = `${index * 0.5}s`; // Stagger each element's animation
          el.style.opacity = '1'; // Fade to visible
          el.style.transform = 'translateY(0)'; // Move to the original position
      });
  }, 50); // Small delay to ensure elements are hidden first
}


  /* Counter js Start */
  let valueDisplays1 = document.querySelectorAll(".num");
  let interval1 = 1000;

  valueDisplays1.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));
      let duration = Math.floor(interval1 / endValue);
      let counter = setInterval(function() {
          startValue += 1;
          valueDisplay.textContent = startValue;
          if (startValue == endValue) {
              clearInterval(counter);
          }
      }, duration);
  });
/* Counter js end */


/*Slider for offer-slider Index-5 */
$('.autoplay-offer-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows:false,
  infinite: false,
  dots: true,
});

/*Slider for offer-slider Index-5 */


/* Slider For Guide Start */
$('.guide-slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows:true,
  infinite: false,
  dots: false,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
/* Slider For Guide Ends */

/* Slider For Testimonial Start */
$(document).ready(function () {
  $('.testimonial-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 578,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      }
    ]
  });


  // Function to add margin to the middle slide among visible slides
  function adjustCenterVisibleSlideMargin() {
    // Get the number of currently visible slides
    var slidesToShow = $('.testimonial-slider').slick('slickGetOption', 'slidesToShow');
    
    // Reset top margin for all slides
    $('.testimonial-slider .slick-slide').css('margin-top', '0');

    // Apply margin only if 3 slides are visible
    if (slidesToShow === 3) {
      // Find the visible slides (inside the current view)
      var currentVisibleSlides = $('.testimonial-slider .slick-slide').filter(function () {
        return $(this).attr('aria-hidden') === 'false'; // Slick marks visible slides with aria-hidden="false"
      });

      // Calculate the index of the middle slide among the visible slides
      var middleIndex = Math.floor(currentVisibleSlides.length / 2); 

      // Apply the margin to the center slide
      $(currentVisibleSlides[middleIndex]).css('margin-top', '30px');
    }
  }

  // Adjust margin on page load
  adjustCenterVisibleSlideMargin();

  // Adjust margin on slider change
  $('.testimonial-slider').on('afterChange', function () {
    adjustCenterVisibleSlideMargin();
  });

  // Adjust margin on window resize
  $(window).resize(function () {
    adjustCenterVisibleSlideMargin();
  });
});

  /* Slider For Testimonial Ends */


/* Countdown for Index 5 Offer-banner*/

document.addEventListener('DOMContentLoaded', function() {
  const days = document.getElementById('days');
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');

  // Check if all elements are found
  const elementsExist = days && hours && minutes && seconds;

  // If any element is missing, log a warning and return
  if (!elementsExist) {
      console.warn('One or more countdown elements not found.');
      return;
  }

  // Get current date and time
  const currentTime = new Date();

  // Set new date 30 days from now
  const targetTime = new Date(currentTime.getTime() + (100 * 24 * 60 * 60 * 1000));

  // Update countdown time
  function updateCountdown() {
      const currentTime = new Date();
      const diff = targetTime - currentTime;

      const d = Math.floor(diff / 1000 / 60 / 60 / 24);
      const h = Math.floor((diff / 1000 / 60 / 60) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      // Update elements if they exist
      if (days) days.innerHTML = d;
      if (hours) hours.innerHTML = h < 10 ? '0' + h : h;
      if (minutes) minutes.innerHTML = m < 10 ? '0' + m : m;
      if (seconds) seconds.innerHTML = s < 10 ? '0' + s : s;
  }

  // Call updateCountdown initially and set it to run every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
/*  Countdown for Index 5 Offer-banner End */


  /* Index-6 Top destination Slider Starts */
  let swiperInstance;

// Function to initialize Swiper with Coverflow effect
function initSwiperCoverflow(slidesPerView) {
  console.log('Initializing Coverflow Swiper with slidesPerView:', slidesPerView);
  swiperInstance = new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: slidesPerView,
      coverflowEffect: {
          rotate: 30,
          stretch: -30,
          depth: 150,
          modifier: 1.5,
          slideShadows: true,
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
  });
}


// Function to initialize Swiper with a simple slide effect
function initSwiperSlide() {
    swiperInstance = new Swiper('.mySwiper', {
        effect: 'slide',
        grabCursor: true,
        slidesPerView: 1,
        centeredSlides: false,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

// Function to detect window size and initialize Swiper accordingly
function updateSwiper() {
  // Check if swiperInstance is defined and not already destroyed
  if (swiperInstance && !swiperInstance.destroyed) {
      swiperInstance.destroy(true, true); // Safely destroy the current Swiper instance
  }

  // Initialize Swiper based on window width
  if (window.innerWidth <= 576) {
      initSwiperSlide(); // Use the slider configuration for small screens
  } else if (window.innerWidth >= 990) {
      initSwiperCoverflow(4); // Use coverflow with 4 slides for larger screens
  } else {
      initSwiperCoverflow(3); // Use coverflow with 3 slides for medium screens
  }
}

if (!swiperInstance) {
  console.warn('Swiper instance not initialized');
} else if (swiperInstance.destroyed) {
  console.warn('Swiper instance already destroyed');
}


// Debounce resize event
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateSwiper, 300); // Debounce to prevent rapid calls
});

// Initialize Swiper on page load
updateSwiper();

  /* Index-6 Top destination Slider Ends */

  /* Index-6 partner Slider Starts */
  $('.partner-slider').slick({
    dots: false,
    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  /* Index-6 partner Slider Ends */


  /* Index-6 Explore Trip thumbnailw Slider Starts */
  $(document).ready(function(){
    // Main slider
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,   // Optional: for fade effect
      asNavFor: '.slider-nav' // Sync with thumbnail slider
    });
  
    // Thumbnail slider
    $('.slider-nav').slick({
      slidesToShow: 5,         // Number of thumbnails shown at once
      slidesToScroll: 1,
      asNavFor: '.slider-for',  // Sync with main slider
      dots: false,              // Optional: pagination dots
      centerMode: false,        // Optional: center active thumbnail
      focusOnSelect: true,
      responsive: [
          {
          breakpoint: 1400,
            settings: {
            slidesToShow: 3,
          }}, 
          {
          breakpoint: 960,
            settings: {
            slidesToShow: 4,
          }},
          {
          breakpoint: 578,
            settings: {
            slidesToShow: 2,
          }},
      ]
    });
  });

  /* Index-6 Explore Trip thumbnailw Slider Ends */

/* Index-6 Slider For Testimonial Start */
$(document).ready(function () {
  $('.testimonial-slider1').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 578,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
})

/* Index-6 Slider For Testimonial Ends */

/* Index-6 Slider For Instagram Slider Start */
$(document).ready(function () {
  $('.instagram-slider').slick({
    slidesToShow: 9,
    slidesToScroll: 2,
    infinite: true,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 578,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  });
})

/* Index-6 Slider For Instagram Slider Ends */

$(document).ready(function () {
  $('.dashboard-review-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 578,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
})


		