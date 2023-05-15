const createDbConnection = require('./db');
const db = createDbConnection();


//db.run(`INSERT INTO users VALUES ("x1", "Pab", "pwd123") `)
 
db.run(`INSERT INTO subscriptions VALUES ("x1", "1") `)
