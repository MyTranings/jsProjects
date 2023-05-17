
// Select form
const newTaskForm = document.querySelector('#task-from');

// Add event to the form when it is submited
newTaskForm.addEventListener('submit', function (e) {
  // Prevent default
  e.preventDefault();

  // Select input field
  const newTaskField = document.querySelector('#task-field');

  // Get the value of the input on submit
  let newTaskTitle = newTaskField.value;

  // Check if the field has value
  if (newTaskTitle) {
    // Create new li element
    const newElement = document.createElement('li');

    // Add class to the new li element
    newElement.classList = 'task-item';

    // Add value of the input as text of the new li element
    newElement.textContent = newTaskTitle;

    // Create document fragment because we are adding elements to the fragment and then put only the frament in the DOM
    const fragment = document.createDocumentFragment();

    // Append element to the fragment
    fragment.append(newElement);

    // Select the list element
    const taskList = document.querySelector('#task-list');

    // Append fragment to the list
    taskList.append(fragment);

    // Reset the value of the input
    newTaskField.value = '';

    // Add event to the task item on click to remove the task
    newElement.addEventListener('click', function () {
      // Remove the task from the task list
      taskList.removeChild(newElement);
    })
  }
});