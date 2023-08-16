const DB_NAME = 'messageDB';
const DB_VERSION = 1;
const DB_STORE_NAME = 'messages';
let db = null;

function initDB(callback) {
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

function addMessage(message) {
    if (!db) {
        console.error("Database hasn't been initialized.");
        return;
    }

    const transaction = db.transaction([DB_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(DB_STORE_NAME);
    store.add({ content: message });
}

function getAllMessages(callback) {
    if (!db) {
        console.error("Database hasn't been initialized.");
        return;
    }

    const transaction = db.transaction([DB_STORE_NAME], 'readonly');
    const store = transaction.objectStore(DB_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = function(event) {
        callback(event.target.result);
    };

    request.onerror = function(event) {
        console.error('Erro ao obter mensagens', event);
    };
}
