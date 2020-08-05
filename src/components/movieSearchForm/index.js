export default function (root) {
  const template = () => {
    return `
        <div>movieSearchForm</div>
    `;
  };
  root.insertAdjacentHTML('beforeend', template);
}
