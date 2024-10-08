import React, { useState, useEffect } from 'react';
import Player from './components/Player';
import SongList from './components/SongList';
import SearchBar from './components/SearchBar';
import Tabs from './components/Tabs';
import './App.css';
import axios from 'axios';
import spotifyLogoImg from './assets/spotify-logo.png';
import userProfileImg from './assets/user-profile.jpg';

const App = () => {
	const [songs, setSongs] = useState([]);
	const [currentSong, setCurrentSong] = useState(null);
	const [tab, setTab] = useState('For You');
	const [searchQuery, setSearchQuery] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await axios.get('https://cms.samespace.com/items/songs');
				setSongs(response.data.data);
				setCurrentSong(response.data.data[0]);
			} catch (error) {
				console.error('Error fetching songs:', error);
			}
		};

		fetchSongs();
	}, []);

	const handleSearch = (query) => {
		setSearchQuery(query.toLowerCase());
	};

	const topTracks = songs.filter(song => song.top_track && song && song.name && song.artist &&
		(song.name.toLowerCase().includes(searchQuery) || song.artist.toLowerCase().includes(searchQuery)));

	const changeCurrentSong = (song, index) => {
		setCurrentSong(song);
		setCurrentIndex(index);
	}

	const changeCurrentSongByAction = (action) => {
		if (action === 'next') {
			setCurrentIndex(currentIndex + 1);
			setCurrentSong(songs[currentIndex]);
		}
		else if (action === 'previous') {
			setCurrentIndex(currentIndex - 1);
			setCurrentSong(songs[currentIndex]);
		}
	}

	const filteredSongs = songs.filter(song => song && song.name && song.artist &&
		(song.name.toLowerCase().includes(searchQuery) || song.artist.toLowerCase().includes(searchQuery)));

	return (
		<div className="app">
			<div className="first-section">
				<img className="spotify-logo" src={spotifyLogoImg} alt="Spotify Logo" />
				<img className="user-profile" src={userProfileImg} alt="User Profile" />
			</div>
			<div className="second-section">
				<Tabs currentTab={tab} onTabChange={setTab} />
				<SearchBar onSearch={handleSearch} />

				{tab === 'For You' && (
					<SongList
						songs={filteredSongs}
						currentSong={currentSong}
						onSelectSong={changeCurrentSong}
					/>
				)}
				{tab === 'Top Tracks' && (
					<SongList
						songs={topTracks}
						currentSong={currentSong}
						onSelectSong={changeCurrentSong}
					/>
				)}
			</div>
			{currentSong &&
				<div className="player-container"><Player song={currentSong} changeCurrentSong={changeCurrentSongByAction} /></div>}
		</div>
	);
};

export default App;
