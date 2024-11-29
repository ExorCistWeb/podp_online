// Функция для обновления цветов SVG на основе подписей
function updateIcons() {
    const icons = document.querySelectorAll('.members_info'); // Все элементы с классом members_info

    icons.forEach(icon => {
        const signed = parseInt(icon.querySelector('.signed').textContent.trim()); // Количество подписавшихся
        const total = parseInt(icon.querySelector('.total').textContent.trim()); // Общее количество подписей

        const paths = icon.querySelectorAll('path'); // Все пути внутри SVG (не по классу .icon-paths)

        // Логика изменения цвета в зависимости от подписей
        if (signed === 0) {
            paths[0].setAttribute('fill', '#FF0E0E'); // Первый путь красный
            paths[1].setAttribute('fill', '#FF0E0E'); // Второй путь красный
        } else if (signed > 0 && signed < total) {
            paths[0].setAttribute('fill', '#439E23'); // Первый путь зеленый
            paths[1].setAttribute('fill', '#FF0E0E'); // Второй путь красный
        } else if (signed === total) {
            paths[0].setAttribute('fill', '#439E23'); // Первый путь зеленый
            paths[1].setAttribute('fill', '#439E23'); // Второй путь зеленый
        }
    });
}

// Вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', updateIcons);



// ОТКЫТИЕ ФИЛЬТРОВ И ЯРЛЫКОВ
document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.querySelector('.filter_btn');
    const labelsBtn = document.querySelector('.labels_btn');
    const filterDoc = document.querySelector('.filter_doc');
    const labelsCheckbox = document.querySelector('.labels_checkbox');
    const labelsInputContent = document.querySelector('.labels_input_content');
    const selectBtn = labelsCheckbox.querySelector('button');
    const noBtn = document.querySelector('.no_btn');

    // Функция для переключения отображения блоков
    const toggleDisplay = (button, element) => {
        const isVisible = element.style.display === 'block';

        // Скрыть оба блока и убрать активный класс
        filterDoc.style.display = 'none';
        labelsCheckbox.style.display = 'none';
        filterBtn.classList.remove('active');
        labelsBtn.classList.remove('active');

        // Если текущий элемент не был видим, открыть его и добавить активный класс
        if (!isVisible) {
            element.style.display = 'block';
            button.classList.add('active');
        }
    };

    // Показ/скрытие блока фильтров
    filterBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleDisplay(filterBtn, filterDoc);
    });

    labelsBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleDisplay(labelsBtn, labelsCheckbox);
    });

    // Открытие labels_input_content
    selectBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        labelsInputContent.style.display = 'flex';
    });

    // Закрытие labels_input_content при клике на кнопку "ОТМЕНА"
    noBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Отключение действия по умолчанию
        event.stopPropagation();
        labelsInputContent.style.display = 'none';
    });

    // Закрытие всех блоков при клике за их пределами
    document.addEventListener('click', () => {
        filterDoc.style.display = 'none';
        labelsCheckbox.style.display = 'none';
        filterBtn.classList.remove('active');
        labelsBtn.classList.remove('active');
    });

    // Предотвращение закрытия при клике внутри блоков
    filterDoc.addEventListener('click', (event) => event.stopPropagation());
    labelsCheckbox.addEventListener('click', (event) => event.stopPropagation());
    labelsInputContent.addEventListener('click', (event) => event.stopPropagation());
});

