import movieAPI from '../../utils/movieAPI';

import movieList from '../movieList';
import movieUL from '../movieList/movieList.hbs';
import searchForm from '../movieSearchForm';
import pagination, {
  renderListByCondition,
  initBtns,
} from '../moviePagePagination';

export default function (root) {
  root.innerHTML = `${searchForm()}${movieUL()}`;
  const form = document.querySelector('.js-form');
  form.addEventListener('submit', submitHandler);
  if (movieAPI.searchQuery) {
    // history.pushState(
    //   null,
    //   null,
    //   `${location.pathname}?query=${movieAPI.searchQuery}&page=${movieAPI.currentPage}`,
    // );
    movieAPI.fetchMoviesWithQuery().then(res => {
      movieAPI.totalPages = res.total_pages;
      movieList(res.results);
    });
  } else {
    // history.pushState(
    //   null,
    //   null,
    //   `${location.pathname}?page=${movieAPI.currentPage}`,
    // );
    movieAPI.fetchMoviesPopularDay().then(res => {
      movieAPI.totalPages = res.total_pages;
      movieList(res.results);
    });
  }
  pagination(root);
}

function submitHandler(e) {
  e.preventDefault();
  movieAPI.currentPage = 1;
  movieAPI.searchQuery = e.currentTarget.elements.query.value;
  e.currentTarget.elements.query.value = '';
  history.pushState(
    null,
    null,
    `${location.pathname}?query=${movieAPI.searchQuery}&page=${movieAPI.currentPage}`,
  );
  const refs = initBtns();
  movieAPI.fetchMoviesWithQuery(movieAPI.searchQuery).then(res => {
    movieAPI.totalPages = res.total_pages;
    movieList(res.results);
    renderListByCondition(refs);
  });
}
