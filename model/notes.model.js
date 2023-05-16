const connectToDb = require('./db.js');
const db = connectToDb();
const moment = require('moment');
const { checkIfUserIsSubscriber } = require('../utils/dbDataCheck.js');


function getNotes(user_id) {

    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM notes WHERE poster = ? `,
            [user_id],
            (error, rows) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(rows)
                };
            });
    });
}

function getNotesByDateOldest (user_id) {

    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM notes WHERE poster = ? ORDER BY note_date ASC`,
            [user_id],
            (error, rows) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(rows)
                };
            });
    });
}
function getNotesByDateNewest (user_id) {

    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM notes ASC WHERE poster = ? ORDER BY note_date DESC`,
            [user_id],
            (error, rows) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(rows)
                };
            });
    });
}





async function postNotes(channel_name, note_title, note_content, user_id) {

    const userIsSubscriber = await checkIfUserIsSubscriber(user_id, channel_name);

    if (!userIsSubscriber) {
        return new Promise((resolve, reject) => {
            reject('User is not a subscriber');
        });
    }
    const createdAt = moment().format('YY/MM/DD-HH:mm');

    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO notes (channel_name, note_title, note_content, note_date, poster) VALUES (?, ?, ?, ?, ?)`,
            [channel_name, note_title, note_content, createdAt, user_id],
            (error) => {
                if (error) {
                    reject(error.message)
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
module.exports = { getNotes, postNotes, getNotesByDateOldest, getNotesByDateNewest };
