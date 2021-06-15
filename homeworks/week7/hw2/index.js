document.querySelector('.faq').addEventListener('click',
  (e) => {
    const clicked = e.target.closest('.faq__item')
    clicked.classList.toggle('faq__hide-answer')
  }
)
