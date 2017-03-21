var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
        }
        done();
    }
});

// Queue just one URL, with default callback
c.queue('http://www.baidu.com');

// Queue a list of URLs
c.queue(['https://bl.ocks.org/kaleb/632e77875ae7171033b5','http://www.alsrobot.cn/search.php?encode=YToxNzp7czo0OiJzb3J0IjtzOjg6Imdvb2RzX2lkIjtzOjU6Im9yZGVyIjtzOjQ6IkRFU0MiO3M6MTI6ImltYWdlRmllbGRfeCI7czoyOiIxOSI7czoxMjoiaW1hZ2VGaWVsZF95IjtzOjE6IjgiO3M6NDoicGFnZSI7czoxOiIxIjtzOjc6ImRpc3BsYXkiO3M6NDoiZ3JpZCI7czo4OiJrZXl3b3JkcyI7czowOiIiO3M6ODoiY2F0ZWdvcnkiO3M6MToiMCI7czo1OiJicmFuZCI7czoxOiIwIjtzOjk6Im1pbl9wcmljZSI7czoxOiIwIjtzOjk6Im1heF9wcmljZSI7czoxOiIwIjtzOjY6ImFjdGlvbiI7czowOiIiO3M6NToiaW50cm8iO3M6MDoiIjtzOjEwOiJnb29kc190eXBlIjtzOjE6IjAiO3M6NToic2NfZHMiO3M6MToiMCI7czo4OiJvdXRzdG9jayI7czoxOiIwIjtzOjE4OiJzZWFyY2hfZW5jb2RlX3RpbWUiO2k6MTQyODk3MjQwMzt9']);

// Queue URLs with custom callbacks & parameters
c.queue([{
    uri: 'http://www.cnblogs.com/iyangyuan/p/3471267.html',
    jQuery: false,

    // The global callback won't be called
    callback: function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            console.log('Grabbed', res.body.length, 'bytes');
        }
        done();
    }
}]);

// Queue some HTML code directly without grabbing (mostly for tests)
c.queue([{
    html: '<p>This is a <strong>test</strong></p>'
}]);