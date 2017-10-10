import $ from 'jquery';
import 'slick-carousel';
window.$ = $;
class Main {
  init() {
    $('.js-features').slick({
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  main.init();
});