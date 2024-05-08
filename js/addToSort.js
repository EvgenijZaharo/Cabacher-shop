// Функция для добавления информации о телефонах в контейнер
function addPhonesToContainer(phones) {
  const container = document.querySelector('.product-container');
  container.innerHTML = '';

  phones.forEach(phone => {
    const img = document.createElement('img');
    img.src = phone.src;
    img.alt = phone.name;

    const titleDiv = document.createElement('div');
    titleDiv.className = 'product-title';
    titleDiv.textContent = phone.name;

    const buyBtn = document.createElement('a');
    buyBtn.className = 'product-button';
    buyBtn.href = phone.url;
    buyBtn.target = "_blank"
    buyBtn.textContent = 'Buy';

    const priceDiv = document.createElement('div');
    priceDiv.className = 'product-price';
    priceDiv.textContent = phone.price;
    priceDiv.insertBefore(buyBtn, priceDiv.firstChild);

    const characteristicsList = document.createElement('ul');
    characteristicsList.className = 'product-characteristics';
    for (const [key, value] of Object.entries(phone.characteristic)) {
      const listItem = document.createElement('li');
      listItem.textContent = `${key}: ${value}`;
      characteristicsList.appendChild(listItem);
    }
    const productImageDiv = document.createElement('div');
    productImageDiv.className = 'product-image';
    productImageDiv.appendChild(img);
    productImageDiv.appendChild(characteristicsList);

    const phoneDiv = document.createElement('div');
    phoneDiv.className = 'phone';
    phoneDiv.id = `${phone.brand}-${phone.name.replace(/\s+/g, '-')}`;
    phoneDiv.appendChild(productImageDiv);
    phoneDiv.appendChild(titleDiv);
    phoneDiv.appendChild(priceDiv);
    container.appendChild(phoneDiv);
  });
}



// Функция для загрузки данных из JSON файла
function loadDatabase() {
  fetch('./js/bd.json')
    .then(response => response.json())
    .then(data => {
      // Проверяем, что data.phones существует и является массивом
      if (data && Array.isArray(data.phones)) {
        const sortedPhones = sortByPriceAsc(data.phones); // Сортируем телефоны по возрастанию цены
        addPhonesToContainer(sortedPhones); // Если всё в порядке, вызываем функцию
      } else {
        console.error('Данные из bd.json не содержат ожидаемую структуру');
      }
    })
    .catch(error => console.error('Ошибка при загрузке базы данных:', error));
}

// Вызываем функцию загрузки базы данных при загрузке страницы
document.addEventListener('DOMContentLoaded', loadDatabase);

// Функция для преобразования строки цены в число
function parsePrice(priceString) {
  return parseInt(priceString.replace(/\D/g, ''));
}

// Функция сортировки по цене (убывание)
function sortByPriceDesc(phones) {
  return phones.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
}

// Функция сортировки по цене (возрастание)
function sortByPriceAsc(phones) {
  return phones.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
}

// Функция сортировки по году выпуска (новые первыми)
function sortByReleaseYearDesc(phones) {
  return phones.sort((a, b) => b.release_year - a.release_year);
}

// Обновляем функцию sortItems для использования новых функций сортировки
function sortItems() {
  let sortOption = document.getElementById('sortOptions').value;
  const isSamsungChecked = document.getElementById('samsungCheckbox').checked;
  const isAppleChecked = document.getElementById('appleCheckbox').checked;

  fetch('./js/bd.json')
    .then(response => response.json())
    .then(data => {
      let filteredPhones = data.phones;

      // Применяем фильтрацию перед сортировкой
      if (isSamsungChecked && isAppleChecked) {
        filteredPhones = filteredPhones.filter(phone => phone.brand === 'Samsung' || phone.brand === 'Apple');
      } else if (isSamsungChecked) {
        filteredPhones = filteredPhones.filter(phone => phone.brand === 'Samsung');
      } else if (isAppleChecked) {
        filteredPhones = filteredPhones.filter(phone => phone.brand === 'Apple');
      }

      // Теперь применяем сортировку к отфильтрованному списку
      let sortedPhones;
      switch(sortOption) {
        case 'priceDesc':
          sortedPhones = sortByPriceDesc(filteredPhones);
          break;
        case 'priceAsc':
          sortedPhones = sortByPriceAsc(filteredPhones);
          break;
        case 'age':
          sortedPhones = sortByReleaseYearDesc(filteredPhones);
          break;
      }
      addPhonesToContainer(sortedPhones); // Обновляем контейнер с телефонами
    })
    .catch(error => console.error('Ошибка при загрузке базы данных:', error));
}

document.getElementById('samsungCheckbox').addEventListener('change', sortItems);
document.getElementById('appleCheckbox').addEventListener('change', sortItems);

// Убедитесь, что обработчик события добавлен после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sortOptions').addEventListener('change', sortItems);
});

function filterByBrand() {
  const isSamsungChecked = document.getElementById('samsungCheckbox').checked;
  const isAppleChecked = document.getElementById('appleCheckbox').checked;

  fetch('./js/bd.json')
    .then(response => response.json())
    .then(data => {
      let filteredPhones = data.phones;

      if (isSamsungChecked && isAppleChecked) {
        // Показываем телефоны обоих брендов
        filteredPhones = data.phones.filter(phone => phone.brand === 'Samsung' || phone.brand === 'Apple');
      } else if (isSamsungChecked) {
        // Показываем только телефоны Samsung
        filteredPhones = data.phones.filter(phone => phone.brand === 'Samsung');
      } else if (isAppleChecked) {
        // Показываем только телефоны Apple
        filteredPhones = data.phones.filter(phone => phone.brand === 'Apple');
      } else {
        // Если ничего не выбрано, показываем все телефоны
        filteredPhones = data.phones;
      }

      addPhonesToContainer(filteredPhones);
    })
    .catch(error => console.error('Ошибка при загрузке базы данных:', error));
}
