document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    const boughtCourses = JSON.parse(localStorage.getItem('boughtCourses'));

    if (boughtCourses && boughtCourses.length > 0) {
        boughtCourses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.textContent = `${course.name}, Куплен: ${course.time}`;
            document.body.appendChild(courseElement);
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Купленных курсов пока нет.';
        document.body.appendChild(emptyMessage);
    }
});