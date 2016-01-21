var express = require('express');
var app = express();


app.set('port', (process.env.PORT || 5000));

var Slack = require('slack-node');
webhookUri = "https://hooks.slack.com/services/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";
slack = new Slack();
slack.setWebhook(webhookUri);

app.get('/bot/:message', function (req, res) {
   slack.webhook({
  channel: "#general",
  username: "webhookbot",
  text: "This is posted to #general and comes from a bot named webhookbot."
	}, function(err, response) {
  console.log(response);
  res.send(req.params.message);
  
});

});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port');
});




