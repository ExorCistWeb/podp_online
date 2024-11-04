// Установка времени бездействия в миллисекундах (1 минута = 60000 мс)
const idleTimeLimit = 5000;
let idleTimer;
let isErrorShown = false; // Флаг для отслеживания состояния ошибки

// Функция для отображения ошибки
function showErrorPopup() {
    const errorPopup = document.querySelector('.time_error');
    errorPopup.classList.add('active');
    isErrorShown = true; // Устанавливаем флаг, чтобы ошибка оставалась
}

// Функция для сброса таймера
function resetIdleTimer() {
    if (isErrorShown) return; // Если ошибка уже показана, не перезапускать таймер

    // Сбрасываем таймер бездействия
    clearTimeout(idleTimer);

    // Запускаем новый таймер
    idleTimer = setTimeout(showErrorPopup, idleTimeLimit);
}

// Слушатели событий для отслеживания активности пользователя
window.onload = resetIdleTimer;
document.onmousemove = resetIdleTimer;
document.onkeydown = resetIdleTimer;
document.onscroll = resetIdleTimer;
document.onclick = resetIdleTimer;

// Скрытие кнопки закрытия ошибки, чтобы пользователь не мог её закрыть
document.querySelector('.close_popup_time_error').addEventListener('click', function(event) {
    event.preventDefault();
    if (!isErrorShown) return; // Только если ошибка показана, блокируем кнопку закрытия
});