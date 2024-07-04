// to call required functions
const getgeocode = require('./utiles/getgeocode.js')
const getweather = require('./utiles/getweather.js')

// to call modules that we have installed
const express = require('express')
const path = require('path')
const hbs = require('hbs')

// to create a instance of express
const app = express()
const port = process.env.PORT || 3000

const publicFileDir = path.join(__dirname, '../public')
const viewFileDir = path.join(__dirname, '../templates/views')
const partialsFirDir = path.join(__dirname,'../templates/partials')


// this is used to setup the handelbars and views location
app.set('view engine', 'hbs')
app.set('views',viewFileDir)

hbs.registerPartials(partialsFirDir)

// this helps the express to acess the static files
app.use(express.static(publicFileDir))


// the above code up helps to search for a default page while running a server as index is special name which is loded
// as first default page hence the belove code is unnessary

app.get('/index', (req, res) => {
    res.render('index', {
        name: 'rahyl',
        title: 'weather'
    });
});

app.get('/about', (req, res)=>{
    res.render('about',{
        name: 'rahyl',
        title: 'About'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        helptext: 'How can i help you today??',
        title: 'Help',
        name: 'rahyl'
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        res.send({
            error: 'please provide location address'
            })
    }

    getgeocode(req.query.address, (error,response)=>{
        if (error){
            return res.send({
                error
            })
        }
        const {address} = response
        getweather(response.latitude, response.longitude,(error, response)=>{
            if (error){
                return res.send({
                    error
                })
            }

            return res.send({
                place: req.query.address,
                address,
                forecast: response
                })


        })
    })

})

app.get('/help/*', (req, res)=>{
    res.render('error',{
        error: 'help page not found'
    })
})

app.get('*', (req, res)=>{
    res.render('error',{
        error: '404 page not found'
    })
})

app.listen(port, ()=>{
    console.log(`server is up end running ${port}`)
})
