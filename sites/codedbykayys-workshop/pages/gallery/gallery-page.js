const page = document.querySelector("#site");
const navigationElement = createNavigation(navigation);
const galleryElement = createArtistGallery(gallery);
page.appendChild(navigationElement);
page.appendChild(galleryElement);