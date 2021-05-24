const request = require('request')

request(
  {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      'Client-ID': 'rmlowmnx72acdwbuma50656pktfugo',
      Accept: 'application/vnd.twitchtv.v5+json'
    }
  },
  (error, response, body) => {
    if (error) {
      console.log('error:', error)
      return
    }

    let topGames
    try {
      topGames = JSON.parse(body)
    } catch (error) {
      console.log('error:', error)
      return
    }

    for (let i = 0; i < 10; i++) {
      console.log(topGames.top[i].viewers, topGames.top[i].game.name)
    }
  }
)
