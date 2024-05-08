// Функция для установки активного класса и изменения изображения
function setActiveAndChangeImage(event) {
  // Сначала удаляем активный класс у всех элементов и возвращаем их к неактивным изображениям
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.classList.remove('active');
    link.classList.add('inactive');
    const img = link.querySelector('img');
    // Обновляем изображение на неактивное в зависимости от текста ссылки
    switch (link.textContent.trim()) {
      case 'Главная':
        img.src = 'img/menu.png';
        break;
      case 'Смартфоны':
        img.src = 'img/smartphone.png';
        break;
      case 'Аксессуары':
        img.src = 'img/usb.png';
        break;
      case 'Наушники':
        img.src = 'img/headset.png';
        break;
      case 'Умные часы':
        img.src = 'img/product.png';
        break;
    }
  });

  // Добавляем активный класс к нажатому элементу и изменяем изображение на активное
  const activeLink = event.currentTarget;
  activeLink.classList.add('active');
  activeLink.classList.remove('inactive');
  const activeImage = activeLink.querySelector('img');
  switch (activeLink.textContent.trim()) {
    case 'Главная':
      activeImage.src = 'img/menu-white.png'
      break;
    case 'Смартфоны':
      activeImage.src = 'img/smartphone-white.png';
      break;
    case 'Аксессуары':
      activeImage.src = 'img/usb-white.png';
      break;
    case 'Наушники':
      activeImage.src = 'img/headset-white.png';
      break;
    case 'Умные часы':
      activeImage.src = 'img/product-white.png';
      break;
  }
}

// Добавляем обработчик событий клика ко всем ссылкам в меню
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', setActiveAndChangeImage);
});
