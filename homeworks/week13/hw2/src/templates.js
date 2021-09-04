export function getReadMoreBtnHtml(className) {
  return `<button class="btn btn-primary ${className} mt-3">載入更多</button>`
}

export function getFormTemplate(formClassName, commentsClassName) {
  return `
    <div>
      <div class="alert alert-warning text-center" role="alert">注意！本站為練習用超簡易留言板，沒有注重外觀還請見諒。</div>
      <form class="${formClassName}">
        <div class="mb-3">
          <label for="create_comment_nickname" class="form-label">暱稱</label>
          <input type="text" class="form-control" id="create_comment_nickname" name="nickname">
        </div>
        <div class="mb-3">
          <label for="create_comment_content" class="form-label">留言</label>
          <textarea class="form-control" id="create_comment_content" rows="3" name="content"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">送出</button>
      </form>
      <div class="${commentsClassName}" >
      </div>
    </div>
  `
}
