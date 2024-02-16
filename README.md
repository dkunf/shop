uses local fileserver to serve pictures for this "shop" because local image paths are changed during build process so it cannot be used...probably...

So i serve images from another port 3232 on localhost.

this is code of server so you can set it up easily:

// npm init
// npm i express
// add hidden file .gitIgnore with contents:
// node_modules
//to keep node_modules not pushed to gitHub
// create files folder
//add to folder files which you want to serve
//now link to your image src="http://localhost:3232/[image-name]",
//this links may not work with "localhost" word. You may need to change it to
//real ip address of your localhost like 127.0.0.1. my works with localhost.

const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3232;

app.get("/", (req, res) => {
const dirContents = [];
fs.readdir("./files", (err, files) => {
let htmlArr = files
.map((f) => `<span><a href=${f} target='_blank'>${f}</a></span><br/>`)
.join(" ");
res.send(htmlArr);
});

console.log("got request");
// res.send("images are served on \n http://localhost:3232/[image-name]");
});

app.use(express.static(path.join(\_\_dirname, "files")));

app.listen(PORT, () => {
console.log(`listening on port ${PORT}`);
});
