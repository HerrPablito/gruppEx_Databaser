const uuid = require('uuid-random')
const connectToDb = require('./db.js');
const db = connectToDb();




function saveChannel(user_id, channel_name) {

    return new Promise((resolve, reject) => {
        db.run(`
        INSERT INTO channels (owner_id, channel_name) VALUES (?, ?)`,
            [user_id, channel_name],
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

function subscribe(user_id, channel_name) {

    return new Promise((resolve, reject) => {
        db.run(`
        INSERT INTO subscriptions (user_id, channel_name) VALUES (?, ?)`,
            [user_id, channel_name],
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
module.exports = {saveChannel, subscribe};