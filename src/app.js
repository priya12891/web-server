const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname)
console.log(path.join(__dirname))
const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine' , 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('',(req ,res) => {
    res.render('index',{
        name : "Priyanka Kumbhar",
        title : "Wether App"
    })
})

app.get('/help',(req ,res) => {
    res.render('help',{
        name : "Priyanka Kumbhar",
        title : "Wether App"
    })
})

app.get('/about',(req ,res) => {
    res.render('about',{
        name : "Priyanka Kumbhar",
        title : "Wether App"
    })
})

app.get('/products',(req ,res) => {

    if(!req.query.search){
        res.send({
            error : 'Provide search term'
        })
    }
    res.send({
        products : []
    })
})


app.get('/weather',(req ,res) => {
    if(!req.query.address){
        res.send({
            error : 'Provide address term'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}) => {
        if(error){
            return res.send({error})
        }
        
        
        forecast(latitude,longitude, (error ,forecastData) => {
            if(error){
                return res.send({error})
            }
            console.log(forecastData)
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })

    /* res.send({
        forecast : "It is snowning",
        location : "India",
        address : req.query.address
    }) */
})

app.get('*',(req ,res) => {
    res.render('404',{
        name : "Priyanka Kumbhar",
        title : "404",
        errorMessage : "Page not found!!!"
    })
})

app.listen(3000,() => {
    console.log('Server is up on port 3000!!!')
})