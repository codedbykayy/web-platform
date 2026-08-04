const page = document.querySelector("#site");

const navigationElement = createNavigation(navigation);

const galleryPageElement = createGalleryPage(
    galleryPageData
);
const starBee = document.createElement("img");

starBee.className = "gallery-starbee";
starBee.src = "../../assets/starbee.png";
starBee.alt = "";
const starBeeRight = document.createElement("img");

starBeeRight.className = "gallery-starbee gallery-starbee--right";
starBeeRight.src = "../../assets/starbee.png";
starBeeRight.alt = "";

galleryPageElement.appendChild(starBeeRight);
galleryPageElement.appendChild(starBee);
page.appendChild(navigationElement);
page.appendChild(galleryPageElement);