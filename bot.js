var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/com/;
      //botRegexTeam = /^\/i;
      botRegexDepth = /^\/D/i;
      botRegexRules = /^\/rules/;
      botRegexStrikes = /^\/strikes/;
      botRegexNameChange = /^\/nc/;
      botRegexSchedule = /^\/S/i;
      botODB = /(.*\s+)(.*odb)(\s+.*)/i;
      botRegexP = /^\/P/i;
      botRegexTw = /^\/twitch/i;
      botRegexUsers = /^\/users/;
      botRegexRatings = /^\/ratings/; 
      botRegexPen = /^\/pending/;
      botRegexTrade = /^\/trade/; 
  var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                "MIA","BUF","SF","WAS","NYJ","TB"]
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(" /d/i = depth chart , /rules , /strikes , /s/i = team schedule , /p/i = player lookup , /twitch/i , /users , /ratings");
    this.res.end();
  }
  //else if(request.text && botRegexTeam.test(request.text)) {
    //this.res.writeHead(200);
    //postMessage("http://daddyleagues.com/shomadden/team/"+request.text.substring(5,8)+"");
    //this.res.end();
  //} 
  else if(request.text && botRegexDepth.test(request.text)) {
    this.res.writeHead(200);
    //postMessage("http://www.daddyleagues.com/maddenrating?name=&position=all&team="+request.text.substring(5,8));
    postMessage("http://daddyleagues.com/shomadden/team/"+request.text.substring(5,8)+"/depthchart");
    this.res.end();
  } 
  else if(request.text && botRegexRatings.test(request.text)) {
    this.res.writeHead(200);
    postMessage("www.daddyleagues.com/maddenrating/");
    this.res.end();
  } 
  else if(request.text && botRegexRules.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://docs.google.com/document/d/1tlxM-UiXKisjL826wtn1a0BQE0GaqzWAhi1XOpgxhEA/edit?usp=sharing");
    this.res.end();
  } 
  else if(request.text && botRegexStrikes.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://docs.google.com/spreadsheets/d/1H83DERNFxIE6N9Sgr2bd7dbSTW48FP1_shzdRiG5pjY/view#gid=0");
    this.res.end();
  } 
  else if(request.text && botRegexNameChange.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://docs.google.com/spreadsheets/d/1H83DERNFxIE6N9Sgr2bd7dbSTW48FP1_shzdRiG5pjY/view#gid=831861622");
    this.res.end();
  } 
  else if(request.text && botRegexSchedule.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://daddyleagues.com/shomadden/team/"+request.text.substring(5,8)+"/schedule");
    this.res.end();
  }
  else if(request.text && botRegexP.test(request.text)) {
    this.res.writeHead(200);
    var req = request.text.substring(5,request.text.length);
    var rep = req.replace(/ /,"+");
    postMessage("http://daddyleagues.com/shomadden/players?name="+rep+"&position=all&team=all");
    this.res.end();
  }  
  else if(request.text && botRegexTw.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.twitch.tv/"+request.text.substring(8,request.text.length));
    this.res.end();
  } 
  else if(request.text && botRegexUsers.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://docs.google.com/spreadsheets/d/17e5rydAn2cj66x8iXPUf4jMYpVY8Q4S1xJTmewji9Ug/edit?usp=sharing");
    this.res.end();
  } 
  else if(request.text && botODB.test(request.text)) {
    this.res.writeHead(200);
    postMessage("OBJ*");
    this.res.end();
  } 
  else if(request.text && botRegexPen.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://docs.google.com/spreadsheets/d/1H83DERNFxIE6N9Sgr2bd7dbSTW48FP1_shzdRiG5pjY/view#gid=1767770137");
    this.res.end();
  }
  else if(request.text && botRegexTrade.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://goo.gl/forms/nE90B79iWf51NaC13");
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
