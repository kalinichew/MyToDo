
function onPageLoaded() {
    const input = document.querySelector("input");
    const divCard = document.querySelector("div.card_container");

    function createTodo() {

        // Карточка
        const div = document.createElement("div");
        const textp = document.createElement("span");
        div.classList.add("card");
        textp.classList.add("card__content");
        const newTodo = input.value;
        textp.append(newTodo);
        //

        //Кнопка удалить
        const btnClose = document.createElement('div');
        btnClose.classList.add("btn_close")
        //

        div.appendChild(btnClose);
        divCard.appendChild(div).append(textp);
        input.value = "";
        listenDeleteTodo(btnClose);
    }

    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            event.stopPropagation();
        });
    }

    document.getElementById('btnInput').onclick = () => {
        createTodo();
    }

    input.addEventListener("keydown", (keyPressed) => {
            if (keyPressed.key == 'Enter') {
                createTodo();
            }
    });
   
}


document.addEventListener("DOMContentLoaded", onPageLoaded);
