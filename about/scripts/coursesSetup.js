const event = new Event('coursesLoaded');

let courseIndex = 0;
let indexAccum = 0;
let allCourses = [];


document.addEventListener('DOMContentLoaded', (event) => {
   //здеся получаю джсон и вызываю loadCourses
    fetch('./allCoursesDB.json')
        .then(response => response.json())
        .then(data => {
            allCourses = data;
            loadCourses();
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));


});
function buyCourse(e) {
    e.preventDefault();
    const courseData = e.target.data;
    courseData.time = new Date().toLocaleDateString();

    const boughtCourses = JSON.parse(localStorage.getItem('boughtCourses')) || [];

    boughtCourses.push(courseData);

    localStorage.setItem('boughtCourses', JSON.stringify(boughtCourses));

   // window.location.href = '../personal-page.html';
}

function loadCourses(){
    indexAccum = courseIndex + 3;
    if(indexAccum >= allCourses.length){
    document.querySelector("#showOther").style.display = "none";
    }
    for (let i = 0; courseIndex < indexAccum; courseIndex++) {
        createCourse(allCourses[courseIndex].name, allCourses[courseIndex].price, allCourses[courseIndex].description, allCourses[courseIndex].image, courseIndex);
    }
    document.dispatchEvent(event);

}

function createCourse(name, price, description, imageSource, id) {
    let courseContainer = document.createElement("div");
    courseContainer.classList.add("all-courses-container__item");

    let course1 = document.createElement('div');
    course1.className = 'course-1';

    let courseImage = document.createElement('img');
    courseImage.alt = 'courseImage';
    courseImage.className = 'course-image';
    courseImage.src = imageSource;
    course1.appendChild(courseImage);

    let courseName = document.createElement('h2');
    courseName.className = 'course-name';
    courseName.textContent = name;
    course1.appendChild(courseName);

    let courseDescription = document.createElement('p');
    courseDescription.className = 'course-description';
    courseDescription.textContent = description;
    course1.appendChild(courseDescription);

    courseContainer.appendChild(course1);

    let course2 = document.createElement('div');
    course2.className = 'course-2';

    let coursePriceContainer = document.createElement('div');
    coursePriceContainer.className = 'course-price-container';

    let courseOldPriceText = document.createElement('div');
    courseOldPriceText.className = 'course-old-price-text';
    courseOldPriceText.textContent = price;
    coursePriceContainer.appendChild(courseOldPriceText);

    let courseNewPriceText = document.createElement('div');
    courseNewPriceText.className = 'course-new-price-text';
    courseNewPriceText.textContent = Math.round(price * 0.7);
    coursePriceContainer.appendChild(courseNewPriceText);

    let priceByn1 = document.createElement('div');
    priceByn1.className = 'price-byn';
    priceByn1.textContent = 'BYN/мес';
    coursePriceContainer.appendChild(priceByn1);

    let priceByn2 = document.createElement('div');
    priceByn2.className = 'price-byn';
    priceByn2.textContent = 'BYN/мес';
    coursePriceContainer.appendChild(priceByn2);

    course2.appendChild(coursePriceContainer);
    courseContainer.appendChild(course2);

    let courseControllerContainer = document.createElement('div');
    courseControllerContainer.className = 'course-controller-container';

    let buyCourseButton = document.createElement('input');
    buyCourseButton.type = 'button';
    buyCourseButton.value = 'Записаться';
    buyCourseButton.data = {name, price, description, imageSource, id};
    buyCourseButton.className = 'buyCourseBtn';
    buyCourseButton.addEventListener("click", buyCourse);
    courseControllerContainer.appendChild(buyCourseButton);

    let detailsButton = document.createElement('input');
    detailsButton.type = 'button';
    detailsButton.value = 'Подробнее';
    detailsButton.className = 'moreBtn';
    detailsButton.data = id;
    courseControllerContainer.appendChild(detailsButton);

    courseContainer.appendChild(courseControllerContainer);



    document.getElementById("courses").appendChild(courseContainer);
}


