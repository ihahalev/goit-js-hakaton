import * as PNotify from '@pnotify/core';
import movieLibraryTmpl from './movieLibraryPage.hbs';
import routes from '../../routes';
import localStorage from '../../utils/localStorage';
import movieList from '../movieList';
import homePage from '../movieHomePage';
import styles from './movieLibraryPage.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default function movieLibraryPage(root) {
  root.innerHTML = movieLibraryTmpl();

  PNotify.defaults.width = '400px';

  const path = location.pathname;
  const getWatched = localStorage.get(localStorage.WATCHED);
  const getQueue = localStorage.get(localStorage.QUEUE);
  const refs = {
    btnWatched: document.querySelector('#js-btnWatched'),
    btnQueue: document.querySelector('#js-btnQueue'),
    listContainer: document.querySelector('#js-list-container'),
  };
  const watched = error => {
    try {
      refs.listContainer.innerHTML = movieList(getWatched);
    } catch {
      if (getWatched.length === 0) {
        PNotify.info({
          text:
            'Unfortunately, Your list of watched movies is empty. Add to Your collection of watched!',
        });
      } else {
        PNotify.error({
          text: `Something went wrong: ${error}`,
        });
      }
    }
  };
  const queue = error => {
    try {
      refs.listContainer.innerHTML = movieList(getQueue);
    } catch {
      if (getQueue.length === 0) {
        PNotify.info({
          text:
            'Unfortunately, Your list of movies in queue is empty. Add to Your in queue collection!',
        });
      } else {
        PNotify.error({
          text: `Something went wrong: ${error}`,
        });
      }
    }
  };
  refs.btnWatched.addEventListener('click', watchedHandler);
  refs.btnQueue.addEventListener('click', queueHandler);

  switch (path) {
    case routes.libWatched: {
      watched();
      break;
    }
    case routes.libQueue: {
      queue();
      break;
    }
    default: {
      homePage(root);
      break;
    }
  }

  function watchedHandler(e) {
    refs.btnWatched.classList.add('libraryPage__active-button');
    if (refs.btnQueue.classList.contains('libraryPage__active-button')) {
      refs.btnQueue.classList.remove('libraryPage__active-button');
    }
    history.pushState(null, null, routes.libWatched);
    watched();
  }

  function queueHandler(e) {
    refs.btnQueue.classList.add('libraryPage__active-button');
    if (refs.btnWatched.classList.contains('libraryPage__active-button')) {
      refs.btnWatched.classList.remove('libraryPage__active-button');
    }
    history.pushState(null, null, routes.libQueue);
    queue();
  }
}
