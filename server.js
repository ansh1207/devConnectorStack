const express = require('express');
const connectDB = require('./config/database');
const auth = require('./routes/api/authentication');
const post = require('./routes/api/post');
const profile = require('./routes/api/profile');
const user = require('./routes/api/user');

const app = express();

//Connect to Database
connectDB();

//Init MiddleWare
app.use(express.json({extended : false}));

const PORT = process.env.PORT || 5000; 

//@routes Points to Routes Folder
app.use('/api/users' , user);
app.use('/api/posts' , post);
app.use('/api/profile' , profile);
app.use('/api/auth' , auth);

app.listen(PORT , () => {
    console.log(`Server started on port ${PORT}`);
});


