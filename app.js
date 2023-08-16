function displayMessages() {
    getAllMessages(function(messages) {
        const messageList = document.getElementById('messages');
        messageList.innerHTML = '';
        
        messages.forEach(msg => {
            const listItem = document.createElement('li');
            listItem.textContent = msg.content;
            messageList.appendChild(listItem);
        });
    });
}

initDB(displayMessages);  // Iniciar o DB e depois exibir as mensagens

document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const messageInput = document.getElementById('message-input');
    
    if (messageInput.value.trim() === '') return;
    
    addMessage(messageInput.value);
    displayMessages();
    
    messageInput.value = '';  // Reset the input
});
