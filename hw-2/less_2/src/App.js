import axios from 'axios'
import {useState} from 'react'
import './app.css'

function App() {
  const [data, setData] = useState();
  const [input, setInput] = useState();
  const KEY = '9a61f229741aa856d43699768e4fe3da';

  const getWeather = (city) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${KEY}`)
      .then(({ data }) => {
        const allForecasts = data.list;
        const dailyForecasts = allForecasts.filter(forecast =>
          forecast.dt_txt.includes('12:00:00')
        ).slice(0, 4);
        setData(dailyForecasts);
        console.log(dailyForecasts);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных о погоде:', error);
        setData();
      });
  };
  return (
    <div  >
      <input type="text" placeholder="Введите страну" onChange={(event) => {
        setInput(event.target.value);
      }} />
      <button type="submit" onClick={() => getWeather(input)}>Поиск</button>
      <div className='div'>
      {
        data &&
        data.map((city, ind) => (
          <div key={ind}>
            <div></div>
            <p className='data'>{city.dt_txt}</p>
            <h1 className='temp'>{(city.main.temp).toFixed(0)}°</h1>
            <h1 className='weather'>{city.weather[0]?.main}</h1>
            <p className='popi'>{city.wind.gust}</p>
          </div>
        ))
      }
      </div>
        

    </div>
  );
}

export default App;
