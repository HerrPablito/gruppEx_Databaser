const uuid = require('uuid-random')
const connectToDb = require('./db.js');
const db = connectToDb();




function saveUser(user_name, password) {

    return new Promise((resolve, reject) => {
        db.run(`
        INSERT INTO Users (user_id, user_name, password) VALUES (?, ?, ?)`,
            [uuid(), user_name, password],
            function (error) {
                if (error) {
                    reject(error.message);
                } else {
                    resolve({ success: true, lastID: this.lastID });
                }
            }
        );
    });

}


function showSubscriptedNotes(user_id) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM notes 
        JOIN channels ON notes.channel_name = channels.channel_name 
        JOIN  subscriptions ON channels.channel_id = subscriptions.channel_id
        WHERE subscriptions.user_id = ?`, 
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

 function showSubscriptedNotesByDateOldest(user_id) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM notes 
        JOIN channels ON notes.channel_name = channels.channel_name 
        JOIN  subscriptions ON channels.channel_id = subscriptions.channel_id
        WHERE subscriptions.user_id = ? ORDER BY note_date ASC`, 
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

 function showSubscriptedNotesByDateNewest(user_id) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM notes 
        JOIN channels ON notes.channel_name = channels.channel_name 
        JOIN  subscriptions ON channels.channel_id = subscriptions.channel_id
        WHERE subscriptions.user_id = ? ORDER BY note_date DESC`, 
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





module.exports = { saveUser, showSubscriptedNotes, showSubscriptedNotesByDateOldest, showSubscriptedNotesByDateNewest };