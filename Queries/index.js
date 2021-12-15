module.exports = queries = {
    getFlightsStation: (dateTime) =>`SELECT flights.departureStation , flights.arrivalStation FROM flights,  dates WHERE departdate >='${dateTime}' AND flights.id = dates.idFlight;`,
    getFlights: (departStation,arrivalStation,dateTime) =>`SELECT * FROM flights, dates ,escale where flights.id = dates.idFlight AND flights.id = escale.idFlight AND flights.departureStation = '${departStation}' AND flights.arrivalStation = '${arrivalStation}' AND dates.departdate >= '${dateTime}'`
}