// ЧЕКБОКСЫ И АКТИВНЫЕ КНОПКИ
document.addEventListener('DOMContentLoaded', () => {
    // Находим чекбокс в my_table_top
    const masterCheckbox = document.querySelector('.my_table_top .select_input input[type="checkbox"]');
    // Находим все чекбоксы в строках таблицы
    const rowCheckboxes = document.querySelectorAll('.my_table_content .select_input input[type="checkbox"]');
    // Находим кнопки в my_table_top_flex
    const buttons = document.querySelectorAll('.my_table_top_flex button');
    // Находим строки таблицы
    const tableLines = document.querySelectorAll('.my_table_content .my_table_line');

    // Функция для обновления состояния кнопок
    function updateButtonsState() {
        // Проверяем, есть ли хотя бы один выбранный чекбокс в строках
        const isAnyCheckboxChecked = Array.from(rowCheckboxes).some(checkbox => checkbox.checked);

        // Если строк в таблице нет, кнопки не активируются
        if (tableLines.length === 0) {
            return;
        }

        // Активируем или деактивируем кнопки в зависимости от состояния чекбоксов
        buttons.forEach(button => {
            if (isAnyCheckboxChecked) {
                button.classList.add('active');
                button.disabled = false;
            } else {
                button.classList.remove('active');
                button.disabled = true;
            }
        });
    }

    // Добавляем обработчик события на главный чекбокс (masterCheckbox)
    masterCheckbox.addEventListener('change', () => {
        const isChecked = masterCheckbox.checked; // Проверяем, активен ли главный чекбокс

        // Перебираем все чекбоксы в строках и устанавливаем их значение, как у главного
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });

        // Обновляем состояние кнопок после изменения главного чекбокса
        updateButtonsState();
    });

    // Добавляем обработчик событий для каждого чекбокса в строках
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateButtonsState);
    });

    // Начальная проверка при загрузке страницы
    updateButtonsState();
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("labelForm");
    const addLabelButton = document.getElementById("addLabel");
    const cancelLabelButton = document.getElementById("cancelLabel");
    const labelInput = document.getElementById("labelInput");
    const colorSelect = document.getElementById("colorSelect");
    const filterCheckbox = document.getElementById("filterCheckbox");
    const labelButton = document.getElementById("labelButton");

    // Показываем форму для добавления ярлыка
    document.querySelector(".labels_checkbox button").addEventListener("click", function() {
        form.style.display = "block";
    });

    // Отмена добавления ярлыка
    cancelLabelButton.addEventListener("click", function() {
        form.style.display = "none";
    });

    // Добавление нового ярлыка
    addLabelButton.addEventListener("click", function() {
        const labelText = labelInput.value;
        const selectedColor = colorSelect.value;

        if (labelText) {
            // Создаем новый элемент ярлыка
            const newLabelButton = document.createElement("button");
            newLabelButton.classList.add("filter_cont_check_box");
            newLabelButton.classList.add(selectedColor); // Применяем цвет ярлыка

            // Создаем SVG-иконку для ярлыка
            const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgIcon.setAttribute("width", "7");
            svgIcon.setAttribute("height", "9");
            svgIcon.setAttribute("viewBox", "0 0 7 9");
            svgIcon.setAttribute("fill", "none");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M0.4375 0H6.5625C6.67853 0 6.78981 0.0459324 6.87186 0.127693C6.95391 0.209453 7 0.320343 7 0.43597V8.78174C7.00005 8.82072 6.98961 8.859 6.96977 8.89259C6.94993 8.92618 6.92141 8.95385 6.88719 8.97273C6.85297 8.99161 6.81429 9.001 6.77519 8.99992C6.73609 8.99884 6.698 8.98733 6.66487 8.96659L3.5 6.9886L0.335125 8.96616C0.302036 8.98687 0.263982 8.99838 0.22492 8.99948C0.185857 9.00058 0.147213 8.99123 0.113004 8.9724C0.0787955 8.95358 0.0502717 8.92596 0.0303987 8.89243C0.0105257 8.8589 2.9081e-05 8.82068 0 8.78174V0.43597C0 0.320343 0.0460937 0.209453 0.128141 0.127693C0.210188 0.0459324 0.321468 0 0.4375 0Z");

            svgIcon.appendChild(path);

            // Применяем цвет иконки
            svgIcon.classList.add(selectedColor); // Добавляем класс с цветом

            // Добавляем иконку в кнопки
            newLabelButton.appendChild(svgIcon);

            // Добавляем текст ярлыка в кнопку
            const labelTextElement = document.createElement("span");
            labelTextElement.textContent = labelText;
            newLabelButton.appendChild(labelTextElement);

            // Добавляем обработчик клика на кнопку ярлыка
            newLabelButton.addEventListener("click", function() {
                // Отображаем выбранный ярлык на кнопке
                labelButton.querySelector("span").textContent = labelText;
            });

            // Добавляем новый ярлык в контейнер
            filterCheckbox.appendChild(newLabelButton);

            // Прячем форму
            form.style.display = "none";

            // Очищаем поля формы
            labelInput.value = "";
            colorSelect.value = "blue"; // Сброс по умолчанию
        }
    });

    // Функция для отображения ярлыков из справочника
    function displayLabelsFromDictionary(list_labels, list_docs) {
        const labelsContainer = document.getElementById("labelsContainer");

        // Проходим по документам
        list_docs.forEach(doc => {
            let docLabel = null;

            // Ищем ярлык для текущего документа
            list_labels.forEach(label => {
                if (doc[0] === label[0]) {
                    docLabel = label;
                }
            });

            // Если ярлык найден
            const labelElement = document.createElement("div");
            const svgIcon = document.createElement("span");
            svgIcon.textContent = "♛"; // Иконка шахматного ферзя

            if (docLabel) {
                const color = docLabel[2]; // Цвет ярлыка
                svgIcon.style.color = `#${color}`; // Применяем цвет
            } else {
                svgIcon.style.color = "#D3D3D3"; // Если нет ярлыка, серый
            }

            labelElement.appendChild(svgIcon);

            const labelText = document.createElement("span");
            labelText.textContent = doc[3]; // Название документа
            labelElement.appendChild(labelText);

            labelsContainer.appendChild(labelElement);
        });
    }

    // Пример вызова функции для отображения ярлыков
    const list_labels = JSON.parse('{"1":[1,"1_kmfnkdjlsfhiur83rjJShs738wms","\u0441\u0447\u0435\u0442\u0430 \043d\u0430 \u043e\u043f\u043b\u0430\u0442\u0443","1BE31E"],"4":[4,"4_dsfsdfsdf","\u0410\u043a\u0442\u044b \u0410\u0412\u0420","E18E28"]}');
    const list_docs = JSON.parse('[["1008086_5e71a68861d89c5b57c1aed0fee1c70a",521320,"04.11.2024","Договора поставки.pdf"]]');

    // Вызов функции
    displayLabelsFromDictionary(list_labels, list_docs);
});

