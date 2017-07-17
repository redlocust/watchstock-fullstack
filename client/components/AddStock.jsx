import React, {Component} from 'react';

class AddStock extends Component {
  constructor(props) {
    super(props);
    this.onAddStock = this.onAddStock.bind(this);
  }

  onAddStock(e) {
    e.preventDefault();
    this.props.handleAddStock(this.textInput.value);
    this.textInput.value = '';
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Enter stock code" ref={(input) => { this.textInput = input; }}/>
          <button type="submit"  onClick={this.onAddStock}>Add stock</button>
        </form>
      </div>
    );
  }
}

export default AddStock