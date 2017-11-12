import React from 'react';
import $ from 'jquery';
import ListItem from './ListItem.jsx';
import Search from './Search.jsx';

const List = props => {
  return (<div>

      <div className="tabs cf" >
        <div className="tab">View live <br/> auctions</div>
        <div className="tab">View saved <br/> auctions</div>
        <div style={{float: "right"}}>
          <Search />
        </div>
      </div>
      <div>
        There are {props.auctions.length} auctions.
      </div>

      <div>
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