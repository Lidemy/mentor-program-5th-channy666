/* eslint-env jquery */
const siteKey = 'cc'
let lastID = null
let isEnd = false
const readMoreBtnHTML = '<button class="btn btn-primary read-more mt-3">載入更多</button>'

$('document').ready(() => {
  getComments()

  $('.create_comment_form').submit((e) => {
    e.preventDefault()
    createComment(getCommentsAPI)
    $('input[name=nickname]').val('')
    $('textarea[name=content]').val('')
  })

  $('.comments').on('click', '.read-more', () => {
    getComments()
  })
})

function escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function addCommentToDOM(container, comment, action) {
  if (action === 'create-comment') {
    container.prepend(`
    <div class="card mt-3" >
      <div class="card-body mb-2">
        <h5 class="card-title">${comment.id}. ${escape(comment.nickname)}</h5>
        <p class="card-text">${escape(comment.content)}</p>
        <span class="card-text">${escape(comment.created_at)}</span>
      </div>
    </div>
  `)
    return
  }
  container.append(`
    <div class="card mt-3" >
      <div class="card-body mb-2">
        <h5 class="card-title">${comment.id}. ${escape(comment.nickname)}</h5>
        <p class="card-text">${escape(comment.content)}</p>
        <span class="card-text">${escape(comment.created_at)}</span>
      </div>
    </div>
  `)
}

function getCommentsAPI(siteKey, lastID, callback) {
  let url = `http://mentor-program.co/mtr04group3/channy/week12/hw1/api_comments.php?site_key=${siteKey}`
  if (lastID) {
    url += `&before=${lastID}`
  }
  $.ajax({
    method: 'GET',
    url
  }).done((data) => {
    callback(data)
  })
}

function getComments() {
  $('.read-more').hide()
  if (isEnd) {
    return
  }
  getCommentsAPI(siteKey, lastID, (data) => {
    if (!data['ok?']) {
      alert(data.message)
      return
    }

    /* eslint-disable prefer-destructuring */
    // 用解構語法還是會跳錯：'comments' was used before it was defined
    const comments = data.comments
    const length = comments.length
    for (const comment of comments) {
      addCommentToDOM($('.comments'), comment, 'read-more-comments')
    }
    if (length >= 5) {
      $('.comments').append(readMoreBtnHTML)
      lastID = comments[length - 1].id
    } else {
      isEnd = true
    }
  })
}

function createComment(callback) {
  const data = {
    nickname: $('input[name=nickname]').val(),
    content: $('textarea[name=content]').val()
  }

  $.ajax({
    method: 'POST',
    url: `http://mentor-program.co/mtr04group3/channy/week12/hw1/api_create_comment.php?site_key=${siteKey}`,
    data
  }).done((data) => {
    if (!data['ok?']) {
      alert(data.message)
      return
    }
    callback(siteKey, null, (data) => {
      if (!data['ok?']) {
        alert(data.message)
        return
      }
      const comment = data.comments[0]
      addCommentToDOM($('.comments'), comment, 'create-comment')
    })
  })
}
