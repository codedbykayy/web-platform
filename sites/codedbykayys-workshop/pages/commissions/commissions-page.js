const page = document.querySelector("#site");
const navigationElement = createNavigation(navigation);
const commissionsElement = createCommissions(commissions);
page.appendChild(navigationElement);
page.appendChild(commissionsElement);