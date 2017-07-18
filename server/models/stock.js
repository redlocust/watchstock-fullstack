import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/watchstock', (error) => {
mongoose.connect("mongodb://redlocust:78957895@ds163612.mlab.com:63612/heroku_9zrzpbcf", (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  }
});

var querySchema = mongoose.Schema({
  code: String,
  cuid: String,
});


var Stock = mongoose.model('Stock', querySchema);

export default Stock;