## HQ Trivia Bot

THIS PROJECT IS NOT MAINTAINED AND WILL NOT RECEIVE ANY UPDATE
HQ Trivia Bot is a simple bot made with NodeJS that work with OCR and Google to help you find the right answer.

I made it for entertainement purposes only.

[This vid](https://www.youtube.com/watch?v=QzdqT0HTGLs) shows how to set the bot up

## Getting the bot

Get the latest version of the bot from GitHub using Git or download the repository as a ZIP file.
([Download](https://github.com/maxenxe/HQ-Trivia-Bot/archive/master.zip))

    git clone https://github.com/maxenxe/HQ-Trivia-Bot.git


## Before you begin

1.  Download and install [NodeJS](https://nodejs.org/en/), which includes the [npm](https://www.npmjs.com/).

1.  Go to the HQ-Trivia-Bot folder and install the modules required.

        npm install

1.  You'll need a software to cast your screen photo to your PC, for this project I used [AirDroid](https://play.google.com/store/apps/details?id=com.sand.airdroid&hl=fr), you only need it on your phone.

1. You'll also need a software that can tell you where your cursor is on your screen.

1. Install [GraphicsMagik](http://www.graphicsmagick.org).

1. Install [tesseract-ocr](https://github.com/tesseract-ocr/tesseract) and add it to your PATH environment variable.
## Setting up the bot 

![example](https://i.imgur.com/JiHMhLU.png)

As you can see on this image, we need two coordinates to resize the question.

Once you have those 2 coordinates, just do (bottom-right coordinates) - (top-left coordinates).

With the image the result is (870;280).

Go line 34 in bot.js and replace ` .crop('389','200', '587', '198') ` by  ` .crop('the result x', 'the result y', 'top-left-x','top-left-y')`

top-left-x is the x coordinate from the top-left point

top-left-y is the y coordinate from the top-left point

the result x is the x coordinate from (bottom-right coordinates) - (top-left coordinates)

the result y is the y coordinate from (bottom-right coordinates) - (top-left coordinates)

**Do the same for the answers at line 19.**

## Run Locally

This is it, now you have to cast your screen open a terminal at your Hq-Trivia-Bot folder.

Run `node bot.js` or `npm start` and the bot will start.

It'll browse the internet to find the answer.

