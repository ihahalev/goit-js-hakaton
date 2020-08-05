import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const KEY = '676b050b9e1ae3ff4b7bb472f439b690';
const IMG_SERVER = 'https://image.tmdb.org/t/p/w500';

const fetchMoviesPopularDay = (page = 1) => {
  return axios
    .get(`/trending/movie/day?page=${page}&api_key=${KEY}`)
    .then(responce => {
      return responce.data;
    });
};

const fetchMoviesWithQuery = query => {
  return axios
    .get(`/search/movie?query=${query}&api_key=${KEY}`)
    .then(responce => {
      return responce.data;
    });
};

const fetchMovieDetails = id => {
  return axios.get(`/movie/${id}?api_key=${KEY}`).then(responce => {
    return responce.data;
  });
};

const fetchMovieCredits = id => {
  return axios.get(`/movie/${id}/credits?api_key=${KEY}`).then(responce => {
    return responce.data.cast;
  });
};

const fetchMovieReviews = id => {
  return axios.get(`/movie/${id}/reviews?api_key=${KEY}`).then(responce => {
    return responce.data.results;
  });
};

export default {
  page: 1,
  pages: 2,
  query: '',
  get searchQuery() {
    return this.query;
  },
  set searchQuery(str) {
    this.query = encodeURIComponent(str);
  },
  get totalPages() {
    return this.pages;
  },
  set totalPages(pgs) {
    this.pages = Number(pgs);
  },
  incrementPage() {
    if (this.page === this.pages) {
      return;
    }
    this.page += 1;
  },
  decrementPage() {
    if (this.page === 1) {
      return;
    }
    this.page -= 1;
  },
  resetPage() {
    this.page = 1;
  },
  currentPage() {
    return this.page;
  },
  fetchMoviesPopularDay,
  fetchMoviesWithQuery,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
  IMG_SERVER,
};
