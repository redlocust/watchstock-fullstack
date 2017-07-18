import express from 'express';
import stocks  from './routes/stock.routes';
import path from 'path';
import bodyParser from 'body-parser';
const app = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', stocks);

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('ADD_STOCK', function(stockId){
    console.log('ADD_STOCK ', stockId);
    io.emit('UPDATE', stockId);
  });
});


io.on('connection', function(socket){
  socket.on('DELETE_STOCK', function(stockId){
    console.log('DELETE_STOCK ', stockId);
    io.emit('UPDATE', stockId);
  });
});

server.listen(process.env.PORT || 3000, () => {console.log(`listen on ${port}  port`)});

export default app;