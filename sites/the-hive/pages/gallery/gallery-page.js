const page = document.querySelector("#site");

const navigationElement = createNavigation(navigation);

const galleryPageElement = createGalleryPage(
    galleryPageData
);

page.appendChild(navigationElement);
page.appendChild(galleryPageElement);