/* eslint-env jquery */
let todoID = 0
let incompleteCount = 0
const searchParams = new URLSearchParams(window.location.search)
const listID = searchParams.get('id')
const template = `
    <div class="row todo mb-4 {isCompleted}" id="{todoID}">
      <div class="offset-1 col-md-1 d-flex justify-content-end">
        <span class="badge {bg-type} align-self-center ">{bg-text}</span>
      </div>
      <div class="col-md-8">
        <div class="input-group ">
          <input type="text" class="form-control input {content-text-type}" aria-label="Recipient's username with two button addons" value="{content}" />
          <button class="btn btn-outline-secondary btn-status" type="button">{btn-text}</button>
          <button class="btn btn-outline-danger btn-delete" type="button">delete</button>
        </div>
      </div>
    </div>
  `

$(document).ready(() => {
  // 有 listID 的話先去資料庫拿資料出來
  if (listID) {
    $.ajax({
      type: 'GET',
      url: `http://mentor-program.co/mtr04group3/channy/week12/hw2/api_get_todo.php?id=${listID}`
    }).done((data) => {
      if (!data['ok?']) {
        alert(data.message)
      }
      const todos = JSON.parse(data.data.todos)

      for (const todo of todos) {
        if (!todo.isCompleted) {
          incompleteCount++
        }
        render(todo.isCompleted, todo.id, todo.content)
      }
      todoID = todos[todos.length - 1].id
      updateCounter()
    })
  }

  // 新增 todo
  $('.btn__add-todo').click(() => {
    addTodo()
  })
  $('.input__add-todo').keydown((e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  })

  $('.todos').on('click', '.todo', (e) => {
    /* eslint-disable prefer-destructuring */
    // 用解構語法還是會跳錯：'target' was used before it was defined
    const target = e.target
    const todo = $(target).closest('.todo')
    // 改變 todo 狀態
    if ($(target).hasClass('btn-status')) {
      const input = $(target).siblings('input')
      const badge = $(todo).find('.badge')
      $(input).toggleClass('text-muted')
      $(badge).toggleClass('bg-warning')
      $(badge).toggleClass('bg-success')
      $(badge).toggleClass('text-dark')

      if ($(todo).hasClass('completed')) {
        $(target).text('completed')
        $(badge).text('active')
        incompleteCount++
      } else {
        $(target).text('active')
        $(badge).text('completed')
        incompleteCount--
      }
      $(todo).toggleClass('completed')
      updateCounter()
    }

    // 刪除 todo
    if ($(target).hasClass('btn-delete')) {
      if (!$(todo).hasClass('completed')) {
        incompleteCount--
        updateCounter()
      }
      $(todo).remove()
    }
  })

  // 顯示不同狀態 todo、清除已完成 todo、儲存 todo
  $('nav').on('click', '.nav-link', (e) => {
    const target = e.target
    const targetText = $(target).text()

    switch (targetText) {
      case 'All':
        $('.nav-link').removeClass('active')
        $(target).addClass('active')
        $('.todo').show()
        break

      case 'Active':
        $('.nav-link').removeClass('active')
        $(target).addClass('active')
        $('.todo').show()
        $('.completed').hide()
        break

      case 'Completed':
        $('.nav-link').removeClass('active')
        $(target).addClass('active')
        $('.todo').hide()
        $('.completed').show()
        break

      case 'Clear completed':
        $('.completed').remove()
        break

      case 'Save':
        saveTodos()
        break
    }
  })
})

function addTodo() {
  if ($('.input__add-todo').val() === '') {
    alert('You got nothing to do?')
    return
  }
  const content = ($('.input__add-todo').val())
  todoID++
  incompleteCount++
  render(false, todoID, content)
  $('.input__add-todo').val('')
  updateCounter()
}

function render(isCompleted, id, content) {
  if (isCompleted) {
    $('.todos').append(
      template
        .replace('{isCompleted}', 'completed')
        .replace('{todoID}', id)
        .replace('{bg-type}', 'bg-success')
        .replace('{bg-text}', 'completed')
        .replace('{content-text-type}', 'text-muted')
        .replace('{content}', escape(content))
        .replace('{btn-text}', 'active')
    )
  } else {
    $('.todos').append(
      template
        .replace('{isCompleted}', '')
        .replace('{todoID}', id)
        .replace('{bg-type}', 'bg-warning text-dark')
        .replace('{bg-text}', 'active')
        .replace('{content-text-type}', '')
        .replace('{content}', escape(content))
        .replace('{btn-text}', 'completed')
    )
  }
}

function saveTodos() {
  const todos = []
  $('.todo').each((i, todo) => {
    todos.push({
      id: $(todo).attr('id'),
      isCompleted: $(todo).hasClass('completed'),
      content: $(todo).find('input').val()
    })
  })

  const data = JSON.stringify(todos)

  let url = 'http://mentor-program.co/mtr04group3/channy/week12/hw2/api_update_todo.php'
  if (listID) {
    url = `http://mentor-program.co/mtr04group3/channy/week12/hw2/api_update_todo.php?id=${listID}`
  }

  $.ajax({
    type: 'POST',
    url,
    data: {
      todos: data
    }
  }).done((data) => {
    if (!data['ok?']) {
      alert(data.message)
      return
    }
    console.log('res: ', data)
    window.location = `index.html?id=${data.last_id}`
    alert(`Your To-do List ID number is ${data.last_id}`)
  })
}

function updateCounter() {
  $('.incomplete-count').text(incompleteCount)
}

function escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
