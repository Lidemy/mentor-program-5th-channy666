const API_URL = 'https://api.twitch.tv/kraken/'
const header = {
  'Client-ID': 'rmlowmnx72acdwbuma50656pktfugo',
  Accept: 'application/vnd.twitchtv.v5+json'
}
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

async function runGetGames() {
  try {
    const topGames = await getGames()
    for (let i = 0; i < topGames.top.length; i++) {
      const game = document.createElement('div')
      game.classList.add('navbar__game')
      game.innerText = topGames.top[i].game.name
      document.querySelector('.navbar__games').appendChild(game)
    }
    const firstGame = topGames.top[0].game.name
    changeGame(document.querySelector('.navbar__game'), firstGame)
    try {
      const data = await getStreams(firstGame)
      const { streams } = data
      appendStreams(streams)
    } catch (err) {
      console.log('getStreams err: ', err)
    }
  } catch (err) {
    console.log('getGames err: ', err)
  }
}
runGetGames()

document.querySelector('.navbar__games').addEventListener('click',
  (e) => {
    document.querySelector('.section__streams').innerHTML = ''
    const game = e.target
    changeGame(game, game.innerText)
    async function runGetStreams() {
      try {
        const data = await getStreams(game.innerText)
        const { streams } = data
        appendStreams(streams)
      } catch (err) {
        console.log('getStreams err: ', err)
      }
    }
    runGetStreams()
  }
)

async function getGames() {
  const response = await fetch(`${API_URL}games/top?limit=5`, {
    method: 'GET',
    headers: header
  })
  if (response.status >= 200 && response.status < 400) {
    const data = await response.json()
    return data
  } else {
    throw Error(`status code: ${response.status} ${response.statusText}`)
  }
}

async function getStreams(game) {
  const response = await fetch(`${API_URL}streams/?game=${encodeURIComponent(game)}&limit=20`, {
    method: 'GET',
    headers: header
  })
  if (response.status >= 200 && response.status < 400) {
    const data = await response.json()
    return data
  } else {
    throw Error(`status code: ${response.status} ${response.statusText}`)
  }
}

function appendStreams(streams) {
  for (let i = 0; i < streams.length; i++) {
    const stream = document.createElement('a')
    document.querySelector('.section__streams').appendChild(stream)
    const streamInfo = streams[i]
    const { url, logo, status, display_name: displayName } = streamInfo.channel
    // 直接使用 'display_name' eslint 會跳錯  not in camel case
    stream.outerHTML = STREAM_TEMPLATE
      .replace('$url', url)
      .replace('$preview', streamInfo.preview.medium)
      .replace('$logo', logo)
      .replace('$title', status)
      .replace('$name', displayName)
  }
  const empty = document.createElement('div')
  empty.classList.add('section__stream-empty')
  document.querySelector('.section__streams').appendChild(empty)
}

function changeGame(element, gameName) {
  const games = document.querySelectorAll('.navbar__game')
  for (let i = 0; i < games.length; i++) {
    games[i].classList.remove('selected')
  }
  element.classList.add('selected')
  document.querySelector('.section__header-title').innerText = gameName
}
