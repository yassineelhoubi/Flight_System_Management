# Flight System Management

## Contexte du projet
```
Dans le Cadre de l’automatisation du système de réservation, la société SafiAir souhaite créer une application web qui va permettre la réservation des vols à ses client via un site responsive. Nous supposons que le client (code, nom, prénom, email, téléphone) accède à l’IHM réservation. Le client saisit la ville de départ/d’arrivé, l’heure départ /d’arrivé, la date de départ/Arrivé, et le nombre de places. Le système affiche une liste de propositions de vols sur le menu réservation, indiquant la description des vols. Si l’un des vols nécessite une escale, dans ce cas l’aéroport escale est affiché aussi. Le client choisit le vol qui lui intéresse, et il demande la réservation de celui-ci. Le système vérifie la disponibilité du vol. Si le vol est disponible, un message est affiché au client « la confirmation de la réservation sera complétée avec le paiement ».

Le client est ensuite redirigé vers la page de paiement.

Le client reçoit un email de confirmation de sa réservation avec les détails du vol choisi.

Le Système enregistre par la suite le détail de la réservation dans un fichier (txt)

Un Administrateur de la société SafiAir s’occupe de la gestion des vols (Crud)

Le client peut ajouter des extras à son vols( exemple: Assurance, Repas, Hôtel...)

la tarifications des vols est en MAD

NB : Un Vol de doit pas dépasser 20 passagers

Travail à Faire :

• Réaliser une Application Web en Node.Js (Natif)

• Maquetter les interfaces graphiques avec un outil de votre choix à l'aide aussi du HTML, CSS et JavaScript, EJS

• Proposez une base de données adéquate sous MySql qui répond efficacement au cahier des charges

• Réaliser le nombre de page selon votre choix à fin de garantir la procédure de réservation en ligne
```
## Learning methods
```
Travail Individuel

Deadline 15/12/2021
```
## Performance criteria
```
Utilisation du natif dans node js avec les normes standards du code
```
## Assessment methods
```
Savoir Expliquer et exécuter le code l'application
```
## How to run this project
```
1 . Create Database Called flight_system_management.
2 . Emport this File DB/**flight_system_management.sql** to Your Database.
3 . Install the Necessary Package By : **npm install**.
4 . Run the Project By: **node index**, or By Development Mode: **npm run start**.
```
## Important
```
This project does not contain a control panel to add flights or services.
You can find here DB/**queries.sql** the required requests for add new flights.
```