const path = require('path')
const getLocation = require('./utils/geocode.js')
const getForecast = require('./utils/forecast.js')

const express = require('express')
const hbs = require('hbs')

// Define paths for express config
const homeDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(homeDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    header: 'Weather',
    name: 'Tom O\'Brien'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather App - About',
    header: 'About',
    name: 'Tom O\'Brien'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Weather App - Help',
    header: 'Help',
    helpMsg: 'This is a generic help message to render as a paragraph',
    name: 'Tom O\'Brien'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({ error: 'Please provide a location'})
  }
  getLocation(req.query.address, (error, { long, lat, location }) => {
    if (error) {
      return res.send(error)
    }
      //res.send('Current weather for: ' + location)
    getForecast(long, lat, (error, data) => {
      if (error) {
        return res.send(error)
      }
        res.send({forecast: data, location: location, address: req.query.address})
    })
  })
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    title: '404 Page Not Found',
    header: '404',
    pageText: 'Help article not found',
    name: 'Tom O\'Brien'
  })
})

app.get('*', (req,res) => {
  res.render('404', {
    title: '404 Page Not Found',
    header: '404',
    pageText: 'Page not found',
    name: 'Tom O\'Brien'
  })
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
