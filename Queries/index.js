module.exports = queries = {
    getFlights: (dateTime) =>`SELECT flights.*, dates.* FROM flights,  dates WHERE departdate >='${dateTime}' AND flights.id = dates.idFlight;`
}
