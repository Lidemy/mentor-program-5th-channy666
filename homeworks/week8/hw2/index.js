const API_URL = 'https://api.twitch.tv/kraken/'
const CLIENT_ID = 'rmlowmnx72acdwbuma50656pktfugo'
const ACCEPT = 'application/vnd.twitchtv.v5+json'
const STREAM_TEMPLATE = `
    <a class="section__stream" href="$url" target="_blank">
      <img class="section__stream-preview" src="$preview"></img>
      <div class="section__stream-info">
        <img class="section__stream-info-avatar" src="$logo" ></img>
        <div class="section__stream-info-desc">
          <div class="section__stream-info-title">$title</div>
          <div class="section__stream-info-name">$name</div>
        </div>
      </div>
    </a>
  `

getGames((err, topGames) => {
  if (err) {
    console.log(err)
    return
  }
  for (let i = 0; i < topGames.top.length; i++) {
    const game = document.createElement('div')
    game.classList.add('navbar__game')
    game.innerText = topGames.top[i].game.name
    document.querySelector('.navbar__games').appendChild(game)
  }
  const firstGame = topGames.top[0].game.name
  changeGame(document.querySelector('.navbar__game'), firstGame)
  getStreams(firstGame, appendStreams)
})

document.querySelector('.navbar__games').addEventListener('click',
  (e) => {
    document.querySelector('.section__streams').innerHTML = ''
    const game = e.target
    changeGame(game, game.innerText)
    getStreams(game.innerText, appendStreams)
  }
)

function getGames(callback) {
  const request = new XMLHttpRequest()
  request.open('GET', `${API_URL}games/top?limit=5`, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Accept', ACCEPT)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let topGames
      try {
        topGames = JSON.parse(request.response)
      } catch (err) {
        callback(err)
        return
      }
      callback(null, topGames)
    } else {
      callback(`error: ${request.status}`)
    }
  }
  request.onerror = function() {
    callback('error')
  }
  request.send()
}

function getStreams(game, callback) {
  const request = new XMLHttpRequest()
  request.open('GET', `${API_URL}streams/?game=${encodeURIComponent(game)}&limit=20`, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Accept', ACCEPT)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let streams
      try {
        streams = JSON.parse(request.response).streams
      } catch (err) {
        callback(err)
        return
      }
      callback(null, streams)
    } else {
      callback(`error: ${request.status}`)
    }
  }
  request.onerror = function() {
    callback('error')
  }
  request.send()
}

function changeGame(element, gameName) {
  const games = document.querySelectorAll('.navbar__game')
  for (let i = 0; i < games.length; i++) {
    games[i].classList.remove('selected')
  }
  element.classList.add('selected')
  document.querySelector('.section__header-title').innerText = gameName
}

function appendStreams(err, streams) {
  if (err) {
    console.log(err)
    return
  }
  for (let i = 0; i < streams.length; i++) {
    const stream = document.createElement('a')
    document.querySelector('.section__streams').appendChild(stream)
    const streamInfo = streams[i]
    stream.outerHTML = STREAM_TEMPLATE
      .replace('$url', streamInfo.channel.url)
      .replace('$preview', streamInfo.preview.medium)
      .replace('$logo', streamInfo.channel.logo)
      .replace('$title', streamInfo.channel.status)
      .replace('$name', streamInfo.channel.display_name)
  }
  const empty = document.createElement('div')
  empty.classList.add('section__stream-empty')
  document.querySelector('.section__streams').appendChild(empty)
}
