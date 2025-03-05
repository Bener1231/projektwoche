fetch('http://localhost:3000/projekte')
    .then(response => response.json())
    .then(data => {
        const projektSelect = document.getElementById('projekt-select');
        data.forEach(projekt => {
            const option = document.createElement('option');
            option.value = projekt.id;
            option.textContent = projekt.projekt;
            projektSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Fehler beim Abrufen der Projekte:', error));