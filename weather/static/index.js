const main = document.querySelector('.main'),
      inputArea = document.querySelector('.input'),
      infoSection = inputArea.querySelector('.info'),
      input = inputArea.querySelector('input'),
      dlButton = inputArea.querySelector('button'),
      weatherSection = main.querySelector('.weather'),
      icon = weatherSection.querySelector('img'),
      arrow = main.querySelector('header i');

input.addEventListener('keyup', e => {
    if(e.key == 'Enter' && input.value != ""){
        apiRequest(input.value);
    }
});

dlButton.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error);
    }else{
        alert("Your browser not support geolocation");
    }
});

let api;

function apiRequest(city) {
    api = `https://api.weatherstack.com/current?access_key=e0f3ca86f47b6b4ded795eefb843eac1&query=${city}&units=f`;
    fetching();
}

function success(area) {
    const {latitude, longitude} = area.coords;
    api = `https://api.weatherstack.com/current?access_key=e0f3ca86f47b6b4ded795eefb843eac1&query=${latitude},${longitude}&units=f`;
    fetching();
}

function error(error) {
    infoSection.innerText = error.message;
    infoSection.classList.add('error');
}

function fetching() {
    infoSection.innerText = 'Fetching weather data!';
    infoSection.classList.add('pending');

    fetch(api)
    .then(res => res.json())
    .then(result => weatherDets(result))
    .catch(() =>{
        infoSection.innerText = 'Oh no! Something is wrong!';
        infoSection.classList.replace('pending','error');

    });
}

function weatherDets(info) {
    if(info.cod == '404') {
        infoSection.classList.replace("pending", "error");
        infoSection.innerText = `${inputField.value} is not a real city`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        if(id == 800){
            icon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            icon.src = "icons/storm.svg";
        }else if(id >= 600 && id <= 622){
            icon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            icon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            icon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            icon.src = "icons/rain.svg";
        }

        weatherSection.querySelector(".temperature .number").innerText = Math.floor(temp);
        weatherSection.querySelector(".weathers").innerText = description;
        weatherSection.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherSection.querySelector(".temperature .number2").innerText = Math.floor(feels_like);
        weatherSection.querySelector(".humidity span").innerText = `${humidity}%`;
        weatherSection.classList.remove("pending", "error");
        infoSection.innerText = "";
        input.value = "";
        main.classList.add("active");
    }
}
arrow.addEventListener("click", ()=>{
    main.classList.remove("active");
});
