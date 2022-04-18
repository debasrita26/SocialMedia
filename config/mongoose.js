const mongoose = require('mongoose');
const env=require('./environment');

const u="mongodb+srv://debasrita:Mongodb12345@cluster0.88isc.mongodb.net/socialmedia_db"
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(u, {useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;