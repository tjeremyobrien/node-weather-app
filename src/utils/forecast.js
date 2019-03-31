const request = require('request')

const getForecast = (long, lat, callback) => {
  const url = 'https://api.darksky.net/forecast/e1a86ef97e762486bc313c4ce30d723d/' + lat + ',' + long + '?units=ca'

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Cannot connect to weather service.', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, body.currently.summary + ' - ' + 'It is currently ' + body.currently.temperature +
      ' degrees. There is ' + body.currently.precipProbability + '% chance of rain. Today\'s high is ' + body.daily.data[0].temperatureHigh +
      ' and today\'s low is ' + body.daily.data[0].temperatureLow + '.'
      )
    }
  })

}

module.exports = getForecast
