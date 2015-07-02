$(document).ready(function(){

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

	// hamburger-menu
	var header = $('header');
	var burgerBtn = $('#h-burger');
	var burgerNav = $('#h-burger-nav');

	burgerBtn.on('click', function(){
		header.toggleClass('active');
		$(this).toggleClass('active');
		burgerNav.toggleClass('active');
	});

	// aside bar
	var content = $('main');
	var asideBtn = $('#m-aside-toggle');
	var asideBar = $('.m-aside');

	asideBtn.on('click', function(){
		$(this).toggleClass('active');
		asideBar.toggleClass('hidden');
		content.toggleClass('aside-yes aside-no');
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
		$(this).parent().find('.sod_list_wrapper').css('top', - $(this).parent().find('.sod_option.selected').position().top );
	}

	$('.wrapper select').selectOrDie({
		size: 5,
		onChange: selectPos
	}).each(selectPos);

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
		}, 300);

		e.preventDefault();
	});

	// gallery
	var galleryMain = new Swiper('.gallery-main', {
		// direction: 'vertical',
		resistanceRatio: 0.6,
		prevButton: '.gallery-nav-btn-prev',
		nextButton: '.gallery-nav-btn-next'
	});

	var galleryThumbs = $('.gallery-thumbs');
	var galleryThumbsChild = galleryThumbs.find('.thumb');
	var galleryCounter = $('.gallery-counter');

	if ( galleryMain.length ) {
		galleryMain.on('onSlideChangeStart', function(swiper) {
			galleryThumbsChild.eq(galleryMain.activeIndex).addClass('active').siblings().removeClass('active');

			galleryThumbs.stop().animate({ 
				scrollTop: galleryThumbsChild.eq(galleryMain.activeIndex).position().top - 111
			}, 300);

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
		fixedContentPos: false
	});

	// reviews slider
	var reviewsSlider = new Swiper('.a-reviews-slider', {
		speed: 500,
		loop: true,
		prevButton: '.a-reviews-nav-prev',
		nextButton: '.a-reviews-nav-next',

		onInit: reviewsAutoHeight
	});

	reviewsSlider.on('onSlideChangeStart', reviewsAutoHeight);

	function reviewsAutoHeight() {
		var activeH = $('.swiper-slide-active .a-review').height();
		$('.a-reviews-slider').css('height', activeH);
	}

	$(window).on('resize', reviewsAutoHeight);

});
