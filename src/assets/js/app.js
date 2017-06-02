$(document).foundation();

// nav button open/close animation
$('[data-curtain-menu-button]').click(function() {
  $('body').toggleClass('curtain-menu-open');
})

// landing page video js
$(document).ready(function() {

  setInterval(function() {
    determineVideoAndAudioStatus();
  }, 500);

  //show replay icon & introduction after video ends
  $('#landing-page-video').on('ended', function() {
    $('#replay-container').toggleClass('visible invisible');
    $('#introduction').toggleClass('opacity no-opacity').addClass('fadeInUp').removeClass('fadeOutDown no-opacity');
    $('#learn-more').toggleClass('opacity no-opacity').removeClass('no-opacity');
  });

  //replay video and turn on audio if replay icon clicked
  $('#replay-button').click(function() {
    $('#launch-prep').css('opacity', '1');
    var video = document.getElementById('landing-page-video');
    setTimeout(function() {
      $('#launch-prep').fadeOut(5000, 0);
      video.play();
    }, 5000);
    var audio = document.getElementById('liftoff-audio');
    audio.play();
    if ($('#volume-icon').hasClass('fa-volume-off')) {
      $('#audio-toggle').trigger('click');
    }
    $('#replay-container').toggleClass('invisible visible');
    if ($('#introduction').hasClass('fadeInUp')) {
      $('#introduction').toggleClass('fadeOutDown fadeInUp');
    } else {
      $('#introduction').toggleClass('fadeInUp fadeOutDown');
    }
    $('#learn-more').toggleClass('no-opacity opacity')
  })
  
  /*$("#audio-toggle").hover(function() {
    var mainIcon = $('#audio-toggle').find('#volume-icon');
    var secondaryIcon = $('#audio-toggle').find('#secondary-icon');
    $(mainIcon).css('display', 'none');
    $(secondaryIcon).css('display', 'block');
    
    var audio = document.getElementById("liftoff-audio");
    $(this).on({
      mouseleave: function() {
        if (audio.muted) {
          $(secondaryIcon).css('display', 'none');
          $(mainIcon).css('display', 'block');
          clearInterval(alternateAudioIcons);
          setInterval(function() {
            flipFlopIcons();
          }, 500);
        }
      }
    });
    
  })*/

  //toggle between volume icons when click occurs
  $("#audio-toggle").on('click', function() {
    $(this).find('i').toggleClass('fa-volume-up fa-volume-off');
  });
  
  //initialize animatedModal
  $('#contact-button').animatedModal();

  scaleVideoContainer();

  initBannerVideoSize('.video-container .filter');
  initBannerVideoSize('.video-container video');

  $(window).on('resize', function() {
    scaleVideoContainer();
    scaleBannerVideoSize('.video-container .filter');
    scaleBannerVideoSize('.video-container video');
  });

  //hide/show nav curtain expansion toggle button if user not at very top
  setInterval(function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop !== 0) {
      $('#curtain-menu-button-toggle').addClass('toggle-invisible').removeClass('toggle-visible');
    } else if (scrollTop === 0) {
      $('#curtain-menu-button-toggle').addClass('toggle-visible').removeClass('toggle-invisible');
    }
  }, 500);

  // hide/show nav bar based on scrolling status
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('#top-bar').outerHeight();

  $(window).scroll(function(event) {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(window).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
      return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('#top-bar').removeClass('navbar-down').addClass('navbar-up');
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('#top-bar').removeClass('navbar-up').addClass('navbar-down');
      }
    }

    lastScrollTop = st;
  }

  // animated scrolling
  $('#home-link').click(function() {
    $('html, body').animate({
      scrollTop: $('#landing-area').offset().top
    }, 2000);
  });

  $('#about-link').click(function() {
    $('html, body').animate({
      scrollTop: $('#about').offset().top
    }, 2000);
  });

  $('#skills-link').click(function() {
    $('html, body').animate({
      scrollTop: $('#skills').offset().top
    }, 2000);
  });

  $('#work-link').click(function() {
    $('html, body').animate({
      scrollTop: $('#work').offset().top
    }, 2000);
  });

  $('#contact-link').click(function() {
    $('html, body').animate({
      scrollTop: $('#contact').offset().top
    }, 2000);
  });

  $('#learn-more').click(function() {
    $('html, body').animate({
      scrollTop: $('#about').offset().top
    }, 1000);
  });
  
  $('#available').click(function() {
    $('html, body').animate({
      scrollTop: $('#contact').offset().top
    }, 1500);
  })

});

var videoPlaying;
var audioPlaying;

//blog back-to-the-top scrolling method
$('#up-arrow').click(function() {
  $('html, body').animate({
    scrollTop: $('#header-section').offset().top
  }, 2000);
});

var alreadyPlayed;
//determine if video & audio should be played at load based on screen size
function determineVideoAndAudioStatus() {
  var windowWidth = $(window).width();
  if (windowWidth > 1000 && !alreadyPlayed) {
    setAudioToggle();
    var video = document.getElementById("landing-page-video");
    setTimeout(function() {
      $('#launch-prep').fadeTo('slow', 0);
      video.play();
    }, 5000); //video delayed 5 seconds to sync w/ audio
    alreadyPlayed = true;
  }
}

var audioClicked = false;

//set up audio toggle capability for muting
function setAudioToggle() {
  var audio = document.getElementById("liftoff-audio");
  document.getElementById("audio-toggle").addEventListener('click', function(e) {

    e = e || window.event;
    audio.muted = !audio.muted;
    e.preventDefault();

  }, false);
};

/*var alternateAudioIcons = setInterval(function() {
  flipFlopIcons();
}, 500);

function flipFlopIcons() {
  var audioPlaying;
  var audio = document.getElementById("liftoff-audio");
  if (!audio.paused) {
    audioPlaying = true;
  } else {
    audioPlaying = false;
  }
  if (audioPlaying && !audioClicked) {
    $('#volume-icon').toggleClass('fa-volume-up', 'fa-volume-off');
    $('#volume-icon').toggleClass('fa-volume-off', 'fa-volume-up');
  } else if (audioPlaying && audioClicked) {
    console.log('hello');
    $('#volume-icon').addClass('fa-volume-up');
  }
};*/

// handle scaling of video container...
function scaleVideoContainer() {

  var height = $(window).height() + 5;
  var unitHeight = parseInt(height) + 'px';
  $('.homepage-hero-module').css('height', unitHeight);

}

function initBannerVideoSize(element) {

  $(element).each(function() {
    $(this).data('height', $(this).height());
    $(this).data('width', $(this).width());
  });

  scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element) {

  var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

  $(element).each(function() {
    var videoAspectRatio = $(this).data('height') / $(this).data('width');

    $(this).width(windowWidth);

    if (windowWidth < 1000) {
      videoHeight = windowHeight;
      videoWidth = videoHeight / videoAspectRatio;
      $(this).css({
        'margin-top': 0,
        'margin-left': -(videoWidth - windowWidth) / 2 + 'px'
      });

      $(this).width(videoWidth).height(videoHeight);
    }

    $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

  });
}