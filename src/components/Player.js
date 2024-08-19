import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faVolumeHigh, faCirclePlay, faCirclePause, faBackward, faForward, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import './Player.css';

const Player = ({ song }) => {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [audioUrl, setAudioUrl] = useState(null);
	const [volume, setVolume] = useState(0.5); // Initial volume at 50%
	const [isMuted, setIsMuted] = useState(false); // Mute state
	const [currentSongIndex, setCurrentSongIndex] = useState(0); // Current song index

	const currentSong = song[currentSongIndex];
	console.log(currentSong, "vurrentttttt")

	 // Ensure playlist is defined and has at least one song
	 const hasSongs = song && song.length > 0;

	 useEffect(() => {
		 if (hasSongs) {
			 const fetchAudioUrl = async () => {
				 try {
					 const response = await axios.get(song[currentSongIndex].url, {
						 responseType: 'arraybuffer', // Important to get the raw binary data
					 });
 
					 const blob = new Blob([response.data], { type: 'audio/mpeg' }); // Create a Blob from the data
					 const url = window.URL.createObjectURL(blob); // Generate a URL for the Blob
					 console.clear();
					 console.log(blob, "Audio Blob Loaded");
					 setAudioUrl(url);
				 } catch (error) {
					 console.error('Error fetching the audio file:', error);
				 }
			 };
 
			 fetchAudioUrl();
		 }
	 }, [currentSongIndex, hasSongs, song]);


	useEffect(() => {
		const fetchAudioUrl = async () => {
			try {
				const response = await axios.get(song.url, {
					responseType: 'arraybuffer', // Important to get the raw binary data
				});

				const blob = new Blob([response.data], { type: 'audio/mpeg' }); // Create a Blob from the data
				const url = window.URL.createObjectURL(blob); // Generate a URL for the Blob
				console.clear();
				console.log(blob, "hhhhh");
				setAudioUrl(url);
			} catch (error) {
				console.error('Error fetching the audio file:', error);
			}
		};

		fetchAudioUrl();
	}, [song.id]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? 0 : volume;
		}
	}, [volume, isMuted]);

	const handleBackward = () => {
		setCurrentSongIndex((prevIndex) =>
			prevIndex === 0 ? song.length - 1 : prevIndex - 1
		);
		setIsPlaying(true);
	};

	const handleForward = () => {
		setCurrentSongIndex((prevIndex) =>
			prevIndex === song.length - 1 ? 0 : prevIndex + 1
		);
		setIsPlaying(true);
	};


	useEffect(() => {
		if (audioRef.current && audioUrl) {
			audioRef.current.load();
			if (isPlaying) {
				audioRef.current.play();
			}
		}
	}, [audioUrl]);

	const togglePlayPause = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleTimeUpdate = () => {
		if (audioRef.current) {
			const currentTime = audioRef.current.currentTime;
			const duration = audioRef.current.duration;
			setProgress((currentTime / duration) * 100);
		}
	};

	const handleSeek = (e) => {
		const seekTime = (e.target.value / 100) * audioRef.current.duration;
		audioRef.current.currentTime = seekTime;
	};

	const toggleMute = () => {
		setIsMuted(!isMuted);
	};


	return (
		<div className="player">
			{audioUrl ? (
				<>
					<audio
						ref={audioRef}
						onTimeUpdate={handleTimeUpdate}
					>
						<source src={audioUrl} type="audio/mpeg" />
						Your browser does not support the audio element.
					</audio>
					<div className="player-controls">
						<div className="song-info">
							 {/* <p className="song-title">{currentSong.name}</p>
                            <p className="song-artist">{currentSong.artist}</p>
                            <img src={`https://cms.samespace.com/assets/${currentSong.cover}`} alt={currentSong.name} className="cover" /> */}
							<p className="song-title">{song.name}</p>
							<p className="song-artist">{song.artist}</p>
							<img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.title} className="cover" />
						</div>
						<input
							type="range"
							value={progress}
							onChange={handleSeek}
							className="seeker"
						/>
						<br></br>

						<div className="action-buttons">
							<button className="btn circular-btn">
								<FontAwesomeIcon icon={faEllipsis} />
							</button>
							<div className="center-actions">
								<button className="btn back-forth-btn" onClick={handleBackward}>
									<FontAwesomeIcon icon={faBackward} />
								</button>
								<button onClick={togglePlayPause} className="btn play-pause-btn">
									<FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} />
								</button>
								<button className="btn back-forth-btn" onClick={handleForward}>
									<FontAwesomeIcon icon={faForward} />
								</button>
							</div>
							<button className="btn circular-btn" onClick={toggleMute}>
								<FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeHigh} />
							</button>
						</div>
					</div>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Player;
