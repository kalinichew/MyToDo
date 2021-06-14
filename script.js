
function onPageLoaded() {
    const input = document.querySelector("input");
    const divCard = document.querySelector("div.card_container");
    
    function createTodo() {
        
        // Карточка
        const mainCard = document.createElement("div");
        const contentCard = document.createElement("span");
        const btnContainer = document.createElement("div");
        const btnEdit = document.createElement("a");
        const checkBox = document.createElement('input');

        
        btnContainer.classList.add("btn_Container");
        mainCard.classList.add("card");
        contentCard.classList.add("card__content");
        btnEdit.classList.add("btn_edit");
        checkBox.classList.add("check")
        checkBox.type = "checkbox";
        checkBox.checked;


        btnEdit.append('Редактировать');
        let inputData = input.value;
        contentCard.append(inputData);

        //Кнопка удалить
        const closeBtn = document.createElement('div');
        closeBtn.classList.add("btn_close")

        
        btnContainer.appendChild(checkBox);
        mainCard.appendChild(btnContainer);
        mainCard.appendChild(btnEdit);
        btnContainer.appendChild(closeBtn);
        

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

        //Слушанье крестика на закрытие
        function listenDeleteTodo(element) {
            element.addEventListener("click", (event) => {
                mainCard.remove();
                event.stopPropagation();
            });
        }

        modalLisen(btnEdit)
        //Запуск функции модального окна


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
