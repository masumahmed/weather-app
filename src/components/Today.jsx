import { useState, useEffect } from 'react';

export function Hourly({date, temp, units, icon}) {
    return <div className="hourly">
        <div>
            <img src={`/src/assets/icons/${icon}@2x.png`} alt="" />
        </div>
        <div>
            <p className='units'>{Math.round(temp)} &deg; {units === 'metric' ? 'C' : 'F'}</p>
        </div>
        <div>
            <p>{date}</p>
        </div>
    </div>
}

function Today({city, units, icon}) {
    const [weather, setWeather] = useState(null);
    const API_KEY = "7f605a3b8dfa205b150774b225cdc1e3";

    // get todays hourly forcast open openweathermap
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`);
                const data = await response.json();
                
                let hourly = [];
                for (let i = 0; i < 8; i++) {
                    // time
                    let time = data.list[i].dt_txt.split(' ')[1];
                    let timeParts = time.split(':');
                    time = `${timeParts[0]}`;
                    if (time > 12) time = `${time - 12} PM`;
                    else time = `${time} AM`;
                    if (time === '00 AM') time = '12 AM';
                    if (time[0] === '0') time = time.slice(1);

                    // temp
                    const temp = data.list[i].main.feels_like;

                    // icon
                    const icon = data.list[i].weather[0].icon;

                    hourly.push([time, temp, icon]);
                }
                setWeather(hourly);
            }
            catch (error) {
                throw new Error('Weather data not available');
            }
        };

        fetchWeather();
    }, [units]);

    return <>
        <div className="today">
            <div className="temps">
                {weather && weather.map((hour, index) => <Hourly key={index} date={hour[0]} temp={hour[1]} units={units} icon={hour[2]}/>)}
            </div>
        </div>
    </>
}

export default Today;
