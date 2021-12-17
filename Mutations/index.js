module.exports = mutations = {
    addClient: (fName, lName, email, nbrPhone) => `INSERT INTO client( fName, lName, email, nbrPhone) VALUES ('${fName}', '${lName}','${email}', '${nbrPhone}')`,
    addReservation: (places, idFlight, idClient) => `INSERT INTO reservation (places, idFlight, idClient) VALUES ('${places}','${idFlight}', '${idClient}')`,
}