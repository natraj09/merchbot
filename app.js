var express = require('express');
var app = express();
var Slack = require('slack-node');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

webhookUri = "https://hooks.slack.com/services/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";

slack = new Slack();
slack.setWebhook(webhookUri);

slack.webhook({
  channel: "#general",
  username: "merchbot",
  text: "This is posted to #general and comes from a bot named merchbot."
}, function(err, response) {
  console.log(response);
});
