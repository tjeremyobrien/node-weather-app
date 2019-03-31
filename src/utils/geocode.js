const request = require('request')

const getLocation = (search, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + search + '.json?access_token=pk.eyJ1IjoidGplcmVteW9icmllbiIsImEiOiJjanRlcThwYmkwM2dzNGFydXY1b3llbmNqIn0.kVUhQIhG4ajkK5pEQf4grA&limit=1'

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback({error: 'Unable to connect to location services'}, {long: undefined, lat: undefined, location: undefined})
    } else if (body.features.length === 0) {
      callback({error: 'Unable to resolve location'}, {long: undefined, lat: undefined, location: undefined})
    } else {
      callback(undefined, {
        long: body.features[0].center[0],
        lat: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })

}

module.exports = getLocation
