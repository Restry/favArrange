var read = require('node-readability');
var fs = require('fs');
read('http://www.shouce.ren/api/view/a/3064', function(err, article, meta) {
  // Main Article
  console.log(article.content);
  // Title
  console.log(article.title);

  // HTML Source Code
  //console.log(article.html);
  // DOM
 // console.log(article.document);

  // Response Object from Request Lib
 // console.log(meta);

    fs.writeFile("./tmp/"+ article.title+'.html',article.content, 'utf-8',function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(article.title+":The file was saved!");
    }); 

  // Close article to clean up jsdom and prevent leaks
  article.close();
});