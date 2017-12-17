//const SLACK_LEGACY_TOKEN = process.env.SLACK_TOKEN

var unirest = require("unirest");
var fs = require('fs');




module.exports = {

    postToSlack: function(statusText, emoji)
    {

   
    fs.readFile('slack_secret.json',function(err,data)
    {
        if(err) console.log(err);
        else{
            console.log("Data"+JSON.parse(data).SLACK_TOKEN);
            SLACK_LEGACY_TOKEN = JSON.parse(data).SLACK_TOKEN;

            makeRequest(SLACK_LEGACY_TOKEN);
        }
    })


    var status = {
        status_text: statusText,
        status_emoji: emoji
    };

   
    function makeRequest(SLACK_LEGACY_TOKEN)
    {
    var urlEncodedStatus = encodeURI(JSON.stringify(status));

    var req = unirest("POST", "https://slack.com/api/users.profile.set\?profile\=" + urlEncodedStatus + "\&token\=" + SLACK_LEGACY_TOKEN);

    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
       return;
    });
}
}
}