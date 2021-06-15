document.querySelector('.to-do__list').addEventListener('click',
  (e) => {
    if (e.target.classList.contains('btn__add')) {
      const input = document.querySelector('input[name="create"]').value
      // 輸入空格也會新增，之後有空再來修改一下，希望可以篩掉
      if (input) {
        addItem(input)
        document.querySelector('input[name="create"]').value = ''
      }
      return
    }

    if (e.target.classList.contains('list__item-check')) {
      e.target.parentNode.classList.toggle('checked')
      return
    }

    if (e.target.classList.contains('btn__del')) {
      e.target.parentNode.remove()
    }
  }
)

function addItem(input) {
  const newItem = document.createElement('div')
  const parent = document.querySelector('.list')
  newItem.classList.add('list__item')
  newItem.innerHTML =
   `
    <div class="list__item-check"></div>
    <div class="list__item-content">${escapeHtml(input)}</div>
    <button class="btn__del">Del</button>
  `
  return parent.appendChild(newItem)
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
