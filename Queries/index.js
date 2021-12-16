module.exports = queries = {
    getFlightsStation: (dateTime) => `SELECT flights.departureStation , flights.arrivalStation FROM flights,  dates WHERE departdate >='${dateTime}' AND flights.id = dates.idFlight;`,
    getFlights: (departStation, arrivalStation, dateTime) => `SELECT * FROM flights, dates ,escale where flights.id = dates.idFlight AND flights.id = escale.idFlight AND flights.departureStation = '${departStation}' AND flights.arrivalStation = '${arrivalStation}' AND dates.departdate >= '${dateTime}'`,
    getFlightInfo: (id) => `SELECT flights.*, DATE_FORMAT(dates.departdate, "%d/%m/%Y at %H:%i:%s") departdate, DATE_FORMAT(dates.arrivaldate, "%d/%m/%Y at %H:%i:%s") as arrivaldate ,escale.locations FROM flights , dates , escale WHERE flights.id = ${id} AND flights.id = dates.idFlight AND flights.id = escale.idFlight`
}
