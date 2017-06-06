import express from 'express';
import * as StockController from '../controllers/stock.controllers';
const router = express.Router();

router.route('/').get(function (req, res) {
  res.send({message: 'Hello from API'});
});




router.route('/stocks').get(StockController.getStocks);
//router.route('/stocks/:stockcode').get(StockController.getOneStock);
//router.route('/stocks').get(StockController.addStock);
router.route('/stocks').post(StockController.addStock);


export default router;
