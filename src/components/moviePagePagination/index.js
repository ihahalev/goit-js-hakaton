import movieAPI from '../../utils/movieAPI';
import templatePagination from './templatePagination.hbs';
import movieList from '../movieList';

import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

PNotify.defaults.width = '400px';

export default function (root) {
  if (!movieAPI.searchQuery) {
    movieAPI
      .fetchMoviesPopularDay()
      .then(res => {
        insertTemplatePopularDay(root, res);
        // console.log('fetchMoviesPopularDay', res.page);
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
        insertTemplateWithQuery(root, res);
        // console.log('fetchMoviesWithQuery', res.page);
      })
      .catch(error => {
        PNotify.error({
          text: `Some trubles: ${error}`,
        });
      });
  }
}

function insertTemplatePopularDay(root, { page }) {
  root.insertAdjacentHTML('beforeend', templatePagination(page));

  const refs = {
    btnPrev: document.querySelector('[data-action="btn_prev"]'),
    btnNext: document.querySelector('[data-action="btn_next"]'),
    pageNumber: document.querySelector('.pagination_page'),
  };

  refs.btnNext.addEventListener('click', increment);
  refs.btnPrev.addEventListener('click', decrement);

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
    refs.pageNumber.textContent = movieAPI.currentPage;
    // history.pushState(
    //   null,
    //   null,
    //   `${location.pathname}?page=${movieAPI.currentPage}`,
    // );
    movieAPI
      .fetchMoviesPopularDay()
      .then(res => {
        // console.log('increment', res.page);
        movieList(res.results);
      })
      .catch(error => {
        PNotify.error({
          text: `Some trubles: ${error}`,
        });
      });
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
    refs.pageNumber.textContent = movieAPI.currentPage;
    // history.pushState(
    //   null,
    //   null,
    //   `${location.pathname}?page=${movieAPI.currentPage}`,
    // );
    movieAPI
      .fetchMoviesPopularDay()
      .then(res => {
        // console.log('decrement', res.page);
        movieList(res.results);
      })
      .catch(error => {
        PNotify.error({
          text: `Some trubles: ${error}`,
        });
      });
  }
}

function insertTemplateWithQuery(root, page) {
  root.insertAdjacentHTML('beforeend', templatePagination(page));

  const refs = {
    btnPrev: document.querySelector('[data-action="btn_prev"]'),
    btnNext: document.querySelector('[data-action="btn_next"]'),
    pageNumber: document.querySelector('.pagination_page'),
  };

  refs.btnNext.addEventListener('click', increment);
  refs.btnPrev.addEventListener('click', decrement);

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
    refs.pageNumber.textContent = movieAPI.currentPage;
    // history.pushState(
    //   null,
    //   null,
    //   `${location.pathname}?query=${movieAPI.searchQuery}&page=${movieAPI.currentPage}`,
    // );
    movieAPI
      .fetchMoviesWithQuery()
      .then(res => {
        // console.log('increment', res.page);
        movieList(res.results);
      })
      .catch(error => {
        PNotify.error({
          text: `Some trubles: ${error}`,
        });
      });
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
    refs.pageNumber.textContent = movieAPI.currentPage;
    // history.pushState(
    //   null,
    //   null,
    //   `${location.pathname}?query=${movieAPI.searchQuery}&page=${movieAPI.currentPage}`,
    // );
    movieAPI
      .fetchMoviesWithQuery()
      .then(res => {
        // console.log('decrement', res.page);
        movieList(res.results);
      })
      .catch(error => {
        PNotify.error({
          text: `Some trubles: ${error}`,
        });
      });
  }
}
