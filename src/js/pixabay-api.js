import axios from 'axios';

const API_KEY = '46880481-b4b8ce5da8d344b0e4ba41140';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page: page,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}
