let accessToken = null
let clientID = 'af91776e651941ddb5d9d3c1f4c70cd7'
let redirectURI = "http://localhost:3000/"
let searchTerm = ''
let offset = 0

const Spotify = {
	getOffset: () => {
		return offset
	},

	getSearchTerm: () => {
		return searchTerm
	},

	getAccessToken: () => {
		if(accessToken) {
			return accessToken
		} else if(window.location.href.match(/access_token=([^&]*)/)) {
			accessToken = window.location.href.match(/access_token=([^&]*)/)
			accessToken = accessToken[1]
			let expiresIn = window.location.href.match(/expires_in=([^&]*)/)
			expiresIn = expiresIn[1]
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`)
		}
	},

	search: (term) => {
		if (term !== searchTerm) { 
			offset = 0
		}
		searchTerm = term
		if (!accessToken) {
			Spotify.getAccessToken();
		}
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}&offset=${offset}`,{headers: {Authorization: `Bearer ${accessToken}`}
		}).then(response=> response.json()).then(jsonResponse=> {
			if(jsonResponse.tracks.items) {
				return ( jsonResponse.tracks.items.map(track=> {
					return {
						id: track.id,
						key: track.uri,
						track: track.name,
						artist: track.artists[0].name,
						album: track.album.name
					}
				}));
			}
		});
	},

	next: () => {
		offset += 20
	},

	prev: () => {
		offset -= 20
	},

	savePlaylist: async (playlistName,playlistURIs) => {
		if(!playlistName || !playlistURIs) {
			return
		}
		let token = accessToken
		let headers = {headers: {Authorization: `Bearer ${token}`} }
		let userID = await fetch('https://api.spotify.com/v1/me', headers)
		if (userID.ok) {
			userID = await userID.json() 
			userID = userID.id
			let playlistID = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
				method: 'POST',
				body: JSON.stringify({name: playlistName}),
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			})
			if(playlistID.ok) {
				playlistID = await playlistID.json()
				playlistID = playlistID.id
				await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
					method: 'POST',
					body: JSON.stringify({uris: playlistURIs}),
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})	
			}
		}
	}
}

export default Spotify