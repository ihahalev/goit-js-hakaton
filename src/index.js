import routes from './routes';
import movieAPI from './utils/movieAPI';
import getQueryParams from './utils/getQueryParams';

import header from './components/movieHeader';
import homePage from './components/movieHomePage';
import libPage from './components/movieLibraryPage';
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

  const { query, page } = getQueryParams(location.search);
  if (query) {
    movieAPI.searchQuery = query;
    movieAPI.currentPage = page;
  }
  const path = getCurrentPath();
  switch (path) {
    case routes.home: {
      homePage(root);
      history.pushState(null, null, routes.home);
      break;
    }

    case routes.libWatched: {
      libPage(root);
      history.pushState(null, null, routes.libWatched);
      break;
    }

    case routes.libQueue: {
      libPage(root);
      history.pushState(null, null, routes.libQueue);
      break;
    }
    default: {
      if (path.includes('id')) {
        const idStart = path.indexOf('id') + 2;
        const srtId = path.slice(idStart, path.length);
        if (srtId) {
          movieDetails(root, srtId);
          history.replaceState(null, null, `/id${srtId}`);
          break;
        }
      }
      history.replaceState(null, null, routes.home);
      homePage(root);
      break;
    }
  }
  header(body);
  buttonUp(body);
  footer(body);
  onpopstate = function (e) {
    // history.back();
    const path = getCurrentPath();
    // console.log(e);
  };
}

init();
