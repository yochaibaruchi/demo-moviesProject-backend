const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRouter')
const movieRouter = require('./routers/moviesRouter')
const memberRouter = require('./routers/membersRouter')
const subsRouter = require('./routers/subscriptionsRouter')
const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/users', userRouter)
app.use('/api/members', memberRouter)
app.use('/api/movies', movieRouter)
app.use('/api/subscriptions', subsRouter)
require('./dataBase/dataConection')
const port = 3000
app.listen(port, () => { console.log(`app is running in http://localhost:${port}/api/`); })