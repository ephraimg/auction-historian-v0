import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.unsavedStyle = {
      backgroundColor: "lightGreen",
      color: "black"
    };
    this.savedStyle = {
      backgroundColor: "lightGrey",
      color: "black"  
    };
    this.loadEbayImage = this.loadEbayImage.bind(this);
  }

  loadEbayImage(e) {
    e.target.src = this.props.auction.galleryURL;
  }
  
  // note: local image link breaks on heroku! need to save on aws?

  render() {
    if (this.props.isSaved) { 
      return (<div className="auction-item cf">
        <img className="auction-img" 
          src={this.props.auction.localImage}
          onError={this.loadEbayImage}
        />
        <div className="auction-info"> 
          <div className="save-button" 
              style={this.savedStyle}> Saved!
          </div> 
          <div>Current price: {'$' + Number(this.props.auction.currentPrice).toFixed(2)}</div>
          <div className="auction-id">ebay ID: &nbsp;
          <a href={this.props.auction.viewItemURL}>
            {this.props.auction.itemId}
          </a></div>
          <div>{this.props.auction.title} </div>
        </div>
      </div>); 
    } else {
      return (<div className="auction-item cf">
        <img className="auction-img" src={this.props.auction.galleryURL}/>
        <div className="auction-info">
          <div className="save-button" 
            style={this.unsavedStyle}
            onClick={() => {
                this.props.handleSaveClick(this.props.auction);
              }
            }> Save
          </div>
          <div>Current price: {'$' + Number(this.props.auction.currentPrice).toFixed(2)}</div>
          <div className="auction-id">ebay ID: &nbsp;
          <a href={this.props.auction.viewItemURL}>
            {this.props.auction.itemId}
          </a></div>
          <div className="auction-title">{this.props.auction.title} </div>
        </div>
      </div>); 
    }
  }
 
} 
  

export default ListItem;