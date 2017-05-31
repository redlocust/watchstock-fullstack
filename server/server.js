import express from 'express';
import stocks  from './routes/stock.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', stocks);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, () => {console.log(`listen on ${port}  port`)});

export default app;