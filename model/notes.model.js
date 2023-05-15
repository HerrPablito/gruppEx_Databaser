const connectToDb = require('./db.js');
const db = connectToDb();

function getNotes(user_id) {
  
    return new Promise((resolve, reject) => {
        db.all(`SELECT (user_id) FROM notes VALUES (?)`, 
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
  db.run(`INSERT INTO notes (channel_name, note_title, note_content, poster) VALUES (?, ?, ?, ?)`,
  [channel_name, note_title, note_content, user_id],
        (error) => {
            if (error) console.log(error.message);

            console.log('note added')
        })

}
module.exports =  getNotes;
