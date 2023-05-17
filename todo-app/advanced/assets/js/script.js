const addForm = document.querySelector('#todo-add-from')
const addField = document.querySelector('#todo-add-field')
const todoList = document.querySelector('#todo-list')
const itemTemplate = document.querySelector('#todo-item-template')
const TODO_APP_PREFIX = 'todo_'
const items = {};
const itemsObj = {};

// 1. On form sumbit to prepare data

const storage = JSON.parse(localStorage.getItem(TODO_APP_PREFIX + 'list'))

if (storage && Object.keys(storage).length > 0) {
  for (const [key, value] of Object.entries(storage)) {
    createNewTodoItem(value)
  }
}

addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = addField.value;
  const isChecked = false;

  if (title.length > 0) {
    createNewTodoItem({ title, isChecked });
  }

  addField.value = '';
})

todoList.addEventListener('click', function (e) {
  if (e.target.matches('[data-todo-item-checkbox]')) {
    const title = e.target.nextElementSibling.textContent;
    const curItem = items[prepareTheKey(title)];

    curItem.isChecked = !curItem.isChecked;

    updateStorage();
  }
})

// 2. Prepare the new element and append it

function createNewTodoItem(item) {
  items[prepareTheKey(item.title)] = {
    title: item.title,
    isChecked: item.isChecked
  }
  const newItem = itemTemplate.content.cloneNode(true)
  newItem.querySelector('[data-todo-item-text]').textContent = item.title;
  const checkbox = newItem.querySelector('[data-todo-item-checkbox]');

  checkbox.checked = item.isChecked;
  if (item.isChecked) {
    newItem.querySelector('li').classList.add('finished');
  }
  updateStorage();

  registerItemEvents(newItem.querySelector('.todo-item'));

  todoList.appendChild(newItem);
}

// 3. Save it in the storage

function updateStorage() {
  localStorage.setItem(TODO_APP_PREFIX + 'list', JSON.stringify(items));
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

  delete items[prepareTheKey(title)];

  updateStorage();
}

function prepareTheKey(title) {
  return title.split(' ').join('');
}