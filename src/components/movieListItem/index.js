import movieListItemTmpl from './movieListItem.hbs';

export default function (data) {
  const dataWithYear = {
    ...data,
    release_date: Number.parseInt(data.release_date),
  };
  return movieListItemTmpl(dataWithYear);
}
