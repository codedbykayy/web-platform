function createCommunity(data){
    const communityPanel = document.createElement("section");
    communityPanel.className="community";
    communityPanel.innerHTML=`
        <h2 class="community__title">${data.title}</h2>
        <div class="community__feature">
            ${
                data.image
                    ? `
                        <img
                            class="community__image"
                            src="${data.image}"
                            alt="${data.imageAlt || ""}"
                        >
                    `
                    : ""
            }

            <p class="community__description">
                ${data.description}
            </p>
        </div>
        <a href="${data.button.link}" class="button community__button">${data.button.label}</a>
    `;
    return communityPanel;
}
function createCommunityPage(data) {
    const communityPage = document.createElement("section");
    communityPage.className = "community-page";
    function createArtwork(image, alt, placeholder) {
        if (image) {
            return `
                <img
                    src="${image}"
                    alt="${alt}"
                >
            `;
        }
        return `
            <span class="community-card__placeholder">
                ${placeholder}
            </span>
        `;
    }
    const supportersHTML = data.supporters.members
        .map((member) => {
            return `
                <article class="supporter-card">
                    <span class="supporter-card__rank">
                        ${member.rank}
                    </span>
                    <h3>${member.name}</h3>
                    <p>${member.detail}</p>
                </article>
            `;
        })
        .join("");
    const giveawayRulesHTML = data.giveaway.rules
        .map((rule) => {
            return `<li>${rule}</li>`;
        })
        .join("");
    communityPage.innerHTML = `
        <header class="community-page__intro">
            <p class="community-page__eyebrow">
                ${data.intro.eyebrow}
            </p>
            <h1>${data.intro.title}</h1>
            <p class="community-page__description">
                ${data.intro.description}
            </p>
        </header>
        <section class="community-supporters community-card">
            <header class="community-card__header">
                <span>${data.supporters.icon}</span>
                <h2>${data.supporters.title}</h2>
            </header>
            <div class="community-supporters__body">
                <div class="community-card__art">
                    ${createArtwork(
                        data.supporters.image,
                        data.supporters.imageAlt,
                        data.supporters.placeholder
                    )}
                </div>
                <div class="community-
                supporters__list">
                    ${supportersHTML}
                </div>
            </div>
        </section>
        <div class="community-page__grid">
            <section class="community-card">
                <header class="community-card__header">
                    <span>${data.giveaway.icon}</span>
                    <h2>${data.giveaway.title}</h2>
                </header>
                <div class="community-card__body">
                    <div class="community-card__art">
                        ${createArtwork(
                            data.giveaway.image,
                            data.giveaway.imageAlt,
                            data.giveaway.placeholder
                        )}
                    </div>
                    <h3>${data.giveaway.prize}</h3>
                    <p>${data.giveaway.description}</p>
                    <h4>${data.giveaway.rulesTitle}</h4>
                    <ul class="community-card__rules">
                        ${giveawayRulesHTML}
                    </ul>
                    <a
                        class="button"
                        href="${data.giveaway.button.link}"
                    >
                        ${data.giveaway.button.label}
                    </a>
                </div>
            </section>
            <section class="community-card">
                <header class="community-card__header">
                    <span>${data.event.icon}</span>
                    <h2>${data.event.title}</h2>
                </header>
                <div class="community-card__body">
                    <div class="community-card__art">
                        ${createArtwork(
                            data.event.image,
                            data.event.imageAlt,
                            data.event.placeholder
                        )}
                    </div>
                    <h3>${data.event.name}</h3>
                    <p>${data.event.description}</p>
                    <p class="community-card__detail">
                        ${data.event.deadline}
                    </p>
                    <a
                        class="button"
                        href="${data.event.button.link}"
                    >
                        ${data.event.button.label}
                    </a>
                </div>
            </section>
            <section class="community-card">
                <header class="community-card__header">
                    <span>${data.movie.icon}</span>
                    <h2>${data.movie.title}</h2>
                </header>
                <div class="community-card__body">
                    <div class="community-card__art">
                        ${createArtwork(
                            data.movie.image,
                            data.movie.imageAlt,
                            data.movie.placeholder
                        )}
                    </div>
                    <h3>${data.movie.name}</h3>
                    <p class="community-card__detail">
                        ${data.movie.date}
                        ·
                        ${data.movie.time}
                    </p>
                    <p>${data.movie.description}</p>
                </div>
            </section>
            <section class="community-card community-card--join">
                <header class="community-
                card__header">
                    <span>${data.join.icon}</span>
                    <h2>${data.join.title}</h2>
                </header>
                <div class="community-card__body">
                    <div class="community-card__art">
                        ${createArtwork(
                            data.join.image,
                            data.join.imageAlt,
                            data.join.placeholder
                        )}
                    </div>
                    <p>${data.join.description}</p>
                    <a
                        class="button"
                        href="${data.join.button.link}"
                    >
                        ${data.join.button.label}
                    </a>
                </div>
            </section>
        </div>
    `;
    return communityPage;
}