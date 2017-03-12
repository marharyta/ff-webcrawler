var http = require('http');
var fs = require('fs');
var server = http.createServer();
var cheerio = require('cheerio');
var jquery = require('jquery');
var jsdom = require('jsdom');
var link = "www.asos.com";

// now that server is running
server.listen(1337, '127.0.0.1', function(){
  tryMe();
  //observeFile();
});

 const writable = fs.createWriteStream('file.txt');
  const writableJSON = fs.createWriteStream('asos.txt');
 const readable = fs.createReadStream('file.txt');
var bufferArray = [];
var html = "";

 function tryMe(){
    var options = {
      hostname: link,
      port: 80,
      method: "GET",
      path: "/search/workwear?q=workwear"
    };
    var asosRequest = http.request(options);
    asosRequest.on("response", function(res){
      res.on("data", function(data){
        console.log("data as buffer");
        res.setEncoding('utf8');
        bufferArray.push(data);
        //writable.write(data);
        html = html + data;
      });
      res.on("readable", function(data){
        console.log("redable");
      });
      res.on("end", function(){
        //console.log(bufferArray[1]);
        writable.write("test8");
        writable.end();
        let $ = cheerio.load(html);
        let parsed = $('head');
        let productName = $('.product-container .product .name-fade .name');
        let imageURL = $('.product-img');
        //console.log(imageURL[12]);
        //console.log(productName[13]);
        for (var i = 0; i < imageURL.length; i++) {
          var obj = {
            "name": "name",
            "imgURL": imageURL[i].attribs.src
          };
          writableJSON.write("test");
        };
        
        console.log("end");

      })
      console.log("response");
      console.log(res.statusCode);
      console.log(res.statusMessage);
    });
    
    asosRequest.end();

    observeFile();
 }

function observeFile(){
    console.log("this works as reader");
    readable.on("data", function(data){
        console.log("reading!");
      });
}

jsdom.env(
  "https://iojs.org/dist/",
  ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    console.log("there have been", window.$("a").length - 4, "io.js releases!");
  }
);

