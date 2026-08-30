function createGalleryArtwork(image, alt, placeholder) {
    if (image) {
        return `
            <img
                src="${image}"
                alt="${alt}"
            >
        `;
    }
    return `
        <span class="gallery-placeholder">
            ${placeholder}
        </span>
    `;
}
function createClipMedia(clip, featured = false) {
    const mediaClass = featured
        ? "gallery-featured__media"
        : "gallery-film__media";
    if (clip.sourceType === "external" && clip.externalLink) {
        return `
            <a
                class="${mediaClass} gallery-clip-link"
                href="${clip.externalLink}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch ${clip.name}"
            >
                ${
                    clip.poster
                        ? `
                            <img
                                src="${clip.poster}"
                                alt="Preview image for ${clip.name}"
                            >
                        `
                        : `
                            <span class="gallery-placeholder">
                                ${clip.placeholder}
                            </span>
                        `
                }
                <span class="gallery-play-badge">
                    Watch clip
                </span>
            </a>
        `;
    }
    if (clip.video) {
        return `
            <div class="${mediaClass}">
                <video
                    controls
                    playsinline
                    preload="metadata"
                    ${clip.poster ? `poster="${clip.poster}"` : ""}
                >
                    <source src="${clip.video}">
                    Your browser does not support this video.
                </video>
            </div>
        `;
    }
    return `
        <div class="${mediaClass}">
            <span class="gallery-placeholder">
                ${clip.placeholder}
            </span>
        </div>
    `;
}
function createGalleryPage(data) {
    const galleryPage = document.createElement("section");
    galleryPage.className = "gallery-page";
    const clipsHTML = data.clips.items
        .map((clip) => {
            return `
                <article class="gallery-film__frame">
                    <span class="gallery-film__hole gallery-film__hole--top">
                    </span>
                    ${createClipMedia(clip)}
                    <div class="gallery-film__caption">
                        <h3>${clip.name}</h3>
                    </div>
                    <span class="gallery-film__hole gallery-film__hole--bottom">
                    </span>
                </article>
            `;
        })
        .join("");
    const fanArtHTML = data.fanArt.items
        .map((art, index) => {
            return `
                <article class="gallery-photo gallery-photo--${index + 1}">
                    <span class="gallery-photo__tape"></span>
                    <div class="gallery-photo__image">
                        ${createGalleryArtwork(
                            art.image,
                            art.imageAlt,
                            art.placeholder
                        )}
                    </div>
                    <div class="gallery-photo__caption">
                        <h3>${art.title}</h3>
                        <p>${art.artist}</p>
                    </div>
                </article>
            `;
        })
        .join("");
    galleryPage.innerHTML = `
        <header class="gallery-page__intro">
            <p class="gallery-page__eyebrow">
                ${data.intro.eyebrow}
            </p>
            <h1>${data.intro.title}</h1>
            <p class="gallery-page__description">
                ${data.intro.description}
            </p>
        </header>
        <section class="gallery-featured">
            <header class="gallery-section-heading">
                <h2>${data.featuredClip.title}</h2>
            </header>
            <div class="gallery-featured__layout">
                ${createClipMedia(data.featuredClip, true)}
                <div class="gallery-featured__content">
                    <h3>${data.featuredClip.name}</h3>
                    <p>
                        ${data.featuredClip.description}
                    </p>
                    ${
                        data.featuredClip.sourceType === "external" &&
                        data.featuredClip.externalLink
                            ? `
                                <a
                                    class="button"
                                    href="${data.featuredClip.externalLink}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ${data.featuredClip.buttonLabel}
                                </a>
                            `
                            : ""
                    }
                </div>
            </div>
        </section>
        <section class="gallery-clips">
            <header class="gallery-section-heading">
                <h2>${data.clips.title}</h2>
            </header>
            <div class="gallery-film">
                ${clipsHTML}
            </div>
        </section>
        <section class="gallery-fan-art">
            <header class="gallery-section-heading">
                <h2>${data.fanArt.title}</h2>

                <p>${data.fanArt.description}</p>
            </header>
            <div class="gallery-fan-art__grid">
                ${fanArtHTML}
            </div>
        </section>
    `;
    return galleryPage;
}
