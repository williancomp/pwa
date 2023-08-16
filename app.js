document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const messageInput = document.getElementById('message-input');
    addMessage(messageInput.value);

    messageInput.value = ''; // limpar o campo

    displayMessages(); // atualizar a lista de mensagens
});

function displayMessages() {
    const messagesList = document.getElementById('messages-list');
    messagesList.innerHTML = ''; // Limpar mensagens antigas

    getAllMessages(function(messages) {
        messages.forEach(message => {
            const listItem = document.createElement('li');
            listItem.textContent = message.text;
            messagesList.appendChild(listItem);
        });
    });
}

// Exibir mensagens iniciais
displayMessages();
