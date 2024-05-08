function scrollCarousel(direction) {
    const container = document.getElementById('reviews');
    const items = container.getElementsByClassName('review-item');
    const itemWidth = items[0].clientWidth;
    const scrollAmount = itemWidth; // предполагаем, что ширина каждого элемента одинакова


    container.scrollLeft += scrollAmount * direction;
}


const reviews = [
    {
        name: "Белодед <br> Николай",
        review: "Отличные курсы, много полезной информации. Рекомендую!",
        img: "../assets/images/beloded.jpg"
    },

    {
        name: "Бандана <br> Иван",
        review: "Очень понравилось обучение, все доступно и понятно. Спасибо!",
        img: "../assets/images/van.jpg"
    },
    {
        name: "Уласевич <br> Николай",
        review: "Курсы помогли мне разобраться в сложных темах. Большое спасибо!",
        img: "../assets/images/Уласевич.jpg"
    },
    {
        name: "Том <br> Йорк",
        review: "Отличные курсы, помогли мне развить свои навыки. Спасибо!",
        img: "../assets/images/tom.jpg"
    },
    {
        name: "Балцевич <br> Павел",
        review: "Интересные задания и понятные объяснения. Рекомендую начинающим!",
        img: "../assets/images/paul.jpg"
    },
    {
        name: "Барковский <br> Евгений",
        review: "Курсы помогли мне справиться с трудными задачами. Очень довольна результатом!",
        img: "../assets/images/barkovsky.png"
    },

    {
        name: "Иванов <br> Савелий",
        review: "Отличный формат обучения, удобно и эффективно. Рекомендую!",
        img: "../assets/images/gay.jpg"
    },

    {
        name: "Кабачкович <br> Евгений",
        review: "Верните деньги!",
        img: "../assets/images/zhenok.jpg"
    }
];
function createReview(name, review, imageSource) {

    let reviewContainer = document.createElement("div");
    reviewContainer.classList.add("review-item");

    let image = document.createElement("img");
    image.classList.add("review-avatar");
    image.alt = "photo";
    image.src = imageSource;

    let contentContainer = document.createElement("div");
    contentContainer.classList.add("review-content");

    let wrap = document.createElement("div");
    wrap.classList.add("review-wrap");

    let title = document.createElement("h2");
    title.classList.add("review-name");
    title.innerHTML = name;

    let text = document.createElement("p");
    text.classList.add("review-text");
    text.textContent = review;


    contentContainer.appendChild(text);

    wrap.appendChild(image);
    wrap.appendChild(title);

    reviewContainer.appendChild(wrap);
    reviewContainer.appendChild(contentContainer);

    document.getElementById("reviews").appendChild(reviewContainer);
}



document.addEventListener('DOMContentLoaded', (event) => {
    for (let i = 0; i < reviews.length; i++) {
        createReview(reviews[i].name, reviews[i].review, reviews[i].img);
    }
});


