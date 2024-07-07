import React, { useState, useEffect } from 'react';

export function Daily({date, temp, units, icon}) {
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

function Weekly({city, units, icon}) {
    const [weather, setWeather] = useState(null);
    const API_KEY = "7f605a3b8dfa205b150774b225cdc1e3";

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // 7 day forecast
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`);
                const data = await response.json();
                
                let daily = [];
                for (let i = 0; i < 4; i++) {
                    // date
                    let date = new Date(data.list[i].dt * 1000);
                    date = date.toDateString().split(' ').slice(0, 3).join(' ');

                    // temp
                    const temp = data.list[i].temp.day;

                    // icon
                    const icon = data.list[i].weather[0].icon;

                    daily.push([date, temp, icon]);
                }
                setWeather(daily);
                console.log(daily);
            }
            catch (error) {
                throw new Error('Weather data not available');
            }
        };

        fetchWeather();
    }, [units]);

    return <>
        <div className="weekly">
            <div className="temps">
                {weather && weather.map((day, index) => <Daily key={index} date={day[0]} temp={day[1]} units={units} icon={day[2]}/>)}
            </div>
        </div>
    </>
}

export default Weekly;
