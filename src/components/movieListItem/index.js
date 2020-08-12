import movieListItemTmpl from './movieListItem.hbs';
import styles from './movieListItem.scss';

export default function (data) {
  const dataWithYear = {
    ...data,
    release_date: Number.parseInt(data.release_date),
  };
  return movieListItemTmpl(dataWithYear);
}
