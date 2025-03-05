const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const PORT = 3000;

// CORS aktivieren
app.use(cors());
app.use(express.json());

// Datenbankverbindung
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Berlin2009',
    database: 'projekte'
});

// Verbindung zur Datenbank herstellen
connection.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank: ', err);
        return;
    }
    console.log('Erfolgreich mit der Datenbank verbunden');
});

// Middleware für JSON-Parsing
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Interner Serverfehler', error: err.toString() });
});

// API-Endpoint für Projekte anzeigen
app.get('/projekte', (req, res) => {
    const query = 'SELECT * FROM projekte';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Projekte: ', err);
            res.status(500).json({ message: 'Fehler beim Abrufen der Projekte' });
            return;
        }
        res.json(results);
    });
});

// API-Endpoint für Projekte hinzufügen
app.post('/projekte', (req, res) => {
    const { name, beschreibung, startdatum, enddatum, lehrer, platzanzahl } = req.body;

    if (!name || !beschreibung || !startdatum || !enddatum || !lehrer || !platzanzahl) {
        return res.status(400).json({ message: 'Bitte füllen Sie alle Felder aus.' });
    }

    const insertQuery = 'INSERT INTO projekte (name, beschreibung, startdatum, enddatum, lehrer, platzanzahl) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(insertQuery, [name, beschreibung, startdatum, enddatum, lehrer, platzanzahl], (err, results) => {
        if (err) {
            console.error('Fehler beim Einfügen des Projekts: ', err);
            return res.status(500).json({ message: 'Fehler beim Einfügen des Projekts' });
        }
        return res.status(201).json({ message: 'Projekt erfolgreich hinzugefügt!' });
    });
});


// API-Endpoint für die Anmeldung zu einem Projekt
app.post('/anmelden', (req, res) => {
    console.log('Anmeldedaten:', req.body); // Debugging
    const { vorname, name, email, projekt } = req.body;

    if (!vorname || !name || !email || !projekt) {
        console.log('Fehlende Felder:', { vorname, name, email, projekt }); // Debugging
        return res.status(400).json({ message: 'Bitte füllen Sie alle Felder aus.' });
    }

    const checkEmailQuery = 'SELECT * FROM anmeldungen WHERE email = ?';
    connection.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error('Fehler bei der Überprüfung der E-Mail: ', err); // Debugging
            return res.status(500).json({ message: 'Fehler bei der Überprüfung der E-Mail' });
        }

        if (results.length > 0) {
            console.log('E-Mail bereits registriert:', email); // Debugging
            return res.status(400).json({ message: 'E-Mail bereits registriert.' });
        }

        const insertQuery = 'INSERT INTO anmeldungen (vorname, name, email, projekt) VALUES (?, ?, ?, ?)';
        connection.query(insertQuery, [vorname, name, email, projekt], (err, results) => {
            if (err) {
                console.error('Fehler beim Einfügen der Anmeldung: ', err); // Debugging
                return res.status(500).json({ message: 'Fehler beim Einfügen der Anmeldung' });
            }

            console.log('Anmeldung erfolgreich eingefügt:', results); // Debugging
            return res.status(201).json({ message: 'Erfolgreich angemeldet!' });
        });
    });
});




// API-Endpoint zum Löschen von Projekten
app.delete('/projekte/:id', (req, res) => {
    const projektId = req.params.id;
    console.log('Projekt-ID zum Löschen:', projektId); // Debugging

    const deleteQuery = 'DELETE FROM projekte WHERE id = ?';
    connection.query(deleteQuery, [projektId], (err, results) => {
        if (err) {
            console.error('Fehler beim Löschen des Projekts: ', err);
            return res.status(500).json({ message: 'Fehler beim Löschen des Projekts', error: err });
        }

        if (results.affectedRows === 0) {
            console.log('Projekt nicht gefunden:', projektId); // Debugging
            return res.status(404).json({ message: 'Projekt nicht gefunden' });
        }

        console.log('Projekt erfolgreich gelöscht:', projektId); // Debugging
        return res.status(200).json({ message: 'Projekt erfolgreich gelöscht!' });
    });
});
// Debugging-Endpoint zum Testen der Antworten
app.get('/debug', async (req, res) => {
    const response = {
        status: 200,
        message: 'Debugging-Informationen',
        headers: req.headers,
        body: req.body
    };
    console.log('Debugging-Response:', response);
    res.json(response);
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});