/**
 * Created by asistent on 05.05.2016.
 */

// TODO: API key: trnsl.1.1.20160505T191746Z.34dc4dd9c27b1897.e27acf0b35410b8882ecab6c36fc361b4c87a855

var http = require('http');
var fs = require('fs');
var urlutils = require('url');
var request = require('request');

var PORT = 8000;

function onRequest(req, res) {
    var parse = urlutils.parse(req.url, true);
    var page = parse.pathname;
    var text = parse.query.text;

    if (page === '/') {
        rend(fs.readFileSync('index.html'));
    }
    if (page === '/ajax') {
        translate(text, rend);
    }

    function rend(render) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(render);
        res.end();
    }
}

function translate(text, callback) {
    request.get('https://translate.yandex.net/api/v1.5/tr.json/translate?'
        + 'key=trnsl.1.1.20160505T191746Z.34dc4dd9c27b1897.e27acf0b35410b8882ecab6c36fc361b4c87a855&lang=en-ru&text='
        + text,
        function (err, res, body) {
            if (err) {
                callback(JSON.stringify({'status': 'error'}));
            } else {
                if (res.statusCode === 200) {
                    var data = JSON.parse(body);
                    console.log(data.text[0]);
                    callback(JSON.stringify({'status': 'success', 'msg': data.text[0]}));
                } else {
                    callback(JSON.stringify({'status': 'error'}));
                }
            }
        })
}

http.createServer(onRequest).listen(PORT, function () {
    console.log("Let's get started: http://localhost:" + PORT);
});