import React from 'react';
import './Tabs.css';

const Tabs = ({ currentTab, onTabChange }) => {
	return (
		<div className="tabs">
			<button
				className={currentTab === 'For You' ? 'active' : ''}
				onClick={() => onTabChange('For You')}
			>
				For You
			</button>
			<button
				className={currentTab === 'Top Tracks' ? 'active' : ''}
				onClick={() => onTabChange('Top Tracks')}
			>
				Top Tracks
			</button>
		</div>
	);
};

export default Tabs;
