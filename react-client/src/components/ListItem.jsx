import React from 'react';
import $ from 'jquery';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  

  
  render() {
    return (<div className="auction-item cf">
      <img className="auction-img" src={props.auction.galleryURL}/>
      <button className="save-button" 
              onClick={() => props.handleSaveClick(props.auction)} >
                Save
      </button>
      <br/>
      ebay item id:
      <a href={props.auction.viewItemURL}>
        {props.auction.itemId}
      </a>  
      <br/>
      auction title: {props.auction.title}
      <br/>
      current price: {'$' + Number(props.auction.sellingStatus[0].currentPrice[0]["__value__"]).toFixed(2)}
    </div>)   
  }
  
}

export default ListItem;