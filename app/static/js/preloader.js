"use strict";

/*======== Document Ready Function =========*/
jQuery(document).ready(function () {
   // Initialize Wow JS or any other plugin here
   new WOW().init();
});

/*======== Window Load Function =========*/
$(window).on('load', function () {
    // Set the delay times in milliseconds
    const preloaderDelay = 2000; // Time the preloader will stay visible
    const statusFadeOutTime = 1500; // Time it takes for #status to fade out
 
    // Fade out the #status after the preloader delay
    $("#status").delay(preloaderDelay).fadeOut(statusFadeOutTime, function () {
        console.log("Status hidden after delay.");
    });
 
    // Fade out the #preloader after the status is hidden
    $("#preloader").delay(preloaderDelay + statusFadeOutTime).fadeOut("slow", function () {
        console.log("Preloader hidden after delay.");
    });
 
    // Make the page scrollable again after the preloader is hidden
    $("body").delay(preloaderDelay + statusFadeOutTime).css({ "overflow": "visible" });
 });
 
 
