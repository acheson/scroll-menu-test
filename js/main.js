var FF = FF || {};

FF.Main = (function($) {

    var win = $(window),
        doc = $(document);

    var pub = {},
        els = {},
        sizes = {},
        initials = {};

    var scrollState;

    pub.init = init;



    function init() {

        els.container = $('.container');
        els.mainNav = $('.main-nav');
        els.contentHeader = $('.content-header');
        els.subNav = $('.sub-nav');
        els.contentBody = $('.content-body');

        sizes.mainNavHeight = els.mainNav.height();
        sizes.headerHeight = els.contentHeader.height();
        sizes.headerOffsetHeight = els.contentHeader.offset().top;
        sizes.subNavHeight = els.subNav.height();
        sizes.subNavOffsetHeight = els.subNav.offset().top;
        sizes.contentOffsetHeight = els.contentBody.offset().top;

        initials.containerMarginTop = parseInt(els.container.css('margin-top'));
        initials.mainNavMarginTop = parseInt(els.mainNav.css('margin-top'));
        initials.subNavMarginTop = parseInt(els.subNav.css('margin-top'));
        initials.contentBodyMarginTop = parseInt(els.contentBody.css('margin-top'));

        console.log(sizes);

        win.on('scroll', scrollHandler);
        win.scrollTop(0);
    }

    function scrollHandler() {

        var scrollTop,
            newScrollState;

        scrollTop = win.scrollTop();

        // Determine the scroll state
        if (scrollTop > 0 && scrollTop < sizes.headerHeight) {

            newScrollState = 'loosingContentHeader';

        }
        else if (scrollTop >= sizes.mainNavHeight && scrollTop < sizes.headerOffsetHeight) {

            newScrollState = 'scrollingContentAndSubNav';

        }
        else if (scrollTop >= sizes.headerOffsetHeight && scrollTop < sizes.subNavOffsetHeight) {

            newScrollState = 'loosingMainNav';

        }
        else if (scrollTop >= sizes.subNavOffsetHeight) {

            newScrollState = 'subNavLocked';

        }
        else {

            newScrollState = '';

        }

        console.log(scrollTop, scrollState, newScrollState);

        // Check to see if scrollState has changed
        if (scrollState != newScrollState) {
            // Save the state.
            scrollState = newScrollState;

            // Do work! But only the first time the state changes
            if (scrollState == 'loosingContentHeader') {

                els.contentHeader.addClass('scrolling');

            }
            else if (scrollState == 'scrollingContentAndSubNav') {

                els.mainNav.css('margin-top', initials.mainNavMarginTop);

            }
            else if (scrollState == 'loosingMainNav') {

                els.subNav.addClass('pushing-main');
                els.subNav.removeClass('fixed');
                els.contentBody.css('margin-top', initials.contentBodyMarginTop);

            }
            else if (scrollState == 'subNavLocked') {

                els.subNav.addClass('fixed');
                els.subNav.css('margin-top', 0);
            }
            else {

                els.contentHeader.removeClass('scrolling');
                els.subNav.removeClass('fixed');

                els.container.css('margin-top', initials.containerMarginTop);
                els.mainNav.css('margin-top', initials.mainNavMarginTop);
                els.subNav.css('margin-top', initials.subNavMarginTop);
                els.contentBody.css('margin-top', initials.contentBodyMarginTop);

            }
        }

        // Do work! Regardless
        if (scrollState == 'loosingContentHeader') {
            els.container.css('margin-top', scrollTop + 'px');
            els.subNav.css('margin-top', (sizes.subNavOffsetHeight - sizes.headerHeight - scrollTop) + 'px');
        }
        else if (scrollState == 'scrollingContentAndSubNav') {
            els.container.css('margin-top', scrollTop + 'px');
            els.subNav.css('margin-top', (sizes.subNavOffsetHeight - sizes.headerHeight - scrollTop) + 'px');
        }
        else if (scrollState == 'loosingMainNav') {
            els.container.css('margin-top', scrollTop + 'px');
            els.mainNav.css('margin-top', (sizes.headerOffsetHeight - scrollTop) + 'px');
        }
        else if (scrollState == 'subNavLocked') {
            els.contentBody.css('margin-top', sizes.subNavHeight);
        }
        else {
//                els.mainNav.css('top', 0);
//                els.contentHeader.removeClass('scrolling');
//                els.subNav.removeClass('fixed');
//                els.subNav.css('margin-top', 0);
//                els.contentBody.css('margin-top', sizes.subNavHeight);
        }

    }



    return pub;

})(jQuery);


$(document).ready(function() {

    FF.Main.init();

});