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

module.exports = { saveUser };