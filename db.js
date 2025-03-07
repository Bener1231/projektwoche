const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'https://74ba-2a03-fc82-2d4-d700-bdd3-e5a-867a-c8b4.ngrok-free.app',  // Hier soll die ngrok-URL rein
    user: 'root',
    password: 'gQ4eeRwmXNTKpibYeyXsN5dJaeKdbYXU',
    database: 'projekte'
});
connection.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank: ', err);
        return;
    }
    console.log('Erfolgreich mit der Datenbank verbunden');
});

module.exports = connection;