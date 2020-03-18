const express = require('express');
const connectDB = require('./config/database');

const authentication = require('./routes/api/authentication');
const post = require('./routes/api/post');
const profile = require('./routes/api/profile');
const user = require('./routes/api/user');

const app = express();

connectDB();

const PORT = process.env.PORT || 5000; 

//@routes Points to Routes Folder
app.use('/api/users' , user);
app.use('./api/posts' , post);
app.use('./api/profiles' , profile);
app.use('./api/auth' , authentication);

app.get('/' , (req , res) => res.send('API Running'));

app.listen(PORT , () => {
    console.log(`Server started on port ${PORT}`);
});


