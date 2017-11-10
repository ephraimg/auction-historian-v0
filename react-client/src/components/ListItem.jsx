import React from 'react';

const ListItem = (props) => (
  <div>
    ebay item id: 
      <a href={props.auction.viewItemURL}>
        { props.auction.description }
      </a>  
    <br/>
    auction title: { props.auction.title }
    <br/>
    <img src={ props.auction.galleryURL }/>
    current price: { props.auction.sellingStatus[0].currentPrice[0]["__value__"]}
  </div>
)

export default ListItem;