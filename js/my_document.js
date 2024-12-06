const data = [{
        "id": 1,
        "downloadLink": "#",
        "viewLink": "#",
        "documentDate": "20.08.2024",
        "documentNumber": "1293232",
        "documentLabel": "Нет",
        "documentName": "Счет на оплату №637 от 22.08.2024 ТОО “Подпиши Онлайн” - КУНДАКБАЕВ ОЛЖАС ...",
        "signedBy": [
            { "name": "КУНДАКБАЕВА ОЛЖАС БАЛХАШБАЕВИЧ ТОО “Подпиши Онлайн” ИИН 7777777777" },
            { "name": "КУНДАКБАЕВА ОЛЖАС БАЛХАШБАЕВИЧ ТОО “Подпиши Онлайн” ИИН 7777777777" }
        ],
        "signedDetails": {
            "signed": 2,
            "total": 2
        }
    },
    {
        "id": 2,
        "downloadLink": "#",
        "viewLink": "#",
        "documentDate": "15.07.2024",
        "documentNumber": "1293233",
        "documentLabel": "Да",
        "documentName": "Счет на оплату №638 от 22.08.2024 ТОО “Подпиши Онлайн” - КУНДАКБАЕВ ОЛЖАС ...",
        "signedBy": [
            { "name": "ИВАНОВ ИВАН ИВАНОВИЧ ИИН 7777777778" }
        ],
        "signedDetails": {
            "signed": 1,
            "total": 2
        }
    },
    {
        "id": 3,
        "downloadLink": "#",
        "viewLink": "#",
        "documentDate": "15.07.2024",
        "documentNumber": "1293233",
        "documentLabel": "Да",
        "documentName": "Счет на оплату №638 от 22.08.2024 ТОО “Подпиши Онлайн” - КУНДАКБАЕВ ОЛЖАС ...",
        "signedBy": [
            { "name": "ИВАНОВ ИВАН ИВАНОВИЧ ИИН 7777777778" }
        ],
        "signedDetails": {
            "signed": 2,
            "total": 2
        }
    }
];
// Функция для обновления значений в кнопке
function updateButtons(data) {
    // Проходим по всем элементам с классом '.members_info'
    const buttons = document.querySelectorAll('.members_info');

    buttons.forEach((button, index) => {
        const signedSpan = button.querySelector('.signed');
        const totalSpan = button.querySelector('.total');

        // Проверяем, чтобы индекс существовал в данных
        if (data[index] && data[index].signedDetails) {
            signedSpan.textContent = data[index].signedDetails.signed;
            totalSpan.textContent = data[index].signedDetails.total;
        }
    });
}


