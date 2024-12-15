// Функция для декодирования Base64 в JSON
function decodeBase64ToJson(base64Str) {
    try {
        const jsonString = atob(base64Str); // Преобразуем base64 в строку
        const jsonData = JSON.parse(jsonString); // Преобразуем строку в объект JSON
        console.log(jsonData); // Логируем результат для проверки
        return jsonData;
    } catch (error) {
        console.error("Ошибка декодирования Base64:", error);
        return null; // Возвращаем null при ошибке
    }
}


// Функция для обработки справочника ярлыков
function parseLabels(base64Labels) {
    const labels = decodeBase64ToJson(base64Labels); // Декодируем Base64 строку
    if (!labels) return {}; // Если произошла ошибка, возвращаем пустой объект

    const labelMap = {};
    Object.values(labels).forEach(([id, hash, name, color]) => {
        labelMap[id] = { hash, name, color }; // Формируем объект с данными ярлыков
    });
    return labelMap;
}

// Функция для отображения ярлыков в контейнере
function displayLabels(labelMap) {
    const filterCheckbox = document.getElementById('filterCheckbox'); // Контейнер для ярлыков
    filterCheckbox.innerHTML = ''; // Очищаем содержимое перед вставкой новых данных

    Object.values(labelMap).forEach(label => {
        const labelElement = document.createElement('div');
        labelElement.className = 'label-item'; // Класс для стилей
        labelElement.textContent = label.name; // Название ярлыка
        labelElement.style.backgroundColor = `#${label.color}`; // Цвет ярлыка
        labelElement.dataset.labelhash = label.hash; // Добавляем хэш ярлыка как data-атрибут
        filterCheckbox.appendChild(labelElement); // Вставляем ярлык в контейнер
    });
}

// Пример вызова
document.addEventListener('DOMContentLoaded', () => {
    
    const labelMap = parseLabels(base64Labels);

    // Отобразить ярлыки, если данные были успешно загружены
    if (Object.keys(labelMap).length > 0) {
        displayLabels(labelMap);
    } else {
        console.error('Справочник ярлыков пуст или произошла ошибка');
    }
});

// Функция для загрузки и обработки данных документов
function loadDataFromBase64(base64Str, base64Labels) {
    try {
        const data = decodeBase64ToJson(base64Str); // Декодируем данные документов
        const labelMap = parseLabels(base64Labels); // Декодируем справочник ярлыков

        if (Array.isArray(data)) {
            // Обрабатываем каждый документ
            const formattedData = data.map(doc => {
                const [pp1, num, crtime, docname, signs, type_work, issigned, totalsign, totalsigned, labelid] = doc;

                // Обработка ярлыков
                const label = labelMap[labelid] ?
                    `<span style="color: #${labelMap[labelid].color}">&#9819; ${labelMap[labelid].name}</span>` :
                    `<span style="color: #C0C0C0">&#9819; Нет ярлыка</span>`;

                // Генерация ссылок
                const link_dl_full = `${to_request}?move=35&printme=1&zipme=1&pp1=${pp1}`; // Ссылка для скачивания полной версии
                const link_view = `${to_request_qr}?pp1=${pp1}`; // Ссылка для просмотра документа
                const link_view_simple = `${to_request}?move=35&pp1=${pp1}`;

                return {
                    hash: pp1,
                    documentNumber: num,
                    documentDate: crtime,
                    documentName: docname,
                    documentLabel: label,
                    totalsigned,
                    totalsign,
                    signedBy: signs.map(signer => ({ name: signer })),
                    downloadLink: link_dl_full,
                    viewLink: link_view,
                    simpleViewLink: link_view_simple,
                };
            });

            // Генерация строк таблицы
            generateTableRow(formattedData);
        } else {
            console.error("Данные не массив");
        }
    } catch (error) {
        console.error("Ошибка обработки данных:", error);
    }
}









