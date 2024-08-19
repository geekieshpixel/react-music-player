import React, { useState, useEffect } from 'react';
import Player from './components/Player';
import SongList from './components/SongList';
import SearchBar from './components/SearchBar';
import Tabs from './components/Tabs';
import './App.css';
import axios from 'axios';
import spotifyLogoImg from './assets/spotify-logo.png'; 

const App = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [tab, setTab] = useState('For You');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('https://cms.samespace.com/items/songs');
                console.log(response.data.data);
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

    const topTracks = songs.filter(song => song.top_track);

    const filteredSongs = songs.filter(song => song && song.name && song.artist &&
        (song.name.toLowerCase().includes(searchQuery) || song.artist.toLowerCase().includes(searchQuery)));

    return (
        <div className="app">
            <div>
                <img className="spotify-logo" src={spotifyLogoImg} alt="Spotify Logo Image"/>
            </div>
            <div>
                <Tabs currentTab={tab} onTabChange={setTab} />
                <SearchBar onSearch={handleSearch} />
                
                {tab === 'For You' && (
                    <SongList
                        songs={filteredSongs}
                        currentSong={currentSong}
                        onSelectSong={setCurrentSong}
                    />
                )}
                {tab === 'Top Tracks' && (
                    <SongList
                        songs={topTracks}
                        currentSong={currentSong}
                        onSelectSong={setCurrentSong}
                    />
                )}
            </div>
            {currentSong &&
                <div className="player-container"><Player song={currentSong} /></div>}
        </div>
    );
};

export default App;