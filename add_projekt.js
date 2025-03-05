document.getElementById('addProjektForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    // Daten aus dem Formular holen
    const projektName = document.getElementById('projekt_name').value;
    const projektBeschreibung = document.getElementById('projekt_beschreibung').value;
    const projektStartdatum = document.getElementById('projekt_startdatum').value;
    const projektEnddatum = document.getElementById('projekt_enddatum').value;

    // Daten an den Server senden
    fetch('http://localhost:3000/projekte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: projektName,
            beschreibung: projektBeschreibung,
            startdatum: projektStartdatum,
            enddatum: projektEnddatum
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message); // Erfolgsmeldung anzeigen
            window.location.href = 'admin_dashboard.html'; // Zurück zum Dashboard
        } else {
            alert('Fehler beim Hinzufügen des Projekts.');
        }
    })
    .catch(error => {
        console.error('Fehler:', error);
        alert('Es gab einen Fehler beim Senden der Daten.');
    });
});