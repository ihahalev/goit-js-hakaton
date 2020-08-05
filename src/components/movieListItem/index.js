export default function (root) {
  const template = () => {
    return `
        <div>movieListItem</div>
    `;
  };
  root.insertAdjacentHTML('beforeend', template);
}
