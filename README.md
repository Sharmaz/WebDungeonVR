# Web Dungeon VR

Was created using WebVR scenes with [A-Frame](https://aframe.io).

<a href="https://user-images.githubusercontent.com/2711641/28696646-68dccf24-72fc-11e7-86da-8047f12f6a6b.jpg" target="_blank"><img src="https://user-images.githubusercontent.com/2711641/28696646-68dccf24-72fc-11e7-86da-8047f12f6a6b.jpg"/>

<a href="https://user-images.githubusercontent.com/2711641/28696651-72179196-72fc-11e7-8e25-47e36ebfe5c9.jpg" target="_blank"><img src="https://user-images.githubusercontent.com/2711641/28696651-72179196-72fc-11e7-8e25-47e36ebfe5c9.jpg"  style="width: 33%; display:inline;"/> <a href="https://user-images.githubusercontent.com/2711641/28696655-7835b9e0-72fc-11e7-9341-29fd4b9c07e6.jpg" target="_blank"><img src="https://user-images.githubusercontent.com/2711641/28696655-7835b9e0-72fc-11e7-9341-29fd4b9c07e6.jpg"  style="width: 33%; display:inline;"/> <a href="https://user-images.githubusercontent.com/2711641/28696662-8523996a-72fc-11e7-88ed-03f719ce651b.jpg" target="_blank"><img src="https://user-images.githubusercontent.com/2711641/28696662-8523996a-72fc-11e7-88ed-03f719ce651b.jpg"  style="width: 33%; display:inline;"/>

### [Live Demo](https://sharmaz.github.io/WebDungeonVR/)

## Getting Started

There are two easy options for obtaining this A-Frame scene. It's then up to you to make it your own!

### <sup>Option 1:</sup> Download the ZIP kit 📦

[<img src="http://i.imgur.com/UVPZoM0.png" width="200">](https://github.com/Sharmaz/WebDungeonVR/archive/master.zip)

After you have __[downloaded and extracted this `.zip` file](https://github.com/Sharmaz/WebDungeonVR/archive/master.zip)__ containing the contents of this repo, open the resulting directory, and you'll be have your scene ready in these few steps:

    npm install && npm start
    open http://localhost:3000/

<hr>

### <small><sup>Option 2:</sup> Fork this Git repo 🍴🐙

Alternatively, you can __[fork this repo](https://github.com/Sharmaz/WebDungeonVR/fork)__ to get started, if you'd like to maintain a Git workflow.

After you have __[forked this repo](https://github.com/Sharmaz/WebDungeonVR/fork)__, clone a copy of your fork locally and you'll be have your scene ready in these few steps:

    git clone https://github.com/Sharmaz/WebDungeonVR.git
    cd WebDungeonVR && rm -rf .git && npm install && npm start
    open http://localhost:3000/

> :iphone: **Mobile pro tip:** Upon starting the development server, the URL will be logged to the console. Load that URL from a browser on your mobile device. (If your mobile phone and computer are not on the same LAN, consider using [ngrok](https://ngrok.com/) for local development and testing. [Browsersync](https://www.browsersync.io/) is also worth a gander.)

<hr>

## Still need Help?

### Installation

First make sure you have Node installed.

On Mac OS X, it's recommended to use [Homebrew](http://brew.sh/) to install Node + [npm](https://www.npmjs.com):

    brew install node

To install the Node dependencies:

    npm install


### Local Development

To serve the site from a simple Node development server:

    npm start

Then launch the site from your favourite browser:

[__http://localhost:3000/__](http://localhost:3000/)

If you wish to serve the site from a different port:

    PORT=8000 npm start


## License

This program is free software and is distributed under an [MIT License](LICENSE).