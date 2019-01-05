import React, { Component } from 'react';
import './trackList.css';
import Track from '../Track/Track'

class TrackList extends React.Component {
	render() {
		return (
			<div className="TrackList">
				{
					this.props.tracks.map(track=> <Track key = {track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemove}/>)
				}
			</div>
		)
	}
}

export default TrackList