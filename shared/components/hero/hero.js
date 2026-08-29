function createHero(data) {
    const hero = document.createElement("section");
    hero.className = `hero hero--${data.layout}`;

    hero.innerHTML = `
        <div class="hero__content">
            <h1 class="hero__title">${data.title}</h1>
            <p class="hero__description">${data.description}</p>
            <div class="hero__buttons"></div>
        </div>
        <div class="hero-image-area">
            ${
                data.image
                    ? `
                        <img
                            class="hero__image"
                            src="${data.image}"
                            alt="${data.imageAlt || ""}"
                        >
                    `
                    : "Image"
            }
        </div>
        <div class="hero_decorations"></div>
    `;
const title = hero.querySelector(".hero__title");

if (data.colorfulTitle) {
    title.textContent = "";

    let colorIndex = 0;

    [...data.title].forEach((character) => {
        const letter = document.createElement("span");

        if (character === " ") {
            letter.innerHTML = "&nbsp;";
        } else {
            letter.className = `hero__title-letter hero__title-letter--${colorIndex % 4}`;
            letter.textContent = character;
            colorIndex++;
        }

        title.appendChild(letter);
    });
}
    const buttonArea = hero.querySelector(".hero__buttons");

    (data.buttons || []).forEach((button) => {
        const link = document.createElement("a");

        link.className = "button hero__button";
        link.href = button.link;
        link.textContent = button.label;

        buttonArea.appendChild(link);
    });

    return hero;
}