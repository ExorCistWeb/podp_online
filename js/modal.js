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