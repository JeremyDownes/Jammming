import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {searchResults: [], playlistName: 'Ya Mama', playlistTracks:  [] }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }

  addTrack(track) {
    let thisState = this.state
    if(thisState.playlistTracks.some(savedTrack=> savedTrack.id === track.id)) {
      return
    } else {
      thisState.playlistTracks.push(track)
    }
    this.setState(thisState)
  }

  removeTrack(track) {
    let thisState = this.state

    thisState.playlistTracks = thisState.playlistTracks.filter(savedTrack=> savedTrack.id!==track.id )
    console.log(thisState)
    this.setState(thisState)
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track=> track.key)
    Spotify.savePlaylist(this.state.playlistName,trackURIs)
  }

  async search(term) {
    let thisState = this.state 
    thisState.searchResults= await Spotify.search(term)
    this.setState(thisState)
  }

  next() {
    Spotify.next()
    this.search(Spotify.getSearchTerm())
  }


  prev() {
    Spotify.prev()
    this.search(Spotify.getSearchTerm())
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} next={this.next} prev={this.prev} offset={Spotify.getOffset()}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
