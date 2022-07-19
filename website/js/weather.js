/*
*   This Class is responsible for connecting to the API server
*   and return the JSON result
*/
class Weather{
    d = ""
    constructor(){
        this.url = "https://api.openweathermap.org/data/2.5/weather"
        this.api = '47476aaa3a04e4c84e15052b5b35b396'
        
    }
    getURL(location){
        return this.url + "?" + location + "&appid=" + this.api + "&units=metric"
    }
    async getWeather(location){
        let res = await fetch(this.getURL(location))
        return await res.json()  
    }
    async update(){
        let d = new Date()
        let data = await new Post().getData()
        document.getElementById('weather').style.display = 'block'
        document.getElementById('locationName').innerHTML = data.location
        document.getElementById('date').innerHTML = d.getDate() + " " + d.toLocaleString('default', { month: 'short' }) + " " + d.getFullYear()
        document.getElementById('content').innerHTML = data.content
        document.getElementById('temp').innerHTML = data.temperature + "° C"
        document.getElementById('weather').scrollIntoView({behavior:"smooth"})
    }
    
}