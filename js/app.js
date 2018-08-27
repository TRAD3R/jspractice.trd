// самовызывающаяся функция + паттерн
const main = (document => {
    const todoForm = document.getElementById('todo-form');
    const addInput = document.getElementById('add-input');
    const todoList = document.getElementById('todo-list');
    const todoItems = document.querySelectorAll('.todo-item');

    /**
     * Добавляем обработчики к уже существующим задачам
     */
    function main() {
        todoForm.addEventListener('submit', addTodoItem);
        todoItems.forEach(item => bindEvents(item));
    } // main

    /**
     * Добавление новой задачи
     * @param event
     */
    function addTodoItem(event) {
        event.preventDefault();

        if (addInput.value === '') {
            return alert("Необходимо ввести название задачи.");
        }

        const listItem = createTodoItem(addInput.value);

        todoList.appendChild(listItem);
        addInput.value = '';
    } // addTodoItem

    /**
     * Создание новой задачи
     * @param title - название задачи
     * @returns {HTMLLIElement}
     */
    function createTodoItem(title) {
        const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox'});
        const label = createElement('label', {className: 'title'}, title);
        const editInput = createElement('input', {type: 'text', className: 'textfield'});
        const editButton = createElement('button', {className: 'edit'}, 'Изменить');
        const deleteButtonton = createElement('button', {className: 'delete'}, 'Удалить');
        const listItem = createElement('li', {className: 'todo-item'}, checkbox, label, editInput, editButton, deleteButtonton);

        // привязываем события
        bindEvents(listItem);

        return listItem;
    } // createTodoItem

    /**
     * Отметка о выполнении задачи
     */
    function toggleTodoItem() {
        const listItem = this.parentNode;

        listItem.classList.toggle('completed');
    }

    /**
     * Редактирование задачи
     */
    function editTodoItem() {
        const listItem = this.parentNode;
        const title = listItem.querySelector('.title');
        const editInput = listItem.querySelector('.textfield');
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            title.innerText = editInput.value;
            this.innerText = 'Изменить';
        } else {
            editInput.value = title.innerText;
            this.innerText = 'Сохранить';
        }

        listItem.classList.toggle('editing');
    }

    /**
     * Удаление задачи
     */
    function deleteTodoItem() {
        const listItem = this.parentNode;
        todoList.removeChild(listItem);
    }

// привязываем события
    function bindEvents(todoItem) {
        const checkbox = todoItem.querySelector('.checkbox');
        const editButton = todoItem.querySelector('button.edit');
        const deleteButton = todoItem.querySelector('button.delete');

        // перехватываем события
        checkbox.addEventListener('change', toggleTodoItem);
        editButton.addEventListener('click', editTodoItem);
        deleteButton.addEventListener('click', deleteTodoItem);
    } // bindEvents

    /**
     * обертка для создания элементов DOM-дерева (паттерн "фасад")
     * @param tag       - тэг элемента String
     * @param props     - свойства элемента Object
     * @param children  - дочерние элементы для элемента String
     */
    function createElement(tag, props, ...children) {
        const el = document.createElement(tag);
        Object.keys(props).forEach(key => el[key] = props[key]);

        // если у элемента есть дети
        if (children.length) {
            // проходим по каждому элементу массива
            children.forEach(child => {
                // если это текстовый элемент, то создаем из него Node элемент
                child = typeof child === 'string' ? document.createTextNode(child) : child;
                el.appendChild(child);
            }) // forEach
        } // if
        return el;
    } // createElement

    return main;
})(document);

main();