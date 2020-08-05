export default function (root) {
  const template = () => {
    return `
        <div>movieFooter</div>
    `;
  };
  root.insertAdjacentHTML('beforeend', template);
}
