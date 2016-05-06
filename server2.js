/**
 * Created by asistent on 06.05.2016.
 */

var http = require('http');
var request = require('request');
var cheerio = require('cheerio');

var PORT = 8000;
var string = [];

request('http://www.volzsky.ru/', function (error, response, html) {
    if (error) {
        return console.error('error is: ', error);
    }

    if (response.statusCode !== 200) {
        return console.log('incorrect statusCode: ', response.statusCode);
    }

    var $ = cheerio.load(html);

    $('a.morda').each(function (i, img) {
                    string[i] = $(img).text().trim() + '<br>';

    });

    string = string.join('');
});

http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    response.write(string);
    response.end();
}).listen(PORT, function () {
    console.log("Let's get started: ", PORT);
});