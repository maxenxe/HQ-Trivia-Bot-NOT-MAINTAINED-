var screenshot = require('desktop-screenshot');
var gm = require('gm');
var nodecr = require('nodecr');
var google = require('google');
var request = require("request");
var cheerio = require('cheerio');
var question;
var answers;
var pointsAnswer0;
var pointsAnswer1;
var pointsAnswer2;

screenshot("screenshot.jpg", {width: 1600}, function(error, complete) {
    if(error)
        console.log("Screenshot failed", error);
    else
        console.log("Screenshot done");
        gm('screenshot.jpg')
          .crop('351', '233', '606', '334')
          .write('answers.jpg', function (err) {
            if (!err) {
              console.log("Answers resized");
              nodecr.process('answers.jpg',function(err, text) {
                if(err) {
                  console.error(err);
                } else {
                  answers = text.replace(/^\s*$[\n\r]{1,}/gm, '');
                  answers = answers.split(/\n/g);
                  answers = answers.filter(function(e){ return e === 0 || e });
                  for(var i = 0; i < answers.length; i++) {
                    console.log(answers[i]);
                  }
                  gm('screenshot.jpg')
                    .crop('389','200', '587', '198')
                    .write('question.jpg', function (err) {
                      if (!err) {
                        console.log("Question resized");
                        nodecr.process('question.jpg',function(err, text) {
          	              if(err) {
          		              console.error(err);
          	              } else {
                            question = text.replace(/\n/g, " ");
                            console.log('The question is "' + question + '"');
                            google.resultsPerPage = 25;
                            var nextCounter = 0;

                            google(question, function (err, res){
                              if (err) console.error(err)

                              for (var i = 0; i < res.links.length; ++i) {
                                var link = res.links[i];
                                if(link.link != null) {
                                  if(link.link.indexOf("wikipedia") != -1) {
                                    console.log("Wikipedia link found: " + link.link);
                                    request(link.link, function (error, response, body) {
                                      if (!error) {
                                        var $ = cheerio.load(body);
                                        if($('body').text().toLowerCase().indexOf(answers[0].toLowerCase()) != -1) {
                                          console.log(answers[0] + " found in Wikipedia page!")
                                          pointsAnswer0++;
                                        }

                                        if($('body').text().toLowerCase().indexOf(answers[1].toLowerCase()) != -1) {
                                          console.log(answers[1] + " found in Wikipedia page!")
                                          pointsAnswer1++;
                                        }

                                        if($('body').text().toLowerCase().indexOf(answers[2].toLowerCase()) != -1) {
                                          console.log(answers[2] + " found in Wikipedia page!")
                                          pointsAnswer2++;
                                        }
                                      } else {
                                        console.log("Error: " + error);
                                      }
                                    });
                                  }
                                }
                                if(link.title.indexOf(answers[0]) != -1) {
                                  pointsAnswer0++;
                                  console.log(answers[0] + " found!");
                                }
                                if(link.title.indexOf(answers[1]) != -1) {
                                  pointsAnswer1++;
                                  console.log(answers[1] + " found!");
                                }
                                if(link.title.indexOf(answers[2]) != -1) {
                                  pointsAnswer2++;
                                  console.log(answers[2] + " found!");
                                }
                                if(link.description.indexOf(answers[0]) != -1) {
                                  pointsAnswer0++;
                                  console.log(answers[0] + " found!");
                                }
                                if(link.description.indexOf(answers[1]) != -1) {
                                  pointsAnswer1++;
                                  console.log(answers[1] + " found!");
                                }
                                if(link.description.indexOf(answers[2]) != -1) {
                                  pointsAnswer2++;
                                  console.log(answers[2] + " found!");
                                }
                              }

                              if (nextCounter < 4) {
                                nextCounter += 1
                                if (res.next) res.next()
                              }
                            })
          	              }
                        });
                      } else {
                        console.log(err);
                      }
                    });
                }
              });
            } else {
              console.log(err);
            }
          });
});
