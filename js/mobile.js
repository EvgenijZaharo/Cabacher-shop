document.addEventListener('DOMContentLoaded', (event) => {
  if (window.matchMedia('(max-width: 780px)').matches) {
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    let lastScrollTop = 0;
    let menuOpen = false;

    header.style.transition = 'transform 0.25s';
    document.body.style.transition = 'padding-top 0.25s';

    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open');
    });

    window.addEventListener('scroll', () => {
      if (!menuOpen) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

        if (scrollPercent > 85) {
          header.classList.add('slide-up');
          header.style.transform = `translateY(-${headerHeight}px)`;
          document.body.style.paddingTop = 0;
        } else {
          if (scrollTop > lastScrollTop && !header.classList.contains('slide-up')) {
            header.classList.add('slide-up');
            header.style.transform = `translateY(-${headerHeight}px)`;
            document.body.style.paddingTop = 0;
          } else if (scrollTop <= lastScrollTop && header.classList.contains('slide-up')) {
            header.classList.remove('slide-up');
            header.classList.add('header_fixed');
            header.style.transform = 'translateY(0%)';
            document.body.style.paddingTop = `${headerHeight}px`;
          }
        }

        lastScrollTop = scrollTop;
      }
      else {
        header.classList.remove('header_fixed');
        document.body.style.paddingTop = 0;}
    });
  }
});
let currentState = window.innerWidth > 780;

setInterval(function () {
  let currentWindow = window.innerWidth;
  let isDesktop = currentWindow > 780;

  if (isDesktop !== currentState) {
    location.reload();
    currentState = isDesktop;
  }
}, 500); // Проверять каждые 500 миллисекунд
document.addEventListener('DOMContentLoaded', function() {
  var sortingMenu = document.querySelector('.sorting-menu');
  var mainContent = document.querySelector('main');
  if (window.innerWidth <= 780) { // Используйте значение ширины экрана, соответствующее вашему дизайну
    mainContent.insertBefore(sortingMenu, mainContent.firstChild);
  }
});
