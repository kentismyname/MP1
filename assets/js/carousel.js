var carouselInner = document.querySelector('#HomeProductSlide .carousel-inner');

var intervalId = setInterval(function () {
    var currentActiveItem = carouselInner.querySelector('.carousel-item.active');
    currentActiveItem.classList.remove('active');

    var nextItem = currentActiveItem.nextElementSibling || carouselInner.firstElementChild;
    nextItem.classList.add('active');
}, 5000);

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        clearInterval(intervalId);
    } else {
        intervalId = setInterval(/* ... */);
    }
});
