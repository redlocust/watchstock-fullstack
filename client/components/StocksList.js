import React, {Component} from 'react';
import './style.scss';

class StocksList extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(stockId, e) {
    e.preventDefault();
    this.props.handleDeleteStock(stockId);
  }

  render() {
    let stocksList = this.props.dataArray.map((stock) => {
      return <div className="stockList col-md-3" key={stock.name}>
        {stock.name}
        <button className='stockList__button-delete btn btn-primary' onClick={this.onDeleteClick.bind(this, stock.name)}>x</button>
      </div>
    });

    return (
      <div className="row">
        {stocksList}
      </div>
    )
  }
}

export default StocksList;