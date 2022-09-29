const form = document.getElementById('form');
const fields = Array.from(form.querySelectorAll('input'))
const formRules = {
  username: {
    min: 6,
    isValid: false,
    message: (num) => `Username must be at least ${num} characters long`
  },
  password: {
    min: 10,
    isValid: false,
    message: (num) => `Password must be at least ${num} characters long`
  },
  'password-confirmation': {
    isValid: false,
    message: 'Passwords are not matching'
  },
  terms: {
    isValid: false,
    message: 'You must accept the terms'
  }
}

form.addEventListener('submit', e => {
  formRules.isValid = [];
  formRules.errors = [];
  let pass = '';

  fields.forEach((field) => {
    const val = field.value;
    const currentField = formRules[field.name];

    switch (field.name) {
      case 'username':
        if (val.length < currentField.min) {
          prepareError(currentField.message(currentField.min))
          formRules.isValid.push(false);
        } else {
          formRules.isValid.push(true);
        }
        break;
      case 'password':
        console.log(val.length === 0 && val.length < currentField.min)
        if (val.length === 0 || val.length < currentField.min) {
          prepareError(currentField.message(currentField.min))
          formRules.isValid.push(false);
        } else {
          pass = val;
          formRules.isValid.push(true);
        }
        break;
      case 'password-confirmation':
        if (pass.length > 0) {
          if ((val.length === 0 || val !== pass)) {
            prepareError(currentField.message)
            formRules.isValid.push(false);
          } else {
            formRules.isValid.push(true);
          }
        }
        break;
      case 'terms':
        if (!field.checked) {
          prepareError(currentField.message)
          formRules.isValid.push(false);
        } else {
          formRules.isValid.push(true);
        }
        break;
    }
  })

  if (!formRules.isValid.every(item => item === true)) {
    e.preventDefault();
    showErrors();
  } else {
  }
})

function prepareError(message) {
  const errorItem = document.createElement('li');

  errorItem.textContent = message
  formRules.errors.push(errorItem)
}

function showErrors() {
  const errorsList = document.querySelector('.errors-list')
  const fragement = document.createDocumentFragment();

  errorsList.style('display', 'block');
  errorsList.textContent = '';

  formRules.errors.forEach(error => {
    fragement.appendChild(error);
  })

  errorsList.appendChild(fragement)
}