import React, {Component} from 'react';
import './style.css';

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
      return <div className="col-md-3 stocklist__item" key={stock.name}>
        <p className="stocklist__name">{stock.name}</p>
        <button className='stocklist__button-delete ' onClick={this.onDeleteClick.bind(this, stock.name)}>x</button>
      </div>
    });

    return (
      <div className="stocklist row">
        {stocksList}
      </div>
    )
  }
}

export default StocksList;