import React, {Component} from 'react';

class StocksList extends Component {
  constructor(props) {
    super(props)
  }

  render() {


  let stocksList = this.props.dataArray.map((stock) => {
      return <div className="stockList" key={stock.name}>
        {stock.name}
        <button className='stockList_button-delete'>x</button>
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