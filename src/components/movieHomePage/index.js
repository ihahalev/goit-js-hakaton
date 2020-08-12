import movieAPI from '../../utils/movieAPI';
import moviePagePagination from '../moviePagePagination';

export default function (root) {
  const template = () => {
    return `
        <div>movieHomePage</div>
    `;
  };
  root.innerHTML = '';
  root.insertAdjacentHTML('beforeend', `<div>movieHomePage</div>`);
  movieAPI.totalPages = 5;
  movieAPI.fetchMoviesPopularDay().then(res => console.log(res));

  moviePagePagination(root);
}
