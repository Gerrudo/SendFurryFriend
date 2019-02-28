//SendFurryFriend, Thomas Turner 27/02/19

//Dependancies
var schedule = require('node-schedule');
var request = require("request");
var webhook = require("webhook-discord");

console.log('>>>cat-send 1.1 running')
console.log('>>>Set to msg at 08:00')

//How often the message is sent, in crontab format
var j = schedule.scheduleJob('0 8 * * *', function(){

  var options = { method: 'GET',
    url: 'https://api.thecatapi.com/v1/images/search',
    headers: 
    { 'Token': 'b20162f6-21d8-4fc7-aede-20d74f9a1b51',
      'cache-control': 'no-cache' } };

      console.log('>>>Request Sent...')

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log('>>>Body:', body);

    var jsonObject = JSON.parse(body);

    console.log('>>>URL:',jsonObject[0].url);
    
    //Webhook goes here
    const Hook = new webhook.Webhook("https://discordapp.com/api/webhooks/550788590863515679/7Zdb2SAyW7p7hzmHdsLLHAXTZ8r2s5kFzuj1YezwCvYVPyJ98Eac0ULQcgi207ulCXuJ");
    //Your Message goes here
    const msg = new webhook.MessageBuilder()
                    .setName("Pet of the Day")
                    .setColor("#aabbcc")
                    .addField("Hello Faye! ", "Here's your floof for the day!")
                    .setImage(jsonObject[0].url)
                    .setTime();
    
    Hook.send(msg); 
    console.log('>>>Message Sent');

  });

});