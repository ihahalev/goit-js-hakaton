export default function (root) {
  const template = () => {
    return `
        <p>Made by Dinasaurs</p>
    `;
  };
  root.insertAdjacentHTML('beforeend', template);
}
