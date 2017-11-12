import $ from 'jquery';
import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchText: e.target.value
    }, () => console.log(this.state.searchText));
  }

  handleClick() {
    console.log('Searched ', this.state.searchText);
    var query = this.state.searchText;

    // send search req to server, wait for response
    $.ajax({
      type: 'POST',
      url: '/search',
      data: {
        query
      },
      ContentType: 'application/json',
      processData: false,
      success: (data) => {
        // var refined = this.refineData(data);
        // console.log(refined);
        console.log(data);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }


  render() {
    return (<div>
      <div>
        <input className="search-field"
          onChange={this.handleChange}>
        </input>
      </div>
      <div style={{float: "right"}} 
        className="search-button"
        onClick={this.handleClick}
      > 
        Search </div>
      </div>)
  }

}

export default Search;