// import express
import express from 'express';

const API_KEY = "7f605a3b8dfa205b150774b225cdc1e3";

// create express app
const app = express();

// define a route handler for the default home page
app.get('/current', (req, res) => {
    // fetch open weather map data for today's weather
    let city = req.query.city;
    const units = req.query.units;

    // change city from camelCase to Title Case
    city = city.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`);
            const data = await response.json();
            res.json(data);
        }
        catch (error) {
            res.status(500).send(error);
        }
    };

    fetchWeather();
});

// get todays weather by hour
app.get('/forecast', (req, res) => {
    // fetch open weather map data for today's weather
    let city = req.query.city;
    const units = req.query.units;

    // change city from camelCase to Title Case
    city = city.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`);
            const data = await response.json();
            res.json(data);
        }
        catch (error) {
            res.status(500).send(error);
        }
    };

    fetchWeather();
});

// get forecast for the next 7 days given a city
app.get('/daily', (req, res) => {
    // fetch open weather map data for today's weather
    let city = req.query.city;
    const units = req.query.units;

    // change city from camelCase to Title Case
    city = city.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${API_KEY}&units=${units}&cnt=7`);
            const data = await response.json();
            res.json(data);
        }
        catch (error) {
            res.status(500).send(error);
        }
    };

    fetchWeather();
});

// start the Express server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
