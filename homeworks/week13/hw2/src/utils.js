function addCommentToDOM(container, comment, action) {
  const commentHtml = `
    <div class="card mt-3" >
      <div class="card-body mb-2">
        <h5 class="card-title">${comment.id}. ${escape(comment.nickname)}</h5>
        <p class="card-text">${escape(comment.content)}</p>
        <span class="card-text">${escape(comment.created_at)}</span>
      </div>
    </div>
  `
  if (action === 'create-comment') {
    container.prepend(commentHtml)
    return
  }
  container.append(commentHtml)
}

function escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default addCommentToDOM
