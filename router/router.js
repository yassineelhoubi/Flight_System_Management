
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
    home: function(data, res) {
        let html = ejs.render(fs.readFileSync("./views/home.ejs", "utf8"));
          res.writeHead(200);
          res.write(html);
          res.end("\n");
    },
    test:function(data, res) {
        let html = ejs.render(fs.readFileSync("./views/test.ejs", "utf8"));
          res.writeHead(200);
          res.write(html);
          res.end("\n");
    },
}