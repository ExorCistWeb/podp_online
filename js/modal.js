$(document).ready(function() {
    $('.open-modal').click(function(event) {
        event.preventDefault();
        const modalId = $(this).data('modal');
        $('#' + modalId).addClass('show').fadeIn(300);
        $('body').css('overflow', 'hidden'); // Отключаем скролл
    });

    $('.close').click(function() {
        $(this).closest('.modal').removeClass('show').fadeOut(300);
        $('body').css('overflow', ''); // Включаем скролл обратно
    });

    $('.modal').click(function(event) {
        if ($(event.target).is(this)) {
            $(this).removeClass('show').fadeOut(300);
            $('body').css('overflow', ''); // Включаем скролл обратно
        }
    });
});

// Показать окно при нажатии на кнопку "Найти"
document.getElementById('findButton').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем отправку формы
    document.getElementById('popup').style.display = 'flex';
});

// Закрытие окна при нажатии на крестик
document.querySelector('.close_popup_time_error').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('popup').style.display = 'none';
});

// Закрытие окна при нажатии на фон
document.getElementById('popup').addEventListener('click', function(event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});