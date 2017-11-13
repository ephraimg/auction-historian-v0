import React from 'react';
import $ from 'jquery';
import ListItem from './ListItem.jsx';
import Search from './Search.jsx';

const List = props => {
  return (<div>

      <div className="tabs cf" >
        <div className="tab" 
            onClick={props.getSavedAuctions}
        >Show saved <br/> auctions</div>
        <div style={{float: "right"}}>
          <Search 
            updateDisplayedAuctions={props.updateDisplayedAuctions}
          />
        </div>
      </div>
      <div>
        You have {Object.keys(props.savedAuctions).length} saved auctions.
      </div>

      <div className="wrapper">
        {props.auctions.map(auction => {
          return (<ListItem 
            key={auction.itemId}
            isSaved={!!props.savedAuctions[auction.itemId]} 
            auction={auction}
            handleSaveClick={props.handleSaveClick}
          />)}
        )}
      </div>

    </div>
  )
}

export default List;