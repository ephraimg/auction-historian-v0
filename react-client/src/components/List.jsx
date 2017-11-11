import React from 'react';
import $ from 'jquery';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedAuctions: {}
    };
    this.addToSaved = this.addToSaved.bind(this);
  }
  
  componentDidUpdate() {

  }
  
  addToSaved(itemId) {
    console.log('Saved auction!');
    var newItem = {};
    newItem[itemId] = true;        
    var newSaved = $.extend({}, this.state.savedAuctions, newItem);
    this.setState({
      savedAuctions: newSaved
    }); 
  }

  render() {
    return (<div>
      <h4> List Component </h4>
      There are { this.props.auctions.length } auctions.
      { this.props.auctions.map(auction => 
        <ListItem 
          auction={auction}
          savedList={this.state.savedAuctions} 
          handleSaveClick={this.props.handleSaveClick}
          addToSaved={this.addToSaved} 
        />
      )}
    </div>)
  }
   
}

export default List;