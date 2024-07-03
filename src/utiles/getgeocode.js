const request = require('request')
function getGeoCode(location,callback){
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(location)}.json&access_token=pk.eyJ1IjoicmFoeWwyNSIsImEiOiJjbHkxOG4yaWIwdjI2MnFweTk4dnphM3UxIn0.D_s3j4UhakWH83D8rBMqaQ&limit=1`
    request({url, json: true}, (error, response)=>{
        if (error){
            // console.log()
            callback('error in fetching data',undefined)
        }else if(response.body.features.length===0){
            // console.log('location does not exist')
            callback('location does not exist',undefined)
        }else{
            var coordinates = (response.body.features[0].geometry.coordinates)
            var latitude = coordinates[1]
            var longitude = coordinates[0]
            var address = response.body.features[0].properties.full_address
            callback(undefined,{
                latitude,
                longitude,
                address
            })
        }

    })

}

module.exports = getGeoCode
