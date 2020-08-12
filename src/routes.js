export default {
  home: '/',
  library: '/library',
  libWatched: '/watched',
  libQueue: '/queue',
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
