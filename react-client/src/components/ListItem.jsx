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
  
  var isSaved = props.savedList[props.auction.itemId[0]];
  
  return (<div className="auction-item cf">
    <img className="auction-img" src={props.auction.galleryURL}/>
    <div className="auction-info"> { isSaved 
      ? <div className="save-button" 
          style={savedStyle}> Saved!
        </div> 
      : <div className="save-button" 
          style={unsavedStyle}
          onClick={() => {
              props.handleSaveClick(props.auction);
              props.addToSaved(props.auction.itemId[0]);
            }
          }> Save
        </div> }
      Item ID:
      <a href={props.auction.viewItemURL}>
        {props.auction.itemId}
      </a><br/>
      {props.auction.title} <br/>
      Current price: {'$' + Number(props.auction.sellingStatus[0].currentPrice[0]["__value__"]).toFixed(2)}
    </div>
  </div>);   
} 
  

export default ListItem;