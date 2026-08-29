const page = document.querySelector("#site");

const navigationElement = createNavigation(navigation);
const heroElement = createHero(hero);

page.appendChild(navigationElement);
page.appendChild(heroElement);