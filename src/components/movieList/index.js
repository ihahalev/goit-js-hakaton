import movieListItem from '../movieListItem/movieListItem.hbs';

export default function (data) {
  const movieList = document.querySelector('#js-list');
  const movieListItemTemplate = movieListItem;

  return movieList.insertAdjacentHTML('beforeend', movieListItemTemplate(data));
}
