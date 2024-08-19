import axios from 'axios';

const API_URL = 'https://cms.samespace.com/items/songs';

export const fetchSongs = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const fetchSpecificSong = async (url) => {
  const response = await axios.get(url);
  return response.data.data;
};
