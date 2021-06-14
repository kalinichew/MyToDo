
function onPageLoaded() {
    const input = document.querySelector("input");
    const divCard = document.querySelector("div.card_container");

    function createTodo() {

        // Карточка
        const mainCard = document.createElement("div");
        mainCard.classList.add("card");

        //Контейнер для кнопки закрыть карточку и чек бокса
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn_Container");

        //Кнопка редактировать карточку
        const btnEdit = document.createElement("a");
        btnEdit.classList.add("btn_edit");
        btnEdit.append('Редактировать');

        //Чекбокс
        const checkBox = document.createElement('input');
        checkBox.classList.add("check")
        checkBox.type = "checkbox";
        checkBox.checked;

        //Кнопка удалить
        const closeBtn = document.createElement('div');
        closeBtn.classList.add("btn_close")

        //Создание области для записи и считываение из инпута
        const contentCard = document.createElement("span");
        contentCard.classList.add("card__content");
        let inputData = input.value;
        contentCard.append(inputData);

        //Обнуление поле инпут
        input.value = "";

        //Цепочка добавления чекбокса, кнопки редактировать и закрыть карточку
        btnContainer.appendChild(checkBox);
        mainCard.appendChild(btnContainer);
        mainCard.appendChild(btnEdit);
        btnContainer.appendChild(closeBtn);


        //Добавление карточки
        divCard.appendChild(mainCard).append(contentCard);

        //Слушанье кнопки редактировать на клик
        function modalLisen(item) {
            item.addEventListener("click", modalShow);
        }

        //Слушанье крестика на закрытие
        function listenDeleteTodo(element) {
            element.addEventListener("click", () => {
                mainCard.remove();
            });
        }

        //Запуск функции модального окна
        modalLisen(btnEdit)

        //Передача функции слушателя для удаления карточки
        listenDeleteTodo(closeBtn);

        function modalShow() {

            let modalContainer = document.createElement('div'),
                modalClose = document.createElement('div'),
                modalContent = document.createElement('div'),
                modalText = document.createElement('textarea'),
                modalOk = document.createElement('div'),
                modalCancel = document.createElement('div'),
                controlBtn = document.createElement('div');

            modalContainer.classList.add('modal-container');
            modalClose.classList.add('close');
            modalContent.classList.add('modal-content');
            controlBtn.classList.add('controlBtn')
            modalOk.classList.add('save');
            modalCancel.classList.add('cancel');
            modalText.classList.add('textinput');
            modalText.name = 'text';
            modalText.cols = 35;
            modalText.rows = 5;


            divCard.appendChild(modalContainer);
            modalContainer.appendChild(modalContent);
            modalContent.appendChild(modalClose);
            modalContent.appendChild(modalText);
            modalContent.appendChild(controlBtn);
            controlBtn.appendChild(modalOk);
            controlBtn.appendChild(modalCancel);

            modalOk.append('Сохранить');
            modalCancel.append('Отмена');

            //Получает значение из карточки
            modalText.value = inputData;

            //Переменная pageYOffset запоминает на сколько вниз опустился скролл
            let isModalOpen = false;
            let pageYOffset = 0;
            let openModal = function () {
                pageYOffset = window.pageYOffset;
                modalContainer.classList.add('is-open');
                isModalOpen = true;
            }

            //Функция удаления модального окна при закрытии
            let closesModal = function () {
                modalContainer.remove();
                isModalOpen = false;
            }

            //Функция слушает скролл при запущенном модальном окне, если он проиходит то в 
            //скроллТо передаются четкое значение по осиY которое запоминалось ранее
            let onScroll = function () {
                if (isModalOpen) {
                    window.scrollTo(0, pageYOffset);
                }
            }
            document.addEventListener('scroll', onScroll);

            //Функция редактирования  (передаем в карточку новое значение)
            let editModal = function () {
                contentCard.innerHTML = modalText.value;
                inputData = modalText.value;
                closesModal();
            }

            modalCancel.addEventListener('click', closesModal);
            modalOk.addEventListener('click', editModal);
            modalClose.addEventListener('click', closesModal);

            //Запуск функции всегда для запоминания значений скролла по Y
            openModal();

        }
    }

    //Создание карточки
    document.getElementById('btnInput').onclick = () => {
        createTodo();
    }

    //Слушатель на создание карточки через enter
    input.addEventListener("keydown", (keyPressed) => {
        if (keyPressed.key == 'Enter') {
            createTodo();
        }
    });

}


document.addEventListener("DOMContentLoaded", onPageLoaded);
