create Table dates (
    id INT PRIMARY KEY AUTO_INCREMENT ,
    departdate DATETIME,
    arrivaldate DATETIME,
    idFlight INT,
    FOREIGN KEY (idFlight) REFERENCES flights(id)
);
drop table dates;

create table escale (
    id INT PRIMARY KEY AUTO_INCREMENT,
    locations VARCHAR (55) NULL,
    idFlight INT,
    FOREIGN KEY (idFlight) REFERENCES flights(id)
);
drop table escale;
create table client (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fName VARCHAR(55),
    lName VARCHAR(55),
    email VARCHAR(55),
    nbrPhone INT(11),
    code VARCHAR(55) NULL
);
drop table client;
create table reservation (
    id INT PRIMARY KEY,
    places INT,
    idFlight INT,
    idClient INT,
    FOREIGN KEY (idFlight) REFERENCES flights(id),
    FOREIGN KEY (idClient) REFERENCES client(id)

);
drop table reservation;
INSERT INTO flights (companyName, places, departureStation, arrivalStation, price) values ("Expidia" ,"20","casablanca", "madrid", "123"),("Royal Air Maroc" ,"20","marrakech", "paris", "2332");
insert into dates (departdate,arrivaldate,idFlight) values ('22-01-19 10:34:09 AM','22-01-19 3:34:09 PM', 9 );
INSERT into escale (idFlight) values (9);
