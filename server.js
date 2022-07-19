const express = require('express')

let projectData = {}
const app = express()
const port = "3030"
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('website'))
app.get('/all',getWeatherData)
app.post('/addTemp',addWeatherData)


function addWeatherData(req, res) {
    projectData['temperature'] = req.body.temperature
    projectData['content'] = req.body.content
    projectData['location'] = req.body.location
    res.send(projectData)
}
function getWeatherData(req, res) {
    res.send(projectData)
}

const server = app.listen(port, () => {
    console.log('Listening on port:' + port)
})