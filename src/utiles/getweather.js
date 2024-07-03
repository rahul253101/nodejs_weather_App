const request = require('request')
function getweatherstack (lat,log,callback){
    const url = `http://api.weatherstack.com/current?access_key=4c9d829fb373b972bcdeeb8b2eda59d3&query=${lat},${log}`
    // response is destructured as body
    request({url, json: true},(error, {body})=>{
        // console.log(JSON.parse(response.body).current)
        if (error){
            // console.log('error in fetching data')
            callback('error in fetching data', undefined)
        }else if(body.error){
            callback('location does not exist', undefined)
        }else{
            // console.log(response.body.current)
            // console.log(`${response.body.current.weather_descriptions[0]}, current temp ${response.body.current.temperature} but it feelslike ${response.body.current.feelslike}`)

            callback(undefined,`${body.current.weather_descriptions[0]}, current temp ${body.current.temperature}C but it feelslike ${body.current.feelslike}C` )
        }

})

}

module.exports = getweatherstack
