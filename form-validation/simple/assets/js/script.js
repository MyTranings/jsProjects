const form = document.getElementById('form');
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const passwordConfirmation = document.querySelector('#password-confirmation')
const terms = document.querySelector('#terms')
const errorsList = document.querySelector('.errors-list');

form.addEventListener('submit', e => {
  const errorsMessages = [];

  clearErrors()

  if (username.value.length < 6) {
    errorsMessages.push('Username must be at least 6 characters long')
  }

  if (password.value.length < 10) {
    errorsMessages.push('Password must be at least 10 characters long')
  }

  if (passwordConfirmation.value !== password.value) {
    errorsMessages.push('Passwords are not matching')
  }

  if (!terms.checked) {
    errorsMessages.push('You must accept the terms')
  }

  if (errorsMessages.length > 0) {
    e.preventDefault()
    showErrors(errorsMessages)
  }
})

function showErrors(errorsMessages) {
  const errorsElement = document.querySelector('.errors');

  errorsElement.classList.add('show');

  errorsMessages.forEach(error => {
    const li = document.createElement('li')
    li.innerText = error
    errorsList.appendChild(li);
  })
}

function clearErrors() {
  while (errorsList.children[0] != null) {
    errorsList.removeChild(errorsList.children[0])
  }
}