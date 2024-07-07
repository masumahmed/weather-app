import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import emojis from './countryCodeEmoji.json';

function Current({city, units}) {
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}));
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [API_KEY, setAPIKey] = useState('');

    // if API_KEY exists in localStorage, set it
    useEffect(() => {
        const storedAPI_KEY = localStorage.getItem('API_KEY');
        if (storedAPI_KEY)
            setAPIKey(storedAPI_KEY);
    }, []);

    // while not API_KEY, prompt user to enter one
    if (API_KEY === '') {
        setAPIKey(prompt('Please enter your OpenWeatherMap API key:'));
        localStorage.setItem('API_KEY', API_KEY);
    }

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`);
                const data = await response.json();
                setWeather(data);

                if (!response.ok) {
                    throw new Error('Weather data not available');
                }
            }
            catch (error) {
                setError(error);
                alert(error);
            }
            finally {
                setLoading(false);
            }
        };

        if (city) {
            fetchWeather();
        }

        setTime(new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}));
    }, [city, time, units]);

    const getFlag = (countryCode) => {
        for (let i = 0; i < emojis.length; i++)
            if (emojis[i].code === countryCode)
                return emojis[i].emoji;

        return emojis[9].emoji;
    }

    return <>
        <div className="current">
            {weather && <h2>{getFlag(weather.sys.country)} {weather.name}, {typeof weather.sys.country   === 'string' ? weather.sys.country: 'Earth'}</h2>}
            <p className='deemphasize'>{time}</p>
            {loading && <p>Loading weather data...</p>}
            {error && <p>Error: {error}</p>}
            {weather && <div>
                <div className='details'>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
                    <h1>{Math.round(weather.main.temp)} </h1>
                    <h2 className='units'>&deg;{units === 'metric' ? 'C' : 'F'}</h2>
                <p>{weather.weather[0].description}</p>
                </div>
                <div className='moreWeather'>
                    <div>
                        <p className='deemphasize'>Wind</p>
                        <p>{weather.wind.speed} {units === 'metric' ? 'm/s' : 'mph'}</p>
                    </div>
                    <div>
                        <p className='deemphasize'>Humidity</p>
                        <p>{weather.main.humidity}%</p>
                    </div>
                    <div>
                        <p className='deemphasize'>Pressure</p>
                        <p>{weather.main.pressure} hPa</p>
                    </div>
                    <div>
                        <p className='deemphasize'>Visibility</p>
                        {
                            units === 'metric' && <p>{weather.visibility} meters</p>
                        }
                        {
                            units === 'imperial' && <p>{Math.round(weather.visibility * 0.000621371192 * 100) / 100} miles</p>
                        }
                    </div>
                </div>
            </div>}
        </div>
    </>
} 

export default Current;

// prop validation
Current.propTypes = {
    city: PropTypes.string.isRequired,
    units: PropTypes.oneOf(['metric', 'imperial']).isRequired
};
