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
	var burgerBtn = $('#h-burger');
	var burgerNav = $('#h-burger-nav');

	burgerBtn.on('click', function(){
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

});
