import movieListItemTmpl from './movieListItem.hbs';

export default function (data) {
  const dataWithYear = {
    ...data,
    release_date: Number.parseInt(data.release_date),
    vote_average: data.vote_average.toFixed(1),
  };
  return movieListItemTmpl(dataWithYear);
}
