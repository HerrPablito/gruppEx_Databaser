const connectToDb = require('./db.js');
const db = connectToDb();
const moment = require('moment');

function getNotes(user_id) {
  
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM notes WHERE poster = ?`, 
        [user_id],
            (error, rows) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve (rows)
                };
            }); 
    });

}

function postNotes(channel_name, note_title, note_content, user_id) {
    const createdAt = moment().format('YY/MM/DD-HH:mm');

    return new Promise((resolve, reject) => {
       db.run(`INSERT INTO notes (channel_name, note_title, note_content, note_date, poster) VALUES (?, ?, ?, ?, ?)`,
  [channel_name, note_title, note_content, createdAt, user_id],
        (error) => {
            if (error) {
                reject(error.message);
            }
            else {
                const noteData = {
                    channel_name: channel_name,
                   note_title: note_title,
                    note_content: note_content,
                    createdAt: createdAt,
                    user_id: user_id
                }
                resolve({ success: true, noteData: noteData });
            };
        }); 
    })

}
module.exports =  { getNotes, postNotes };
