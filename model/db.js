const sqlite3 = require('sqlite3').verbose();

function createDbConnection() {
    const db = new sqlite3.Database('./shuiDb.sqlite', (error) => {
        if (error) {
            return console.log('Error while connecting to database', error);
        } else {
            createTable(db);
            console.log('Connected to database');
        }
    })
    return db;

}

function createTable(db) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        user_name TEXT NOT NULL,
        password TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS subscriptions (
        user_id TEXT,
        channel_id TEXT,
        PRIMARY KEY (user_id, channel_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (channel_id) REFERENCES channels(owner_id)
    );
    CREATE TABLE IF NOT EXISTS channels (
        channel_id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id TEXT NOT NULL,
        channel_name text NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users(user_id)
       );
    CREATE TABLE IF NOT EXISTS notes (
        note_id INTEGER PRIMARY KEY AUTOINCREMENT,
        channel_name TEXT NOT NULL,
        note_title TEXT NOT NULL,
        note_content TEXT NOT NULL,
        note_date TEXT NOT NULL,
        poster text NOT NULL,
        FOREIGN KEY (channel_name) REFERENCES channels(channel_name)
        FOREIGN KEY (poster) REFERENCES users(user_id)

        );
    `);

}



module.exports = createDbConnection;