
var ejs = require('ejs');
const fs=require('fs');

const path = require('path')

module.exports = routes = {
    assets: function (data, res) {
        let assets = fs.readFileSync(path.join(__dirname + "/.." + data.url));
        res.writeHead(200);
        res.write(assets);
        res.end("\n");
      },
    index: function(data, res) {
        // let html = ejs.render(fs.readFileSync("./views/home.ejs", "utf8"));
        //   res.writeHead(200);
        //   res.write(html);
        //   res.end("\n");
        ejs.renderFile('./views/index.ejs',{name:"test"},  function(err, str){
          res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                 if (err) {
                     console.log(err)
                         res.end();
                         } else {
                         res.end(str);
                         }
             });
    },
    test:function(data, res) {
        let html = ejs.render(fs.readFileSync("./views/test.ejs", "utf8"));
          res.writeHead(200);
          res.write(html);
          res.end("\n");
    },
    404:function (data,res) {
        let html = ejs.render(fs.readFileSync("./views/404.ejs", "utf8"));
        res.writeHead(200);
        res.write(html);
        res.end("\n");
    }
}