(function ($) {
  $(function () {
    // Dropdowns
    $('.menu__item--has-submenu').on('click', function (event) {
      event.stopPropagation();
      $(this).toggleClass('menu__item--display-submenu');
    });

    // Social
    $('[data-social-sharing]').on('click', function (event) {
      event.preventDefault();
      var target = $(this).attr('href');
      var w = 600;
      var h = 500;
      var x = ($(window).width() / 2) - (w / 2);
      var y = ($(window).height() / 2) - (h / 2);
      window.open(target, 'Share', 'width=' + w + ', height=' + h + ', top=' + y + ', left=' + x);
    });

    // Mobile menu
    $('.main__mobile-nav-toggle').on('click', function () {
      $(this).parent('.main__nav').toggleClass('main__nav--mobile-nav-open');
    })
  });
}) (jQuery);
