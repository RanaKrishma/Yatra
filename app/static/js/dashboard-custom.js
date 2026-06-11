/* ----------------- Start Document ----------------- */
(function($){
"use strict";

$(document).ready(function(){
	/*--------------------------------------------------*/
	/*  Navigation
	/*--------------------------------------------------*/
	var jPanelMenu = $.jPanelMenu({
	  menu: '#responsive',
	  animated: false,
	  duration: 200,
	  keyboardShortcuts: false,
	  closeOnContentClick: true
	});

	// Menu Trigger
	$('.menu-trigger').on('click', function(){

	  var jpm = $(this);

	  if( jpm.hasClass('active') )
	  {
	    jPanelMenu.off();
	    jpm.removeClass('active');
	  }
	  else
	  {
	    jPanelMenu.on();
	    jPanelMenu.open();
	    jpm.addClass('active');

		// Removes SuperFish Styles
		$('#jPanelMenu-menu').removeClass('menu');
		$('ul#jPanelMenu-menu li').removeClass('dropdown');
		$('ul#jPanelMenu-menu li ul').removeAttr('style');
		$('ul#jPanelMenu-menu li div').removeClass('mega').removeAttr('style');
		$('ul#jPanelMenu-menu li div div').removeClass('mega-container');
	  }
	  return false;
	});

	$(window).resize(function (){
		var winWidth = $(window).width();
		if(winWidth>992) {
			jPanelMenu.close();
		}
	});

    /*  User Menu */
    $('.user-menu').on('click', function(){
		$(this).toggleClass('active');
	});


	/*----------------------------------------------------*/
	/*  Sticky Header 
	/*----------------------------------------------------*/
	$( "#header" ).not( "#header.not-sticky" ).clone(true).addClass('cloned unsticky').insertAfter( "#header" );
	$( "#navigation.style-2" ).clone(true).addClass('cloned unsticky').insertAfter( "#navigation.style-2" );

	// Logo for header style 2
	$( "#logo .sticky-logo" ).clone(true).prependTo("#navigation.style-2.cloned ul#responsive");


	// sticky header script
	var headerOffset = $("#header-container").height() * 2; // height on which the sticky header will shows

	$(window).scroll(function(){
		if($(window).scrollTop() >= headerOffset){
			$("#header.cloned").addClass('sticky').removeClass("unsticky");
			$("#navigation.style-2.cloned").addClass('sticky').removeClass("unsticky");
		} else {
			$("#header.cloned").addClass('unsticky').removeClass("sticky");
			$("#navigation.style-2.cloned").addClass('unsticky').removeClass("sticky");
		}
	});


	/*----------------------------------------------------*/
	/*  Back to Top
	/*----------------------------------------------------*/
	var pxShow = 600; // height on which the button will show
	var scrollSpeed = 500; // how slow / fast you want the button to scroll to top.

	$(window).scroll(function(){
	 if($(window).scrollTop() >= pxShow){
		$("#backtotop").addClass('visible');
	 } else {
		$("#backtotop").removeClass('visible');
	 }
	});

	$('#backtotop a').on('click', function(){
	 $('html, body').animate({scrollTop:0}, scrollSpeed);
	 return false;
	});


	/*----------------------------------------------------*/
	/*  Inline CSS replacement for backgrounds etc.
	/*----------------------------------------------------*/
	function inlineCSS() {

		// Common Inline CSS
		$(".main-search-container, section.fullwidth, .listing-slider .item, .address-container, .img-box-background, .image-edge, .edge-bg").each(function() {
			var attrImageBG = $(this).attr('data-background-image');
			var attrColorBG = $(this).attr('data-background-color');

	        if(attrImageBG !== undefined) {
	            $(this).css('background-image', 'url('+attrImageBG+')');
	        }

	        if(attrColorBG !== undefined) {
	            $(this).css('background', ''+attrColorBG+'');
	        }
		});

	}

	// Init
	inlineCSS();

	function parallaxBG() {

		$('.parallax').prepend('<div class="parallax-overlay"></div>');

		$( ".parallax").each(function() {
			var attrImage = $(this).attr('data-background');
			var attrColor = $(this).attr('data-color');
			var attrOpacity = $(this).attr('data-color-opacity');
			
	        if(attrImage !== undefined) {
	            $(this).css('background-image', 'url('+attrImage+')');
	        }

	        if(attrColor !== undefined) {
	            $(this).find(".parallax-overlay").css('background-color', ''+attrColor+'');
	        }

	        if(attrOpacity !== undefined) {
	            $(this).find(".parallax-overlay").css('opacity', ''+attrOpacity+'');
	        }

		});
	}

	parallaxBG();



    /*----------------------------------------------------*/
    /*  Image Box 
    /*----------------------------------------------------*/
	$('.category-box').each(function(){

		// add a photo container
		$(this).append('<div class="category-box-background"></div>');

		// set up a background image for each tile based on data-background-image attribute
		$(this).children('.category-box-background').css({'background-image': 'url('+ $(this).attr('data-background-image') +')'});

		// background animation on mousemove
		// $(this).on('mousemove', function(e){
		//   $(this).children('.category-box-background').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
		// })
	});


    /*----------------------------------------------------*/
    /*  Image Box 
    /*----------------------------------------------------*/
	$('.img-box').each(function(){
		$(this).append('<div class="img-box-background"></div>');
		$(this).children('.img-box-background').css({'background-image': 'url('+ $(this).attr('data-background-image') +')'});
	});


	/*----------------------------------------------------*/
	/*	Toggle
	/*----------------------------------------------------*/

	$(".toggle-container").hide();

	$('.trigger, .trigger.opened').on('click', function(a){
		$(this).toggleClass('active');
		a.preventDefault();
	});

	$(".trigger").on('click', function(){
		$(this).next(".toggle-container").slideToggle(300);
	});

	$(".trigger.opened").addClass("active").next(".toggle-container").show();



    /*----------------------------------------------------*/
    /*  Like Icon Trigger
    /*----------------------------------------------------*/
    $('.like-icon, .widget-button, .like-button').on('click', function(e){
    	e.preventDefault();
		$(this).toggleClass('liked');
		$(this).children('.like-icon').toggleClass('liked');
	});

    /*----------------------------------------------------*/
    /*  Searh Form More Options
    /*----------------------------------------------------*/
    $('.more-search-options-trigger').on('click', function(e){
    	e.preventDefault();
		$('.more-search-options, .more-search-options-trigger').toggleClass('active');
		$('.more-search-options.relative').animate({height: 'toggle', opacity: 'toggle'}, 300);
	});


    /*----------------------------------------------------*/
    /*  Counters
    /*----------------------------------------------------*/
    $(window).on('load resize', function() {
		$('.dashboard-stat-content h4').counterUp({
	        delay: 100,
	        time: 800
	    });
    });


    /*----------------------------------------------------*/
    /*  Rating Script Init
    /*----------------------------------------------------*/

	// Leave Rating 
	$('.leave-rating input').change(function () {
		var $radio = $(this);
		$('.leave-rating .selected').removeClass('selected');
		$radio.closest('label').addClass('selected');
	});


	/*----------------------------------------------------*/
	/* Dashboard Scripts
	/*----------------------------------------------------*/
    $('.dashboard-nav ul li a').on('click', function(){
		if ($(this).closest('li').has('ul').length) {
			$(this).parent('li').toggleClass('active');
		}
	});

    // Dashbaord Nav Scrolling
	$(window).on('load resize', function() {
		var wrapperHeight = window.innerHeight;
		var headerHeight = $("#header-container").height();
		var winWidth = $(window).width();

		if(winWidth>992) {
			$(".dashboard-nav-inner").css('max-height', wrapperHeight-headerHeight-180);
		} else {
			$(".dashboard-nav-inner").css('max-height', '');
		}
	});


    // Tooltip
	$(".tip").each(function() {
		var tipContent = $(this).attr('data-tip-content');
		$(this).append('<div class="tip-content">'+ tipContent + '</div>');
	});


    // Switcher
	$(".add-listing-section").each(function() {

		var switcherSection = $(this);
		var switcherInput = $(this).find('.switch input');

		if(switcherInput.is(':checked')){
			$(switcherSection).addClass('switcher-on');
		} 

		switcherInput.change(function(){
			if(this.checked===true){
				$(switcherSection).addClass('switcher-on');
			} else {
				$(switcherSection).removeClass('switcher-on');
			}
		});

	});


	// Responsive Nav Trigger
    $('.dashboard-responsive-nav-trigger').on('click', function(e){
    	e.preventDefault();
		$(this).toggleClass('active');

		var dashboardNavContainer = $('body').find(".dashboard-nav");

		if( $(this).hasClass('active') ){
			$(dashboardNavContainer).addClass('active');
		} else {
			$(dashboardNavContainer).removeClass('active');
		}

	});

    // Dashbaord Messages Alignment
	$(window).on('load resize', function() {
		var msgContentHeight = $(".message-content").outerHeight();
		var msgInboxHeight = $(".messages-inbox ul").height();
		
		if( msgContentHeight > msgInboxHeight ){
			$(".messages-container-inner .messages-inbox ul").css('max-height', msgContentHeight)
		}
	});



	/*----------------------------------------------------*/
	/* Listing Page Nav
	/*----------------------------------------------------*/

    $(window).on('load resize', function() {
      var containerWidth = $(".container").width();
      $('.listing-nav-container.cloned .listing-nav').css('width', containerWidth);
    });

	if(document.getElementById("listing-nav") !== null) {
		$(window).scroll(function(){
			var window_top = $(window).scrollTop();
			var div_top = $('.listing-nav').not('.listing-nav-container.cloned .listing-nav').offset().top + 90;
		    if (window_top > div_top) {
		        $('.listing-nav-container.cloned').addClass('stick');
		    } else {
		        $('.listing-nav-container.cloned').removeClass('stick');
		    }
		});
	}

	$( ".listing-nav-container" ).clone(true).addClass('cloned').prependTo("body");


    // Smooth scrolling using scrollto.js
	$('.listing-nav a, a.listing-address, .star-rating a').on('click', function(e) {
        e.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash, { gap: {y: -20} }); 
    });

	$(".listing-nav li:first-child a, a.add-review-btn, a[href='#add-review']").on('click', function(e) {
        e.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash, { gap: {y: -100} }); 
    });


    // Highlighting functionality.
	$(window).on('load resize', function() {
		var aChildren = $(".listing-nav li").children();
		var aArray = [];
		for (var i=0; i < aChildren.length; i++) {    
		    var aChild = aChildren[i];
		    var ahref = $(aChild).attr('href');
		    aArray.push(ahref);
		}

		$(window).scroll(function(){
		    var windowPos = $(window).scrollTop(); 
		    for (var i=0; i < aArray.length; i++) {
		        var theID = aArray[i];
		        var divPos = $(theID).offset().top - 150;
		        var divHeight = $(theID).height();
		        if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
		            $("a[href='" + theID + "']").addClass("active");
		        } else {
		            $("a[href='" + theID + "']").removeClass("active");
		        }
		    }
		});
	});



// ------------------ End Document ------------------ //
});

})(this.jQuery);


