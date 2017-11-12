import React from 'react';

var ListItem = props => {
  
  var unsavedStyle = {
    backgroundColor: "lightGreen",
    color: "black"
  };
  
  var savedStyle = {
    backgroundColor: "lightGrey",
    color: "black"  
  };
  
    // need to fix this and reinsert...
  //       <img className="auction-img" src={props.auction.localImage}/>

  if (props.isSaved) { 
    return (<div className="auction-item cf">
      <img className="auction-img" src={props.auction.galleryURL}/>      
      <div className="auction-info"> 
        <div className="save-button" 
            style={savedStyle}> Saved!
        </div> 
        <div>Current price: {'$' + Number(props.auction.currentPrice).toFixed(2)}</div>
        <div>Item ID: &nbsp;
        <a href={props.auction.viewItemURL}>
          {props.auction.itemId}
        </a></div>
        <div className="auction-title">{props.auction.title} </div>
      </div>
    </div>); 
  } else {
    return (<div className="auction-item cf">
      <img className="auction-img" src={props.auction.galleryURL}/>
      <div className="auction-info">
        <div className="save-button" 
          style={unsavedStyle}
          onClick={() => {
              props.handleSaveClick(props.auction);
            }
          }> Save
        </div>
        <div>Current price: {'$' + Number(props.auction.currentPrice).toFixed(2)}</div>
        <div>Item ID: &nbsp;
        <a href={props.auction.viewItemURL}>
          {props.auction.itemId}
        </a></div>
        <div className="auction-title">{props.auction.title} </div>
      </div>
    </div>); 
  }
 
} 
  

export default ListItem;