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
		errorElement: 'em',

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

	// hamburger-menus
	var header = $('header');
	var burgerBtn = $('#h-burger');
	var burgerNav = $('#h-burger-nav');

	burgerBtn.on('click', function(){
		header.toggleClass('active');
		$(this).toggleClass('active');
		burgerNav.toggleClass('active');
	});

	var lkBurgerBtn = $('#m-burger');
	var lkBurgerNav = $('#m-burger-nav');

	function lkBurgerCheck(){
		if ( !Modernizr.mq('(min-width: 590px)') && !lkBurgerBtn.hasClass('active') ) {
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
		$(this).toggleClass('active');
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

	scrollBlock.nanoScroller();

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

	$('.wrapper select').selectOrDie({
		size: 5,
		onChange: selectPos
	}).each(selectPos);

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
		if ( Modernizr.mq('(min-width: 590px)') ) {
			tabContent.slideDown();
			hiddenFilters.slideDown();
		} else {
			tabContent.css('display', '');
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
		}

		e.preventDefault();
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
		resistanceRatio: 0,
		prevButton: '.gallery-nav-btn-prev',
		nextButton: '.gallery-nav-btn-next'
	});

	var galleryThumbs = $('.gallery-thumbs');
	var galleryThumbsChild = galleryThumbs.find('.thumb');
	var galleryCounter = $('.gallery-counter');

	if ( galleryThumbs.length ) {
		galleryMain.on('onSlideChangeStart', function(swiper) {
			galleryThumbsChild.eq(galleryMain.activeIndex).addClass('active').siblings().removeClass('active');
			galleryThumbsChild.eq(galleryMain.activeIndex).attr('id', 'active-thumb').siblings().attr('id', '')

			// galleryThumbs.nanoScroller({ scrollTo: $('#active-thumb') });

			galleryThumbs.find('.nano-content').stop().animate({
			    'scrollTop': $('#active-thumb').get(0).offsetTop - 10
			}, 500, 'swing')

			galleryNum();
			
		});

		galleryThumbsChild.on('click', function(){
			var clicked = $(this).index();
			galleryMain.slideTo( clicked );
		});

		function galleryNum() {
			galleryCounter.text( (galleryMain.activeIndex + 1) + '/' + galleryMain.slides.length )
		}

		galleryNum();
	}


	// Gallery height
	var galleryWrapper = $('.gallery');

	function galleryWrapperHeight() {
		if ( Modernizr.mq('(min-width: 590px)') ) {
			galleryWrapper.css('height', $(window).height() - 150);
		} else {
			galleryWrapper.css('height', '');
		}
	}

	galleryWrapperHeight()

	$(window).on('resize', galleryWrapperHeight);

	// tile slider
	var tileSlider = $('.tile-slider');
	tileSlider.each(function(){
		var mySiwper = new Swiper(this, {
			loop: true,
			nextButton: $(this).parent().find('.tile-slider-next')[0],
			prevButton: $(this).parent().find('.tile-slider-prev')[0]
		});
	});
	
	// detail page spoilers
	var sectionTitle = $('section').find('h2');
	var sectionContent = $('section').find('.s-content');

	if ( Modernizr.mq('(min-width: 590px)') ) {
		sectionContent.show();
	} else {
		sectionContent.hide();
	}

	sectionTitle.on('click', function(){
		if ( !Modernizr.mq('(min-width: 590px)') ) {
			$(this).toggleClass('active');
			$(this).next('.s-content').slideToggle()
		}
	});

	$(window).on('resize', function(){
		if ( Modernizr.mq('(min-width: 590px)') ) {
			sectionContent.show();
		} else {
			sectionContent.hide();
		}
	});

	// popup windows
	$('.mfp-link').magnificPopup({
		removalDelay: 300,
		midClick: true,
		mainClass: 'mfp-anim',
		overflowY: 'scroll',

		callbacks: {
		    open: function() {
		    	$('html').addClass('moved');
				$('.m-aside').css('right', getScrollbarWidth())
		    },
		    close: function() {
				$('html').removeClass('moved');
				$('.m-aside').css('right', '')
		    }
		  }
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

	// home page cover
	var homeCover = $('.m-content-home');
	homeCover.css('height', $(window).height() );

	function homeCoverHeight() {

		if ( Modernizr.mq('(min-width: 590px)') ) {
			homeCover.css({
				'height': $(window).height() - header.height() - 40
			});
		} else {
			homeCover.css({
				'height': $(window).height() - header.height()
			});
		}
	}

	homeCoverHeight();

	$(window).on('resize', homeCoverHeight);

	// home page hide search on scroll
	var hi = $('.m-hi-wrapper');
	var hiArrow = $('.m-hi-down');

	$(window).on('scroll', function() {
		var st = $(this).scrollTop();

		if (st >= 50) {
			hi.addClass('hidden');
			hiArrow.addClass('active');
		} else {
			hi.removeClass('hidden');
			hiArrow.removeClass('active');
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

	filterSwitch.each(function(){

		var filterSwitchTrigger = $(this).find('.m-filter-toggle-trigger');
		var filterSwitchRadio1 = $(this).find('input[type="radio"]:first-of-type');
		var filterSwitchRadio2 = $(this).find('input[type="radio"]:last-of-type');

		filterSwitchTrigger.on('click', function(){
			if( $(this).hasClass('left') ) {
				$(this).removeClass('left').addClass('right');
				filterSwitchRadio2.prop('checked', true);

				$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').hide();
				$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').show();
			} else {
				$(this).removeClass('right').addClass('left');
				filterSwitchRadio1.prop('checked', true);

				$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').hide();
				$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').show();
			}
		});

		filterSwitchRadio1.on('change', function(){
			filterSwitchTrigger.removeClass('right').addClass('left');

			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').hide();
			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').show();
		});

		filterSwitchRadio2.on('change', function(){
			filterSwitchTrigger.removeClass('left').addClass('right');

			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').hide();
			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').show();
		});

		if ( filterSwitchRadio1.is(':checked') ){
			filterSwitchTrigger.addClass('left');
			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').hide();
			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').show();
		} else if ( filterSwitchRadio2.is(':checked') ) {
			filterSwitchTrigger.addClass('right');
			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:first').hide();
			$(this).closest('.m-filters-row').find('.m-filter-toggle-content:last').show();
		}

	});

});
