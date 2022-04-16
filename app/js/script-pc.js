
function showMenu() {
    var wrapper = $('html'),
        a = document.getElementById("body_area"),
        b = document.getElementById("btn_show_menu"),
        c = document.getElementById("showNavSideMenu");

    // wrapper.animate({
    //     scrollTop: 0
    // });

    if (a.className.indexOf("menu-open") === -1) {
        a.className += " menu-open";
    } else {
        a.className = a.className.replace(" menu-open", "");
    }

    if (b.className.indexOf("active") === -1) {
        b.className += " active";
    } else {
        b.className = b.className.replace(" active", "");
    }

    if (c.className.indexOf("show") === -1) {
        c.className += " show";
    } else {
        c.className = c.className.replace(" show", "");
    }
    return false;
}

$(document).ready(function() {

    $('[data-toggle="tooltip"]').tooltip();   

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) $('#goTop').fadeIn();
        else $('#goTop').fadeOut();
    });
    $('#goTop').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 'slow');
        return false;
    });


    $('a.scrollDiv').on('click', function(e){
        e.preventDefault();

        var id = $(this).attr('href');

        if($('.box-nav-top')) {
            $('html,body').animate({
                scrollTop: $(id).offset().top
            });
        }
    });



    // Fancybox page question-answer
    if($(".page-question-answer .content-detail img")[0]) {

        $(".page-question-answer .content-detail img").each(function() {
            var tag_parent_a = $(this).parent();

            if(tag_parent_a.tagName !== 'a') {
                tag_parent_a.attr("href",$(this).attr('src')).css("cursor","zoom-in");
            }

            tag_parent_a.fancybox();

            // // ## Fancybox v4
            // Fancybox.bind(".page-question-answer .content-detail img", {
            //   // Your options go here
            // });
        });
    }


    $('a.parent').on("click", function(e){
        $(this).next('ul').toggle();
        $(this).children('span:first').toggleClass("icon-down-arrow icon-right-arrow");
        e.stopPropagation();
        e.preventDefault();
    });
    

    checkScroll();
    $(window).scroll(checkScroll);

});

function checkScroll(){
    if($('.header.header-scroll')[0] && $(window).width()>1200){
        var header_a = $('.menu-top');
        if(header_a[0]) {
            var h_header_a = $('.menu-top').outerHeight();
        } else {
            var h_header_a = 0;
        }
        var menu_b = $('.space-header-fixed');
        var menu_c = $('.header.header-scroll');
        var h_menu_c = $('.header.header-scroll').outerHeight();
        var header_fixed = ($(this).scrollTop() >= h_header_a);
        var btn_hide = $('#btn_click_hidden');

        if (header_fixed === true) {
            menu_b.height(h_menu_c);
            menu_c.addClass('header-fixed');
            btn_hide.show();
        } else {
            menu_b.height(0);
            menu_c.removeClass('header-fixed');
            btn_hide.hide();
        }
    };


    var total_scroll_height = document.body.scrollHeight;
    var inside_header = ($(this).scrollTop() <= 200);
    var passed_header = ($(this).scrollTop() >= 0);
    var passed_header2 = ($(this).scrollTop() >= 150);
    var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() + 300)));
    if (inside_header === true) {
        $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
    } else if (passed_header === true) {
        $('.back-to-top-badge').addClass('back-to-top-badge-visible');
    }
    if (footer_reached == true) {
        $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
    }
}


function scrollToDiv(id){
    var _id = '#'+id;
    if($(_id)[0]){
        $('html,body').animate({
            scrollTop:$("#"+id).offset().top-75
        });
    }
    return false;
    // $(this).addClass("active");
};

function scrollToId(id){
    var _id = '#'+id;
    if($(_id)[0]){
        $('html,body').animate({
            scrollTop:$("#"+id).offset().top-75
        });
    }
    return false;
    // $(this).addClass("active");
};

jQuery(function($) {

    $('.back-to-top-badge').on("click", function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    $('.btn-collapse').on("click", function(e) {
        e.preventDefault();
        $('#box-collapse').toggle(300);
    });

});


var vStatus = '';
$('.cliVeo').click(function() {
    $('.item-video').removeClass('active');
    $(this).parent().addClass('active');
    var tit=$(this).attr('title');
    var url=$(this).attr('data-url');

    var url_vnexpress=url.indexOf("vnecdn.net") !== -1;
    var url_facebook=url.indexOf("facebook.com") !== -1;
    var url_youtube=url.indexOf("youtube.com") !== -1;
    var title_new = '';

    vStatus=$(this).attr('data-status');
    toggleClass= 'videoName '+vStatus;
    if(vStatus == 'live') {
        title_new = '<span class="live">Live</span> <span>'+tit+'</span>';
        $('#captionVie').html(title_new);
    }else {
        title_new = '<span>'+tit+'</span>';
        $('#captionVie').html(title_new);
    }
    $('#captionVie').attr('class', toggleClass);

    // Auto play video after click thumb
    if(url_vnexpress == true){
        $('#ifrLarger').attr('src',url+'?autoplay=1');
    }else if(url_youtube == true){
        $('#ifrLarger').attr('src',url+'?autoplay=1'); 
    }else if(url_facebook == true){
        $('#ifrLarger').attr('src',url+'&autoplay=1');
    }else {
        $('#ifrLarger').attr('src',url);
    }
    // Scroll wrap video show
    if($(".section-video-live-pc")[0]){
        $('html,body').animate({
            scrollTop: $(".section-video-live-pc").offset().top-80
        });
    }
});


jQuery(function(){
    if(typeof domReadyQueue === 'undefined' || domReadyQueue === null){
        console.log('%cYou need to declare the variable "domReadyQueue" inside the <head> tag', 'color: red');
    }else{
        while (domReadyQueue.length) {
            domReadyQueue.shift()(jQuery);
        }
    }
});
//console.log(domReadyQueue);


/*!---------------------------------
@File: Script Layout Digital Expo
@Update time: 2022-04-13-17h45
@Feedback: tuanla60@fpt.com.vn
----------------------------------- */