/*!
 * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 **/

$.scrollTo = $.fn.scrollTo = function(x, y, options){
    if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

    options = $.extend({}, {
        gap: {
            x: 0,
            y: 0
        },
        animation: {
            easing: 'swing',
            duration: 600,
            complete: $.noop,
            step: $.noop
        }
    }, options);

    return this.each(function(){
        var elem = $(this);
        elem.stop().animate({
            scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
            scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
        }, options.animation);
    });
};


/*----------------------------------------------------*/
/*  Ratings Script
/*----------------------------------------------------*/

/*  Numerical Script
/*--------------------------*/
function numericalRating(ratingElem) {

	$(ratingElem).each(function() {
		var dataRating = $(this).attr('data-rating');

		// Rules
	    if (dataRating >= 4.0) {
	        $(this).addClass('high');
	    } else if (dataRating >= 3.0) {
	        $(this).addClass('mid');
	    } else if (dataRating < 3.0) {
	        $(this).addClass('low');
	    }

	});

} numericalRating('.numerical-rating');

// Js to upload the image and preview it 

function previewImages(event) {
	const container = document.getElementById("imagePreviewContainer");
	container.innerHTML = ""; // Clear previous previews

	for (const file of event.target.files) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const img = document.createElement("img");
			img.src = e.target.result;
			img.style.width = "200px";
			img.style.margin = "5px";
			container.appendChild(img);
		};
		reader.readAsDataURL(file);
	}
}


