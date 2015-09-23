$(document).ready(function(){

	function getScrollbarWidth() {
	    var outer = document.createElement("div");
	    outer.style.visibility = "hidden";
	    outer.style.width = "100px";
	    document.body.appendChild(outer);
	    
	    var widthNoScroll = outer.offsetWidth;
	    // force scrollbars
	    outer.style.overflow = "scroll";
	    
	    // add innerdiv
	    var inner = document.createElement("div");
	    inner.style.width = "100%";
	    outer.appendChild(inner);        
	    
	    var widthWithScroll = inner.offsetWidth;
	    
	    // remove divs
	    outer.parentNode.removeChild(outer);
	    
	    return widthNoScroll - widthWithScroll;
	}

	// fast click on touch devices
	FastClick.attach(document.body);

	// html5 placeholders support
	$('input, textarea').placeholder();

	// input masks
	$('input[type=tel]').mask('+9 (999) 999-99-99');

	// hide ie clear button appearing with mask
	$('input[type=tel]').on('focus', function(){
		$(this).addClass('ie-tel');
	});

	$('input[type=tel]').on('change keyup paste', function(){
		$(this).removeClass('ie-tel');
	});

	// form validation
	$('.validate-form').validate({
		errorClass: 'invalid',
		validClass: 'valid',
		errorElement: 'span',
		wrapper: 'em',

		onfocusout: function(element) {
			$(element).valid();
		},
		highlight: function(element, errorClass, validClass) {
			$(element).addClass(errorClass).removeClass(validClass);
			$(element).parent().addClass(errorClass).removeClass(validClass);
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass(errorClass).addClass(validClass);
			$(element).parent().removeClass(errorClass).addClass(validClass);
		},

		ignore: '.ignore'
	});

	// add class on filled inputs
	var inputFields = $('input, textarea');

	inputFields.on('focus blur', function() {
		if( $(this).val() ) {
			$(this).addClass('filled');
		} else {
			$(this).removeClass('filled');
		}
	});

	inputFields.each(function(){
		if( $(this).val() ) {
			$(this).addClass('filled');
		} else {
			$(this).removeClass('filled');
		}
	});

	// bg videos

	var videoPlayBtn = $('.m-content-cover__play');

	if ( !$('html').hasClass('supports') ) {
		videoPlayBtn.addClass('visible')
	}

	videoPlayBtn.on('click', function(){
		$(this).removeClass('visible').prev('video').get(0).play();
	});

	// home page
	// if ( $('body').hasClass('home') ) {
	// 	noBounce.init({
	// 		animate: false
	// 	});
	// }

	// hamburger-menus
	var header = $('header');
	var burgerBtn = $('#h-burger');
	var burgerNav = $('#h-burger-nav');

	burgerBtn.on('click', function(){
		// $('html').toggleClass('noscroll');
		header.toggleClass('active');
		$(this).toggleClass('active');
		burgerNav.toggleClass('active');

		if ( $(this).hasClass('active') && Modernizr.mq('(max-width: 667px)') ) {
			$(document).on('touchmove', function(e){
			    e.preventDefault();
			});

			var scrolling = false;

			$('body').on('touchstart','nav',function(e) {

			    if (!scrolling) {
			        scrolling = true;   
			        if (e.currentTarget.scrollTop === 0) {
			          e.currentTarget.scrollTop = 1;
			        } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
			          e.currentTarget.scrollTop -= 1;
			        }
			        scrolling = false;
			    }
			});

			$('body').on('touchmove','nav',function(e) {
			  e.stopPropagation();
			});
		} else {
			$(document).unbind('touchmove');
		}

	});

	if ( $('html').hasClass('no-touch') ) {
		burgerNav.perfectScrollbar();
	}

	var lkBurgerBtn = $('#m-burger');
	var lkBurgerNav = $('#m-burger-nav');

	function lkBurgerCheck(){
		if ( !Modernizr.mq('(min-width: 668px)') && !lkBurgerBtn.hasClass('active') ) {
			lkBurgerNav.hide();
		} else {
			lkBurgerNav.show();
		}
	}

	lkBurgerCheck();

	lkBurgerBtn.on('click', function(){
		$(this).toggleClass('active');
		lkBurgerNav.slideToggle()
	});

	$(window).on('resize', lkBurgerCheck);

	// aside bar
	var content = $('main');
	var asideBtn = $('#m-aside-toggle');
	var asideBar = $('.m-aside');

	asideBtn.on('click', function(){

		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active').text('Свернуть');
		} else {
			$(this).addClass('active').text('Показать');
		}

		asideBar.toggleClass('hidden');
		content.toggleClass('aside-yes aside-no');

		setTimeout(function(){
			window.dispatchEvent(new Event('resize'));
		}, 500);
	});

	// search bar
	var searchLinks = $('.m-header-sections').find('a.active');
	var searchBtn = $('.m-header-search-toggle');

	searchBtn.on('click', function(e){
		$(this).toggleClass('active');
		searchLinks.toggleClass('inactive');
		e.preventDefault();
	});

	// custom scrollbar
	var scrollBlock = $('.nano');

	scrollBlock.nanoScroller({
		preventPageScrolling: true
	});

	// custom select
	function selectPos(){
		if ( !$(this).hasClass('range') ) {
			$(this).parent().find('.sod_list_wrapper').css('top', - $(this).parent().find('.sod_option.selected').position().top );
		}

		if ( $(this).val() ) {
			$(this).parent().addClass('selected');
		} else {
			$(this).parent().removeClass('selected');
		}
	}

	$('.wrapper select:not(.m-filter-toggle-switchy)').selectOrDie({
		size: 5,
		onChange: selectPos
	});

	$('.sod_select').on('click', function(){

		if ( !$(this).find('select').hasClass('range') ) {
			$(this).find('.sod_list_wrapper').css('top', - $(this).find('.sod_option.selected').position().top );
		}

	});

	$('.wrapper select:not(.m-filter-toggle-switchy)').each(function(){

		if ( $(this).val() ) {
			$(this).parent().addClass('selected');
		} else {
			$(this).parent().removeClass('selected');
		}

	});

	var rangeFilter = $('.m-filter-range');
	rangeFilter.each(function(){
		var field = $(this).find('.m-filter-range-field');
		var select = $(this).find('.range');
		var selectFrom = $(this).find('.range-from');
		var selectTo = $(this).find('.range-to');
		var customizedSelect = $(this).find('.sod_select');

		field.on('click', function(){
			if ( $(this).hasClass('active') ) {
				$('.m-filter-range-field').removeClass('active');
				$('.sod_select').removeClass('visible');
				customizedSelect.removeClass('visible');
			} else {
				$('.m-filter-range-field').removeClass('active');
				$(this).addClass('active');
				$('.sod_select').removeClass('visible');
				customizedSelect.addClass('visible');
			}

			customizedSelect.removeClass('touch');
		});

		selectFrom.on('change', function(){
			field.find('.from').text( $(this).find('option:selected').text() )
		});

		selectTo.on('change', function(){
			field.find('.to').text( $(this).find('option:selected').text() )
			customizedSelect.removeClass('visible');
		});

		field.find('.from').text( selectFrom.find('option:selected').text() );
		field.find('.to').text( selectTo.find('option:selected').text() )
	});

	// more filters btn (mobile)
	var moreFiltersBtn = $('.m-filters-more');
	var hiddenFilters = $('.m-mobile-hidden');

	moreFiltersBtn.on('click', function(){
		$(this).toggleClass('active');
		hiddenFilters.slideToggle();

		if ( $(this).hasClass('active') ) {
			$(this).text('Меньше параметров')
		} else {
			$(this).text('Больше параметров')
		}
	});

	$(window).on('resize', function(){
		if ( Modernizr.mq('(min-width: 960px)') ) {
			tabContent.slideDown();
			hiddenFilters.slideDown();
		} else {
			// tabContent.css('display', '');

			if ( !filterTab.hasClass('active') ) {
				tabContent.css('display', 'none');
			}
		}
	});

	// filters tabs (mobile)
	var filterTab = $('.m-aside-tabs').find('a');
	var tabContent = $('.m-aside-tabs-content');

	filterTab.on('click', function(e){

		if ( $(this).hasClass('active') ) {
			filterTab.removeClass('active');
			tabContent.slideUp();
		} else {
			$(this).addClass('active').siblings().removeClass('active');
			tabContent.slideUp();
			$( $(this).attr('href') ).slideToggle();

			$('html, body').animate({ scrollTop: $('.m-aside').offset().top - 44 }, 500);
		}

		e.preventDefault();
	});

	// sticky filter tabs
	var bTabs = $('.m-aside-tabs');
	var bCatalog = $('.m-catalog');

	function stickyFilterTabs() {
		if ( bTabs.length ) {
			var bTabsPos = bTabs.offset().top - 57;

			$(window).on('scroll', function(){
				if ( $(window).scrollTop() > bTabsPos ) {
					bTabs.addClass('sticky')
				} else {
					bTabs.removeClass('sticky')
				}
			});
		}
	}

	stickyFilterTabs();
	$(window).on('resize', stickyFilterTabs);

	// filters tip
	var filtersTipClose = $('.m-filters-tip-close');

	filtersTipClose.on('click', function(){
		$(this).parent('.m-filters-tip').addClass('hidden');
	});

	// scroll to
	var scrollBtn = $('.scroll-btn');
	var root = $('html, body');

	scrollBtn.on('click', function(e){
		
		root.animate({ 
			scrollTop: $( $(this).attr('href') ).offset().top - 100
		}, 800);

		e.preventDefault();
	});

	// gallery
	var galleryMain = new Swiper('.gallery-main', {
		// direction: 'vertical',
		loop: true,
		loopedSlides: 1,
		resistanceRatio: 0,
		prevButton: '.gallery-nav-btn-prev',
		nextButton: '.gallery-nav-btn-next',
	});

	function galleryFullscreen(){

		var slide = $('.gallery-main .swiper-slide');
		var gallery = $('.gallery');
		var scroll = $('.gallery-thumbs .nano-content');

		slide.on('click', function(){
			if ( Modernizr.mq('(min-width: 668px)') ) {
				$('html').css('overflow', 'hidden');
				gallery.addClass('fullscreen-new');

				galleryMain.update(true);

				window.dispatchEvent(new Event('resize'));

				// scroll.perfectScrollbar({
				// 	suppressScrollY: true,
				// 	useBothWheelAxes: true
				// });
			}
		});

		var close = $('.gallery-close');

		close.on('click', function(){
			$('html').css('overflow', '');
			gallery.removeClass('fullscreen-new');

			window.dispatchEvent(new Event('resize'));

			// scroll.perfectScrollbar('destroy');
		});

		// window.dispatchEvent(new Event('resize'));

		setTimeout(function(){
			window.dispatchEvent(new Event('resize'));
		}, 10);

	}

	galleryFullscreen()

	$(window).on('resize', function(){
		if ( Modernizr.mq('(max-width: 589px)') ) {
			var gallery = $('.gallery');

			$('html').css('overflow', '');
			gallery.removeClass('fullscreen');
		}
	});

	var galleryThumbs = $('.gallery-thumbs');
	var galleryThumbsChild = galleryThumbs.find('.thumb');
	var galleryCounter = $('.gallery-counter');

	if ( galleryThumbs.length ) {
		galleryMain.on('onSlideChangeStart', function(swiper) {
			var activeInd = $('.gallery-main').find('.swiper-slide-active').data('swiper-slide-index');

			galleryThumbsChild.eq(activeInd).addClass('active').siblings().removeClass('active');
			galleryThumbsChild.eq(activeInd).attr('id', 'active-thumb').siblings().attr('id', '')

			// galleryThumbs.nanoScroller({ scrollTo: $('#active-thumb') });

			galleryThumbs.find('.nano-content').stop().animate({
			    'scrollTop': $('#active-thumb').get(0).offsetTop - 10,
			    'scrollLeft': $('#active-thumb').get(0).offsetLeft - 10
			}, 500, 'swing')


			galleryNum();

			// console.log(activeInd)
			
		});

		galleryThumbsChild.on('click', function(){
			var clicked = $(this).index();
			galleryMain.slideTo( clicked+1 );
		});

		function galleryNum() {
			var activeInd = $('.gallery-main').find('.swiper-slide-active').data('swiper-slide-index');

			galleryCounter.text( (activeInd + 1) + '/' + (galleryMain.slides.length-2) )
		}

		galleryNum();
	}


	// Gallery height
	// var galleryWrapper = $('.gallery');

	// function galleryWrapperHeight() {
	// 	if ( Modernizr.mq('(min-width: 1023px)') ) {
	// 		galleryWrapper.css('height', $(window).height() - 150);
	// 	} else {
	// 		galleryWrapper.css('height', '');
	// 	}
	// }

	// galleryWrapperHeight()

	// $(window).on('resize', galleryWrapperHeight);

	// tile slider
	var tileSlider = $('.tile-slider');
	tileSlider.each(function(){
		var mySiwper = new Swiper(this, {
			loop: true,
			nextButton: $(this).parent().find('.tile-slider-next')[0],
			prevButton: $(this).parent().find('.tile-slider-prev')[0]
		});

		$(window).on('resize', function(){
			setTimeout(function(){
				mySiwper.onResize()
			}, 500);
		});
	});

	// $(window).on('resize', function(){
	// 	setTimeout(function(){
	// 		window.dispatchEvent(new Event('resize'));
	// 	}, 500);
	// });
	
	// detail page spoilers, infotext spoilers
	var sectionTitle = $('section').find('h2');
	var sectionContent = $('section').find('.s-content');

	if ( Modernizr.mq('(min-width: 668px)') ) {
		sectionContent.show();
	} else {
		sectionContent.hide();
	}

	sectionTitle.on('click', function(){
		if ( !Modernizr.mq('(min-width: 668px)') ) {
			$(this).toggleClass('active');
			$(this).next('.s-content').slideToggle();
		}
	});

	$(window).on('resize', function(){
		if ( Modernizr.mq('(min-width: 668px)') ) {
			sectionContent.show();
		} else {
			sectionContent.hide();
		}
	});

	var infoCut = $('#infotext-toggle');
	var infoContent = $('#infotext-content');

	infoCut.on('click', function(e){
		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active').find('u').text('Читать далее');
			infoContent.slideUp()
		} else {
			$(this).addClass('active').find('u').text('Свернуть');
			infoContent.slideDown()
		}

		e.preventDefault();
	});

	// reviews slider
	var reviewsSliderCheck = $('.a-reviews-slider');

	var reviewsSlider = new Swiper('.a-reviews-slider', {
		speed: 500,
		loop: true,
		prevButton: '.a-reviews-nav-prev',
		nextButton: '.a-reviews-nav-next',

		onInit: reviewsAutoHeight,
		onSlideChangeStart: reviewsAutoHeight
	});


	function reviewsAutoHeight() {
		var activeH = $('.swiper-slide-active .a-review').height();
		$('.a-reviews-slider').css('height', activeH);
	}

	if ( reviewsSliderCheck.length ) {
		$(window).on('resize', reviewsAutoHeight);
	}

	// popup windows
	$('.mfp-link').magnificPopup({
		removalDelay: 300,
		midClick: true,
		mainClass: 'mfp-anim',
		overflowY: 'scroll',

		callbacks: {
		    open: function() {
		    	$('html').addClass('moved');
				$('.m-aside').css('right', getScrollbarWidth());
				$('.m-content-home').css('right', getScrollbarWidth() + 40)
		    },
		    close: function() {
				$('html').removeClass('moved');
				$('.m-aside, .m-content-home').css('right', '')
		    }
		}
	});

	// home page cover
	var homeCover = $('.m-content-home');
	var afterCover = $('.home main');

	function homeCoverHeight() {

		if ( Modernizr.mq('(min-width: 668px)') ) {
			homeCover.css({
				'height': $(window).height() - header.height() - 40
			});

			afterCover.css({
				'margin-top': $(window).height() - 40
			});
		} else {
			homeCover.css({
				'height': $(window).height() - header.height()
			});

			afterCover.css({
				'margin-top': $(window).height()
			});
		}
	}

	homeCoverHeight();

	$(window).on('resize', homeCoverHeight);

	// home page hide search on scroll
	var hi = $('.m-content-home');
	var hiArrow = $('.m-hi-down');

	// hi.css('margin-top', -(hi.height()/2))

	$(window).on('scroll', function() {
		var st = $(this).scrollTop();

		if (st >= 50) {
			//hi.addClass('hidden');
			hiArrow.addClass('active');
		} else {
			//hi.removeClass('hidden');
			hiArrow.removeClass('active');
		}

		if (st >= $(window).height() + 40)  {
			hi.addClass('hidden');
		} else {
			hi.removeClass('hidden');
		}
	});

	hiArrow.on('click', function(e){

		if ( $(window).scrollTop() >= 50 ) {
			root.animate({ 
				scrollTop: 0
			}, 700);
		} else {
			root.animate({ 
				scrollTop: $( $(this).attr('href') ).offset().top - 250
			}, 700);
		}

		e.preventDefault();
	});

	// filters trigger
	var filterSwitch = $('.m-filter-toggle');
	var switchy = $('.m-filter-toggle-switchy');

	filterSwitch.each(function(){

		var filterSwitchTrigger = $(this).find('.m-filter-toggle-trigger');
		var filterSwitchRadio1 = $(this).find('input[type="radio"]:first-of-type');
		var filterSwitchRadio2 = $(this).find('input[type="radio"]:last-of-type');

		var filterSwitchy = $(this).find('.m-filter-toggle-switchy');

		filterSwitchy.on('change', function(){

			if ( $(this).val() == 'left' ) {

				filterSwitchRadio1.prop('checked', true);
		 		$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').hide();
		 		$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').show();

			} else if ( $(this).val() == 'right' ) {
				filterSwitchRadio2.prop('checked', true);

				$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').hide();
				$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').show();
			} else {
				filterSwitchRadio1.prop('checked', false);
				filterSwitchRadio2.prop('checked', false);
				$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').hide();
				$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').hide();
			}

		})

		// filterSwitchTrigger.on('click', function(){
		// 	if( $(this).hasClass('left') ) {
		// 		$(this).removeClass('left').addClass('right');
		// 		filterSwitchRadio2.prop('checked', true);

		// 		$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').hide();
		// 		$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').show();
		// 	} else {
		// 		$(this).removeClass('right').addClass('left');
		// 		filterSwitchRadio1.prop('checked', true);

		// 		$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').hide();
		// 		$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').show();
		// 	}
		// });

		filterSwitchRadio1.on('change', function(){
			filterSwitchy.val('left').change();

			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').hide();
			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').show();
		});

		filterSwitchRadio2.on('change', function(){
			filterSwitchy.val('right').change();

			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').hide();
			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').show();
		});

		if ( filterSwitchRadio1.is(':checked') ){
			filterSwitchy.val('left').change();

			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').hide();
			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').show();
		} else if ( filterSwitchRadio2.is(':checked') ) {
			filterSwitchy.val('right').change();

			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').hide();
			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').show();
		}

	});

	switchy.switchy();

	var similarItems = $('.js-similar-list');

	function similarHeight() {
		var b = $('.m-aside');
		var i = $(this).find('li').eq(0).height();

		if ( Modernizr.mq('(min-width: 1280px)') ) {
			$(this).css('max-height', b.height() - 60 );
		} else if ( Modernizr.mq('(min-width: 668px)') ) {
			$(this).css('max-height', i*2 + 22*1 );
		} else {
			$(this).css('max-height', i*4 + 22*3 );
		}
	}

	similarItems.each(similarHeight);
	$(window).on('resize', function(){
		similarItems.each(similarHeight);
	});

	similarItems.perfectScrollbar();

});