const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help Me!!!',
        title: 'Help',
        name: 'Andrew',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location) {
        return res.send({
            error: 'You have to provide address',
        })
    }
    geocode(req.query.location, (error, data) => {
        if (error) {
            return res.send({
                error: 'You have to connect the server.'
            })
        }
    
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: 'You have to provide the right location.'
                })
            }
            return res.send({
                location: data.location,
                forecast: forecastData,
                address: req.query.location,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.game) {
        return res.send({
            error: 'You mus provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: 'Page not found',
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.');
});