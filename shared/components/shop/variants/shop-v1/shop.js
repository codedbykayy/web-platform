function createShopListing(item, index) {
    return `
        <article
            class="shop-v1__listing"
            data-shop-index="${index}"
        >
            <div class="shop-v1__decor shop-v1__decor--one"></div>
            <div class="shop-v1__decor shop-v1__decor--two"></div>
            ${
                item.image
                    ? `
                        <div class="shop-v1__media">
                            <img
                                src="${item.image}"
                                alt="${item.alt || ""}"
                                loading="lazy"
                            >
                        </div>
                    `
                    : ""
            }
            <div class="shop-v1__info">
                ${
                    item.title
                        ? `<h3>${item.title}</h3>`
                        : ""
                }
                ${
                    item.description
                        ? `<p>${item.description}</p>`
                        : ""
                }
                ${
                    item.price
                        ? `<div class="shop-v1__price">${item.price}</div>`
                        : ""
                }
                ${
                    item.buttonText && item.buttonLink
                        ? `
                            <a
                                class="button shop-v1__button"
                                href="${item.buttonLink}"
                            >
                                ${item.buttonText}
                            </a>
                        `
                        : ""
                }
            </div>
        </article>
    `;
}
function createShop(data) {
    const shopPage = document.createElement("section");
    shopPage.className = "shop-v1";

    const listingsHTML = (data.items || [])
        .map((item, index) => createShopListing(item, index))
        .join("");
    shopPage.innerHTML = `
        ${
            data.intro
                ? `
                    <header class="shop-v1__intro">
                        ${
                            data.intro.eyebrow
                                ? `<p class="shop-v1__eyebrow">${data.intro.eyebrow}</p>`
                                : ""
                        }
                        ${
                            data.intro.title
                                ? `<h1>${data.intro.title}</h1>`
                                : ""
                        }
                        ${
                            data.intro.description
                                ? `<p class="shop-v1__description">${data.intro.description}</p>`
                                : ""
                        }
                    </header>
                `
                : ""
        }
        <div class="shop-v1__grid">
            ${listingsHTML}
        </div>
    `;
    return shopPage;
}