import React from 'react';
import './SongList.css';

const SongList = ({ songs, currentSong, onSelectSong }) => {
    console.log(songs)
    console.log(!songs);
    console.log(songs.length);
    if (!songs || songs.length === 0) {
        return <div>No songs available</div>;
    }

    return (
        <div className="song-list">
            {songs.map((song, index) => (
                <div
                    key={song.id}
                    className={`song-item ${currentSong && currentSong.id === song.id ? 'active' : ''}`}
                    onClick={() => onSelectSong(song, index)}
                >
                    {song.cover && <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />}
                    <div className="song-info">
                        <p className="song-name">{song.name}</p>
                        <p className="song-artist">{song.artist}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default SongList;
