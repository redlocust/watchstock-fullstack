import Stock from '../models/stock';
import cuid from 'cuid';

export function getStocks(req, res) {
  Stock.find().exec((err, stocks) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({stocks});
  });
}

export function addStock(req, res) {
  // if (!req.body.stock.code) {
  //   res.status(403).end();
  // }

  const newStock = new Stock({
    code:'OPEC',
    cuid: cuid()
  });

  newStock.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({post: saved});
  });
}