const quizForm = document.querySelector('#quiz-form')

quizForm.addEventListener('submit', e => {
  e.preventDefault();
  const questions = e.target.querySelectorAll('.question-item');
  const classCorrect = 'correct'
  const classIncorrect = 'incorrect'

  questions.forEach(q => {
    const answer = q.querySelector('.answer:checked');

    if (answer != null && answer.getAttribute('value') === 'true') {
      q.classList.remove(classIncorrect)
      q.classList.add(classCorrect)
    } else {
      q.classList.remove(classCorrect)
      q.classList.add(classIncorrect)
    }

    if (e.target.querySelectorAll('.' + classCorrect).length === questions.length) {
      openCongratulations();
    }
  })
})

function openCongratulations() {
  const modal = document.querySelector('#alert')
  modal.classList.add('active')

  setTimeout(function () {
    modal.classList.remove('active')
  }, 1000)
}