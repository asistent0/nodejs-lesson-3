/**
 * Created by asistent on 06.05.2016.
 */

var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var Iconv  = require('iconv').Iconv;

var PORT = 8000;
var string = [];
var iconv = new Iconv('cp1251', 'utf-8');


request({url: 'http://www.volzsky.ru/index.php?wx=16', encoding: null}, function (error, response, html) {
    if (error) {
        return console.error('error is: ', error);
    }

    if (response.statusCode !== 200) {
        return console.log('incorrect statusCode: ', response.statusCode);
    }

    html = iconv.convert(html).toString();

    var $ = cheerio.load(html);

    $('div.btc_block-1').each(function (i, element) {
        $(element).find('div.btc_block-1_1.btc_h').children('a').attr('target','_blank');
        $(element).find('div.btc_block-1_2').children('a').children('img').removeAttr('align');

        string[i] = '<div>' + $(element).find('div.btc_block-1_1.btc_h').children('a') + '<br>' +
            $(element).find('div.btc_block-1_2').children('a').children('img') + '<br>' +
            $(element).find('div.btc_block-1_2').children('p.btc_p.btc_inf').html().split('|')[0] + '</div><br>';
    });


    string = string.join('')
        .replace(new RegExp("index.php",'g'), "http://www.volzsky.ru/index.php")
        .replace(new RegExp("img/",'g'), "http://www.volzsky.ru/img/");
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