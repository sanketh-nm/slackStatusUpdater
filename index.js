var gCal = require("./calendar");
var slack = require("./slack");



var nextEventTime;
var eventTitle;
var emojiText = ":calendar:";
var eta_ms = -1;

var i = 0;

gCal.listEvents(printEvents);

function printEvents(events)
{
  //console.log('Upcoming event:' +JSON.stringify(events));

  while((eta_ms <= 0) && (i < events.length))
  {
  //keep getting next event
  //for (var i = 0; i < events.length; i++) {
    
    var event = events[i];
    var start = event.start.dateTime || event.start.date;
    nextEventTime = start;
    if(event.summary === undefined)
    {
      event.summary = "Untitled event"
    }
    if(event.description === undefined)
    {
      event.description = "No desc";
    }
    eventTitle = event.summary;

    if(event.description.includes("Zoom"))
    {
      emojiText = ":slack_call:"
    }
    console.log('%s - %s', start, event.summary);
    eta_ms = new Date(nextEventTime).getTime() - Date.now();
    i++;

    main();
  //}
    
  }

}

//This waits until start of next event and then updates the status
//var eta_ms = new Date(nextEventTime).getTime() - Date.now();

function main()
{
console.log("eta-ms"+eta_ms);

if(eta_ms>0)
{   
console.log("Waiting for next event start");
setTimeout(function(){
eta_ms = 0;
i=0;
console.log("timeout: Changing status");
slack.postToSlack(eventTitle,emojiText);
console.log("returned from slack");
gCal.listEvents(printEvents);
}, eta_ms);
}

  
}
