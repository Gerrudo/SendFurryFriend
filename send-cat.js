//SendFurryFriend, Thomas Turner 27/02/19

var request = require("request");

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
  
  const webhook = require("webhook-discord");
  //Webhook goes here
  const Hook = new webhook.Webhook("https://discordapp.com/api/webhooks/549692863576014888/sVibcWVg1q79zZORCS2J--uTdef5p5tGxEzoVlX7044U2TsAlBesmB9jEnFVLg3D3VF6");
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


/*

*/