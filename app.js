document.getElementById('addProjectForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Verhindert das Neuladen der Seite beim Absenden des Formulars

    // Daten aus den Eingabefeldern holen
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const projectStartDate = document.getElementById('projectStartDate').value;
    const projectEndDate = document.getElementById('projectEndDate').value;

    // Überprüfen, ob alle Felder ausgefüllt sind
    if (projectName && projectDescription && projectStartDate && projectEndDate) {
        // JSON-Daten an den Server senden
        fetch('/add-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName: projectName,  // Projektname
                projectDescription: projectDescription,  // Projektbeschreibung
                projectStartDate: projectStartDate,  // Startdatum
                projectEndDate: projectEndDate  // Enddatum
            })
        })
        .then(response => response.json())  // Antwort vom Server
        .then(data => {
            if (data.message) {
                // Erfolgsmeldung und Umleitung
                alert(data.message);
                window.location.href = 'admin_dashboard.html';  // Nach dem Hinzufügen zurück zum Dashboard
            } else {
                // Fehlernachricht anzeigen
                document.getElementById('errorMessage').textContent = 'Fehler: ' + data.error;
            }
        })
        .catch(error => {
            console.error('Fehler beim Senden der Daten:', error);
            document.getElementById('errorMessage').textContent = 'Es gab einen Fehler beim Senden der Daten.';
        });
    } else {
        // Falls ein Feld leer bleibt
        document.getElementById('errorMessage').textContent = 'Bitte fülle alle Felder aus!';
    }
});