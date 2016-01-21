var Botkit = require('botkit');
var rest = require('restler');
var format = require("string-template")
similar_placement_id = 100005

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});


// connect the bot to a stream of messages
controller.spawn({
  token: 'xoxb-19030990835-QnBiMlDwOFamK9lrarNSIrFS',
}).startRTM()



controller.hears('sim (.*)',['ambient'],function(bot,message) {
  var itemId = message.match[1]; 
  if (!isNaN(itemId)) {
    return similar(bot,message,itemId)
  }
  return bot.reply(message, 'Okay');
});


format_attachment = function(item){
	return {
    	title: item.title,
    	color: '#FFCC99',
    	image_url: item.image
    };

}

validMFEResponse = function(response,placement){
	return response.hasOwnProperty(placement) && response[placement].hasOwnProperty('recos') &&  response[placement].recos.length > 0;
}

similar = function(bot,message,item){
	var recos = []
	url = format('http://reco.ebay.com/service/plmt/{0}?itm={1}&si=0&fmt=json&segmentation=true',similar_placement_id,item)
	console.log(url)
	try { 
		rest.get(url).on('complete', function(response) {
	  	if (response instanceof Error) {
	    	console.log('Error:', response.message);
	    	bot.reply(message, 'Failed request');
	 // try again after 5 sec
	  	} else {

	  		if(validMFEResponse(response,similar_placement_id)){
	  			var attachments = [];
	  			var recos = response[similar_placement_id].recos
	    		for(var item in recos) {
	    			bot.reply(message,{
	    				text : recos[item].id,
	    				attachments : [format_attachment(recos[item])]
	    			},function(err,resp) {
    						
  					});
	    		}
	  		}else{
	  			bot.reply(message, format('{0} No response for item = ',item));
	  		}
		}
		});
		
	}
	catch(e){
		bot.reply(message, 'Unexpected error');

	}

}
