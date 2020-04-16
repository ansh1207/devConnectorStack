const express = require('express');
const connectDB = require('./config/database');
const auth = require('./routes/api/authentication');
const post = require('./routes/api/post');
const profile = require('./routes/api/profile');
const user = require('./routes/api/user');
const path = require('path');

const app = express();

//Connect to Database
connectDB();

//Init MiddleWare
app.use(express.json({ extended: false }));



//@routes Points to Routes Folder
app.use('/api/users', user);
app.use('/api/posts', post);
app.use('/api/profile', profile);
app.use('/api/auth', auth);

//Serve Static Assests in production
if (process.env.NODE_ENV === 'production') {
    //Set Static Folder
    app.use(express.static('client-build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


