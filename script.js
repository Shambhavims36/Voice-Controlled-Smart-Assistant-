if (annyang) {
    console.log("We have annyang");

    // annyang.setLanguage('en-US');

    var commands = {
        'Gorilla Hub show home' : home,
        'show home' : home,
        'Gorilla Hub show weather' : weather,
        'show weather' : weather

       
    }


    function home() {
        console.log("Home");
        location.hash = "anchorHome";
    }

    function weather(){
        console.log("Weather");
        location.hash = "anchorWeather";
    }

    // Add Commands
    annyang.addCommands(commands);

    // Start listening
    annyang.start();

}// clock
setInterval(() => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    let time = h + ":" + m;
    document.getElementById("time").innerHTML = time;
}, 1);

function checkTime(i){
    if(i < 10) {
        i = "0" + i;
    }
    return i;
}

// Notifications
function getWeekDay(date){
    newDate = new Date();
    let today = newDate.getDay();
    let notificationMsg = document.getElementById("notifications");
    if(today == 5) {
        notificationMsg.innerHTML = "Get the bin out...";
    } else {
        notificationMsg.innerHTML = "No new notifications";
    }
}

// Get Subscribers
const youtubeKey = 'AIzaSyBTzwzH1flcJ_APUWCb41NNqZkghT_o5wg ';
const youtubeUsername = 'UCvXscyQ0cLzPZeNOeXI45Sw';
const odometer = document.querySelector('.odometer');
const delay = 1000; // 10 min
// var delay = 60 * 60 * 1000; // 1 hour in msec

function getSubscribers() {

    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeUsername}&key=${youtubeKey}`)
    .then(response => {
        return response.json()
    }) 
    .then(data => { 
        console.log(data);
        // console.log(data["items"][0].statistics.subscriberCount);
        var subCount = parseInt(data["items"][0].statistics.subscriberCount);
        odometer.innerHTML = subCount ; 
    })
    .catch(err => {

    })
    i++;
}

setInterval(() => {
    getWeekDay();
    getSubscribers();
}, delay);


// Get Weather
const proxy = 'https://cors-anywhere.herokuapp.com/';
let weatherIcon = document.querySelector('.weather__icon');
let weatherTitle = document.querySelector('.weather__title');

function getWeather() {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=b3694d551cc33f4c3f95d7173b90c339')
    .then(response => {
        return response.json()
    }) 
    .then(data => { 
        console.log(data);
        weatherTitle.innerHTML = data.weather[1].description;
        weatherIcon.classList.add(`owf-${data.weather[1].id}`);
        getWeatherPhoto(data.weather[1].description);
    })
    .catch(err => {
    })
}


// Unsplash change weather photo based on weather
let weatherWrapper = document.querySelector('#weather');
function getWeatherPhoto(weather) {
    let unsplashApi = 'https://api.unsplash.com/search/photos?client_id= "pFqrYbhIAXs" &page=1&per_page=1&query='+weather;
    fetch(unsplashApi)
    .then(response => {
        return response.json()
    }) 
    .then(data => { 
        weatherWrapper.setAttribute('style', 'background-image:url('+ data.results[0].urls.regular +');');
    }) 
    .catch(err => {
    })
}

function playSound() {
    // const audio = document.querySelector("#gorilla");
    // audio.currentTime = 0;
    // audio.play();
}

getWeatherPhoto();
getSubscribers();
getWeekDay();
getWeather();

