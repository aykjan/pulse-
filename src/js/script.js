// $(document).ready(function () {
//   $('.carusel__inner').slick({
//     speed: 1200,
//     adaptiveHeight: true,
//     prevArrow: '<button type="button" class="slick-prev"><img src="../icons/arrow-left.png"></button>',
//     nextArrow: '<button type="button" class="slick-next"><img src="../icons/array-right.png"></button>',
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           dots: true,
//           arrows: false
//         }
//       }
//     ]
//   });
// });

$(document).ready(function () {
  const slider = tns({
    container: '.carusel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    responsive: {
      320: {
        gutter: 20,
        items: 1,
        touch: true,
        center: true
      },
    }
  });
  document.querySelector('.next').addEventListener('click', () => {
    slider.goTo('next');
  })

  document.querySelector('.prev').addEventListener('click', () => {
    slider.goTo('prev');
  })

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // modal 
  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow')

  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  })

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: 'Пожалуйста введите свое имя!',
          minlength: jQuery.validator.format("Имя должно состоять из  {0} Символов")
        },
        phone: "Пожалуйтса введите свой телефон",
        email: {
          required: "Пожалуйста введите свою почта",
          email: "Ваша почта должна быть формата name@domain.com"
        }
      }


    });
  };
  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');


  $("input[name=phone]").mask("+7(999) 999-9999");

  $('form').submit(function(e) {
    e.preventDefault();

    if(!$(this).valid()) {
      return;
    }
    
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});

  // smooth scroll and page up 
  $(window).scroll(function () {
    if($(this).scrollTop() >1600) {
      $('.pageup').fadeIn()
    } else {
      $('.pageup').fadeOut()
    }
  })

  $("a[href='#up']").on("click", function () {
    let href = $(this).attr("href");

    $("html, body").animate({
        scrollTop: $(href).offset().top
    });

    return false;
});

new WOW({

}).init();
})
