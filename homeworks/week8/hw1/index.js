const API_URL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'

document.querySelector('.lottery__btn').addEventListener('click',
  (e) => {
    getPrize((err, prize) => {
      if (err) {
        alert(err)
        return
      }
      const results = {
        FIRST: {
          className: 'first',
          content: '恭喜你中頭獎了！日本東京來回雙人遊！'
        },
        SECOND: {
          className: 'second',
          content: '二獎！90 吋電視一台！'
        },
        THIRD: {
          className: 'third',
          content: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
        },
        NONE: {
          className: 'none',
          content: '銘謝惠顧'
        }
      }

      const { className, content } = results[prize]
      // const className = results[prize].className
      // const content = results[prize].content

      document.querySelector('.section').classList.add(className)
      document.querySelector('.result__content').innerText = content
      document.querySelector('.lottery').classList.add('hide')
      document.querySelector('.result').classList.remove('hide')
    })
  }
)

document.querySelector('.result__btn').addEventListener('click',
  () => {
    window.location.reload()
  }
)

function getPrize(cb) {
  const request = new XMLHttpRequest()
  const errorMessage = '系統不穩定，請再試一次'
  request.open('GET', API_URL, true)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data
      try {
        data = JSON.parse(request.response)
      } catch (err) {
        cb(errorMessage)
        return
      }
      if (data.prize !== 'FIRST' && data.prize !== 'SECOND' && data.prize !== 'THIRD' && data.prize !== 'NONE') {
        cb(errorMessage)
        return
      }
      cb(null, data.prize)
    } else {
      cb(errorMessage)
    }
  }
  request.onerror = function() {
    cb(errorMessage)
  }
  request.send()
}
