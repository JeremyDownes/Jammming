import React, { Component } from 'react';
import './searchResults.css';
import TrackList from '../TrackList/TrackList'
import Buttons from '../Buttons/Buttons'

class SearchResults extends Component {

	renderButtons() {
		if (this.props.searchResults.length > 0 || this.props.offset > 0) {
			return <Buttons prev={this.props.prev} next={this.props.next} offset={this.props.offset}/>
		}
	}


	render() {
		return (
			<div className="SearchResults">
  			<h2>Results</h2>
	  		<TrackList tracks = {this.props.searchResults} onAdd={this.props.onAdd}/>
	  		{this.renderButtons()}
			</div>
		)
	}
}

export default SearchResults