function updateTable(data) {
    // Проходим по всем строкам таблицы
    const tableLines = document.querySelectorAll('.my_table_line_info');

    tableLines.forEach((line, index) => {
        if (data[index]) {
            const documentDateSpan = line.querySelector('.document_indo_table .left_width span');
            const documentNumberSpan = line.querySelector('.document_indo_table .right_width p span');
            const documentLabelSpan = line.querySelector('.document_indo_table .document_parametr span:nth-child(2)');
            const documentNameH5 = line.querySelector('.document_indo_table .document_parametr_name h5');
            const signedList = line.querySelector('.document_indo_table .document_parametr_podp ul');

            // Обновляем данные
            documentDateSpan.textContent = data[index].documentDate;
            documentNumberSpan.textContent = data[index].documentNumber;
            documentLabelSpan.textContent = data[index].documentLabel;
            documentNameH5.textContent = data[index].documentName;

            // Обновляем список подписавших
            signedList.innerHTML = ''; // Очищаем текущие элементы
            data[index].signedBy.forEach(signer => {
                const li = document.createElement('li');
                const p = document.createElement('p');
                p.textContent = signer.name;
                li.appendChild(p);
                signedList.appendChild(li);
            });
        }
    });
}
// Функция для генерации строки таблицы
function generateTableRow(data) {
    const tableContainer = document.getElementById('tableContainer'); // Контейнер для таблицы

    data.forEach(item => {
                const tableLine = document.createElement('div');
                tableLine.classList.add('my_table_line');

                // Преобразуем список подписантов в строку
                const signedByList = item.signedBy.map(signer => `<p>${signer.name}</p>`).join('');

                tableLine.innerHTML = `
                            <div class="table_flexes">
                                <div class="box_flexes">
                                    <div class="select_input">
                                        <input type="checkbox" id="checkbox${item.id}" data-id="${item.id}">
                                        <label for="">Выбрать</label>
                                    </div>
                                    <div class="table_line_process">
                                        <a href="">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.375 2.625V11.0128L14.4375 7.95025L15.6747 9.1875L10.5 14.3622L5.32525 9.1875L6.5625 7.95025L9.625 11.0128V2.625H11.375ZM3.9375 12.25V16.625H17.0625V12.25H18.8125V18.375H2.1875V12.25H3.9375Z" fill="#4F4F4F"/>
                                                </svg> Скачать
                                        </a>
                                        <a href=""><svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.9546 11.5059C18.208 11.9496 18.3346 12.1725 18.3346 12.5007C18.3346 12.8298 18.208 13.0517 17.9546 13.4954C16.8163 15.4913 13.9088 19.7923 10.0013 19.7923C6.09297 19.7923 3.1863 15.4902 2.04797 13.4954C1.79464 13.0517 1.66797 12.8288 1.66797 12.5007C1.66797 12.1715 1.79464 11.9496 2.04797 11.5059C3.1863 9.51003 6.0938 5.20898 10.0013 5.20898C13.9096 5.20898 16.8163 9.51107 17.9546 11.5059Z" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M12.5 12.5C12.5 11.6712 12.2366 10.8763 11.7678 10.2903C11.2989 9.70424 10.663 9.375 10 9.375C9.33696 9.375 8.70107 9.70424 8.23223 10.2903C7.76339 10.8763 7.5 11.6712 7.5 12.5C7.5 13.3288 7.76339 14.1237 8.23223 14.7097C8.70107 15.2958 9.33696 15.625 10 15.625C10.663 15.625 11.2989 15.2958 11.7678 14.7097C12.2366 14.1237 12.5 13.3288 12.5 12.5Z" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            Посмотреть
                                            </a>
                                        <button class="rename-button">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.5 2.625H3.375C2.91087 2.625 2.46575 2.80937 2.13756 3.13756C1.80937 3.46575 1.625 3.91087 1.625 4.375V16.625C1.625 17.0891 1.80937 17.5342 2.13756 17.8624C2.46575 18.1906 2.91087 18.375 3.375 18.375H15.625C16.0891 18.375 16.5342 18.1906 16.8624 17.8624C17.1906 17.5342 17.375 17.0891 17.375 16.625V10.5" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M15.0777 2.29756C15.4258 1.94946 15.8979 1.75391 16.3902 1.75391C16.8825 1.75391 17.3546 1.94946 17.7027 2.29756C18.0508 2.64566 18.2464 3.11778 18.2464 3.61006C18.2464 4.10234 18.0508 4.57446 17.7027 4.92256L9.81634 12.8098C9.60857 13.0174 9.3519 13.1694 9.06997 13.2517L6.55609 13.9867C6.4808 14.0086 6.40099 14.01 6.32501 13.9905C6.24904 13.971 6.17969 13.9315 6.12423 13.876C6.06878 13.8206 6.02925 13.7512 6.00978 13.6753C5.99032 13.5993 5.99163 13.5195 6.01359 13.4442L6.74859 10.9303C6.8313 10.6486 6.98356 10.3922 7.19134 10.1848L15.0777 2.29756Z" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                Переименовать
                                            </button>
                                    </div>
                                    <button class="members_info open-modal" data-target="modal1">
                                        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1_2425)">
                                                <path id="path1" d="M8.71307 16.7228C10.8965 16.7099 12.7871 14.7261 12.772 12.1787C12.7571 9.65534 10.8318 7.79982 8.66043 7.81265C6.47762 7.82555 4.56324 9.7506 4.59001 12.2511C4.60492 14.7744 6.51826 16.7357 8.71365 16.7228M2.2261 27.3613L11.1471 27.3086C9.91606 25.5433 11.3858 21.9659 13.8983 20.0025C12.5903 19.1416 10.9071 18.5058 8.71226 18.5188C3.41806 18.5495 0.130922 22.4776 0.150134 25.7295C0.156379 26.7866 0.746693 27.37 2.2261 27.3613Z" fill="#FF0E0E"/>
                                                <path id="path2" d="M23.8769 9.64438C23.0463 8.75823 21.8907 8.27435 20.6184 8.28187C19.3393 8.28943 18.1857 8.78397 17.3694 9.67435C16.5443 10.5745 16.1469 11.7937 16.2497 13.107C16.4533 15.6979 18.4382 17.7949 20.6745 17.7817C22.9108 17.7685 24.8674 15.6487 25.0434 13.0559C25.132 11.7533 24.7177 10.5415 23.8769 9.64438ZM28.1948 27.2374L13.2665 27.3256C13.0711 27.3293 12.8774 27.2894 12.6993 27.2088C12.5213 27.1282 12.3635 27.0089 12.2374 26.8597C11.9598 26.5318 11.846 26.0825 11.9256 25.6269C12.2718 23.6392 13.379 21.9646 15.1279 20.7833C16.6816 19.7346 18.6541 19.1508 20.6825 19.1388C22.711 19.1268 24.6903 19.6877 26.2562 20.7175C28.0189 21.8777 29.1459 23.5391 29.5155 25.5226C29.6005 25.9772 29.492 26.4278 29.2183 26.7589C29.094 26.9098 28.9376 27.031 28.7606 27.1137C28.5835 27.1965 28.3902 27.2388 28.1948 27.2374Z" fill="#FF0E0E"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1_2425">
                                                    <rect width="32" height="32" fill="white" transform="translate(0 0.189453) rotate(-0.338488)"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span class="col_vo"><span class="signed"></span>/<span class="total"></span></span>
                                    </button>
                                </div>
                                <div class="my_table_line_info">
                                    <div class="document_indo_table">
                                        <div class="left_width">
                                            <span>${item.documentDate}</span>
                                        </div>
                                        <div class="right_width">
                                            <p>Номер: <span>${item.documentNumber}</span></p>
                                            <div class="document_parametr">
                                                <span>Ярлык</span>
                                                <span>${item.documentLabel}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="document_indo_table">
                                        <div class="left_width">
                                            <span>Документ:</span>
                                        </div>
                                        <div class="right_width">
                                            <div class="document_parametr_name">
                                                <h5>${item.documentName}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="document_indo_table">
                                        <div class="left_width">
                                            <span>Подписан: </span>
                                        </div>
                                        <div class="right_width">
                                            <div class="document_parametr_podp">
                                                <ul>
                                                    ${item.signedBy.map(signer => `
                                                        <li>
                                                            <p>${signer.name}</p>
                                                        </li>
                                                    `).join('')}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
`;
tableContainer.appendChild(tableLine);
    
});


}


generateTableRow(data);
updateButtons(data);
updateTable(data);




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