/** JS to add and delete row for pricing in Add tour **/

 // Function to delete a row
 document.addEventListener('DOMContentLoaded', () => {
  function deleteRow(event) {
    event.preventDefault(); // Prevent the default behavior of the <a> tag
    const row = event.target.closest('tr'); // Find the closest <tr> element (row)

    // Check how many rows are in the table
    const table = document.getElementById("pricing-list-container");
    const rows = table.querySelectorAll('tr');

    // Ensure at least one row is left
    if (rows.length <= 1) {
      return; // Don't delete the row if there is only one row left
    }

    row.remove(); // Only delete the row if there is more than one row
  }

  function addRow() {
    const table = document.getElementById("pricing-list-container");

    // Create a new row (tr element)
    const newRow = document.createElement("tr");
    newRow.classList.add("pricing-list-item", "pattern");

    // Create the HTML content for the new row
    newRow.innerHTML = `
      <td class="d-block d-md-flex">
        <div class="fm-move my-1"><i class="sl sl-icon-cursor-move"></i></div>
        <div class="fm-input pricing-name my-1"><input type="text" placeholder="Title" class="rounded" /></div>
        <div class="fm-input pricing-ingredients my-1w"><input type="text" placeholder="Description" class="rounded" /></div>
        <div class="fm-input pricing-price my-1"><input type="number" placeholder="Price" data-unit="USD" class="rounded" /></div>
        <div class="fm-input pricing-currency my-1">
          <select class="rounded">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div class="fm-close">
          <a class="delete" href="#"><i class="fa fa-remove"></i></a>
        </div>
      </td>
    `;

    // Append the new row to the table
    table.appendChild(newRow);

    // Reinitialize Nice Select on the newly added <select> elements
    $(newRow).find('select').niceSelect();  // Apply Nice Select to the new <select>

    // Add event listener to the delete link in the new row
    const deleteLink = newRow.querySelector('.delete');
    deleteLink.addEventListener('click', deleteRow);
  }

  // Add event listener for adding a row when the "Add Row" button is clicked
  const addRowButton = document.getElementById("addRowButton");
  if (addRowButton) {
    addRowButton.addEventListener("click", addRow);
  }

  // Initially attach event listener to the delete link in the first row
  const deleteLinks = document.querySelectorAll('.delete');
  deleteLinks.forEach(function (link) {
    link.addEventListener('click', deleteRow);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const dropArea = document.getElementById('drop-area');
  const fileInput = document.getElementById('file-input');

  // Check if the dropArea and fileInput exist
  if (!dropArea || !fileInput) {
    console.warn('Required DOM elements not found. Make sure "drop-area" and "file-input" exist in your HTML.');
    return; // Exit if required elements are missing
  }

  const fileList = document.createElement('ul'); // Create a list to display files
  dropArea.appendChild(fileList); // Add the list to the drop area

  // Open file dialog when clicking the drop area
  dropArea.addEventListener('click', () => {
    fileInput.click();
  });

  // Handle drag events
  dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    console.log('Dragover event detected'); // Debugging
    dropArea.classList.add('dragover');
  });

  dropArea.addEventListener('dragleave', () => {
    console.log('Dragleave event detected'); // Debugging
    dropArea.classList.remove('dragover');
  });

  dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    console.log('Drop event detected'); // Debugging
    dropArea.classList.remove('dragover');

    const files = event.dataTransfer.files;
    console.log(files); // Debugging
    handleFiles(files);
  });

  // Handle file selection
  fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files);
  });

  function handleFiles(files) {
    console.log('Files dropped or selected:');
    fileList.innerHTML = ''; // Clear the list before adding new files
    for (let file of files) {
      console.log('File:', file.name, file.size, file.type);

      // Create a list item for each file
      const listItem = document.createElement('li');
      listItem.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
      fileList.appendChild(listItem);
    }
  }
});
