export default function (props) {
  return `
  <header class="container header">
  <div class="wrapper">
  <div class="wrapper__logo">
    <img class="header__logo" src="./img/logo.png" alt="logo" />
    <h1 class="header__title">Filmoteka</h1>
  </div>
    <ul class="header-list">
      <li class="header-list__item home">home</li>
      <li class="header-list__item my-lib">my library</li>
    </ul>
  </div>
</header>
`;
}
