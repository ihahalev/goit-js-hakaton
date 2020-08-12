import movieListItem from '../movieListItem/movieListItem.hbs';
import movieDetails from '../movieDetailsPage/index';

export default function (data) {
  const movieList = document.getElementById('js-list');
  movieList.innerHTML = data.map(movie => movieListItem(movie)).join('');

  movieList.addEventListener('click', detailsClickHandler);

  function detailsClickHandler(e) {
    if (e.target.nodeName === 'IMG' && e.target.id !== NaN) {
      // console.log(e.target.id);
      // let liID = e.target.id;
      // movieDetails(liID);
    }
  }
}
