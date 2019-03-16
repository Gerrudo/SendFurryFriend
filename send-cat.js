//SendFurryFriend, Thomas Turner 27/02/19

//Dependancies
var schedule = require('node-schedule');
var request = require("request");
var webhook = require("webhook-discord");
var express = require('express');
var moment = require('moment');
var app = express();

/*
API REQUEST & WEBHOOK
*/

function sendMsg(){
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
      
      //Webhook goes here
      const Hook = new webhook.Webhook("https://discordapp.com/api/webhooks/551890577604476939/AQMYJ0-57RRmM8J_OqtySQ_SnVryNzqxXQAv2oTKuaZAw7Q5kn3n1PM-He_vSy2uYtHZ");
      //Your Message goes here
      const msg = new webhook.MessageBuilder()
                      .setName("Pet of the Day")
                      .setColor("#aabbcc")
                      .addField("Hello Faye! ", "Here's your floof for the day!")
                      .setImage(jsonObject[0].url)
                      .setTime();
      
      Hook.send(msg); 
      console.log(moment().format('lll'),'>>>Message Sent');

    });
  };

  console.log(moment().format('lll'),'>>>cat-send 1.1 running');
  console.log(moment().format('lll'),'>>>Set to msg at 08:00');

/*
EXPRESS WEB SERVER
*/

// set ejs as rendering engine
app.set('view engine', 'ejs');

// render the ejs page
app.get('/', function (req, res) {
  res.render('index.ejs');
});
app.get('/sendcat', function (req, res) {
  sendMsg();
  res.redirect('/');
});

const port=process.env.PORT || 8000

app.listen(port);
console.log(moment().format('lll'),'>>>App is listening on PORT 8000');

  //How often the message is sent, in crontab format
  var j = schedule.scheduleJob('0 8 * * *', function(){

    sendMsg();

  });

  