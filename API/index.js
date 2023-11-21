const express = require('express')

const UserRouter = require('./routes/user.routes')

const PORT = process.env.PORT || 8081
const cors = require('cors');

const app = express()

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use('', UserRouter)


app.listen(PORT, ()=>console.log('server started on port', PORT))