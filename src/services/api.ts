const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = import.meta.env.VITE_API_KEY;

// now playing movies
export const nowPlaying = async () => {
   const response = await fetch(
      `${baseUrl}/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`
   );
   const data = await response?.json();
   return data;
};

// trending
export const trending = async (time = 'day', options = 'movie') => {
   const response = await fetch(
      `${baseUrl}/trending/${options}/${time}?language=en-US&page=1&api_key=${apiKey}`
   );
   const data = await response?.json();
   return data;
};

// popular
export const popular = async (type: string) => {
   const response = await fetch(
      `${baseUrl}/${type}/popular?language=en-US&page=1&api_key=${apiKey}`
   );
   const data = await response?.json();
   return data;
};

// coming soon
export const comingSoon = async (type: string, key = 'upcoming') => {
   const response = await fetch(
      `${baseUrl}/${type}/${key}?language=en-US&page=1&api_key=${apiKey}`
   );
   const data = await response?.json();
   return data;
};

// video
export const video = async (type: string, id: number) => {
   const response = await fetch(
      `${baseUrl}/${type}/${id}/videos?language=en-US&page=1&api_key=${apiKey}`
   );
   const data = await response?.json();
   return data;
};

// details
export const details = async (type: string, id: number) => {
   const response = await fetch(
      `${baseUrl}/${type}/${id}?language=en-US&api_key=${apiKey}`
   );
   const data = await response?.json();
   return data;
};

// similar
export const similar = async (type: string, id: number) => {
   const response = await fetch(
      `${baseUrl}/${type}/${id}/similar?language=en-US&api_key=${apiKey}`
   );
   const data = await response?.json();
   return data;
};

// Each Tv and Movie info
export const info = async (type: string, page: number) => {
   const response = await fetch(
      `${baseUrl}/discover/${type}?language=en-US&page=${page}&api_key=${apiKey}`
   );
   const data = await response?.json();
   return data;
};

// Search
export const fetchSearch = async (query: string) => {
   const response = await fetch(
      `${baseUrl}/search/multi?query=${query}&language=en-US&page=1&api_key=${apiKey}`
   );
   const data = await response?.json();
   return data;
};

// Genre
export const genre = async (type: string) => {
   const response = await fetch(
      `${baseUrl}/genre/${type}/list?language=en&api_key=${apiKey}`
   );
   const data = await response?.json();
   return data;
};

// get movies and shows by genres

export const getByGenre = async (type: string, value: number) => {
   const response = await fetch(
      `${baseUrl}/discover/${type}?language=en-US&page=1&sort_by=popularity.desc&with_genres=${value}&api_key=${apiKey}`
   );
   const data = await response?.json();
   return data;
};
