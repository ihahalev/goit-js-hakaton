import routes from './routes';

import header from './components/movieHeader';
import home from './components/movieHomePage';
import library from './components/movieLibraryPage';
import libWatches from './components/movieLibraryWatched';
import libQueue from './components/movieLibraryQueue';
import movieDetails from './components/movieDetailsPage';
import footer from './components/movieFooter';

import './sass/main.scss';

function getCurrentPath() {
  return location.pathname;
}

function init() {
  const body = document.querySelector('body');
  const root = document.querySelector('main');
  const path = getCurrentPath();
  header(body);
  footer(body);
  switch (path) {
    case routes.home: {
      home(root);

      break;
    }

    case routes.library: {
      library(root);

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
      home(root);
      break;
    }
  }
}

init();
