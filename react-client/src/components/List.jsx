import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.auctions.length } auctions.
    { props.auctions.map(auction => <ListItem auction={auction}/>)}
  </div>
)

export default List;