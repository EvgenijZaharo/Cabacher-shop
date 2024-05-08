

document.addEventListener('coursesLoaded', (event) => {
    let allCourses = [];
    let detailsBtns = document.getElementsByClassName("moreBtn");
    let detailsModal = document.getElementById("myModal");
    let detailsContent = document.getElementById("courseDetails");
    let detailsSpan = document.getElementsByClassName("close")[0];

    let authModal = document.getElementById("myModal_Authorization");
    let authContent = document.getElementById("auth-content");
    let authSpan = document.getElementsByClassName("close")[1];
    let authBtns = document.getElementsByClassName("buyCourseBtn");

    let isAuth = false;
    fetch('./allCoursesDB.json')
        .then(response => response.json())
        .then(data => {
            allCourses = data;

        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));

    Array.from(detailsBtns).forEach((btn) => {
        if(btn.onclick !== null) return;

        btn.onclick = function() {
            detailsModal.style.display = "block";
            fillDetails(allCourses[btn.data].name, allCourses[btn.data].description, allCourses[btn.data].image, allCourses[btn.data].price);
        }
    });
    Array.from(authBtns).forEach((btn) => {
        btn.onclick = function() {

            authModal.style.display = "block";
        }
    });

    detailsSpan.onclick = function() {
        detailsModal.style.display = "none";
    }
    authSpan.onclick = function() {
        authModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === detailsModal) {
            detailsModal.style.display = "none";
            authModal.style.display = "none";
        }
    }

    function fillDetails(name, description, image, price) {
        detailsContent.innerHTML = "";

        let courseImage = document.createElement('img');
        courseImage.alt = 'courseImage';
        courseImage.src = image;
        detailsContent.appendChild(courseImage);

        let courseName = document.createElement('h2');
        courseName.textContent = name;
        detailsContent.appendChild(courseName);

        let courseDescription = document.createElement('p');
        courseDescription.textContent = description;
        detailsContent.appendChild(courseDescription);

        let coursePrice = document.createElement('p');
        coursePrice.textContent = 'Цена: ' + Math.round(price * 0.7) + " руб (скидка 30%)"
        detailsContent.appendChild(coursePrice);

        let courseTime = document.createElement('p');
        courseTime.textContent = 'Продолжительность: 12 мес';
        detailsContent.appendChild(courseTime);
    }});
