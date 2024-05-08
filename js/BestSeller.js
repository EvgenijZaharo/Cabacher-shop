const bstsler = [
  {
    name: "Apple iPhone 15",
    image: "./img/apple_iphone_15.jpg",
    priceBYN: "3700 Br.",
    url: "https://catalog.onliner.by/mobile/apple/iphone15"
  },
  {
    name: "Samsung Galaxy S23+",
    image: "./img/samsung_galaxy_s24_ultra.jpg",
    priceBYN: "4000 Br.",
    url: "https://catalog.onliner.by/mobile/samsung/sms916bzkdskz"
  },
  {
    name: "Oppo Find X5 Pro",
    image: "./img/oppo.png",
    priceBYN: "1700 Br.",
    url: "https://mobistore.by/oppo-find-x5-pro-512gb"
  },
  {
    name: "Realme GT 2 Pro",
    image: "./img/realme2.png",
    priceBYN: "950 Br.",
    url: "https://catalog.onliner.by/mobile/realme/gt2pro12256grn/prices?region=pinsk"
  },
  {
    name: "Xiaomi 12C",
    image: "./img/xiaomi_12c.png",
    priceBYN: "600 Br.",
    url: "https://catalog.onliner.by/mobile/xiaomi/redmi12c4128wb"
  }
];

// Получаем элемент с классом "row-product"
const rowProduct = document.querySelector(".row-product");

// Проходимся по массиву телефонов и вставляем HTML для каждого
bstsler.forEach(function(phone) {
  const itemBox = document.createElement("div");
  itemBox.classList.add("item-box");

  const itemImage = document.createElement("div");
  itemImage.classList.add("item-image");
  const img = document.createElement("img");
  img.src = phone.image;
  itemImage.appendChild(img);

  const itemDetails = document.createElement("div");
  itemDetails.classList.add("item-details");
  const h5 = document.createElement("h5");
  h5.textContent = phone.name;
  const p = document.createElement("p");
  p.textContent = phone.priceBYN;
  const bottomDetails = document.createElement("div");
  bottomDetails.classList.add("bottom-details");
  bottomDetails.appendChild(p);
  const a = document.createElement("a");
  a.target = "_blank";
  a.href = phone.url; // URL присвоен здесь
  a.textContent = "Купить";
  bottomDetails.appendChild(a);
  itemDetails.appendChild(h5);
  itemDetails.appendChild(bottomDetails);

  itemBox.appendChild(itemImage);
  itemBox.appendChild(itemDetails);

  rowProduct.appendChild(itemBox);
});
