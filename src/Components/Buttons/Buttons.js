import React, { Component } from 'react';
import './buttons.css';

class Buttons extends React.Component {
	
	handleClick(direction) {
		if (direction === 'prev') {
			this.props.prev() 
		} else {
			this.props.next()
		}
	}

	renderPrev() {
		if(this.props.offset > 19) {
			return <button className = 'prev' onClick = {this.handleClick.bind(this,'prev')}>Prev</button>
		}
	}

	render() {
		return (
			<div className='buttons'>
				{this.renderPrev()}
				<button className = 'next' onClick = {this.handleClick.bind(this,'next')}>Next</button>
			</div>
		)
	}
}

export default Buttons