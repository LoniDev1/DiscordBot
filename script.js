document.getElementById('deleteWebhookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const webhookUrl = document.getElementById('webhookUrlInput').value;
    
    // Hier müsstest du den Code hinzufügen, um den Webhook zu löschen.
    // Dies erfordert einen Serverseitigen Endpoint, der die Discord API verwendet.
    // Für diese Demonstration wird nur eine Meldung angezeigt.

    document.getElementById('message').textContent = 'Webhook erfolgreich gelöscht!';
});
