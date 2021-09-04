/* eslint-env jquery */
import $ from 'jquery' // eslint-disable-line
// eslint 跳錯 Unable to resolve path to module 'jquery'    import/no-unresolved
// 還不是很確定應該要怎麼修改，先 disable
import { getComments, createComment } from './api'
import addCommentToDOM from './utils'
import { getReadMoreBtnHtml, getFormTemplate } from './templates'

// eslint 跳錯 Prefer default export   import/prefer-default-export
// 但是不太確定用 `export default init` ，這樣在 index.html 檔案內需要再 import 嗎？（目前的 named export 是不用再另外 import）
// 要從 index.js 還是從打包完的 main.js import 呢？ 以後再回來研究 QQ
export function init(options) {   // eslint-disable-line
  let lastID = null
  let isEnd = false

  const { siteKey, apiUrl } = options
  const containerElement = $(options.containerSelector)
  const formClassName = `${siteKey}-create_comment_form`
  const formSelector = `.${formClassName}`
  const commentsClassName = `${siteKey}-comments`
  const commentsSelector = `.${commentsClassName}`
  const readMoreBtnClassName = `${siteKey}-read-more`
  const readMoreBtnSelector = `.${readMoreBtnClassName}`
  containerElement.append(getFormTemplate(formClassName, commentsClassName))

  getNewComments()

  $(formSelector).submit((e) => {
    e.preventDefault()
    const data = {
      siteKey,
      nickname: $(`${formSelector} input[name=nickname]`).val(),
      content: $(`${formSelector} textarea[name=content]`).val()
    }
    createComment(apiUrl, data, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      getComments(apiUrl, siteKey, null, (data) => {
        if (!data.ok) {
          alert(data.message)
          return
        }
        const comment = data.comments[0]
        addCommentToDOM($(commentsSelector), comment, 'create-comment')
      })
    })
    $(`${formSelector} input[name=nickname]`).val('')
    $(`${formSelector} textarea[name=content]`).val('')
  })

  $(commentsSelector).on('click', readMoreBtnSelector, () => {
    getNewComments()
  })

  function getNewComments() {
    $(readMoreBtnSelector).hide()
    if (isEnd) {
      return
    }
    getComments(apiUrl, siteKey, lastID, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }

      const { comments } = data
      const { length } = comments

      for (const comment of comments) {
        addCommentToDOM($(commentsSelector), comment, 'read-more-comments')
      }
      if (length >= 5) {
        $(commentsSelector).append(getReadMoreBtnHtml(readMoreBtnClassName))
        lastID = comments[length - 1].id
      } else {
        isEnd = true
      }
    })
  }
}
