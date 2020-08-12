import routes from './routes';
import movieAPI from './utils/movieAPI';
import getQueryParams from './utils/getQueryParams';

import header from './components/movieHeader';
import homePage from './components/movieHomePage';
import libWatches from './components/movieLibraryWatched';
import libQueue from './components/movieLibraryQueue';
import movieDetails from './components/movieDetailsPage';
import footer from './components/movieFooter';
import buttonUp from './components/buttonUp';

import './sass/main.scss';

function getCurrentPath() {
  return location.pathname;
}

function init() {
  const body = document.querySelector('body');
  const root = document.getElementById('root');
  header(body);
  footer(body);
  buttonUp(body);
  const { query, page } = getQueryParams(location.search);
  if (query) {
    movieAPI.searchQuery = query;
    movieAPI.currentPage = page;
  }
  const path = getCurrentPath();
  switch (path) {
    case routes.home: {
      homePage(root);

      break;
    }

    case routes.libWatched: {
      libWatches(root);

      break;
    }

    case routes.libQueue: {
      libQueue(root);

      break;
    }
    default: {
      if (path.includes('id')) {
        const idStart = path.indexOf('id') + 2;
        const srtId = path.slice(idStart, path.length);
        console.log(srtId);
        if (srtId) {
          movieDetails(root, srtId);
        }
      }
      history.replaceState(null, null, routes.home);
      homePage(root);
      break;
    }
  }
}

init();
