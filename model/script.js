const createDbConnection = require('./db');
const db = createDbConnection();


db.run(`INSERT INTO users VALUES ("123456", "Rob", "pwd123") `)
 
