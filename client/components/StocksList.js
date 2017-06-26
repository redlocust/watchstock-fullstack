import React, {Component} from 'react';

class StocksList extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(e) {
    let stockId = 'FB';
    e.preventDefault();
    this.props.handleDeleteStock(stockId);
  }

  render() {


  let stocksList = this.props.dataArray.map((stock) => {
      return <div className="stockList" key={stock.name}>
        {stock.name}
        <button className='stockList_button-delete' onClick={this.onDeleteClick}>x</button>
        </div>
  });


    return (
      <div>
          {stocksList}
      </div>
    )
  }
}

export default StocksList;