import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }

  render() {
    return (<div>
      <div><input className="search-field"></input></div>
      <div style={{float: "right"}} className="search-button"> Search </div>
    </div>)
  }

}

export default Search;