const buttons = document.querySelectorAll('.expand-button');
const ACTIVE_CLASS = 'show';
const BUTTON_CLOSED_LABEL = 'Expand';
const BUTTON_OPENED_LABEL = 'Collapse';

buttons.forEach(function (button) {
  button.addEventListener('click', e => {
    const content = e.target.parentElement.nextElementSibling;

    content.classList.toggle(ACTIVE_CLASS);

    if (content.classList.contains(ACTIVE_CLASS)) {
      e.target.textContent = BUTTON_OPENED_LABEL;
    } else {
      e.target.textContent = BUTTON_CLOSED_LABEL;
    }
  })
});