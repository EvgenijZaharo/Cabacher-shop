window.onload = function() {
  // Получите параметры запроса из URL
  let params = new URLSearchParams(window.location.search);
  let brand = params.get('brand');

  // Установите чекбоксы в зависимости от параметра запроса
  if (brand === 'apple') {
    document.getElementById('appleCheckbox').checked = true;
  } else if (brand === 'samsung') {
    document.getElementById('samsungCheckbox').checked = true;
  }
  sortItems();
};
