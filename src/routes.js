export default {
  home: '/',
  library: '/myLibrary',
  libWatched: '/myLibrary/watched',
  libQueue: '/myLibrary/queue',
  search: '/search',
  id: null,
  details: '',
  get movieID() {
    return this.id;
  },
  set movieID(id) {
    this.id = Number(id);
    this.details = `/id${this.id}`;
  },
  get movieDetails() {
    return this.details;
  },
  set movieDetails(id) {
    this.id = Number(id);
    this.details = `/id${this.id}`;
  },
};
