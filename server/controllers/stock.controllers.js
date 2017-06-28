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

export function deleteStock(req, res) {

  let stockCode = req.params.stockcode;

  console.dir(req.params);

  console.log(`delete id: ${stockCode}`);
  console.log("403 ",stockCode);

  if (!stockCode) {
    res.status(403).end();
  }


  console.log(stockCode);

  Stock.findOneAndRemove({code: stockCode})
    .exec(function(err, stock) {
      console.log('err ', err);
      console.log('stock ', stock);
    });

}