const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const DB = 'mongodb+srv://saurabhS:saurabhS@cluster0.gbotrrm.mongodb.net/jwtauth?retryWrites=true&w=majority'
app.use(cors())
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log('connection successful') }).catch((err) => { console.log(err) });
app.use(express.json())
app.use(require('./routes/route'))

// app.get('/', (req, res) => { res.send('Hello World!') });

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) });