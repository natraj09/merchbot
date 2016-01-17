var express = require('express');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port');
});

var Slack = require('slack-node');

webhookUri = "https://hooks.slack.com/services/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";

slack = new Slack();
slack.setWebhook(webhookUri);

slack.webhook({
  channel: "#general",
  username: "webhookbot",
  text: "This is posted to #general and comes from a bot named webhookbot."
}, function(err, response) {
  console.log(response);
});
