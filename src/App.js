import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CircleLoader from "react-spinners/CircleLoader";
import CityList from "./city.list.json";
import Fiveday from "./fivedayforecast.json";

const override = `css
display: block;
margin: 0 auto;
border-color: white;
`;

const cityID = CityList.filter(city => city.name === "Thanh pho Ho Chi Minh");

const currDate = new Date();
const testDate = new Date(currDate);
let dataFiveDate = [];

for (let i = 1; i <= 5; i++) {
  let tempDate = testDate.getDate() + (i - 1);
  
  const dateArray = Fiveday.list.map(item => {
    
    const converDate = new Date(item.dt_txt).getDate();
    if (converDate === tempDate) {
      return {
        main: item.main,
        weather: item.weather
      };
    }
  });
  console.log("redd",dateArray)
  // let obj = new Object();
  // obj.date = currDate.setDate(tempDate).toString();
  // obj.data = {main: dateArray.main, weather: dateArray.weather};
  // dataFiveDate.push(obj);
}

function App() {
  console.log("data five day" , dataFiveDate);
  const [weather, setWeather] = useState(null);
  const [responseCod, setResponse] = useState(null);
  const getAPI = async position => {
    console.log(position);
    // const apiKey = "ef3976be90416739b6e3f45dbd283e0e&units=Metric";
    // console.log(result);
    // if (result.cod === 401) {
    //   throw "Invalid API KEy";
    // }

    const apiKey = "ef3976be90416739b6e3f45dbd283e0e&units=Metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
    const data = await fetch(url);
    const result = await data.json();

    if (result.cod === 401) {
      setResponse(result.cod);
      throw "Invalid API key";
    }

    setWeather(result);
    setResponse(result.cod);
    console.log("cod", result.cod);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getAPI);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  //catch Invalid key
  if (responseCod === 401)
    return (
      <div className="sweet-loading">
        <CircleLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={true}
        />
        <h1>Unvalid API key</h1>
      </div>
    );

  if (responseCod !== 200)
    return (
      <div className="sweet-loading">
        <CircleLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={true}
        />
        <h1>Diving</h1>
      </div>
    );

  return (
    <div className="container-fluid text-white my-auto">
      <div className="container mx-auto my-4 py-4">
        <div className="row justify-content-center text-center">
          <h1 className="col-12 display-4 my-2 py-3 text-success">
            Awesome Weather App
          </h1>
          <h2 className="col-12">{weather && weather.name}</h2>
          <h3 className="col-12 text-danger">
            Temperature: {weather && weather.main.temp}
          </h3>
          <h3 className="col-12">
            <img
              src={
                weather &&
                `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
              }
            ></img>{" "}
            {weather && weather.weather[0].description}
          </h3>
        </div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" data-interval="10000">
              <div className="d-block w-80">abc</div>
            </div>
            <div className="carousel-item">
              <div className="d-block w-80">abc</div>
            </div>
            <div className="carousel-item">
              <div className="d-block w-80">abc</div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
