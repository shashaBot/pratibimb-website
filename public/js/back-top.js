$(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.goToTop').fadeIn();
            } else {
                $('.goToTop').fadeOut();
            }
        });
