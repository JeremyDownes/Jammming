import React, { Component } from 'react';
import './playlist.css';
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component {
	constructor(props) {
		super(props)
		this.handleNameChange = this.handleNameChange.bind(this)
	}

	handleNameChange(e) {
		this.props.onNameChange(e.target.value)
	}

	render() {
		return (
			<div className="Playlist">
  			<input placeholder="New Playlist" onChange={this.handleNameChange}/>
  			<TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemove='true'/>
  			<a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
		)
	}
}

export default Playlist