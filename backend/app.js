const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://userLuk3s:Lukas0905@cluster0.av3qbp4.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/stuff', (req, res, next) => {
   delete req.body._id;
   const thing = new Thing({
       ...req.body
   });
   thing.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
});

module.exports = app;