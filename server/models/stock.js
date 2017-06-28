import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/watchstock', (error) => {
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