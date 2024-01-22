var carouselInner1 = document.querySelector('#HomeProductSlide1 .carousel-inner');

var intervalId1 = setInterval(function () {
    var currentActiveItem = carouselInner1.querySelector('.carousel-item.active');
    currentActiveItem.classList.remove('active');

    var nextItem = currentActiveItem.nextElementSibling || carouselInner1.firstElementChild;
    nextItem.classList.add('active');
}, 5000);

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        clearInterval(intervalId1);
    } else {
        intervalId1 = setInterval(5000);
    }
});

var carouselInner2 = document.querySelector('#HomeProductSlide2 .carousel-inner');

var intervalId2 = setInterval(function () {
    var currentActiveItem = carouselInner2.querySelector('.carousel-item.active');
    currentActiveItem.classList.remove('active');

    var nextItem = currentActiveItem.nextElementSibling || carouselInner2.firstElementChild;
    nextItem.classList.add('active');
}, 5000);

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        clearInterval(intervalId2);
    } else {
        intervalId2 = setInterval(5000);
    }
});
