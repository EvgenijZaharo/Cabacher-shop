// Получаем ссылку на элемент right-body
var rightBody = document.querySelector('.right-body');

var phones = [
  { name: 'Nothing Phone', price: '1400 Br.', imageSrc: './img/nothing.png', url: "https://catalog.onliner.by/mobile/nothing/nphone18256wh" },
  { name: 'Samsung S23 Ultra', price: '1660 Br.', imageSrc: './img/samsung2.png', url: "https://catalog.onliner.by/mobile/samsung/sms918bzkgskz" },
  { name: 'OnePlus Nord 2', price: '2020 Br.', imageSrc: './img/oneplus.png', url: "https://catalog.onliner.by/mobile/oneplus/nord25g12256lbl" }
];

// Проходим по каждому элементу в массиве и создаем HTML-элемент для каждого телефона
phones.forEach(function(phone) {
  // Создаем элемент div с классом "event"
  var eventDiv = document.createElement('div');
  eventDiv.classList.add('event');

  // Создаем левую часть с изображением
  var leftEventDiv = document.createElement('div');
  leftEventDiv.classList.add('left-event');
  var img = document.createElement('img');
  img.src = phone.imageSrc;
  leftEventDiv.appendChild(img);

  // Создаем правую часть с названием, ценой и кнопкой
  var rightEventDiv = document.createElement('div');
  rightEventDiv.classList.add('right-event');
  var h4 = document.createElement('h4');
  h4.textContent = phone.name;
  var p = document.createElement('p');
  p.textContent = phone.price;
  h4.appendChild(p);
  var buyLink = document.createElement('a');
  buyLink.href = phone.url;
  buyLink.textContent = 'Купить';
  buyLink.target = "_blank"
  rightEventDiv.appendChild(h4);
  rightEventDiv.appendChild(buyLink);

  // Добавляем левую и правую части в основной элемент с классом "event"
  eventDiv.appendChild(leftEventDiv);
  eventDiv.appendChild(rightEventDiv);

  // Добавляем созданный элемент в right-body
  rightBody.appendChild(eventDiv);
});
