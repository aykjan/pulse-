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


const slider = tns({
  container: '.carusel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls:false,
  nav:false
});
document.querySelector('.next').addEventListener('click',()=>{
  slider.goTo('next');
})

document.querySelector('.prev').addEventListener('click',()=>{
  slider.goTo('prev');
})


