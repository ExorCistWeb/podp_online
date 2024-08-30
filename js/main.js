var swiper = new Swiper(".reviewsSwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        1440: {
            slidesPerView: 3
        },
    },
});

function playPauseVideo(videoId) {
    const video = document.getElementById(videoId);
    const container = video.parentElement;
    const button = video.nextElementSibling;

    if (video.paused) {
        video.muted = false; // Убедитесь, что звук включен
        video.play();
        container.classList.add('playing'); // Добавляем класс для изменения фона
        button.style.display = "none"; // Скрываем кнопку
    } else {
        video.pause();
        container.classList.remove('playing'); // Убираем класс для изменения фона
        button.style.display = "flex"; // Показываем кнопку
    }
}

// Добавляем обработчик события на клик по видео
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('click', () => playPauseVideo(video.id));
});


$(document).ready(function() {
    $('.accordion-header').click(function() {
        const content = $(this).next('.accordion-content');

        // Проверяем, открыто ли текущее содержимое
        const isOpen = content.is(':visible');

        // Закрываем все открытые аккордеоны
        $('.accordion-content').not(content).slideUp(300);
        $('.toggle p').not($(this).find('.toggle p')).text('+');
        $('.title_faq').not($(this).find('.title_faq')).css('color', ''); // Сбрасываем цвет для остальных

        // Переключаем текущее содержимое
        content.slideToggle(300);

        // Меняем плюсик на минусик
        $(this).find('.toggle p').text(isOpen ? '+' : '-');

        // Меняем цвет текста заголовка
        $(this).find('.title_faq').css('color', isOpen ? '' : '#235DCF');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    document.querySelector('.copy_js').textContent = currentYear;
});


$(document).ready(function() {
    $('#mobile-menu').click(function() {
        $('.nav').toggleClass('active'); // Переключаем класс для отображения меню
        $(this).toggleClass('toggle'); // Добавляем анимацию бургер-меню
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});