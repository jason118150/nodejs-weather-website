const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=62d81a73a7ffa07663dcbd68816d94a9&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({ url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                precip: response.body.current.precip,
            })
        }
    })
}

module.exports = forecast;