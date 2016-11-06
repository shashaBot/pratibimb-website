$(window).scroll(function () {
            if ($(this).scrollTop() > 400) {
                $('.goToTop').fadeIn();
            } else {
                $('.goToTop').fadeOut();
            }
        });
