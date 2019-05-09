(function() {
	'use strict';

	/*----------------------------------------
		Detect Mobile
	----------------------------------------*/
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	// navigation
	var OnePageNav = function() {
		var navToggler = $('.navbar-toggler');
		$(".smoothscroll[href^='#'], #pb-navbar ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();
		 	var hash = this.hash;
		 		
		 	$('html, body').animate({

		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });
		});
		$("#pb-navbar ul li a[href^='#']").on('click', function(e){
			if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});

		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	

	/*----------------------------------------
		Animate Scroll
	----------------------------------------*/

	var contentWayPoint = function() {
		var i = 0;
		$('.site-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('site-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .site-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn site-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft site-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight site-animated');
							} else {
								el.addClass('fadeInUp site-animated');
							}
							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};

	// Page Nav
	var clickMenu = function() {

		$('.navbar-nav a:not([class="external"])').click(function(event){

			var section = $(this).data('nav-section'),
				navbar = $('.navbar-nav');
				if (isMobile.any()) {
					$('.navbar-toggle').click();
				}
				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top
			    	}, 500, 'easeInOutExpo');
			   }

		    event.preventDefault();
		    return false;
		});


	};

	


	var smoothScroll = function() {
		var $root = $('html, body');

		$('.smoothscroll').click(function () {
			$root.animate({
		    scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 500);
			return false;
		});
	};
	


	$(function(){

		OnePageNav();
		contentWayPoint();
		navbarState();
		clickMenu();
		smoothScroll();
	});

	


})();