// Функция для обновления значений в кнопке
function updateButtons(data) {
    const buttons = document.querySelectorAll('.members_info');

    buttons.forEach((button, index) => {
        const signedSpan = button.querySelector('.signed');
        const totalSpan = button.querySelector('.total');

        if (data[index] && data[index].signedDetails) {
            signedSpan.textContent = data[index].signedDetails.signed;
            totalSpan.textContent = data[index].signedDetails.total;
        }
    });
}



// Функция для обновления данных в таблице
function updateTable(data) {
    const tableLines = document.querySelectorAll('.my_table_line_info');

    tableLines.forEach((line, index) => {
        if (data[index]) {
            const documentDateSpan = line.querySelector('.document_indo_table .left_width span');
            const documentNumberSpan = line.querySelector('.document_indo_table .right_width p span');
            const documentLabelSpan = line.querySelector('.document_indo_table .document_parametr span:nth-child(2)');
            const documentNameH5 = line.querySelector('.document_indo_table .document_parametr_name h5');
            const signedList = line.querySelector('.document_indo_table .document_parametr_podp ul');

            documentDateSpan.textContent = data[index].documentDate;
            documentNumberSpan.textContent = data[index].documentNumber;
            documentLabelSpan.textContent = data[index].documentLabel;
            documentNameH5.textContent = data[index].documentName;

            signedList.innerHTML = '';
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




// Функция для генерации строк таблицы
function generateTableRow(data) {
    const tableContainer = document.getElementById('tableContainer');

    // Пройдем по каждому элементу в data и создадим строку
    data.forEach(item => {
                const tableLine = document.createElement('div');
                tableLine.classList.add('my_table_line');

                // Проверяем, есть ли ярлык, если нет, ставим серый ферзь
                const labelIcon = item.documentLabel ?
                    `<span class="queen-symbol" style="color: #${item.documentLabel.color};">♛</span>` :
                    `<span class="queen-symbol" style="color: gray;">♛</span>`;

                tableLine.innerHTML = `

<div class="modal_my" id="modal${item.documentNumber}">
        <div class="popup_time_error">
            <a class="close_popup_time_error" href=""><img src="../img/oui_cross.svg" alt=""></a>
            <h3>Просмотр подписей</h3>
            <p>Здесь показана информация о подписях</p>

               <iframe id="iframe-${item.documentNumber}" src="?move=35&pp1=${item.simpleViewLink}" frameborder="0" width="100%" height="400"></iframe>
        </div>
    </div>



                 <div class="table_flexes">
                                <div class="box_flexes">
                                    <div class="select_input">
                                        <input type="checkbox" id="${item.hash}" data-id="${item.id}" name='forsign[]' value="${item.hash}">
                                        <label for="ID-${item.hash}">Выбрать</label>
                                    </div>
                                    <div class="table_line_process">
                                        <a href="${item.downloadLink}"  target="_blank">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.375 2.625V11.0128L14.4375 7.95025L15.6747 9.1875L10.5 14.3622L5.32525 9.1875L6.5625 7.95025L9.625 11.0128V2.625H11.375ZM3.9375 12.25V16.625H17.0625V12.25H18.8125V18.375H2.1875V12.25H3.9375Z" fill="#4F4F4F"/>
                                                </svg> Скачать
                                        </a>
                                        <a href="${item.viewLink}"  target="_blank" ><svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                    <button class="members_info open-modal" data-target="modal${item.documentNumber}">
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
                                        <span class="col_vo"><span class="signed">${item.totalsigned}</span>/<span class="total">${item.totalsign}</span></span>
                                    </button>
                                </div>
                                
                                  </div>
                                <div class="my_table_line_info">
                                    <div class="document_indo_table">
                                        <div class="left_width">
                                            <span>${item.documentDate}</span>
                                        </div>
                                        <div class="right_width">
                                            <p>Номер: <span>${item.documentNumber}</span></p>
                                            <div class="document_parametr">
                                              
                                                
                                                <span>    ${item.documentLabel}</span>
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
                               
                                
`;
tableContainer.appendChild(tableLine);
});

updateIcons();

}
document.addEventListener('DOMContentLoaded', () => {
    // Проходим по всем элементам документа
    document.querySelectorAll('.document_parametr').forEach(item => {
        const label = item.querySelector('span:nth-child(2)');
        const queenSymbol = item.querySelector('.queen-symbol');
        
        if (!label.textContent) {
            // Если ярлык отсутствует, показываем символ ферзя
            queenSymbol.style.display = 'inline';
        } else {
            // Если ярлык есть, скрываем символ ферзя
            queenSymbol.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Ожидание загрузки страницы и данных
    checkAndUpdateIcons();
    loadDataFromBase64(base64Data, base64Datalabels); // Загрузка данных
});

function checkAndUpdateIcons() {
    // Используем MutationObserver, чтобы отслеживать изменения DOM
    const observer = new MutationObserver(() => {
        updateIcons(); // Обновляем иконки при изменении DOM
    });

    const container = document.body; // Контейнер, за которым будем следить
    observer.observe(container, { childList: true, subtree: true }); // Следим за изменениями элементов

    // Первоначальный вызов функции
    updateIcons();
}

// Функция для обновления цветов SVG на основе подписей
function updateIcons() {
    const icons = document.querySelectorAll('.members_info'); 

    icons.forEach(icon => {
        const signedElement = icon.querySelector('.signed');
        const totalElement = icon.querySelector('.total');

        // Проверяем наличие элементов
        if (!signedElement || !totalElement) {
            console.warn('Элементы .signed или .total не найдены:', icon);
            return;
        }

        // Получаем значения подписей
        const signed = parseInt(signedElement.textContent.trim()) || 0;
        const total = parseInt(totalElement.textContent.trim()) || 0;

        // Проверяем наличие путей SVG
        const paths = icon.querySelectorAll('path');
        if (paths.length < 2) {
            console.warn('Недостаточно путей (path) в иконке:', icon);
            return;
        }

        // Логика изменения цвета
        if (signed === 0) {
            paths[0].setAttribute('fill', '#FF0E0E'); // Первый путь красный
            paths[1].setAttribute('fill', '#FF0E0E'); // Второй путь красный
        } else if (signed > 0 && signed < total) {
            paths[0].setAttribute('fill', '#439E23'); // Первый путь зелёный
            paths[1].setAttribute('fill', '#FF0E0E'); // Второй путь красный
        } else if (signed === total) {
            paths[0].setAttribute('fill', '#439E23'); // Первый путь зелёный
            paths[1].setAttribute('fill', '#439E23'); // Второй путь зелёный
        }
    });
}





// ОТКРЫТИЕ ФИЛЬТРОВ И ЯРЛЫКОВ
// ОТКРЫТИЕ ФИЛЬТРОВ И ЯРЛЫКОВ
document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.querySelector('.filter_btn');
    const labelsBtn = document.querySelector('.labels_btn');
    const filterDoc = document.querySelector('.filter_doc');
    const labelsCheckbox = document.querySelector('.labels_checkbox');
    const labelsInputContent = document.querySelector('.labels_input_content');
    const selectBtn = labelsCheckbox.querySelector('button');
    const noBtn = document.querySelector('.no_btn');
    const addLabelBtn = document.getElementById('addLabel');
    const labelInput = document.getElementById('labelInput');
    const colorSelect = document.getElementById('colorSelect');
    const filterCheckbox = document.getElementById('filterCheckbox');

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

    // Закрытие формы labelsCheckbox при клике на фон
    document.addEventListener('click', (event) => {
        if (!labelsCheckbox.contains(event.target) && !labelsBtn.contains(event.target)) {
            labelsCheckbox.style.display = 'none';
            labelsBtn.classList.remove('active');
        }
    });

    // Добавление нового ярлыка
    addLabelBtn.addEventListener('click', () => {
        const labelName = labelInput.value.trim();
        const labelColor = colorSelect.value;

        // Отправка нового ярлыка на сервер
        if (labelName !== '') {
            const data = new URLSearchParams();
            data.append('move', '2556');
            data.append('step', '2');
            data.append('newlabel', labelName);
            data.append('color', labelColor);

            fetch('/your-endpoint', {  // Поменяй на реальный путь API или обработчик
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: data
            })
            .then(response => response.json())
            .then(data => {
                if (data.err === 0) {
                    // Обновляем справочник ярлыков, добавляем новый элемент
                    const newLabel = document.createElement('div');
                    newLabel.className = 'label-item';
                    newLabel.textContent = labelName;
                    newLabel.style.backgroundColor = labelColor;
                    newLabel.dataset.labelhash = data.labelhash; // Добавляем хэш ярлыка

                    // Добавление ярлыка в список
                    filterCheckbox.appendChild(newLabel);

                    // Сброс формы
                    labelInput.value = '';
                    colorSelect.value = 'blue';

                    // Закрытие формы
                    labelsInputContent.style.display = 'none';
                } else {
                    alert('Ошибка при добавлении ярлыка');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при добавлении ярлыка');
            });
        }
    });

    // Назначение ярлыка документу
    function assignLabelToDocument(labelHash, docHash) {
        const data = new URLSearchParams();
        data.append('move', '2556');
        data.append('step', '1');
        data.append('label', labelHash);
        data.append('pp1', docHash);

        fetch('/your-endpoint', {  // Поменяй на реальный путь API или обработчик
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            if (data.err === 0) {
                // Если все прошло успешно, обновляем документ
                alert(`Ярлык назначен. Новый номер ярлыка: ${data.newlabel}`);
            } else {
                alert('Ошибка при назначении ярлыка');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при назначении ярлыка');
        });
    }

    // Добавление события для назначения ярлыка документу (пример)
    filterCheckbox.addEventListener('click', (event) => {
        const label = event.target;
        if (label.classList.contains('label-item')) {
            const labelHash = label.dataset.labelhash;
            const docHash = 'example_doc_hash'; // Заменить на реальный хэш документа

            assignLabelToDocument(labelHash, docHash);
        }
    });

});




// ЧЕКБОКСЫ И АКТИВНЫЕ КНОПКИ
document.addEventListener('DOMContentLoaded', () => {
    // Функция для обновления состояния кнопок
    function updateButtonsState() {
        const masterCheckbox = document.querySelector('.my_table_top .select_input input[type="checkbox"]');
        const rowCheckboxes = document.querySelectorAll('.my_table_content .select_input input[type="checkbox"]');
        const buttons = document.querySelectorAll('.my_table_top_flex button');
        const tableLines = document.querySelectorAll('.my_table_content .my_table_line');

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
    document.body.addEventListener('change', function(event) {
        // Проверяем, если клик был по главному чекбоксу
        if (event.target.matches('.my_table_top .select_input input[type="checkbox"]')) {
            const masterCheckbox = event.target;
            const rowCheckboxes = document.querySelectorAll('.my_table_content .select_input input[type="checkbox"]');
            const isChecked = masterCheckbox.checked; // Проверяем, активен ли главный чекбокс

            // Перебираем все чекбоксы в строках и устанавливаем их значение, как у главного
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });

            // Обновляем состояние кнопок после изменения главного чекбокса
            updateButtonsState();
        }
    });

    // Добавляем обработчик событий для каждого чекбокса в строках
    document.body.addEventListener('change', function(event) {
        if (event.target.matches('.my_table_content .select_input input[type="checkbox"]')) {
            updateButtonsState();
        }
    });

    // Начальная проверка при загрузке страницы
    updateButtonsState();

    // Наблюдатель для динамически добавленных элементов
    const observer = new MutationObserver(() => {
        updateButtonsState();
    });

    // Настроим наблюдатель на изменения в body (или другом родительском элементе)
    observer.observe(document.body, {
        childList: true,       // Отслеживаем добавление и удаление элементов
        subtree: true          // Отслеживаем все дочерние элементы
    });
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
document.addEventListener('DOMContentLoaded', () => {
    function attachRenameHandlers(event) {
        if (event.target && event.target.classList.contains('rename-button')) {
            const button = event.target;
            const tableLine = button.closest('.my_table_line');

            if (tableLine && tableLine.dataset.renaming === 'true') return; // Проверка на флаг

            tableLine.dataset.renaming = 'true'; // Устанавливаем флаг для текущей строки

            const documentParametr = tableLine.querySelector('.document_parametr_name');
            if (!documentParametr) return;

            const h5 = documentParametr.querySelector('h5');
            if (!h5) return;

            const currentText = h5.textContent.trim();
            const pp1 = tableLine.dataset.hash; // Хэш документа из атрибута data-hash
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

            h5.style.display = 'none';
            documentParametr.appendChild(input);
            documentParametr.appendChild(buttonsDiv);

            // Обработчик кнопки "Ок"
            okButton.addEventListener('click', async function () {
                const newName = input.value.trim();
                if (newName && newName !== currentText) {
                    try {
                        const response = await fetch('/your-server-endpoint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `move=46&pp1=${encodeURIComponent(pp1)}&new=${encodeURIComponent(newName)}`,
                        });

                        const result = await response.text();
                        if (result === '1') {
                            h5.textContent = newName; // Обновление имени документа
                            updateDocumentInArray(pp1, newName); // Функция для обновления в массиве
                        } else {
                            alert('Ошибка сохранения нового имени!');
                        }
                    } catch (error) {
                        console.error('Ошибка запроса:', error);
                        alert('Ошибка при подключении к серверу!');
                    }
                }

                h5.style.display = 'block';
                input.remove();
                buttonsDiv.remove();
                tableLine.dataset.renaming = 'false'; // Сбрасываем флаг
            });

            // Обработчик кнопки "Отмена"
            cancelButton.addEventListener('click', function () {
                h5.style.display = 'block';
                input.remove();
                buttonsDiv.remove();
                tableLine.dataset.renaming = 'false'; // Сбрасываем флаг
            });
        }
    }

    // Функция обновления имени в массиве
    function updateDocumentInArray(pp1, newName) {
        const document = formattedData.find(doc => doc.id === pp1);
        if (document) {
            document.documentName = newName;
        }
    }

    document.body.addEventListener('click', attachRenameHandlers);
});

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
        const tableContainer = document.getElementById('tableContainer');

        // Обработчик кликов на элементы внутри tableContainer
        tableContainer.addEventListener('click', function(event) {
            // Проверка, был ли клик по кнопке с классом open-modal
            if (event.target.closest('.open-modal')) {
                event.preventDefault(); // предотвращаем действие по умолчанию

                const targetModalId = event.target.closest('.open-modal').getAttribute('data-target'); // получаем ID целевого модального окна
                const targetModal = document.getElementById(targetModalId);

                // Показываем модальное окно
                if (targetModal) {
                    targetModal.style.display = 'flex'; // Отображаем модальное окно
                    document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
                }
            }
        });

        // Закрытие модального окна
        document.body.addEventListener('click', function(event) {
            // Закрытие модального окна при клике на крестик
            if (event.target.matches('.close_popup_time_error')) {
                event.preventDefault();
                const modal = event.target.closest('.modal_my');
                if (modal) {
                    modal.style.display = 'none'; // Скрываем модальное окно
                    document.body.style.overflow = ''; // Восстанавливаем прокрутку страницы
                }
            }

            // Закрытие модального окна при клике на фон
            if (event.target.matches('.modal_my')) {
                event.target.style.display = 'none'; // Скрываем модальное окно
                document.body.style.overflow = ''; // Восстанавливаем прокрутку страницы
            }
        });
    });
});