$(document).ready(function(){function e(){var e=document.createElement("div");e.style.visibility="hidden",e.style.width="100px",document.body.appendChild(e);var t=e.offsetWidth;e.style.overflow="scroll";var i=document.createElement("div");i.style.width="100%",e.appendChild(i);var s=i.offsetWidth;return e.parentNode.removeChild(e),t-s}function t(){Modernizr.mq("(min-width: 668px)")||v.hasClass("active")?g.show():g.hide()}function i(){$(this).hasClass("range")||$(this).parent().find(".sod_list_wrapper").css("top",-$(this).parent().find(".sod_option.selected").position().top),$(this).val()?$(this).parent().addClass("selected"):$(this).parent().removeClass("selected")}function s(){if(M.length){var e=M.offset().top-57;$(window).on("scroll",function(){$(window).scrollTop()>e?M.addClass("sticky"):M.removeClass("sticky")})}}function n(){var e=$(".gallery-main .swiper-slide"),t=$(".gallery");$(".gallery-thumbs .nano-content");e.on("click",function(){Modernizr.mq("(min-width: 668px)")&&($("html").css("overflow","hidden"),t.addClass("fullscreen-new"),_.update(!0),window.dispatchEvent(new Event("resize")))});var i=$(".gallery-close");i.on("click",function(){$("html").css("overflow",""),t.removeClass("fullscreen-new"),window.dispatchEvent(new Event("resize"))}),setTimeout(function(){window.dispatchEvent(new Event("resize"))},10)}function o(){var e=$(".gallery-main").find(".swiper-slide-active").data("swiper-slide-index");U.text(e+1+"/"+(_.slides.length-2))}function l(){Modernizr.mq("(min-width: 1023px)")?H.css("height",$(window).height()-150):H.css("height","")}function a(){var e=$(".swiper-slide-active .a-review").height();$(".a-reviews-slider").css("height",e)}function r(){Modernizr.mq("(min-width: 668px)")?(N.css({height:$(window).height()-h.height()-40}),O.css({"margin-top":$(window).height()-40})):(N.css({height:$(window).height()-h.height()}),O.css({"margin-top":$(window).height()}))}function c(){var e=$(".m-aside"),t=$(this).find("li").eq(0).height();Modernizr.mq("(min-width: 1280px)")?$(this).css("max-height",e.height()-60):Modernizr.mq("(min-width: 668px)")?$(this).css("max-height",2*t+22):$(this).css("max-height",4*t+66)}FastClick.attach(document.body),$("input, textarea").placeholder(),$("input[type=tel]").mask("+9 (999) 999-99-99"),$("input[type=tel]").on("focus",function(){$(this).addClass("ie-tel")}),$("input[type=tel]").on("change keyup paste",function(){$(this).removeClass("ie-tel")}),$(".validate-form").validate({errorClass:"invalid",validClass:"valid",errorElement:"span",wrapper:"em",onfocusout:function(e){$(e).valid()},highlight:function(e,t,i){$(e).addClass(t).removeClass(i),$(e).parent().addClass(t).removeClass(i)},unhighlight:function(e,t,i){$(e).removeClass(t).addClass(i),$(e).parent().removeClass(t).addClass(i)},ignore:".ignore"});var d=$("input, textarea");d.on("focus blur",function(){$(this).val()?$(this).addClass("filled"):$(this).removeClass("filled")}),d.each(function(){$(this).val()?$(this).addClass("filled"):$(this).removeClass("filled")});var h=$("header"),f=$("#h-burger"),m=$("#h-burger-nav");f.on("click",function(){if(h.toggleClass("active"),$(this).toggleClass("active"),m.toggleClass("active"),$(this).hasClass("active")&&Modernizr.mq("(max-width: 667px)")){$(document).on("touchmove",function(e){e.preventDefault()});var e=!1;$("body").on("touchstart","nav",function(t){e||(e=!0,0===t.currentTarget.scrollTop?t.currentTarget.scrollTop=1:t.currentTarget.scrollHeight===t.currentTarget.scrollTop+t.currentTarget.offsetHeight&&(t.currentTarget.scrollTop-=1),e=!1)}),$("body").on("touchmove","nav",function(e){e.stopPropagation()})}else $(document).unbind("touchmove")}),$("html").hasClass("no-touch")&&m.perfectScrollbar();var v=$("#m-burger"),g=$("#m-burger-nav");t(),v.on("click",function(){$(this).toggleClass("active"),g.slideToggle()}),$(window).on("resize",t);var p=$("main"),w=$("#m-aside-toggle"),u=$(".m-aside");w.on("click",function(){$(this).hasClass("active")?$(this).removeClass("active").text("Свернуть"):$(this).addClass("active").text("Показать"),u.toggleClass("hidden"),p.toggleClass("aside-yes aside-no"),setTimeout(function(){window.dispatchEvent(new Event("resize"))},500)});var C=$(".m-header-sections").find("a.active"),x=$(".m-header-search-toggle");x.on("click",function(e){$(this).toggleClass("active"),C.toggleClass("inactive"),e.preventDefault()});var y=$(".nano");y.nanoScroller({preventPageScrolling:!0}),$(".wrapper select:not(.m-filter-toggle-switchy)").selectOrDie({size:5,onChange:i}),$(".sod_select").on("click",function(){$(this).find("select").hasClass("range")||$(this).find(".sod_list_wrapper").css("top",-$(this).find(".sod_option.selected").position().top)}),$(".wrapper select:not(.m-filter-toggle-switchy)").each(function(){$(this).val()?$(this).parent().addClass("selected"):$(this).parent().removeClass("selected")});var b=$(".m-filter-range");b.each(function(){var e=$(this).find(".m-filter-range-field"),t=($(this).find(".range"),$(this).find(".range-from")),i=$(this).find(".range-to"),s=$(this).find(".sod_select");e.on("click",function(){$(this).hasClass("active")?($(".m-filter-range-field").removeClass("active"),$(".sod_select").removeClass("visible"),s.removeClass("visible")):($(".m-filter-range-field").removeClass("active"),$(this).addClass("active"),$(".sod_select").removeClass("visible"),s.addClass("visible")),s.removeClass("touch")}),t.on("change",function(){e.find(".from").text($(this).find("option:selected").text())}),i.on("change",function(){e.find(".to").text($(this).find("option:selected").text()),s.removeClass("visible")}),e.find(".from").text(t.find("option:selected").text()),e.find(".to").text(i.find("option:selected").text())});var k=$(".m-filters-more"),z=$(".m-mobile-hidden");k.on("click",function(){$(this).toggleClass("active"),z.slideToggle(),$(this).text($(this).hasClass("active")?"Меньше параметров":"Больше параметров")}),$(window).on("resize",function(){Modernizr.mq("(min-width: 960px)")?(q.slideDown(),z.slideDown()):T.hasClass("active")||q.css("display","none")});var T=$(".m-aside-tabs").find("a"),q=$(".m-aside-tabs-content");T.on("click",function(e){$(this).hasClass("active")?(T.removeClass("active"),q.slideUp()):($(this).addClass("active").siblings().removeClass("active"),q.slideUp(),$($(this).attr("href")).slideToggle(),$("html, body").animate({scrollTop:$(".m-aside").offset().top-44},500)),e.preventDefault()});var M=$(".m-aside-tabs");$(".m-catalog");s(),$(window).on("resize",s);var S=$(".m-filters-tip-close");S.on("click",function(){$(this).parent(".m-filters-tip").addClass("hidden")});var D=$(".scroll-btn"),E=$("html, body");D.on("click",function(e){E.animate({scrollTop:$($(this).attr("href")).offset().top-100},800),e.preventDefault()});var _=new Swiper(".gallery-main",{loop:!0,loopedSlides:1,resistanceRatio:0,prevButton:".gallery-nav-btn-prev",nextButton:".gallery-nav-btn-next"});n(),$(window).on("resize",function(){if(Modernizr.mq("(max-width: 589px)")){var e=$(".gallery");$("html").css("overflow",""),e.removeClass("fullscreen")}});var B=$(".gallery-thumbs"),P=B.find(".thumb"),U=$(".gallery-counter");B.length&&(_.on("onSlideChangeStart",function(e){var t=$(".gallery-main").find(".swiper-slide-active").data("swiper-slide-index");P.eq(t).addClass("active").siblings().removeClass("active"),P.eq(t).attr("id","active-thumb").siblings().attr("id",""),B.find(".nano-content").stop().animate({scrollTop:$("#active-thumb").get(0).offsetTop-10,scrollLeft:$("#active-thumb").get(0).offsetLeft-10},500,"swing"),o()}),P.on("click",function(){var e=$(this).index();_.slideTo(e+1)}),o());var H=$(".gallery");l(),$(window).on("resize",l);var L=$(".tile-slider");L.each(function(){var e=new Swiper(this,{loop:!0,nextButton:$(this).parent().find(".tile-slider-next")[0],prevButton:$(this).parent().find(".tile-slider-prev")[0]});$(window).on("resize",function(){setTimeout(function(){e.onResize()},500)})});var R=$("section").find("h2"),W=$("section").find(".s-content");Modernizr.mq("(min-width: 668px)")?W.show():W.hide(),R.on("click",function(){Modernizr.mq("(min-width: 668px)")||($(this).toggleClass("active"),$(this).next(".s-content").slideToggle())}),$(window).on("resize",function(){Modernizr.mq("(min-width: 668px)")?W.show():W.hide()});var j=$("#infotext-toggle"),F=$("#infotext-content");j.on("click",function(e){$(this).hasClass("active")?($(this).removeClass("active").find("u").text("Читать далее"),F.slideUp()):($(this).addClass("active").find("u").text("Свернуть"),F.slideDown()),e.preventDefault()});var I=$(".a-reviews-slider");new Swiper(".a-reviews-slider",{speed:500,loop:!0,prevButton:".a-reviews-nav-prev",nextButton:".a-reviews-nav-next",onInit:a,onSlideChangeStart:a});I.length&&$(window).on("resize",a),$(".mfp-link").magnificPopup({removalDelay:300,midClick:!0,mainClass:"mfp-anim",overflowY:"scroll",callbacks:{open:function(){$("html").addClass("moved"),$(".m-aside").css("right",e()),$(".m-content-home").css("right",e()+40)},close:function(){$("html").removeClass("moved"),$(".m-aside, .m-content-home").css("right","")}}});var N=$(".m-content-home"),O=$(".home main");r(),$(window).on("resize",r);var Y=$(".m-content-home"),A=$(".m-hi-down");$(window).on("scroll",function(){var e=$(this).scrollTop();e>=50?A.addClass("active"):A.removeClass("active"),e>=$(window).height()+40?Y.addClass("hidden"):Y.removeClass("hidden")}),A.on("click",function(e){$(window).scrollTop()>=50?E.animate({scrollTop:0},700):E.animate({scrollTop:$($(this).attr("href")).offset().top-250},700),e.preventDefault()});var G=$(".m-filter-toggle"),J=$(".m-filter-toggle-switchy");G.each(function(){var e=($(this).find(".m-filter-toggle-trigger"),$(this).find('input[type="radio"]:first-of-type')),t=$(this).find('input[type="radio"]:last-of-type'),i=$(this).find(".m-filter-toggle-switchy");i.on("change",function(){"left"==$(this).val()?(e.prop("checked",!0),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:last").hide(),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:first").show()):"right"==$(this).val()?(t.prop("checked",!0),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:first").hide(),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:last").show()):(e.prop("checked",!1),t.prop("checked",!1),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:first").hide(),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:last").hide())}),e.on("change",function(){i.val("left").change(),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:last").hide(),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:first").show()}),t.on("change",function(){i.val("right").change(),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:first").hide(),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:last").show()}),e.is(":checked")?(i.val("left").change(),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:last").hide(),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:first").show()):t.is(":checked")&&(i.val("right").change(),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:first").hide(),$(this).closest(".m-filters-row").find(".m-filter-toggle-content:last").show())}),J.switchy();var K=$(".js-similar-list");K.each(c),$(window).on("resize",function(){K.each(c)}),K.perfectScrollbar()});