// Получаем все кнопки "Переименовать"
document.querySelectorAll('.rename-button').forEach(button => {
    let isRenaming = false; // Флаг для отслеживания состояния кнопки

    button.addEventListener('click', function() {
        if (isRenaming) return; // Если уже идет процесс переименования, выходим

        // Устанавливаем флаг в true, чтобы предотвратить повторные клики
        isRenaming = true;

        // Ищем ближайший элемент с классом "document_parametr_name"
        const documentParametr = this.closest('.my_table_line').querySelector('.document_parametr_name');

        // Получаем h5 и создаем инпут
        const h5 = documentParametr.querySelector('h5');
        const currentText = h5.textContent;

        // Создаем input и кнопки
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.classList.add('rename-input');

        const okButton = document.createElement('button');
        okButton.textContent = 'Ок';
        okButton.classList.add('rename-ok');

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Отмена';
        cancelButton.classList.add('rename-cancel');

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('rename-buttons');
        buttonsDiv.appendChild(okButton);
        buttonsDiv.appendChild(cancelButton);

        // Скрываем h5, показываем input и кнопки
        h5.style.display = 'none';
        documentParametr.appendChild(input);
        documentParametr.appendChild(buttonsDiv);

        // При нажатии "Ок" сохраняем изменения
        okButton.addEventListener('click', function() {
            h5.textContent = input.value; // Сохраняем новый текст в h5
            h5.style.display = 'block'; // Показываем h5
            input.remove(); // Убираем input
            buttonsDiv.remove(); // Убираем кнопки
            isRenaming = false; // Сбрасываем флаг
        });

        // При нажатии "Отмена" отменяем изменения
        cancelButton.addEventListener('click', function() {
            h5.textContent = currentText; // Восстанавливаем старый текст
            h5.style.display = 'block'; // Показываем h5
            input.remove(); // Убираем input
            buttonsDiv.remove(); // Убираем кнопки
            isRenaming = false; // Сбрасываем флаг
        });
    });
});
// Функция для обновления текста на кнопке в зависимости от выбранного чекбокса
function updateFilterText() {
    const checkedCheckbox = document.querySelector('.filter_checkbox input:checked');
    const filterText = document.querySelector('.filter_btn span');

    if (checkedCheckbox) {
        filterText.textContent = checkedCheckbox.nextElementSibling.textContent;
    } else {
        filterText.textContent = 'Фильтр';
    }
}

// Ограничение: можно выбрать только один чекбокс
document.querySelectorAll('.filter_checkbox input').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // Снимаем выбор с других чекбоксов
            document.querySelectorAll('.filter_checkbox input').forEach(otherCheckbox => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                }
            });
        }
        updateFilterText(); // Обновить текст кнопки
    });
});