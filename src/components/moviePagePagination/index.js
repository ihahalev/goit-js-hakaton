import movieAPI from '../../utils/movieAPI';
import templatePagination from './templatePagination.hbs';

export default function (root) {
  if (!movieAPI.searchQuery) {
    movieAPI
      .fetchMoviesPopularDay(movieAPI.currentPage())
      .then(res => {
        insertTemplatePopularDay(root, res);
        // console.log('fetchMoviesPopularDay', res.page);
      })
      .catch(error => {
        console.warn(error);
      });
  } else {
    movieAPI
      .fetchMoviesWithQuery(movieAPI.currentPage())
      .then(res => {
        insertTemplateWithQuery(root, res);
        // console.log('fetchMoviesWithQuery', res.page);
      })
      .catch(error => {
        console.warn(error);
      });
  }
}

function insertTemplatePopularDay(root, page) {
  root.insertAdjacentHTML('afterend', templatePagination(page));
  // root.innerHTML = `${functionPage(arg)}${pagination}`;

  const refs = {
    btnPrev: document.querySelector('[data-action="btn_prev"]'),
    btnNext: document.querySelector('[data-action="btn_next"]'),
    pageNumber: document.querySelector('.pagination_page'),
  };

  refs.btnNext.addEventListener('click', increment);
  refs.btnPrev.addEventListener('click', decrement);

  function increment() {
    movieAPI
      .fetchMoviesPopularDay()
      .then(res => {
        if (movieAPI.currentPage() >= 1) {
          refs.btnPrev.classList.remove('pagination_btn--opacity');
        }
        if (movieAPI.currentPage() + 1 === movieAPI.total_pages) {
          refs.btnNext.classList.add('pagination_btn--opacity');
        }
        movieAPI.incrementPage();
        refs.pageNumber.textContent = movieAPI.currentPage();
        console.log('increment', res.page);
      })
      .catch(error => {
        console.warn(error);
      });
  }

  function decrement() {
    movieAPI
      .fetchMoviesPopularDay()
      .then(res => {
        if (movieAPI.currentPage() - 1 === 1) {
          refs.btnPrev.classList.add('pagination_btn--opacity');
        }
        if (movieAPI.currentPage() <= movieAPI.total_pages) {
          refs.btnNext.classList.remove('pagination_btn--opacity');
        }
        movieAPI.decrementPage();
        refs.pageNumber.textContent = movieAPI.currentPage();
        console.log('decrement', res.page);
      })
      .catch(error => {
        console.warn(error);
      });
  }
}

function insertTemplateWithQuery(root, page) {
  root.insertAdjacentHTML('afterend', templatePagination(page));
  // root.innerHTML = `${functionPage(arg)}${pagination}`;

  const refs = {
    btnPrev: document.querySelector('[data-action="btn_prev"]'),
    btnNext: document.querySelector('[data-action="btn_next"]'),
    pageNumber: document.querySelector('.pagination_page'),
  };

  refs.btnNext.addEventListener('click', increment);
  refs.btnPrev.addEventListener('click', decrement);

  function increment() {
    movieAPI
      .fetchMoviesWithQuery()
      .then(res => {
        if (movieAPI.currentPage() >= 1) {
          refs.btnPrev.classList.remove('pagination_btn--opacity');
        }
        if (movieAPI.currentPage() + 1 === movieAPI.total_pages) {
          refs.btnNext.classList.add('pagination_btn--opacity');
        }
        movieAPI.incrementPage();
        refs.pageNumber.textContent = movieAPI.currentPage();
        console.log('increment', res.page);
      })
      .catch(error => {
        console.warn(error);
      });
  }

  function decrement() {
    movieAPI
      .fetchMoviesWithQuery()
      .then(res => {
        if (movieAPI.currentPage() - 1 === 1) {
          refs.btnPrev.classList.add('pagination_btn--opacity');
        }
        if (movieAPI.currentPage() <= movieAPI.total_pages) {
          refs.btnNext.classList.remove('pagination_btn--opacity');
        }
        movieAPI.decrementPage();
        refs.pageNumber.textContent = movieAPI.currentPage();
        console.log('decrement', res.page);
      })
      .catch(error => {
        console.warn(error);
      });
  }
}
