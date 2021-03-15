const request = require('request');

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicHJpeWFldmVyIiwiYSI6ImNrbTRra2J3bDA1ajEydXRwend6czVnbGcifQ.irOb9lKnjV1MS9JwW4Wtrg";
    console.log(url)
    request({ url : url ,json : true} , (error , response) => {
        if(error){

        }else if(response.body.features.length === 0){

        }else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode

