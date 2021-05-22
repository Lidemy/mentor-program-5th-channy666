const request = require('request')

request(`https://restcountries.eu/rest/v2/name/${process.argv[2]}`, (error, response, body) => {
  if (error) {
    console.log('error:', error)
    return
  }

  if (!process.argv[2]) {
    console.log('請輸入國家名稱')
    return
  }

  let countryInfo
  try {
    countryInfo = JSON.parse(body)
  } catch (error) {
    console.log('error:', error)
    return
  }

  if (countryInfo.status === 404) {
    console.log('「找不到國家資訊」。')
    return
  }

  for (let i = 0; i < countryInfo.length; i++) {
    console.log('============')
    console.log(`國家：${countryInfo[i].name}`)
    console.log(`首都：${countryInfo[i].capital}`)
    console.log(`貨幣：${countryInfo[i].currencies[0].code}`)
    console.log(`國碼：${countryInfo[i].callingCodes[0]}`)
  }
})
