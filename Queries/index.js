module.exports = queries = {
    getAllValidFlights: (dateTime) =>`SELECT flights.*, dates.* FROM flights,  dates WHERE departdate >='${dateTime}' AND flights.id = dates.idFlight;`,
    getFlights: (x,y,dateTime) =>`SELECT * FROM flights, dates ,escale where flights.id = dates.idFlight AND flights.departureStation = 'casablanca' AND flights.arrivalStation = 'dubai' AND dates.departdate >= '${dateTime}'`
}
