
function onPageLoaded() {
    const input = document.querySelector("input");
    const divCard = document.querySelector("div.card_container");
    

    function createTodo() {

        // Карточка
        const mainCard = document.createElement("div");
        const contentCard = document.createElement("span");
        mainCard.classList.add("card");
        contentCard.classList.add("card__content");
        let inputData = input.value;
        contentCard.append(inputData);

        //Кнопка удалить
        const closeBtn = document.createElement('div');
        closeBtn.classList.add("btn_close")
        mainCard.appendChild(closeBtn);

        //Добавление карточки
        divCard.appendChild(mainCard).append(contentCard);

        //Обнуление поле инпут
        input.value = "";

        //Передача функции слушателя для удаления карточки
        listenDeleteTodo(closeBtn);

        //Слушанье карточки на клик
        function modalLisen(item){
            item.addEventListener("click", modalShow);
        }

        //Запуск функции модального окна
        modalLisen(mainCard);

        function modalShow(){

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
            modalText.cols = 43;
            modalText.rows = 10;


            divCard.appendChild(modalContainer);
            modalContainer.appendChild(modalContent);
            modalContent.appendChild(modalClose);
            modalContent.appendChild(modalText);
            modalContent.appendChild(controlBtn);
            controlBtn.appendChild(modalOk);
            controlBtn.appendChild(modalCancel);

            modalOk.append('Сохранить');
            modalCancel.append('Отмена');

            modalText.value = inputData;

            //Отключение прокручивания основного окна
            let isModalOpen = false;
            let pageYOffset = 0;
            let openModal = function() {
                pageYOffset = window.pageYOffset;
                modalContainer.classList.add('is-open');
                isModalOpen = true;
            }

            //Функция удаления модального окна при закрытии
            let closesModal = function() {
                modalContainer.remove();
                isModalOpen = false;
              }
    
            
              let onScroll = function(item) {
                if (isModalOpen) {
                  item.preventDefault();
                  window.scrollTo(0, pageYOffset);
                }
              }

            //Функция редактирования  
              let editModal = function(){
                contentCard.innerHTML= modalText.value;
                inputData = modalText.value;
                closesModal();
              }

              modalCancel.addEventListener('click', closesModal);
              modalOk.addEventListener('click', editModal);
              modalClose.addEventListener('click', closesModal);
              openModal();
        }



    }

    //Функция удаления карточки
    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            event.stopPropagation();
        });
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
