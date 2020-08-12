import movieAPI from '../../utils/movieAPI';
import routes from '../../routes';
import localStorage from '../../utils/localStorage';
import movieDetailsTemplate from './movieDetails.hbs';

export default function (root, id) {
  const dataMovieDetails = { data: {} };

  routes.movieID = id;
  history.pushState(null, null, routes.movieDetails);
  movieAPI
    .fetchMovieDetails(id)
    .then(res => {
      showDetails(res);
      dataMovieDetails.data = { ...res };
    })
    .catch(error => {
      console.warn(error);
    });

  function showDetails(data) {
    root.innerHTML = movieDetailsTemplate(data);
    monitorButtonStatusText();
  }

  function monitorButtonStatusText() {
    const getWatched = localStorage.get(localStorage.WATCHED);
    const getQueue = localStorage.get(localStorage.QUEUE);

    const refs = {
      btnWatched: document.querySelector('#btnWatched'),
      btnQueue: document.querySelector('#btnQueue'),
    };

    refs.btnWatched.addEventListener('click', toggleToWatched);
    refs.btnQueue.addEventListener('click', toggleToQueue);

    if (getWatched.some(movie => movie.id === id)) {
      refs.btnWatched.textContent = 'Delete from watched';
      refs.btnWatched.classList.add('movie-details__btn-remove');
    } else {
      refs.btnWatched.textContent = 'Add to watched';
      refs.btnWatched.classList.remove('movie-details__btn-remove');
    }

    if (getQueue.some(movie => movie.id === id)) {
      refs.btnQueue.textContent = 'Delete from queue';
      refs.btnQueue.classList.add('movie-details__btn-remove');
    } else {
      refs.btnQueue.textContent = 'Add to queue';
      refs.btnQueue.classList.remove('movie-details__btn-remove');
    }
  }

  function toggleToWatched() {
    watched(id, dataMovieDetails.data);
    monitorButtonStatusText();
  }

  function toggleToQueue() {
    queue(id, dataMovieDetails.data);
    monitorButtonStatusText();
  }
}

function watched(id, data) {
  const getWatched = localStorage.get(localStorage.WATCHED);

  if (getWatched.some(movie => movie.id === id)) {
    const saveMovie = getWatched.filter(movie => movie.id !== id);
    localStorage.save(localStorage.WATCHED, saveMovie);
  } else {
    const { backdrop_path, title, vote_average, release_date } = data;

    localStorage.save(localStorage.WATCHED, [
      ...getWatched,
      { id, backdrop_path, title, vote_average, release_date },
    ]);
  }
}

function queue(id, data) {
  const getQueue = localStorage.get(localStorage.QUEUE);

  if (getQueue.some(movie => movie.id === id)) {
    const saveMovie = getQueue.filter(movie => movie.id !== id);
    localStorage.save(localStorage.QUEUE, saveMovie);
  } else {
    const { backdrop_path, title, vote_average, release_date } = data;

    localStorage.save(localStorage.QUEUE, [
      ...getQueue,
      { id, backdrop_path, title, vote_average, release_date },
    ]);
  }
}
