//SendFurryFriend, Thomas Turner 27/02/19

//Dependancies
var request = require("request");
var express = require('express');
var moment = require('moment');
var app = express();

/*
API REQUEST & WEBHOOK
*/

function sendMsg(discordWebhookURL){
  var options = { method: 'GET',
      url: 'https://api.thecatapi.com/v1/images/search',
      headers: 
      { 'Token': 'b20162f6-21d8-4fc7-aede-20d74f9a1b51',
        'cache-control': 'no-cache' } };

        console.log(moment().format('lll'),'>>>Request Sent...')

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(moment().format('lll'),'>>>Body:', body);

      var jsonObject = JSON.parse(body);

      console.log(moment().format('lll'),'>>>URL:',jsonObject[0].url);
      
      //Sending to discord
      var options = { method: 'POST',
        url: discordWebhookURL,
        headers: 
        { 'Postman-Token': '166ba090-5cd7-48a4-8cae-4c856b5d8f49',
          'cache-control': 'no-cache',
          'Content-Type': 'application/json' },
        body: 
        { content: 'Here\'s your cat! Fresh from one of Azure\'s Data Centres.',
          embeds: [ { image: { url: jsonObject[0].url } } ] },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
          console.error(error);
          res.status(500).send();
      });
      
      console.log(moment().format('lll'),'>>>Message Sent');

    });
  };

  console.log(moment().format('lll'),'>>>cat-send 1.1 running');
  console.log(moment().format('lll'),'>>>Set to msg at 08:00');

/*
EXPRESS WEB SERVER
*/

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.use(express.json());
app.use(express.urlencoded());

app.post('/sendcat', function (req, res) {
  res.send('ACCEPTED');
  discordWebhookURL = req.body.webhookurl;
  console.log(moment().format('lll'),'>>>Incoming Request 200 Accepted, Webhook URL: ',discordWebhookURL);
  sendMsg(discordWebhookURL);
});

const port=process.env.PORT || 8000

app.listen(port);
console.log(moment().format('lll'),'>>>App is listening on PORT 8000');


  