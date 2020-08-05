export default function (root) {
  const template = () => {
    return `
        <div>movieList</div>
    `;
  };
  root.insertAdjacentHTML('beforeend', template);
}
