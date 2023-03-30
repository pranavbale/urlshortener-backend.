require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const client = require('./db');

//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


//db connection
client();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on port ${process.env.PORT}`);
    }
});