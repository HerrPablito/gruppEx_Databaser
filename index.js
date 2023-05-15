const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const userRouter = require('./routes/user.routes')
const notesRouter = require('./routes/notes.routes');
const channelsRouter = require('./routes/channels.routes');
const createDbConnection = require('./model/db.js');
app.use(express.json())


app.use('/api/user', userRouter)

app.use('/api/notes', notesRouter)

app.use('/api/channels', channelsRouter )

app.listen(PORT, () => {
    createDbConnection()
    console.log('server started at:' + PORT);
})