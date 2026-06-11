 /* Index-6 Demo Video Start */
  // Initialize LightGallery on the #video-gallery element
  const videoGalleryElement = document.getElementById('video-gallery');

// Check if lgVideo is defined before initializing LightGallery
if (typeof lgVideo !== 'undefined') {
    lightGallery(videoGalleryElement, {
        plugins: [lgVideo], // Enable video plugin
        speed: 500, // Popup animation speed in ms
    });
} else {
    console.warn('lgVideo is not defined. LightGallery initialized without the video plugin.');
    lightGallery(videoGalleryElement, {
        speed: 500, // Popup animation speed in ms
    });
}

  /* Index-6 Demo Video Ends */