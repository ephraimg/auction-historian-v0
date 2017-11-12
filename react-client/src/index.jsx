import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      auctions: [],
      savedAuctions: {}
    }
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.addToSaved = this.addToSaved.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/auctions', 
      success: auctions => {
        var newSavedAuctions = {};
        auctions[1].forEach(el => {
          newSavedAuctions[el.itemId] = true;
        });
        this.setState({
          auctions: auctions[0],
          savedAuctions: newSavedAuctions
        })
      },
      error: err => {
        console.log('err', err);
      }
    });
  }

  addToSaved(auction) {
    console.log('Saved auction!');
    var newItem = {};
    newItem[auction.itemId] = true;        
    var newSavedAuctions = $.extend({}, this.state.savedAuctions, newItem);
    this.setState({
      savedAuctions: newSavedAuctions
    }); 
  }

  handleSaveClick(auction) {
    var jsonData = JSON.stringify(auction);
    $.ajax({
      type: 'POST',      
      url: '/auctions',
      contentType: 'application/json',
      data: jsonData,
      success: (data) => {
        console.log('Sent POST to /auctions');
        this.addToSaved(auction);
      },
      error: (err) => {
        console.log('Error sending POST to /auctions:\n', err);
      }
    });    
  }
  
  render () {
    return (<div>
      <h1>Auction Historian</h1>
      <List auctions={this.state.auctions} 
            savedAuctions={this.state.savedAuctions}  
            handleSaveClick={this.handleSaveClick}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));