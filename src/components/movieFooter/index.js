export default function (root) {
  const template = () => {
    return `
    <footer class="container footer">   
      <div class="wrapper"> 
        <p class='footer-title'>Made by Dinasaurs</p>
      </div>
    </footer>
    `;
  };
  root.insertAdjacentHTML('beforeend', template);
}
