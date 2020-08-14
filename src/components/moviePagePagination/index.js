import movieAPI from '../../utils/movieAPI';
import templatePagination from './templatePagination.hbs';
import movieList from '../movieList';

import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

PNotify.defaults.width = '400px';

export default function (root) {
  root.insertAdjacentHTML(
    'beforeend',
    templatePagination(movieAPI.currentPage),
  );

  const refs = initBtns();

  refs.btnNext.addEventListener('click', increment);
  refs.btnPrev.addEventListener('click', decrement);

  if (!movieAPI.searchQuery) {
    movieAPI
      .fetchMoviesPopularDay()
      .then(res => {
        movieList(res.results);
      })
      .catch(error => {
        PNotify.error({
          text: `Some trubles: ${error}`,
        });
      });
  } else {
    movieAPI
      .fetchMoviesWithQuery()
      .then(res => {
        movieList(res.results);
      })
      .catch(error => {
        PNotify.error({
          text: `Some trubles: ${error}`,
        });
      });
  }

  function increment() {
    if (refs.btnNext.classList.contains('pagination_btn--opacity')) {
      return;
    }
    if (movieAPI.currentPage >= 1) {
      refs.btnPrev.classList.remove('pagination_btn--opacity');
    }
    if (movieAPI.currentPage + 1 === movieAPI.total_pages) {
      refs.btnNext.classList.add('pagination_btn--opacity');
    }
    movieAPI.incrementPage();

    renderListByCondition(refs);
  }

  function decrement() {
    if (refs.btnPrev.classList.contains('pagination_btn--opacity')) {
      return;
    }
    if (movieAPI.currentPage - 1 === 1) {
      refs.btnPrev.classList.add('pagination_btn--opacity');
    }
    if (movieAPI.currentPage <= movieAPI.total_pages) {
      refs.btnNext.classList.remove('pagination_btn--opacity');
    }
    movieAPI.decrementPage();

    renderListByCondition(refs);
  }
}

export function renderListByCondition(refs) {
  refs.pageNumber.textContent = movieAPI.currentPage;

  if (!movieAPI.searchQuery) {
    history.pushState(
      null,
      null,
      `${location.pathname}?page=${movieAPI.currentPage}`,
    );
    movieAPI
      .fetchMoviesPopularDay()
      .then(res => {
        movieList(res.results);
      })
      .catch(error => {
        PNotify.error({
          text: `Some trubles: ${error}`,
        });
      });
  } else {
    history.pushState(
      null,
      null,
      `${location.pathname}?page=${movieAPI.currentPage}`,
    );
    movieAPI
      .fetchMoviesWithQuery()
      .then(res => {
        movieList(res.results);
      })
      .catch(error => {
        PNotify.error({
          text: `Some trubles: ${error}`,
        });
      });
  }
}

export function initBtns() {
  const refs = {
    btnPrev: document.querySelector('[data-action="btn_prev"]'),
    btnNext: document.querySelector('[data-action="btn_next"]'),
    pageNumber: document.querySelector('.pagination_page'),
  };

  if (movieAPI.currentPage > 1) {
    refs.btnPrev.classList.remove('pagination_btn--opacity');
  }
  if (movieAPI.currentPage === movieAPI.total_pages) {
    refs.btnNext.classList.add('pagination_btn--opacity');
  }
  if (movieAPI.currentPage === 1) {
    refs.btnPrev.classList.add('pagination_btn--opacity');
  }
  if (movieAPI.currentPage < movieAPI.total_pages) {
    refs.btnNext.classList.remove('pagination_btn--opacity');
  }
  refs.pageNumber.textContent = movieAPI.currentPage;

  return refs;
}
