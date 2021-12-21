import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weatherInfo";
const API_KEY = "5c595ce1738d8f1e462c9f962ab351fa";

function returnValue(array, index) {
  let result = Array.from(array);
  if (result.length <= index) {
    return undefined;
  }
  return result[index]
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}




class App extends React.Component {

  state = {
    temp: undefined,
    weather: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    if (city) {
      const api_url = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      const data = await api_url.json();


      console.log(data);
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        weather: returnValue(data.weather, 0)?.main,
        sunrise: timeConverter(data.sys.sunrise),
        sunset: timeConverter(data.sys.sunset),
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        weather: undefined,
        city: undefined,
        country: undefined,
        sunrice: undefined,
        sunset: undefined,
        error: "Enter the corect city name!"
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  weather={this.state.weather}
                  city={this.state.city}
                  country={this.state.country}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
