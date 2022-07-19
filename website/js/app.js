class App{
    button = document.getElementById('generate')
    autoGeneration = document.getElementById('automaticGeneration')
    locationType = ""
    locationSelector = document.getElementById('locationSelector')
    month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    weather = new Weather()
    //Constructor function initializes the listeners of the buttons
    constructor(){
        this.locationType = "zip"
        this.button.onclick = (event) => {
            this.getWeather(event,this.locationType)
        }
        this.autoGeneration.onclick = () => {
            this.getWeather(event,'auto')
        }
    }
    //onchange initializes the listener of the select tag
    onchange(){
        this.locationSelector.addEventListener('change',this.setType)
    }
    //setType change the input tag from ZIP code entry to a country name entry
    setType(event){        
        event.preventDefault()
        for(let input of document.getElementById('inputs').children)
            input.style.display = 'none'
        document.getElementById(this.value).style.display = 'block'
        this.locationType = this.value
    }
    //connect() send data to POST
    connect(data,content){
        new Post().connect('/addTemp',{teperature:data.main.temp,content:content,location:data.name})
    }
    
    async setWeather(loc,content){
        this.weather.getWeather(loc)
        .then((data) => {
            this.connect(data,content)
        })
        .then(async () => {
            this.weather.update()
        })
    }
    //getWeather when click is triggered either automatic or using the inputsthe function is opened
    /**
     * if(auto) using the geolocation library a prompt will appear
     * to the user to accept the location. Then after recieving
     * the longitude and latitude, the user will have the data shown
     * if(not auto) using the ZIP code or city name the user will have the data shown
     */
    getWeather(event,locationType){
        event.preventDefault()
        const content = document.getElementById('feelings').value
        document.getElementById('feelings').value = ""
        if(locationType == 'auto'){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position) => {
                    let loc = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&limit=5"
                    this.setWeather(loc,content)
                })
            }
        }
        else{
            let location = ""
            if(document.getElementById('zip').value)
                location += "q=" + document.getElementById('zip').value
            else if(document.getElementById('countryName').value)
                location += "q=" + document.getElementById('countryName').value
              document.getElementById('zip').value = ""
              document.getElementById('countryName').value = ""
            if(location == "" && locationType != "auto")
                document.getElementById('error').innerHTML = "Please Enter a zip code/city name"
            else
                this.setWeather(location,content)
        }
    }

    
}

function main(){
    app = new App()
    app.onchange()
}
