const express = require('express');
const https = require('https');
// npm i body-parser -> is the packg that alow me to look threw body of the post req & fetch data based on the name of my IP(html->IP tag -> cityName)
const bodyParser = require('body-parser');



const app = express();

   app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.post('/',(req, res)=>{
  console.log(req.body.cityName);
//  console.log('Post request recived.');

const query = req.body.cityName;
const apiKey = '33fc8a650e088474594c9f685972452b';
const unit = 'metric';
const url = 'https://api.openweathermap.org/data/2.5/weather?q= '+ query +' &appid=' + apiKey + '&units=' + unit;

https.get(url,(response)=>{
  console.log(response.statusCode);

  response.on('data', (data)=>{
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const weatherDescription = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
res.write("<p>The weather is currently " + weatherDescription + "</p>");
res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius.</h1>");
res.write("<img src=" + imageURL +">");
res.send()
  })
 })
})


app.listen(3000,(req, res)=>{
  console.log('Server is running on port 3000.' );
})
