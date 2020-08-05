import movieAPI from '../../utils/movieAPI';
import routes from '../../routes';

export default function (root, id) {
  const template = () => {
    return `
        <div>movieDetailsPage</div>
    `;
  };
  root.insertAdjacentHTML('beforeend', `<div>movieDetailsPage ${id}</div>`);
  routes.movieID = id;
  history.pushState(null, null, routes.movieDetails);
  movieAPI.fetchMovieDetails(id).then(res => console.log(res));
}
