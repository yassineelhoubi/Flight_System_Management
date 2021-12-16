
var ejs = require('ejs');
const fs = require('fs');

const fetcher = require('../Helpers/fetcher')
const Queries = require('../Queries/index')

const path = require('path')

const formidable = require('formidable');

var util = require('util');

module.exports = routes = {
    assets: function (data, res) {
        let assets = fs.readFileSync(path.join(__dirname + "/.." + data.url));
        res.writeHead(200);
        res.write(assets);
        res.end("\n");
    },
    book_flights: function (data, res, req) {
        let flights = [];
        // get the inserted data from front 
        if (req.method === "POST") {

            let form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {

                //handle errors
                if (err) {
                    console.error(err);
                    return;
                }
                let obj;
                util.inspect(obj = { fields: fields, files: files })

                let today = new Date();

                let hours = String(today.getHours()).padStart(2, "0");
                let minutes = String(today.getMinutes()).padStart(2, "0");
                let seconds = String(today.getSeconds()).padStart(2, "0");
                // YYYY-MM-DD H:M:S

                let dateTime = obj.fields.departDate + ' ' + hours + ':' + minutes + ':' + seconds;

                let fetchedData = await fetcher.get(Queries.getFlights(obj.fields.departStation, obj.fields.arrivalStation, dateTime));
                console.log(fetchedData)
                ejs.renderFile('./views/bookFlights.ejs', { data: fetchedData }, function (err, str) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    if (err) {
                        console.log(err)
                        res.end();
                    } else {
                        res.end(str);
                    }
                });
            })
        }
    },
    reserve: function (data, res, req) {
        // let flights = [];
        // get the inserted data from front 
        if (req.method === "POST") {

            let form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {

                //handle errors
                if (err) {
                    console.error(err);
                    return;
                }
                let obj;
                util.inspect(obj = { fields: fields, files: files })
                let fetchedData = await fetcher.get(Queries.getFlightInfo(obj.fields.idvol));
                const dataObj = fetchedData[0] 
                console.log("sf",dataObj);

                ejs.renderFile('./views/reserve.ejs', { data: dataObj }, function (err, str) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    if (err) {
                        console.log(err)
                        res.end();
                    } else {
                        res.end(str);
                    }
                });
            })
        }
    },
    index: async function (data, res) {


        let today = new Date();

        let year = String(today.getFullYear()).padStart(2, "0");
        let mounth = String(today.getMonth() + 1).padStart(2, "0");
        let day = String(today.getDate()).padStart(2, "0");

        let hours = String(today.getHours()).padStart(2, "0");
        let minutes = String(today.getMinutes()).padStart(2, "0");
        let seconds = String(today.getSeconds()).padStart(2, "0");

        let dateTime = year + '-' + mounth + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

        let fetchedData = await fetcher.get(Queries.getFlightsStation(dateTime));
        // console.log(fetchedData)
        // const dataObj = JSON.parse(JSON.stringify(fetchedData))
        // const dataObj = fetchedData
        departStation = fetchedData.map((e) => e.departureStation);
        arrivalStation = fetchedData.map((e) => e.arrivalStation);
        let finalDepartStation = [...new Set(departStation)]
        let finalArrivalStation = [...new Set(arrivalStation)]




        ejs.renderFile('./views/index.ejs', { departStation: finalDepartStation, arrivalStation: finalArrivalStation }, function (err, str) {
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