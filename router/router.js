
var ejs = require('ejs');
const fs=require('fs');

module.exports = routes = {
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