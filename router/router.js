
var ejs = require('ejs');
const fs = require('fs');

const fetcher = require('../Helpers/fetcher')
const Queries = require('../Queries/index')

const path = require('path')

module.exports = routes = {
    assets: function (data, res) {
        let assets = fs.readFileSync(path.join(__dirname + "/.." + data.url));
        res.writeHead(200);
        res.write(assets);
        res.end("\n");
    },
    bookFlights: function (data, res) {
        ejs.renderFile('./views/book-flights.ejs', { name: "test" }, function (err, str) {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            if (err) {
                console.log(err)
                res.end();
            } else {
                res.end(str);
            }
        });
    },
    index: async function (data, res) {
        // let html = ejs.render(fs.readFileSync("./views/home.ejs", "utf8"));
        //   res.writeHead(200);
        //   res.write(html);
        //   res.end("\n");

        let today = new Date();

        let year = String(today.getFullYear()).padStart(2, "0");
        let mounth = String(today.getMonth() + 1).padStart(2, "0");
        let day = String(today.getDate()).padStart(2, "0");

        let hours = String(today.getHours()).padStart(2, "0");
        let minutes = String(today.getMinutes()).padStart(2, "0");
        let seconds = String(today.getSeconds()).padStart(2, "0");

        let dateTime = year + '-' + mounth + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
        console.log(dateTime);
        let fetchedData = await fetcher.get(Queries.getFlights(dateTime));
        console.log(fetchedData);
        ejs.renderFile('./views/index.ejs', { name: fetchedData }, function (err, str) {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            if (err) {
                console.log(err)
                res.end();
            } else {
                res.end(str);
            }
        });
    },
    test: function (data, res) {
        let html = ejs.render(fs.readFileSync("./views/test.ejs", "utf8"));
        res.writeHead(200);
        res.write(html);
        res.end("\n");
    },
    404: function (data, res) {
        let html = ejs.render(fs.readFileSync("./views/404.ejs", "utf8"));
        res.writeHead(200);
        res.write(html);
        res.end("\n");
    }
}