//SendFurryFriend, Thomas Turner (Thanks to https://github.com/kieran-flaherty for the promise integration) 27/02/19

//Dependancies
var request = require("request");
var express = require('express');
var moment = require('moment');
var app = express();

console.log(moment().format('lll'), '>>>cat-send 1.1 running');
console.log(moment().format('lll'), '>>>Set to msg at 08:00');

/*
API REQUEST & WEBHOOK
*/

function getCat() {
  var options = {
    method: 'GET',
    url: 'https://api.thecatapi.com/v1/images/search',
    headers:
    {
      'Token': 'b20162f6-21d8-4fc7-aede-20d74f9a1b51',
      'cache-control': 'no-cache'
    }
  };
  return new Promise(function (resolve, reject) { //getCat returns a promise object, which runs the function passed to the Promise constructor
    request(options, function (error, response, body) {
      if (error) reject; //if there is an error, we "reject" the promise
      console.log(moment().format('lll'), '>>>Body:', body);
      var jsonObject = JSON.parse(body);
      console.log(moment().format('lll'), '>>>URL:', jsonObject[0].url);
      resolve(jsonObject[0].url); // Now that the request is completed, the promise is "resolved" and the function inside getCat.then() is ran
    });
  })
};

function postToDiscord(discordWebhookURL, catImg) {
  //Sending to discord
  var options = {
    method: 'POST',
    url: discordWebhookURL,
    headers:
    {
      'cache-control': 'no-cache',
      'Content-Type': 'application/json'
    },
    body:
    {
      content: 'Here\'s your cat! Fresh from one of Azure\'s Data Centres.',
      embeds: [{ image: { url: catImg } }]
    },
    json: true
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  });
};

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
  console.log(moment().format('lll'), '>>>Incoming Request 200 Accepted, Webhook URL: ', discordWebhookURL);
  getCat()
    .then(function (result) { //this is ran when the promise is resolved successfully, "result" will be the cat image
      console.log(moment().format('lll'),'>>>Resolved Promise');
      console.log(result);
      postToDiscord(discordWebhookURL, result);
      console.log(moment().format('lll'), '>>>Message Sent');
    })
    .catch(function () { //this is ran when the promise is rejected, i.e an error
      console.error(moment().format('lll'),'>>>Rejected Promise');
    })
});

const port = process.env.PORT || 8000

app.listen(port);
console.log(moment().format('lll'), '>>>App is listening on PORT 8000');


