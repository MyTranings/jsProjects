const addForm = document.querySelector('#todo-add-from')
const addField = document.querySelector('#todo-add-field')
const todoList = document.querySelector('#todo-list')
const itemTemplate = document.querySelector('#todo-item-template')
const items = [];

// 1. On form sumbit to prepare data

(function initialLoad() {
  const storage = JSON.parse(localStorage.getItem('todoList'))
  if (storage) {
    storage.forEach(item => createNewTodoItem(item))
  }
})()

addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = addField.value;

  if (title.length > 0) {
    items.push(title);
    createNewTodoItem(title);
  }


  addField.value = '';
})

// 2. Prepare the new element and append it

function createNewTodoItem(title) {
  const newItem = itemTemplate.content.cloneNode(true)
  newItem.querySelector('[data-todo-item-text]').textContent = title;

  updateStorage();

  registerItemEvents(newItem.querySelector('.todo-item'));

  todoList.appendChild(newItem);
}

// 3. Save it in the storage

function updateStorage() {
  localStorage.setItem('todoList', JSON.stringify(items));
}

// 4. Prepare the check and delete events

function registerItemEvents(element) {
  const checkbox = element.querySelector('[data-todo-item-checkbox]');
  const deleteButton = element.querySelector('[data-button-delete]');

  checkbox.addEventListener('change', (e) => {
    element.classList.toggle('finished');
  })
  deleteButton.addEventListener('click', deleteTodoItem)
}

function deleteTodoItem(event) {
  const currentItem = event.currentTarget.closest('.todo-item');
  const title = currentItem.querySelector('[data-todo-item-text]').textContent;

  currentItem.remove();

  const index = items.indexOf(title);
  items.splice(index, 1);

  updateStorage();
}