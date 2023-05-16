const connectToDb = require('./../model/db');
const db = connectToDb();



function checkIfUserIsSubscriber(user_id, channel_name) {
    return new Promise((resolve, reject) => {
        db.get(`
        SELECT * FROM subscriptions
        JOIN channels ON subscriptions.channel_id = channels.channel_id
        WHERE user_id = ? AND channel_name = ?`,
            [user_id, channel_name], (error, row) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(row ? true : false);
                }
            }
        );
    });
}

module.exports = { checkIfUserIsSubscriber };