// Функция для добавления информации об аксессуарах в контейнер

function addAccessoriesToContainer(accessories) {
  const container = document.querySelector('.product-container');
  container.innerHTML = '';

  accessories.forEach(accessory => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.id = `${accessory.type}-${accessory.type.replace(/\s+/g, '-')}`;

    const productImageDiv = document.createElement('div');
    productImageDiv.className = 'product-image';


    const img = document.createElement('img');
    img.src = accessory.src;
    img.alt = accessory.type;
    productImageDiv.appendChild(img);
    const productDetailsDiv = document.createElement('div');
    productDetailsDiv.className = 'product-details';

    if (accessory.type === 'case') {
      // Добавляем заголовок "Подходит для"
      const compatibleTitle = document.createElement('p');
      compatibleTitle.textContent = 'Подходит для:';
      productDetailsDiv.appendChild(compatibleTitle);

      // Создаем маркированный список подходящих моделей
      const ul = document.createElement('ul');
      accessory.characteristics.forEach(characteristic => {
        const li = document.createElement('li');
        li.textContent = characteristic;
        ul.appendChild(li);
      });
      productDetailsDiv.appendChild(ul);
    } else if (accessory.type === 'power') {
      // Добавляем только строку с объемом для типа 'power'
      const powerDetails = document.createElement('p');
      powerDetails.textContent = accessory.characteristics;
      productDetailsDiv.appendChild(powerDetails);
    }

    // Добавляем детали продукта в productImageDiv
    productImageDiv.appendChild(productDetailsDiv);

    const titleDiv = document.createElement('div');
    titleDiv.className = 'product-title';
    titleDiv.textContent = accessory.name;

    const priceDiv = document.createElement('div');
    priceDiv.className = 'product-price';

    const buyBtn = document.createElement('a');
    buyBtn.className = 'product-button';
    buyBtn.href = accessory.url;
    buyBtn.target = "_blank";
    buyBtn.textContent = 'Buy';
    priceDiv.appendChild(buyBtn);

    const priceText = document.createTextNode(accessory.price);
    priceDiv.appendChild(priceText);

    productDiv.appendChild(productImageDiv);
    productDiv.appendChild(titleDiv);
    productDiv.appendChild(priceDiv);

    container.appendChild(productDiv);
  });
}



// Функция для загрузки данных из JSON файла
function loadDatabase() {
  fetch('./js/bd.json')
    .then(response => response.json())
    .then(data => {
      // Проверяем, что data.accessories существует и является массивом
      if (data && Array.isArray(data.accessories)) {
        const sortedAccessories = sortByPriceAsc(data.accessories); // Сортируем аксессуары по возрастанию цены
        addAccessoriesToContainer(sortedAccessories); // Если всё в порядке, вызываем функцию
      } else {
        console.error('Данные из bd.json не содержат ожидаемую структуру');
      }
    })
    .catch(error => console.error('Ошибка при загрузке базы данных:', error));
}
function parsePrice(priceString) {
  return parseInt(priceString.replace(/\D/g, ''), 10);
}

// Функция сортировки по цене (убывание)
function sortByPriceDesc(accessories) {
  return accessories.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
}

// Функция сортировки по цене (возрастание)
function sortByPriceAsc(accessories) {
  return accessories.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
}

// Обновляем функцию sortItems для использования новых функций сортировки
function sortItems() {
  let sortOption = document.getElementById('sortOptions').value;
  const isPowerChecked = document.getElementById('powerCheckbox').checked;
  const isCaseChecked = document.getElementById('caseCheckbox').checked;

  fetch('./js/bd.json')
    .then(response => response.json())
    .then(data => {
      let filteredAccessory = data.accessories;

      // Применяем фильтрацию перед сортировкой
      if (isPowerChecked && isCaseChecked) {
        filteredAccessory = filteredAccessory.filter(accessory => accessory.type === 'power' || accessory.type === 'case');
      } else if (isPowerChecked) {
        filteredAccessory = filteredAccessory.filter(accessory => accessory.type === 'power');
      } else if (isCaseChecked) {
        filteredAccessory = filteredAccessory.filter(accessory => accessory.type === 'case');
      }

      // Теперь применяем сортировку к отфильтрованному списку
      let sortedAccessory;
      switch(sortOption) {
        case 'priceDesc':
          sortedAccessory = sortByPriceDesc(filteredAccessory);
          break;
        case 'priceAsc':
          sortedAccessory = sortByPriceAsc(filteredAccessory);
          break;
      }
      addAccessoriesToContainer(sortedAccessory); // Обновляем контейнер с аксессуарами
 // Обновляем контейнер с accessory
    })
    .catch(error => console.error('Ошибка при загрузке базы данных:', error));
}

document.getElementById('powerCheckbox').addEventListener('change', sortItems);
document.getElementById('caseCheckbox').addEventListener('change', sortItems);

// Убедитесь, что обработчик события добавлен после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sortOptions').addEventListener('change', sortItems);
});

function filterByBrand() {
  const isPowerChecked = document.getElementById('powerCheckbox').checked;
  const isCaseChecked = document.getElementById('caseCheckbox').checked;

  fetch('./js/bd.json')
    .then(response => response.json())
    .then(data => {
      let filteredAccessory = data.accessories;

      if (isPowerChecked && isCaseChecked) {
        // Показываем телефоны обоих брендов
        filteredAccessory = data.accessories.filter(accessory => accessory.type === 'power' || accessory.type === 'case');
      } else if (isPowerChecked) {
        // Показываем только  power
        filteredAccessory = data.accessories.filter(accessory => accessory.type === 'power');
      } else if (isCaseChecked) {
        // Показываем только телефоны Case
        filteredAccessory = data.accessories.filter(accessory => accessory.type === 'case');
      } else {
        // Если ничего не выбрано, показываем все телефоны
        filteredAccessory = data.accessories;
      }

      addPhonesToContainer(filteredAccessory);
    })
    .catch(error => console.error('Ошибка при загрузке базы данных:', error));
}

