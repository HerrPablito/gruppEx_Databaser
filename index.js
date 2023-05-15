const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const userRouter = require('./routes/user.routes')
const notesRouter = require('./routes/notes.routes');

app.use(express.json())


app.use('/api/user', userRouter)

app.use('/api/notes', notesRouter)

app.listen(PORT, () => {
    //createDbConnection()
    console.log('server started at:' + PORT);
})