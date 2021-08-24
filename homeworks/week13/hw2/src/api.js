import $ from 'jquery' // eslint-disable-line
// eslint 跳錯 Unable to resolve path to module 'jquery'    import/no-unresolved
// 還不是很確定應該要怎麼修改，先 disable
export function getComments(apiUrl, siteKey, lastID, callback) {
  let url = `${apiUrl}api_comments.php?siteKey=${siteKey}`
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

export function createComment(apiUrl, data, callback) {
  const { siteKey } = data
  $.ajax({
    method: 'POST',
    url: `${apiUrl}api_create_comment.php?siteKey=${siteKey}`,
    data
  }).done((data) => {
    callback(data)
  })
}
