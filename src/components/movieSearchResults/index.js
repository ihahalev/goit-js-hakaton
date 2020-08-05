export default function (root) {
  const template = () => {
    return `
        <div>movieSearchResults</div>
    `;
  };
  root.insertAdjacentHTML('beforeend', template);
}
