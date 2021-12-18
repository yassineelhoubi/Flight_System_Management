
INSERT INTO flights (companyName, places, departureStation, arrivalStation, price) values ("France Air" ,"20","Casablanca", "Madrid", "123"),("Turkish Airlines" ,"20","Marrakech", "Paris", "232"),("RAM" ,"20","Tanger","Layoun","534"),("Quatar Airways" ,"20","California", "casablanca", "4253");
insert into dates (departdate,arrivaldate,idFlight) values ('25-02-26 5:34:09 AM','25-02-26 5:34:09 PM', 5 ),('25-02-26 5:34:09 AM','25-02-26 5:34:09 PM', 6 ),('25-02-26 5:34:09 AM','25-02-26 5:34:09 PM', 7 ),('25-02-26 5:34:09 AM','25-02-26 5:34:09 PM', 8 );
INSERT into escale (idFlight) values (5),(7);
INSERT into escale (idFlight , locations) values (8, "New York"),(6, "Madrid");

