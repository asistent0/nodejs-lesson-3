/**
 * Created by asistent on 06.05.2016.
 */

var http = require('http');
var request = require('request');
var cheerio = require('cheerio');

var PORT = 8000;
var string = [];

request('https://geekbrains.ru/posts', function (error, response, html) {
    if (error) {
        return console.error('error is: ', error);
    }

    if (response.statusCode !== 200) {
        return console.log('incorrect statusCode: ', response.statusCode);
    }

    var $ = cheerio.load(html);

    $('div.col-sm-6.col-md-4.col-xs-6.event.search_row').each(function (i, element) {
        $(element).find($('.text-dark')).parent('a').attr('target','_blank');

            string[i] = $(element).find($('.img_preview')) + '<br>' +
                $(element).find($('.text-dark')).parent('a') + '<br>' +
                $(element).find($('div.m-t-sm')).next() + '<br>';

            return (i !== 10);

    });

    string = string.join('').replace(new RegExp("/posts/",'g'), "https://geekbrains.ru/posts/");
});

http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html;  charset=utf-8'
    });

    response.write(string);
    response.end();
}).listen(PORT, function () {
    console.log("Let's get started: http://localhost:" + PORT);
});