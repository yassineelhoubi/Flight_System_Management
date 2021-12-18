
var ejs = require('ejs');
const fs = require('fs');

const fetcher = require('../Helpers/fetcher')
const Queries = require('../Queries/index')
const Mutations = require("../Mutations");
const mailer = require("../Helpers/mailer.js");

const path = require('path')

const formidable = require('formidable');


module.exports = routes = {
    assets: function (data, res) {
        let assets = fs.readFileSync(path.join(__dirname + "/.." + data.url));
        res.writeHead(200);
        res.write(assets);
        res.end("\n");
    },
    submit: function (data, res, req) {
        let form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {

            //handle errors
            if (err) {
                console.error(err);
                return;
            }
            let obj;
            obj = { fields: fields, files: files }
            let fetchedData = await fetcher.get(Queries.getFlightInfo(obj.fields.idFlight));

            var dataObj = Object.assign({}, fetchedData[0], obj.fields);
            // If seats are available
            if (dataObj.nbrPlaces <= dataObj.places) {
                // insert into Client
                let client = await fetcher.post(Mutations.addClient(dataObj.fName, dataObj.lName, dataObj.email, dataObj.nbrPhone))
                // inserto into reservation
                let reservation = await fetcher.post(Mutations.addReservation(dataObj.nbrPlaces, dataObj.idFlight, client.insertId))
                // render ticket template
                ejs.renderFile('./views/ticket.ejs', { data: dataObj }, async function (err, str) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    if (err) {
                        console.log(err)
                        res.end();
                    } else {
                        // send email
                        const html = await ejs.renderFile("./views/ticket.ejs", { data: dataObj })
                        await mailer(html, dataObj.email, dataObj.fName, dataObj.lName);
                        res.end(str);
                    }
                });
            }
            // If seats are not available
            else {
                // Add a value to the object to know that seats are not available
                dataObj.seats = true;
                // return to the reserve template
                ejs.renderFile('./views/reserve.ejs', { data: dataObj }, function (err, str) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    if (err) {
                        console.log(err)
                        res.end();
                    } else {
                        res.end(str);
                    }
                });
                return;
            }


        })
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
                obj = { fields: fields, files: files }

                let today = new Date();

                let hours = String(today.getHours()).padStart(2, "0");
                let minutes = String(today.getMinutes()).padStart(2, "0");
                let seconds = String(today.getSeconds()).padStart(2, "0");
                // YYYY-MM-DD H:M:S

                let dateTime = obj.fields.departDate + ' ' + hours + ':' + minutes + ':' + seconds;

                let fetchedData = await fetcher.get(Queries.getFlights(obj.fields.departStation, obj.fields.arrivalStation, dateTime));

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

        if (req.method === "POST") {

            let form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {

                //handle errors
                if (err) {
                    console.error(err);
                    return;
                }
                let obj;
                obj = { fields: fields, files: files }
                let fetchedData = await fetcher.get(Queries.getFlightInfo(obj.fields.idvol));


                ejs.renderFile('./views/reserve.ejs', { data: fetchedData[0] }, function (err, str) {
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