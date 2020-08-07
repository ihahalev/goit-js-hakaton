import footer from './footer.hbs';

export default function (body) {
  const template = footer();
  body.insertAdjacentHTML('beforeend', template);
}
