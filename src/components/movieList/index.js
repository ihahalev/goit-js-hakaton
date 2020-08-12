import movieListItem from '../movieListItem/movieListItem.hbs';

export default function (data) {
  const movieList = document.getElementById('js-list');
  movieList.innerHTML = data.map(movie => movieListItem(movie)).join('');
}
