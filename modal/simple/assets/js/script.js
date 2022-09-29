const modalTrigger = document.querySelector('#modal-trigger')
const modalOverlay = document.querySelector('#modal-overlay')
const modal = document.querySelector('#modal')
const modalClose = document.querySelector('#modal')
const openedClass = 'open';

modalTrigger.addEventListener('click', () => {
  modalOverlay.classList.add(openedClass);
  modal.classList.add(openedClass);
})

modalOverlay.addEventListener('click', closeModal)

modalClose.addEventListener('click', closeModal)

function closeModal() {
  if (modal.classList.contains(openedClass)) {
    modal.classList.remove(openedClass)
    modalOverlay.classList.remove(openedClass)
  }
}