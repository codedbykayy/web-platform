const page = document.querySelector("#site");
const navigationElement = createNavigation(navigation);
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
const supportersHTML = communityPageData.supporters.members
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
const giveawayRulesHTML = communityPageData.giveaway.rules
    .map((rule) => {
        return `<li>${rule}</li>`;
    })
    .join("");
communityPage.innerHTML = `
    <header class="community-page__intro">
        <p class="community-page__eyebrow">
            ${communityPageData.intro.eyebrow}
        </p>
        <h1>${communityPageData.intro.title}</h1>
        <p class="community-page__description">
            ${communityPageData.intro.description}
        </p>
    </header>
    <section class="community-supporters community-card">
        <header class="community-card__header">
            <span>${communityPageData.supporters.icon}</span>
            <h2>${communityPageData.supporters.title}</h2>
        </header>
        <div class="community-supporters__body">
            <div class="community-card__art">
                ${createArtwork(
                    communityPageData.supporters.image,
                    "Thank-you bee illustration",
                    "Supporter artwork"
                )}
            </div>
            <div class="community-supporters__list">
                ${supportersHTML}
            </div>
        </div>
    </section>
    <div class="community-page__grid">
        <section class="community-card">
            <header class="community-card__header">
                <span>${communityPageData.giveaway.icon}</span>
                <h2>${communityPageData.giveaway.title}</h2>
            </header>
            <div class="community-card__body">
                <div class="community-card__art">
                    ${createArtwork(
                        communityPageData.giveaway.image,
                        "Excited giveaway bee illustration",
                        "Giveaway artwork"
                    )}
                </div>
                <h3>${communityPageData.giveaway.prize}</h3>
                <p>
                    ${communityPageData.giveaway.description}
                </p>
                <h4>Giveaway Rules</h4>
                <ul class="community-card__rules">
                    ${giveawayRulesHTML}
                </ul>
                <a
                    class="button"
                    href="${communityPageData.giveaway.button.link}"
                >
                    ${communityPageData.giveaway.button.label}
                </a>
            </div>
        </section>
        <section class="community-card">
            <header class="community-card__header">
                <span>${communityPageData.event.icon}</span>
                <h2>${communityPageData.event.title}</h2>
            </header>

            <div class="community-card__body">
                <div class="community-card__art">
                    ${createArtwork(
                        communityPageData.event.image,
                        "Bee community-event illustration",
                        "Event artwork"
                    )}
                </div>

                <h3>${communityPageData.event.name}</h3>

                <p>
                    ${communityPageData.event.description}
                </p>

                <p class="community-card__detail">
                    ${communityPageData.event.deadline}
                </p>

                <a
                    class="button"
                    href="${communityPageData.event.button.link}"
                >
                    ${communityPageData.event.button.label}
                </a>
            </div>
        </section>

        <section class="community-card">
            <header class="community-card__header">
                <span>${communityPageData.movie.icon}</span>
                <h2>${communityPageData.movie.title}</h2>
            </header>

            <div class="community-card__body">
                <div class="community-card__art">
                    ${createArtwork(
                        communityPageData.movie.image,
                        "Community movie-night artwork",
                        "Movie artwork"
                    )}
                </div>

                <h3>${communityPageData.movie.name}</h3>

                <p class="community-card__detail">
                    ${communityPageData.movie.date}
                    ·
                    ${communityPageData.movie.time}
                </p>

                <p>
                    ${communityPageData.movie.description}
                </p>
            </div>
        </section>

        <section class="community-card community-card--join">
            <header class="community-card__header">
                <span>${communityPageData.join.icon}</span>
                <h2>${communityPageData.join.title}</h2>
            </header>

            <div class="community-card__body">
                <div class="community-card__art">
                    ${createArtwork(
                        communityPageData.join.image,
                        "Hive house illustration",
                        "Hive-house artwork"
                    )}
                </div>

                <p>
                    ${communityPageData.join.description}
                </p>

                <a
                    class="button"
                    href="$
                    {communityPageData.join.button.link}"
                >
                    ${communityPageData.join.button.label}
                </a>
            </div>
        </section>

    </div>
`;
page.appendChild(navigationElement);
page.appendChild(communityPage);