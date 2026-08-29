const page = document.querySelector("#site");
const navigationElement = createNavigation(navigation);
const heroElement = createHero(hero);
const featureArea = document.createElement("div");
featureArea.className = "homepage-feature-area";
const decorArea = document.createElement("div");
decorArea.className = "homepage-decor";
homepageDecor.forEach((item) => {
    const image = document.createElement("img");
    image.className = `homepage-decor__item homepage-decor__item--${item.position}`;
    image.src = item.image;
    image.alt = item.alt;
    decorArea.appendChild(image);
});
featureArea.appendChild(decorArea);
const leftArea = document.createElement("div");
leftArea.className = "homepage-feature-side homepage-feature-left";
const rightArea = document.createElement("div");
rightArea.className = "homepage-feature-side homepage-feature-right";
homepageLinks.left.forEach((item) => {
    const link = document.createElement("a");
    link.className = "button homepage-feature-link";
    link.href = item.link;
    link.textContent = item.label;
    leftArea.appendChild(link);
});
homepageLinks.right.forEach((item) => {
    const link = document.createElement("a");
    link.className = "button homepage-feature-link";
    link.href = item.link;
    link.textContent = item.label;
    rightArea.appendChild(link);
});
featureArea.appendChild(leftArea);
featureArea.appendChild(heroElement);
featureArea.appendChild(rightArea);
page.appendChild(navigationElement);
page.appendChild(featureArea);