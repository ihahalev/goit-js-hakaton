import movieAPI from '../../utils/movieAPI';

export default function (root) {
  const template = () => {
    return `
        <div>movieLibraryPage</div>
    `;
  };
  root.innerHTML = '';
  console.log(movieAPI.totalPages);
  root.insertAdjacentHTML('beforeend', `<div>movieLibraryQueue</div>`);
}
