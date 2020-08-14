import routes from '../../routes';
import movieAPI from '../../utils/movieAPI';

import home from '../movieHomePage';
import lib from '../movieLibraryPage';
import header from './header.hbs';

export default function (body) {
  const template = header();
  body.insertAdjacentHTML('afterbegin', template);
  const root = document.getElementById('root');
  const homeLink = document.querySelector('.home');
  const libLink = document.querySelector('.my-lib');

  const path = location.pathname;
  switch (path) {
    case routes.home: {
      homeLink.classList.add('header-list__item--active');

      break;
    }

    case routes.libWatched: {
      libLink.classList.add('header-list__item--active');
      break;
    }

    case routes.libQueue: {
      libLink.classList.add('header-list__item--active');
      break;
    }
    default: {
      break;
    }
  }

  homeLink.addEventListener('click', homeHandlers);
  libLink.addEventListener('click', libHandlers);

  function homeHandlers() {
    // if (homeLink.classList.contains('header-list__item--active')) {
    //   return;
    // }
    libLink.classList.remove('header-list__item--active');
    homeLink.classList.add('header-list__item--active');
    movieAPI.searchQuery = '';
    movieAPI.currentPage = 1;
    history.pushState(null, null, routes.home);
    home(root);
  }

  function libHandlers() {
    // if (libLink.classList.contains('header-list__item--active')) {
    //   return;
    // }
    homeLink.classList.remove('header-list__item--active');
    libLink.classList.add('header-list__item--active');
    history.pushState(null, null, routes.libWatched);
    lib(root);
  }
}
