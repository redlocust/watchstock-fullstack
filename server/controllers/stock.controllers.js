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

  console.log("req.body! ", req.body);

  if (!req.body.code) {
    res.status(403).end();
  }

  const newStock = new Stock({
    code: req.body.code,
    cuid: cuid()
  });

  newStock.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({post: saved});
  });
}