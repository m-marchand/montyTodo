const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://mateo:getthisbread@cluster0.3rufh.mongodb.net/BiblioDB?retryWrites=true&w=majority"

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'biblioDB'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const schema = new mongoose.Schema({
    task: String,
});

const Model = mongoose.model('intuitDB', schema);

module.exports = Model;