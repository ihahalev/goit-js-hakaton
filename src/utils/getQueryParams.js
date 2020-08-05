import quryString from 'query-string';

export default function getQueryParams(qs) {
  return quryString.parse(qs);
}
