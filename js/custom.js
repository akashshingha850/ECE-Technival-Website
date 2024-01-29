/*	################################################################
	File Name: custom.js
	Template Name: Opekkha
	Created By: ThemeGraph
	https://themengraph.com
################################################################# */
jQuery(document).ready(function($) {
    
    "use strict";

    /* === Window Load === */
    $(window).load(function() {
	    $('#preloader').hide();
    });

    /* === Jquery Counter === */
    $('.countdown').downCount({
		date: '06/06/2017 12:00:00',
        offset: +1
	});

    /*===  FIXED MENU  ====*/
    var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight() + 15,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

    // Bind click handler to menu items
    menuItems.on("click", function (e) {
        var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        var fromTop = $(this).scrollTop() + topMenuHeight;
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

    /* === CLICK ANIMATION === */
    $('.go-to-about').on("click", function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
        }, 500);
        return false;
    });
                          

    /* === CONTACT FORM === */
    $('#contact-form').on("submit", function () {
        var action = $(this).attr('action');
        $("#message").slideUp(750, function () {
            $('#message').hide();
            $('#submit')
                    .after('<img src="images/ajax-loader.gif" class="loader" />')
                    .attr('disabled', 'disabled');
            $.post(action, {
                name: $('#name').val(),
                email: $('#email').val(),
                website: $('#website').val(),
                subject: $('#subject').val(),
                comments: $('#comments').val()
            },
            function (data) {
                document.getElementById('message').innerHTML = data;
                $('#message').slideDown('slow');
                $('#contact-form img.loader').fadeOut('slow', function () {
                    $(this).remove()
                });
                $('#submit').removeAttr('disabled');
                if (data.match('success') != null)
                    $('#contact-form').show('slow');
            }
            );

        });
        return false;
    });

    /* === Mailchimp === */
    $('#mc-form').ajaxChimp({
        url: 'https://djsam.us14.list-manage.com/subscribe/post?u=fdc12a973daa568ee2b49d263&amp;id=871103cc13'
    });
    
});


/* === Jquery Rain === */     
function run() {
    var image = document.getElementById('background-dark');
    image.onload = function() {
        var engine = new RainyDay({
            image: this
        });
        engine.rain([ [1, 2, 1000] ]);
        engine.rain([ [3, 3, 0.88], [5, 5, 0.9], [6, 2, 1] ], 100);
    };
    image.crossOrigin = 'anonymous';
    image.src = 'http://i.imgur.com/eXkrVTQ.png';
}







