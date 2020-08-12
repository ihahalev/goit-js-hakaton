import routes from '../../routes';

import home from '../movieHomePage';
import lib from '../movieLibraryPage';
import header from './header.hbs';

export default function (body) {
  const template = header();
  body.insertAdjacentHTML('afterbegin', template);
  const root = document.querySelector('main');
  homeHandlers(root);
  libHandlers(root);
}

function homeHandlers(root) {
  const homeLink = document.querySelector('.home');

  homeLink.addEventListener('click', () => {
    home(root);
    history.pushState(null, null, routes.home);
  });
}

function libHandlers(root) {
  const libLink = document.querySelector('.my-lib');

  libLink.addEventListener('click', () => {
    lib(root);
    history.pushState(null, null, routes.library);
  });
}

// export default function (root) {
//   const template = View();
//   root.insertAdjacentHTML('afterbegin', template);
//   const homeLink = document.querySelector('.home');
//   const libLink = document.querySelector('.my-lib');
//   homeLink.addEventListener('click', homeHandlers(root));
//   libLink.addEventListener('click', libHandlers(root));
// }

// function homeHandlers(root) {
//   // home(root);
//   location.pathname = '/';
// }

// function libHandlers(root) {
//   // lib(root);
//   location.pathname = '/lib';
// }
