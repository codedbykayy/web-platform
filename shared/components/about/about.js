function createAbout(data) {
    const aboutPage = document.createElement("section");
    aboutPage.className = "about-page";

    const highlightsHTML = data.intro.highlights
        .map((highlight) => {
            return `
                <div class="about-highlight">
                    <span class="about-highlight__icon">
                        ${highlight.icon}
                    </span>

                    <h3>${highlight.title}</h3>
                    <p>${highlight.text}</p>
                </div>
            `;
        })
        .join("");

    const storyCardsHTML = data.storyCards
        .map((storyCard) => {
            return `
                <article class="about-story-card">
                    <header class="about-section-header">
                        <span class="about-section-header__icon">
                            ${storyCard.headingIcon}
                        </span>

                        <h2>${storyCard.heading}</h2>
                    </header>

                    <div class="about-story-card__body">
                        <h3>${storyCard.title}</h3>
                        <p>${storyCard.text}</p>
                    </div>
                </article>
            `;
        })
        .join("");

    const favoritesHTML = data.favorites.items
        .map((favorite) => {
            return `
                <div class="about-favorite">
                    <span class="about-favorite__icon">
                        ${favorite.icon}
                    </span>

                    <h3>${favorite.title}</h3>
                    <p>${favorite.text}</p>
                </div>
            `;
        })
        .join("");

    let profileImageHTML = `
        ${data.profile.imagePlaceholder}
    `;

    if (data.profile.image) {
        profileImageHTML = `
            <img
                src="${data.profile.image}"
                alt="${data.profile.imageAlt}"
            >
        `;
    }

    aboutPage.innerHTML = `
        <section class="about-layout">

            <div class="about-layout__top">

                <article class="about-profile-card">
                    <h2 class="about-card-heading">
                        <span class="about-card-icon">
                            ${data.profile.headingIcon}
                        </span>

                        ${data.profile.heading}
                    </h2>

                    <div class="about-profile-card__image">
                        ${profileImageHTML}
                    </div>

                    <p class="about-profile-card__quote">
                        “${data.profile.quote}”
                    </p>
                </article>

                <article class="about-intro-card">

                    <header class="about-name-card">
                        <p class="about-name-card__eyebrow">
                            <span>${data.intro.eyebrowIcon}</span>
                            ${data.intro.eyebrow}
                            <span>${data.intro.eyebrowIcon}</span>
                        </p>

                        <h1 class="about-name-card__title">
                            ${data.intro.name}
                        </h1>
                    </header>

                    <div class="about-intro-card__body">
                        <p class="about-intro-card__description">
                         ${data.intro.description}
                        </p>

                        <div class="about-highlights">
                            ${highlightsHTML}
                        </div>
                    </div>

                </article>

            </div>

            <div class="about-layoutmiddle">
                ${storyCardsHTML}
            </div>

            <article class="about-favorites-card">

                <header class="about-section-header">
                    <span class="about-section-header__icon">
                        ${data.favorites.headingIcon}
                    </span>

                    <h2>${data.favorites.heading}</h2>
                </header>

                <div class="about-favorites-grid">
                    ${favoritesHTML}
                </div>

            </article>

            <article class="about-closing-card">
                <h2>${data.closing.title}</h2>
                <p>${data.closing.text}</p>
            </article>

        </section>
    `;

    return aboutPage;
}