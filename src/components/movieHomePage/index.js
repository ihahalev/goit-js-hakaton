import movieAPI from '../../utils/movieAPI';
import movieList from '../movieList/index';
import movieUL from '../movieList/movieList.hbs';
export default function (root) {
  // const template = () => {
  //   return `
  //       <div>movieHomePage</div>
  //   `;
  // };

  root.innerHTML = '';
  root.insertAdjacentHTML('beforeend', movieUL());

  movieAPI.fetchMoviesPopularDay().then(res => movieList(res.results));
}
