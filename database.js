const DB_NAME = 'pwa-messages-db';
const DB_VERSION = 1;
const DB_STORE_NAME = 'messages';

let db;


function initDB(callback) {  // Adicionar um callback
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = function(event) {
        console.error('Erro ao abrir o banco de dados', event);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        callback();  // Chamar o callback após a inicialização bem-sucedida
    };

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        db.createObjectStore(DB_STORE_NAME, { autoIncrement: true });
    };
}


// Função para adicionar uma mensagem ao IndexedDB
function addMessage(message) {
    const transaction = db.transaction([DB_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(DB_STORE_NAME);
    store.add({ text: message });
}

// Função para obter todas as mensagens do IndexedDB
function getAllMessages(callback) {
    const transaction = db.transaction([DB_STORE_NAME], 'readonly');
    const store = transaction.objectStore(DB_STORE_NAME);
    
    const request = store.openCursor();
    const messages = [];

    request.onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            messages.push(cursor.value);
            cursor.continue();
        } else {
            callback(messages);
        }
    };
}

initDB( );
