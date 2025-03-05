const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',      // Host der Datenbank
    user: 'root',           // Benutzername
    password: 'Berlin2009', // Passwort für den Benutzer
    database: 'projekte' // Name der Datenbank
});

connection.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank: ', err);
        return;
    }
    console.log('Erfolgreich mit der Datenbank verbunden');
});

module.exports = connection;