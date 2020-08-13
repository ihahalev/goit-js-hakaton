import movieListItem from '../movieListItem';
import movieDetails from '../movieDetailsPage/index';

export default function (data) {
  const root = document.getElementById('root');
  const movieList = document.getElementById('js-list');
  movieList.innerHTML = data.map(movie => movieListItem(movie)).join('');

  movieList.addEventListener('click', detailsClickHandler);

  function detailsClickHandler(e) {
    if (
      e.target.parentElement.parentElement.id !== NaN &&
      e.target.parentElement.parentElement.id !== ''
    ) {
      let liID = e.target.parentElement.parentElement.id;
      movieDetails(root, liID);
      history.pushState(null, null, `/id${liID}`);
    }
  }
}
