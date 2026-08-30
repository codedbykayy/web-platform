function createGalleryMediaImage(item) {
    if (!item.image) {
        return "";
    }
    return `
        <img
            src="${item.image}"
            alt="${item.alt || ""}"
            loading="lazy"
        >
    `;
}
function createGalleryMediaVideo(item) {
    if (!item.video) {
        return "";
    }
    return `
        <video
            controls
            playsinline
            preload="metadata"
            ${item.poster ? poster="${item.poster}" : ""}
        >
            <source src="${item.video}">
            Your browser does not support this video.
        </video>
    `;
}
function createGalleryCaption(item) {
    if (!item.title && !item.description) {
        return "";
    }
    return `
        <div class="gallery-v2__caption">
            ${item.title ? `<h3>${item.title}</h3>` : ""}
            ${item.description ? `<p>${item.description}</p>` : ""}
        </div>
    `;
}
function createGalleryDecorSlots() {
    return `
        <div class="gallery-v2__decor gallery-v2__decor--one"></div>
        <div class="gallery-v2__decor gallery-v2__decor--two"></div>
    `;
}
function createGalleryImageFrame(item, index) {
    return `
        <article class="gallery-v2__frame gallery-v2__frame--image gallery-v2__frame--${index + 1}">
            ${createGalleryDecorSlots()}
            <div class="gallery-v2__media gallery-v2__media--image">
                ${createGalleryMediaImage(item)}
            </div>
            ${createGalleryCaption(item)}
        </article>
    `;
}
function createGalleryVideoFrame(item, index) {
    return `
        <article class="gallery-v2__frame gallery-v2__frame--video gallery-v2__frame--${index + 1}">
            ${createGalleryDecorSlots()}
            <div class="gallery-v2__media gallery-v2__media--video">
                ${createGalleryMediaVideo(item)}
            </div>
            ${createGalleryCaption(item)}
        </article>
    `;
}
function createArtistGallery(data) {
    const galleryPage = document.createElement("section");
    galleryPage.className = "gallery-v2";
    const imagesHTML = (data.images?.items || [])
        .map((item, index) => createGalleryImageFrame(item, index))
        .join("");
    const videosHTML = (data.videos?.items || [])
        .map((item, index) => createGalleryVideoFrame(item, index))
        .join("");
    galleryPage.innerHTML = `
        <header class="gallery-v2__intro">
            ${
                data.intro?.eyebrow
                    ? `<p class="gallery-v2__eyebrow">${data.intro.eyebrow}</p>`
                    : ""
            }

            ${
                data.intro?.title
                    ? `<h1>${data.intro.title}</h1>`
                    : ""
            }

            ${
                data.intro?.description
                    ? `<p class="gallery-v2__description">${data.intro.description}</p>`
                    : ""
            }
        </header>
        ${
            imagesHTML
                ? `
                    <section class="gallery-v2__section gallery-v2__section--images">
                        ${
                            data.images?.title
                                ? `
                                    <header class="gallery-v2__section-heading">
                                        <h2>${data.images.title}</h2>
                                    </header>
                                `
                                : ""
                        }
                        <div class="gallery-v2__images">
                            ${imagesHTML}
                        </div>
                    </section>
                `
                : ""
        }
        ${
            videosHTML
                ? `
                    <section class="gallery-v2__section gallery-v2__section--videos">
                        ${
                            data.videos?.title
                                ? `
                                    <header class="gallery-v2__section-heading">
                                        <h2>${data.videos.title}</h2>
                                    </header>
                                `
                                : ""
                        }
                        <div class="gallery-v2__videos">
                            ${videosHTML}
                        </div>
                    </section>
                `
                : ""
        }
    `;
    return galleryPage;
}
