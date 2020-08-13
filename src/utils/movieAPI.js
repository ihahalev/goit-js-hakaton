import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const KEY = '676b050b9e1ae3ff4b7bb472f439b690';
const IMG_SERVER = 'https://image.tmdb.org/t/p/w500';

export default {
  page: 1,
  total_pages: null,
  query: '',

  fetchMoviesPopularDay() {
    return axios
      .get(`/trending/movie/day?page=${this.page}&api_key=${KEY}`)
      .then(responce => {
        return responce.data;
      });
  },

  fetchMoviesWithQuery() {
    return axios
      .get(`/search/movie?query=${this.query}&api_key=${KEY}&page=${this.page}`)
      .then(responce => {
        return responce.data;
      });
  },

  fetchMovieDetails(id) {
    return axios.get(`/movie/${id}?api_key=${KEY}`).then(responce => {
      return responce.data;
    });
  },

  get searchQuery() {
    return this.query;
  },
  set searchQuery(str) {
    this.query = encodeURIComponent(str);
  },
  get totalPages() {
    return this.total_pages;
  },
  set totalPages(pgs) {
    this.total_pages = Number(pgs);
  },
  incrementPage() {
    if (this.page === this.total_pages) {
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
  set currentPage(page) {
    this.page = Number(page);
  },
  get currentPage() {
    return this.page;
  },

  IMG_SERVER,
};
