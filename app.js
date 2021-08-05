const express = require("express");
const path = require("path");
const app = express();
const port = 8000; 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDivine', {useNewUrlParser: true, useUnifiedTopology: true});
const bodyparser = require("body-parser")

//define mongoose schema
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    textar: String
  });

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Saved to the database")
    }).catch(()=>{
        res.status(400).send("Not saved to the database")
    });
    // res.status(200).render('contact.pug');
})

app.get('/gallery', (req, res)=>{
    const params = {}
    res.status(200).render('gallery.pug', params);
})

app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
})

app.get('/services', (req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});