import movieLibraryTmpl from './movieLibraryPage.hbs';
import routes from '../../routes';
import localStorage from '../../utils/localStorage';
import movieUL from '../movieList/movieList.hbs';
import movieList from '../movieList';
import homePage from '../movieHomePage';

import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default function movieLibraryPage(root) {
  root.innerHTML = `${movieLibraryTmpl()}${movieUL()}`;

  PNotify.defaults.width = '400px';

  const path = location.pathname;
  const getWatched = localStorage.get(localStorage.WATCHED);
  const getQueue = localStorage.get(localStorage.QUEUE);
  const refs = {
    btnWatched: document.querySelector('#js-btnWatched'),
    btnQueue: document.querySelector('#js-btnQueue'),
    listContainer: document.querySelector('#js-list-container'),
  };
  const watched = () => {
    if (getWatched.length === 0) {
      PNotify.info({
        text:
          'Unfortunately, Your list of watched movies is empty. Add to Your collection of watched!',
      });
      return;
    }
    try {
      movieList(getWatched);
    } catch {
      PNotify.error({
        text: `Something went wrong`,
      });
    }
  };
  const queue = () => {
    if (getQueue.length === 0) {
      PNotify.info({
        text:
          'Unfortunately, Your list of movies in queue is empty. Add to Your in queue collection!',
      });
    }
    try {
      movieList(getQueue);
    } catch {
      PNotify.error({
        text: `Something went wrong`,
      });
    }
  };
  const addClassWatched = () => {
    refs.btnWatched.classList.add('libraryPage__active-button');
    if (refs.btnQueue.classList.contains('libraryPage__active-button')) {
      refs.btnQueue.classList.remove('libraryPage__active-button');
    }
  };
  const addClassQueue = () => {
    refs.btnQueue.classList.add('libraryPage__active-button');
    if (refs.btnWatched.classList.contains('libraryPage__active-button')) {
      refs.btnWatched.classList.remove('libraryPage__active-button');
    }
  };
  refs.btnWatched.addEventListener('click', watchedHandler);
  refs.btnQueue.addEventListener('click', queueHandler);

  switch (path) {
    case routes.libWatched: {
      addClassWatched();
      watched();
      break;
    }
    case routes.libQueue: {
      addClassQueue();
      queue();
      break;
    }
    default: {
      homePage(root);
      break;
    }
  }

  function watchedHandler(e) {
    addClassWatched();
    history.pushState(null, null, routes.libWatched);
    watched();
  }

  function queueHandler(e) {
    addClassQueue();
    history.pushState(null, null, routes.libQueue);
    queue();
  }
}
