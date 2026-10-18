// acquiring city longitude and latitude information 




const input=document.getElementById("input");
const button=document.getElementById("search_button");

button.addEventListener('click', async (e)=>{
 
      e.preventDefault();
    const city_name=input.value;


    try{
    const response= await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city_name}&count=1`);
    const data= await response.json();

   
if (!data.results || data.results.length === 0) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";

    document.getElementById("error-message").textContent =
        "Invalid City Name";

    return;
}


  
    const latitude=data.results[0].latitude;
    const longitude=data.results[0].longitude;


    const response2=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
    const data2=await response2.json();

    document.querySelector(".weather").style.display="block";

     const weather_code=data2.current.weather_code;
     const icon=document.getElementById('weather-icon');

     if(weather_code===0){
        icon.src="images/clear.png";
     }
     else if(weather_code>=1 && weather_code<=3){
        icon.src="images/clouds.png";
     }
     else if(weather_code===45 || weather_code===48){
        icon.src="images/mist.png";
     }
     else if(weather_code>=51 && weather_code<=57){
        icon.src="images/drizzle.png";
     }
     else if(weather_code>=61 && weather_code<=67){
        icon.src="images/rain.png";
     }
     else if(weather_code>=71 && weather_code<=77){
        icon.src="images/snow.png";
     }
     else if(weather_code>=80 && weather_code<=82){
        icon.src="images/rain.png";
     }
    else if(weather_code>=95 && weather_code<=99){
        icon.src="images/rain.png";
     }

     else{
        icon.src="images/clouds.png";
     }

    const temperature= document.getElementById("temp");
    temperature.textContent=`${data2.current.temperature_2m}°c`;

    const city_display=document.getElementById("city");
    city_display.textContent=data.results[0].name;

    const humidity=document.getElementById("humidity");
    humidity.textContent=`${data2.current.relative_humidity_2m}%`;

    const wind_speed=document.getElementById("wind");
    wind_speed.textContent=`${data2.current.wind_speed_10m}km/h`;

    document.querySelector(".weather").style.display="block";
     document.querySelector(".error").style.display="none"

    }

    
   catch(error){
    document.querySelector(".error").style.display = "block";

    document.querySelector(".weather").style.display = "none";

    document.getElementById("error-message").textContent =
        "Network error! Please try again.";

    console.log(error);
}











})