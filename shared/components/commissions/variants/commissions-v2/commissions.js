function formatCommissionV2Price(value, pricing = {}) {
    const symbol = pricing.currencySymbol || "$";
    const decimals = pricing.decimals ?? 0;

    return `${symbol}${Number(value || 0).toFixed(decimals)}`;
}


function cloneCommissionV2State(state) {
    if (typeof structuredClone === "function") {
        return structuredClone(state);
    }

    return JSON.parse(JSON.stringify(state));
}


function createCommissionV2DecorSlots() {
    return `
        <div class="commissions-v2__decor commissions-v2__decor--one"></div>
        <div class="commissions-v2__decor commissions-v2__decor--two"></div>
    `;
}


function createCommissionV2Intro(intro = {}) {
    const element = document.createElement("header");

    element.className = "commissions-v2__intro";

    element.innerHTML = `
        ${createCommissionV2DecorSlots()}

        ${
            intro.eyebrow
                ? `<p class="commissions-v2__eyebrow">${intro.eyebrow}</p>`
                : ""
        }

        ${
            intro.title
                ? `<h1>${intro.title}</h1>`
                : ""
        }

        ${
            intro.description
                ? `<p class="commissions-v2__description">${intro.description}</p>`
                : ""
        }
    `;

    return element;
}


function createCommissionV2BlockHeading(block) {
    return `
        <header class="commissions-v2__block-heading">
            ${
                block.eyebrow
                    ? `<p class="commissions-v2__block-eyebrow">${block.eyebrow}</p>`
                    : ""
            }

            ${
                block.title
                    ? `<h2>${block.title}</h2>`
                    : ""
            }

            ${
                block.description
                    ? `<p class="commissions-v2__block-description">${block.description}</p>`
                    : ""
            }
        </header>
    `;
}


function createCommissionV2LoopControls(
    previousClass,
    nextClass,
    previousLabel,
    nextLabel
) {
    return {
        previous: `
            <button
                class="${previousClass}"
                type="button"
                aria-label="${previousLabel}"
            >
                ‹
            </button>
        `,

        next: `
            <button
                class="${nextClass}"
                type="button"
                aria-label="${nextLabel}"
            >
                ›
            </button>
        `
    };
}


/* =========================================
   EXAMPLES
========================================= */

function createCommissionV2ExamplesBlock(block) {
    const element = document.createElement("section");
    const items = block.items || [];

    element.className =
        "commissions-v2__block commissions-v2__examples";

    element.dataset.commissionV2Block = block.id;

    const outerControls = createCommissionV2LoopControls(
        "commissions-v2__arrow commissions-v2__arrow--previous",
        "commissions-v2__arrow commissions-v2__arrow--next",
        "Previous example",
        "Next example"
    );

    const examplesHTML = items
        .map((item, exampleIndex) => {
            const images = item.images || [];

            const imageControls = createCommissionV2LoopControls(
                "commissions-v2__image-arrow commissions-v2__image-arrow--previous",
                "commissions-v2__image-arrow commissions-v2__image-arrow--next",
                "Previous image",
                "Next image"
            );

            const imagesHTML = images
                .map((image, imageIndex) => {
                    return `
                        <div
                            class="commissions-v2__example-image ${
                                imageIndex === 0
                                    ? "commissions-v2__example-image--active"
                                    : ""
                            }"
                            data-commission-v2-example-image="${imageIndex}"
                        >
                            <img
                                src="${image.image}"
                                alt="${image.alt || ""}"
                                loading="lazy"
                            >
                        </div>
                    `;
                })
                .join("");

            const detailsHTML = (item.details || [])
                .map((detail) => {
                    return `
                        <div class="commissions-v2__example-detail">
                            <strong>${detail.label}</strong>
                            <span>${detail.value}</span>
                        </div>
                    `;
                })
                .join("");

            return `
                <article
                    class="commissions-v2__example ${
                        exampleIndex === 0
                            ? "commissions-v2__example--active"
                            : ""
                    }"
                    data-commission-v2-example="${exampleIndex}"
                >
                    <div class="commissions-v2__example-media">
                        <div
                            class="commissions-v2__image-carousel"
                            data-commission-v2-image-carousel
                        >
                            ${
                                images.length > 1
                                    ? imageControls.previous
                                    : ""
                            }

                            <div class="commissions-v2__example-image-window">
                                ${imagesHTML}
                            </div>

                            ${
                                images.length > 1
                                    ? imageControls.next
                                    : ""
                            }
                        </div>
                    </div>

                    <div class="commissions-v2__example-copy">
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
                            detailsHTML
                                ? `
                                    <div class="commissions-v2__example-details">
                                        ${detailsHTML}
                                    </div>
                                `
                                : ""
                        }
                    </div>
                </article>
            `;
        })
        .join("");

    element.innerHTML = `
        ${createCommissionV2DecorSlots()}
        ${createCommissionV2BlockHeading(block)}

        <div
            class="commissions-v2__carousel"
            data-commission-v2-carousel
        >
            ${
                items.length > 1
                    ? outerControls.previous
                    : ""
            }

            <div class="commissions-v2__example-window">
                ${examplesHTML}
            </div>

            ${
                items.length > 1
                    ? outerControls.next
                    : ""
            }
        </div>
    `;

    return element;
}


/* =========================================
   GENERIC CAROUSEL ENGINE
========================================= */

function initializeCommissionV2LoopCarousel(
    carousel,
    config
) {
    const items = Array.from(
        carousel.querySelectorAll(config.itemSelector)
    );

    if (items.length <= 1) {
        return;
    }

    const previousButton =
        carousel.querySelector(config.previousSelector);

    const nextButton =
        carousel.querySelector(config.nextSelector);

    if (!previousButton || !nextButton) {
        return;
    }

    let activeIndex = items.findIndex((item) =>
        item.classList.contains(config.activeClass)
    );

    if (activeIndex < 0) {
        activeIndex = 0;
    }

    function showItem(index) {
        activeIndex =
            (index + items.length) % items.length;

        items.forEach((item, itemIndex) => {
            item.classList.toggle(
                config.activeClass,
                itemIndex === activeIndex
            );
        });
    }

    previousButton.addEventListener("click", () => {
        showItem(activeIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showItem(activeIndex + 1);
    });
}


function initializeCommissionV2Carousels(root) {
    root
        .querySelectorAll(
            "[data-commission-v2-carousel]"
        )
        .forEach((carousel) => {
            initializeCommissionV2LoopCarousel(
                carousel,
                {
                    itemSelector:
                        ".commissions-v2__example",

                    activeClass:
                        "commissions-v2__example--active",

                    previousSelector:
                        ".commissions-v2__arrow--previous",

                    nextSelector:
                        ".commissions-v2__arrow--next"
                }
            );
        });


    root
        .querySelectorAll(
            "[data-commission-v2-image-carousel]"
        )
        .forEach((carousel) => {
            initializeCommissionV2LoopCarousel(
                carousel,
                {
                    itemSelector:
                        ".commissions-v2__example-image",

                    activeClass:
                        "commissions-v2__example-image--active",

                    previousSelector:
                        ".commissions-v2__image-arrow--previous",

                    nextSelector:
                        ".commissions-v2__image-arrow--next"
                }
            );
        });


    root
        .querySelectorAll(
            "[data-commission-v2-choice-carousel]"
        )
        .forEach((carousel) => {
            initializeCommissionV2LoopCarousel(
                carousel,
                {
                    itemSelector:
                        ".commissions-v2__choice-slide",

                    activeClass:
                        "commissions-v2__choice-slide--active",

                    previousSelector:
                        ".commissions-v2__choice-arrow--previous",

                    nextSelector:
                        ".commissions-v2__choice-arrow--next"
                }
            );
        });


    root
        .querySelectorAll(
            "[data-commission-v2-variant-carousel]"
        )
        .forEach((carousel) => {
            initializeCommissionV2LoopCarousel(
                carousel,
                {
                    itemSelector:
                        ".commissions-v2__variant-slide",

                    activeClass:
                        "commissions-v2__variant-slide--active",

                    previousSelector:
                        ".commissions-v2__variant-arrow--previous",

                    nextSelector:
                        ".commissions-v2__variant-arrow--next"
                }
            );
        });
}


/* =========================================
   CHOICE CARDS
========================================= */

function createCommissionV2ChoiceCard(
    option,
    block,
    pricing
) {
    const isMulti =
        block.type === "multi-choice";

    const attribute = isMulti
        ? "data-commission-v2-multi-choice"
        : "data-commission-v2-single-choice";

    const priceHTML =
        typeof option.price === "number"
            ? `
                <p class="commissions-v2__choice-price">
                    ${
                        option.price === 0
                            ? option.priceLabel || "Included"
                            : `+${formatCommissionV2Price(
                                option.price,
                                pricing
                            )}`
                    }
                </p>
            `
            : "";

    return `
        <article
            class="commissions-v2__choice-card"
            data-commission-v2-choice-card="${option.id}"
            data-block-id="${block.id}"
        >
            ${
                option.image
                    ? `
                        <div class="commissions-v2__choice-media">
                            <img
                                src="${option.image}"
                                alt="${option.alt || ""}"
                                loading="lazy"
                            >
                        </div>
                    `
                    : ""
            }

            <div class="commissions-v2__choice-copy">
                ${
                    option.name
                        ? `<h3>${option.name}</h3>`
                        : ""
                }

                ${
                    option.description
                        ? `<p>${option.description}</p>`
                        : ""
                }

                ${priceHTML}
            </div>

            <button
                class="button commissions-v2__select"
                type="button"
                aria-pressed="false"
                ${attribute}="${block.id}"
                data-option-id="${option.id}"
            >
                ${option.buttonText || "Select"}
            </button>
        </article>
    `;
}


function createCommissionV2ChoiceGrid(
    block,
    pricing
) {
    return `
        <div class="commissions-v2__choice-grid">
            ${(block.options || [])
                .map((option) =>
                    createCommissionV2ChoiceCard(
                        option,
                        block,
                        pricing
                    )
                )
                .join("")}
        </div>
    `;
}


function createCommissionV2ChoiceCarousel(
    block,
    pricing
) {
    const options = block.options || [];

    const controls = createCommissionV2LoopControls(
        "commissions-v2__choice-arrow commissions-v2__choice-arrow--previous",
        "commissions-v2__choice-arrow commissions-v2__choice-arrow--next",
        "Previous choice",
        "Next choice"
    );

    const slidesHTML = options
        .map((option, index) => {
            return `
                <div
                    class="commissions-v2__choice-slide ${
                        index === 0
                            ? "commissions-v2__choice-slide--active"
                            : ""
                    }"
                >
                    ${createCommissionV2ChoiceCard(
                        option,
                        block,
                        pricing
                    )}
                </div>
            `;
        })
        .join("");

    return `
        <div
            class="commissions-v2__choice-carousel"
            data-commission-v2-choice-carousel
        >
            ${
                options.length > 1
                    ? controls.previous
                    : ""
            }

            <div class="commissions-v2__choice-window">
                ${slidesHTML}
            </div>

            ${
                options.length > 1
                    ? controls.next
                    : ""
            }
        </div>
    `;
}


function createCommissionV2ChoiceBlock(
    block,
    pricing
) {
    const element =
        document.createElement("section");

    element.className =
        `commissions-v2__block commissions-v2__${block.type}`;

    element.dataset.commissionV2Block =
        block.id;

    const choicesHTML =
        block.display === "carousel"
            ? createCommissionV2ChoiceCarousel(
                block,
                pricing
            )
            : createCommissionV2ChoiceGrid(
                block,
                pricing
            );

    element.innerHTML = `
        ${createCommissionV2DecorSlots()}
        ${createCommissionV2BlockHeading(block)}

        ${
            block.type === "multi-choice" &&
            block.maxSelections
                ? `
                    <p
                        class="commissions-v2__counter"
                        data-commission-v2-counter="${block.id}"
                    >
                        0 / ${block.maxSelections} selected
                    </p>
                `
                : ""
        }

        ${choicesHTML}
    `;

    return element;
}


/* =========================================
   NOTICE
========================================= */

function createCommissionV2NoticeBlock(block) {
    const element =
        document.createElement("section");

    element.className =
        "commissions-v2__block commissions-v2__notice";

    element.dataset.commissionV2Block =
        block.id;

    element.innerHTML = `
        ${createCommissionV2DecorSlots()}
        ${createCommissionV2BlockHeading(block)}

        ${
            block.body
                ? `
                    <div class="commissions-v2__notice-body">
                        ${block.body}
                    </div>
                `
                : ""
        }
    `;

    return element;
}


/* =========================================
   SERVICES + ADD-ONS
========================================= */

function createCommissionV2VariantButton(
    variant,
    item,
    block,
    type,
    pricing
) {
    const attribute =
        type === "add-ons"
            ? "data-commission-v2-add-on"
            : "data-commission-v2-service";

    const priceHTML =
        typeof variant.priceDelta === "number" &&
        variant.priceDelta !== 0
            ? `
                <span class="commissions-v2__variant-price">
                    +${formatCommissionV2Price(
                        variant.priceDelta,
                        pricing
                    )}
                </span>
            `
            : "";

    return `
        <button
            class="commissions-v2__variant"
            type="button"
            aria-pressed="false"
            ${attribute}="${block.id}"
            data-item-id="${item.id}"
            data-variant-id="${variant.id}"
        >
            ${
                variant.image
                    ? `
                        <span class="commissions-v2__variant-media">
                            <img
                                src="${variant.image}"
                                alt="${variant.alt || ""}"
                                loading="lazy"
                            >
                        </span>
                    `
                    : ""
            }

            <span class="commissions-v2__variant-copy">
                <strong>${variant.name}</strong>

                ${
                    variant.description
                        ? `<span>${variant.description}</span>`
                        : ""
                }

                ${priceHTML}
            </span>
        </button>
    `;
}


function createCommissionV2VariantGrid(
    variants,
    item,
    block,
    type,
    pricing
) {
    return `
        <div class="commissions-v2__variants">
            ${variants
                .map((variant) =>
                    createCommissionV2VariantButton(
                        variant,
                        item,
                        block,
                        type,
                        pricing
                    )
                )
                .join("")}
        </div>
    `;
}


function createCommissionV2VariantCarousel(
    variants,
    item,
    block,
    type,
    pricing
) {
    const controls = createCommissionV2LoopControls(
        "commissions-v2__variant-arrow commissions-v2__variant-arrow--previous",
        "commissions-v2__variant-arrow commissions-v2__variant-arrow--next",
        "Previous variant",
        "Next variant"
    );

    const slidesHTML = variants
        .map((variant, index) => {
            return `
                <div
                    class="commissions-v2__variant-slide ${
                        index === 0
                            ? "commissions-v2__variant-slide--active"
                            : ""
                    }"
                >
                    ${createCommissionV2VariantButton(
                        variant,
                        item,
                        block,
                        type,
                        pricing
                    )}
                </div>
            `;
        })
        .join("");

    return `
        <div
            class="commissions-v2__variant-carousel"
            data-commission-v2-variant-carousel
        >
            ${
                variants.length > 1
                    ? controls.previous
                    : ""
            }

            <div class="commissions-v2__variant-window">
                ${slidesHTML}
            </div>

            ${
                variants.length > 1
                    ? controls.next
                    : ""
            }
        </div>
    `;
}


function createCommissionV2GroupedItem(
    item,
    block,
    pricing,
    type
) {
    const variants = item.variants || [];

    const attribute =
        type === "add-ons"
            ? "data-commission-v2-add-on"
            : "data-commission-v2-service";

    let priceHTML = "";

    if (item.quoteRequired) {
        priceHTML = `
            <p class="commissions-v2__service-price">
                ${item.priceLabel || "Quoted separately"}
            </p>
        `;
    } else if (typeof item.price === "number") {
        priceHTML = `
            <p class="commissions-v2__service-price">
                +${formatCommissionV2Price(
                    item.price,
                    pricing
                )}
            </p>
        `;
    }

    let selectionHTML = "";

    if (variants.length) {
        selectionHTML =
            item.variantDisplay === "carousel"
                ? createCommissionV2VariantCarousel(
                    variants,
                    item,
                    block,
                    type,
                    pricing
                )
                : createCommissionV2VariantGrid(
                    variants,
                    item,
                    block,
                    type,
                    pricing
                );
    } else {
        selectionHTML = `
            <button
                class="button commissions-v2__select"
                type="button"
                aria-pressed="false"
                ${attribute}="${block.id}"
                data-item-id="${item.id}"
            >
                ${item.buttonText || "Add"}
            </button>
        `;
    }

    return `
        <article
            class="commissions-v2__service-card"
            data-commission-v2-service-card="${item.id}"
            data-block-id="${block.id}"
        >
            ${
                item.image
                    ? `
                        <div class="commissions-v2__service-media">
                            <img
                                src="${item.image}"
                                alt="${item.alt || ""}"
                                loading="lazy"
                            >
                        </div>
                    `
                    : ""
            }

            <div class="commissions-v2__service-copy">
                ${
                    item.name
                        ? `<h3>${item.name}</h3>`
                        : ""
                }

                ${
                    item.description
                        ? `<p>${item.description}</p>`
                        : ""
                }

                ${priceHTML}
            </div>

            ${selectionHTML}
        </article>
    `;
}


function createCommissionV2GroupedBlock(
    block,
    pricing
) {
    const element =
        document.createElement("section");

    element.className =
        `commissions-v2__block commissions-v2__${block.type}`;

    element.dataset.commissionV2Block =
        block.id;

    const groupsHTML = (block.groups || [])
        .map((group) => {
            const itemsHTML = (group.items || [])
                .map((item) =>
                    createCommissionV2GroupedItem(
                        item,
                        block,
                        pricing,
                        block.type
                    )
                )
                .join("");

            return `
                <section class="commissions-v2__service-group">
                    ${
                        group.title
                            ? `<h3 class="commissions-v2__group-title">${group.title}</h3>`
                            : ""
                    }

                    ${
                        group.description
                            ? `<p class="commissions-v2__group-description">${group.description}</p>`
                            : ""
                    }

                    <div class="commissions-v2__service-grid">
                        ${itemsHTML}
                    </div>
                </section>
            `;
        })
        .join("");

    element.innerHTML = `
        ${createCommissionV2DecorSlots()}
        ${createCommissionV2BlockHeading(block)}

        <div class="commissions-v2__service-groups">
            ${groupsHTML}
        </div>
    `;

    return element;
}


/* =========================================
   SUMMARY
========================================= */

function createCommissionV2SummaryBlock(block) {
    const element =
        document.createElement("section");

    element.className =
        "commissions-v2__block commissions-v2__summary";

    element.dataset.commissionV2Block =
        block.id;

    element.innerHTML = `
        ${createCommissionV2DecorSlots()}
        ${createCommissionV2BlockHeading(block)}

        <div
            class="commissions-v2__summary-content"
            data-commission-v2-summary
        ></div>
    `;

    return element;
}


/* =========================================
   ESTIMATE
========================================= */

function createCommissionV2EstimateBlock(block) {
    const element =
        document.createElement("section");

    element.className =
        "commissions-v2__block commissions-v2__estimate";

    element.dataset.commissionV2Block =
        block.id;

    element.innerHTML = `
        ${createCommissionV2DecorSlots()}

        ${
            block.title
                ? `<h2>${block.title}</h2>`
                : ""
        }

        <p
            class="commissions-v2__estimate-total"
            data-commission-v2-estimate
        ></p>

        ${
            block.shortDisclaimer
                ? `
                    <p class="commissions-v2__estimate-short-disclaimer">
                        ${block.shortDisclaimer}
                    </p>
                `
                : ""
        }

        ${
            block.disclaimer
                ? `
                    <p class="commissions-v2__estimate-disclaimer">
                        ${block.disclaimer}
                    </p>
                `
                : ""
        }
    `;

    return element;
}


/* =========================================
   BLOCK ROUTER
========================================= */

function createCommissionV2Block(
    block,
    pricing
) {
    switch (block.type) {
        case "examples":
            return createCommissionV2ExamplesBlock(
                block
            );

        case "single-choice":
        case "multi-choice":
            return createCommissionV2ChoiceBlock(
                block,
                pricing
            );

        case "notice":
            return createCommissionV2NoticeBlock(
                block
            );

        case "services":
        case "add-ons":
            return createCommissionV2GroupedBlock(
                block,
                pricing
            );

        case "summary":
            return createCommissionV2SummaryBlock(
                block
            );

        case "estimate":
            return createCommissionV2EstimateBlock(
                block
            );

        default:
            return null;
    }
}


/* =========================================
   MAIN COMPONENT
========================================= */

function createCommissionsV2(data) {
    const commissionsPage =
        document.createElement("section");

    commissionsPage.className =
        "commissions-v2";

    const pricing = data.pricing || {};
    const blocks = data.blocks || [];

    const blockMap = new Map(
        blocks.map((block) => [
            block.id,
            block
        ])
    );

    const state = {
        singleChoices: {},
        multiChoices: {},
        services: {},
        addOns: {}
    };


    /* -------------------------------------
       LOOKUPS
    ------------------------------------- */

    function findOption(
        blockId,
        optionId
    ) {
        const block =
            blockMap.get(blockId);

        return (block?.options || []).find(
            (option) =>
                option.id === optionId
        );
    }


    function getGroupedItems(block) {
        return (block?.groups || [])
            .flatMap(
                (group) =>
                    group.items || []
            );
    }


    function findGroupedItem(
        blockId,
        itemId
    ) {
        const block =
            blockMap.get(blockId);

        return getGroupedItems(block).find(
            (item) =>
                item.id === itemId
        );
    }


    function findVariant(
        item,
        variantId
    ) {
        return (item?.variants || []).find(
            (variant) =>
                variant.id === variantId
        );
    }


    function getCollectionForType(type) {
        return type === "add-ons"
            ? state.addOns
            : state.services;
    }


    /* -------------------------------------
       DEFAULTS
    ------------------------------------- */

    function initializeDefaults() {
        blocks.forEach((block) => {
            if (
                block.type ===
                "single-choice"
            ) {
                const selected =
                    (block.options || [])
                        .find(
                            (option) =>
                                option.defaultSelected
                        );

                if (selected) {
                    state.singleChoices[
                        block.id
                    ] = selected.id;
                }

                return;
            }


            if (
                block.type ===
                "multi-choice"
            ) {
                const selected =
                    (block.options || [])
                        .filter(
                            (option) =>
                                option.defaultSelected
                        )
                        .map(
                            (option) =>
                                option.id
                        );

                state.multiChoices[
                    block.id
                ] =
                    block.maxSelections
                        ? selected.slice(
                            0,
                            block.maxSelections
                        )
                        : selected;

                return;
            }


            if (
                block.type !== "services" &&
                block.type !== "add-ons"
            ) {
                return;
            }

            const collection =
                getCollectionForType(
                    block.type
                );

            collection[block.id] = {};

            getGroupedItems(block)
                .forEach((item) => {
                    if (
                        !item.defaultSelected
                    ) {
                        return;
                    }

                    const variants =
                        item.variants || [];

                    const selectedVariant =
                        variants.find(
                            (variant) =>
                                variant.defaultSelected
                        ) ||
                        variants[0];

                    collection[
                        block.id
                    ][item.id] = {
                        variantId:
                            selectedVariant?.id ||
                            null
                    };
                });
        });
    }


    /* -------------------------------------
       PRICE
    ------------------------------------- */

    function calculateEstimatedTotal() {
        let total = Number(
            pricing.basePrice || 0
        );


        Object.entries(
            state.singleChoices
        ).forEach(
            ([blockId, optionId]) => {
                const option =
                    findOption(
                        blockId,
                        optionId
                    );

                total += Number(
                    option?.price || 0
                );
            }
        );


        Object.entries(
            state.multiChoices
        ).forEach(
            ([blockId, optionIds]) => {
                optionIds.forEach(
                    (optionId) => {
                        const option =
                            findOption(
                                blockId,
                                optionId
                            );

                        total += Number(
                            option?.price || 0
                        );
                    }
                );
            }
        );


        [
            state.services,
            state.addOns
        ].forEach((collection) => {
            Object.entries(collection)
                .forEach(
                    ([
                        blockId,
                        selections
                    ]) => {
                        Object.entries(
                            selections
                        ).forEach(
                            ([
                                itemId,
                                selection
                            ]) => {
                                const item =
                                    findGroupedItem(
                                        blockId,
                                        itemId
                                    );

                                if (!item) {
                                    return;
                                }

                                if (
                                    !item.quoteRequired
                                ) {
                                    total += Number(
                                        item.price || 0
                                    );
                                }

                                const variant =
                                    findVariant(
                                        item,
                                        selection.variantId
                                    );

                                if (
                                    variant &&
                                    !variant.quoteRequired
                                ) {
                                    total += Number(
                                        variant.priceDelta ||
                                        0
                                    );
                                }
                            }
                        );
                    }
                );
        });


        return total;
    }


    /* -------------------------------------
       CONDITIONAL QUESTION GROUPS
    ------------------------------------- */

    function addQuestionGroups(
        source,
        groups
    ) {
        (
            source?.questionGroups ||
            []
        ).forEach((group) => {
            groups.add(group);
        });
    }


    function getActiveQuestionGroups() {
        const groups = new Set();


        Object.entries(
            state.singleChoices
        ).forEach(
            ([blockId, optionId]) => {
                addQuestionGroups(
                    findOption(
                        blockId,
                        optionId
                    ),
                    groups
                );
            }
        );


        Object.entries(
            state.multiChoices
        ).forEach(
            ([blockId, optionIds]) => {
                optionIds.forEach(
                    (optionId) => {
                        addQuestionGroups(
                            findOption(
                                blockId,
                                optionId
                            ),
                            groups
                        );
                    }
                );
            }
        );


        [
            state.services,
            state.addOns
        ].forEach((collection) => {
            Object.entries(collection)
                .forEach(
                    ([
                        blockId,
                        selections
                    ]) => {
                        Object.entries(
                            selections
                        ).forEach(
                            ([
                                itemId,
                                selection
                            ]) => {
                                const item =
                                    findGroupedItem(
                                        blockId,
                                        itemId
                                    );

                                const variant =
                                    findVariant(
                                        item,
                                        selection.variantId
                                    );

                                addQuestionGroups(
                                    item,
                                    groups
                                );

                                addQuestionGroups(
                                    variant,
                                    groups
                                );
                            }
                        );
                    }
                );
        });


        return Array.from(groups);
    }


    /* -------------------------------------
       BUILD CODES
    ------------------------------------- */

    function getBuildCodes() {
        const codes = [];


        Object.entries(
            state.singleChoices
        ).forEach(
            ([blockId, optionId]) => {
                const option =
                    findOption(
                        blockId,
                        optionId
                    );

                if (option?.code) {
                    codes.push(
                        option.code
                    );
                }
            }
        );


        Object.entries(
            state.multiChoices
        ).forEach(
            ([blockId, optionIds]) => {
                optionIds.forEach(
                    (optionId) => {
                        const option =
                            findOption(
                                blockId,
                                optionId
                            );

                        if (option?.code) {
                            codes.push(
                                option.code
                            );
                        }
                    }
                );
            }
        );


        [
            state.services,
            state.addOns
        ].forEach((collection) => {
            Object.entries(collection)
                .forEach(
                    ([
                        blockId,
                        selections
                    ]) => {
                        Object.entries(
                            selections
                        ).forEach(
                            ([
                                itemId,
                                selection
                            ]) => {
                                const item =
                                    findGroupedItem(
                                        blockId,
                                        itemId
                                    );

                                const variant =
                                    findVariant(
                                        item,
                                        selection.variantId
                                    );

                                if (
                                    variant?.code
                                ) {
                                    codes.push(
                                        variant.code
                                    );
                                } else if (
                                    item?.code
                                ) {
                                    codes.push(
                                        item.code
                                    );
                                }
                            }
                        );
                    }
                );
        });


        return codes;
    }


    /* -------------------------------------
       READABLE SELECTIONS
    ------------------------------------- */

    function getReadableSelections() {
        const groups = [];


        blocks.forEach((block) => {
            if (
                block.type ===
                "single-choice"
            ) {
                const option =
                    findOption(
                        block.id,
                        state.singleChoices[
                            block.id
                        ]
                    );

                if (!option) {
                    return;
                }

                groups.push({
                    blockId:
                        block.id,

                    type:
                        block.type,

                    label:
                        block.selectionLabel ||
                        block.title,

                    items: [
                        {
                            id:
                                option.id,

                            name:
                                option.name
                        }
                    ]
                });

                return;
            }


            if (
                block.type ===
                "multi-choice"
            ) {
                const items =
                    (
                        state.multiChoices[
                            block.id
                        ] || []
                    )
                        .map(
                            (optionId) =>
                                findOption(
                                    block.id,
                                    optionId
                                )
                        )
                        .filter(Boolean)
                        .map(
                            (option) => ({
                                id:
                                    option.id,

                                name:
                                    option.name
                            })
                        );

                if (!items.length) {
                    return;
                }

                groups.push({
                    blockId:
                        block.id,

                    type:
                        block.type,

                    label:
                        block.selectionLabel ||
                        block.title,

                    items
                });

                return;
            }


            if (
                block.type !==
                    "services" &&
                block.type !==
                    "add-ons"
            ) {
                return;
            }

            const collection =
                getCollectionForType(
                    block.type
                );

            const selections =
                collection[
                    block.id
                ] || {};

            const items =
                Object.entries(
                    selections
                )
                    .map(
                        ([
                            itemId,
                            selection
                        ]) => {
                            const item =
                                findGroupedItem(
                                    block.id,
                                    itemId
                                );

                            if (!item) {
                                return null;
                            }

                            const variant =
                                findVariant(
                                    item,
                                    selection.variantId
                                );

                            return {
                                id:
                                    item.id,

                                name:
                                    variant
                                        ? `${item.name} — ${variant.name}`
                                        : item.name
                            };
                        }
                    )
                    .filter(Boolean);

            if (!items.length) {
                return;
            }

            groups.push({
                blockId:
                    block.id,

                type:
                    block.type,

                label:
                    block.selectionLabel ||
                    block.title,

                items
            });
        });


        return groups;
    }


    function buildReadableSummary() {
        const lines = [];


        getReadableSelections()
            .forEach((group) => {
                lines.push(
                    `${group.label}:`
                );

                group.items
                    .forEach((item) => {
                        lines.push(
                            `- ${item.name}`
                        );
                    });

                lines.push("");
            });


        lines.push(
            `Estimated Total: ${formatCommissionV2Price(
                calculateEstimatedTotal(),
                pricing
            )}`
        );


        return lines
            .join("\n")
            .trim();
    }


    /* -------------------------------------
       REQUIRED SELECTIONS
    ------------------------------------- */

    function getMissingRequiredSelections() {
        const missing = [];


        blocks.forEach((block) => {
            if (!block.required) {
                return;
            }


            if (
                block.type ===
                    "single-choice" &&
                !state.singleChoices[
                    block.id
                ]
            ) {
                missing.push(
                    block.id
                );

                return;
            }


            if (
                block.type ===
                "multi-choice"
            ) {
                const count =
                    (
                        state.multiChoices[
                            block.id
                        ] || []
                    ).length;

                const minimum =
                    block.minSelections ||
                    1;

                if (
                    count < minimum
                ) {
                    missing.push(
                        block.id
                    );
                }

                return;
            }


            if (
                block.type ===
                    "services" ||
                block.type ===
                    "add-ons"
            ) {
                const collection =
                    getCollectionForType(
                        block.type
                    );

                const count =
                    Object.keys(
                        collection[
                            block.id
                        ] || {}
                    ).length;

                const minimum =
                    block.minSelections ||
                    1;

                if (
                    count < minimum
                ) {
                    missing.push(
                        block.id
                    );
                }
            }
        });


        return missing;
    }


    /* -------------------------------------
       BASIN / FORM DATA
    ------------------------------------- */

    function getSubmissionData() {
        const submission = {
            formType:
                data.formType ||
                "commission-builder",

            requestName:
                data.requestName ||
                data.intro?.title ||
                "Commission Request",

            buildCode:
                getBuildCodes()
                    .join(" + "),

            estimatedTotal:
                formatCommissionV2Price(
                    calculateEstimatedTotal(),
                    pricing
                ),

            selectionSummary:
                buildReadableSummary(),

            activeQuestionGroups:
                getActiveQuestionGroups()
                    .join(", ")
        };


        getReadableSelections()
            .forEach((group) => {
                const safeId =
                    group.blockId.replace(
                        /[^a-zA-Z0-9_]/g,
                        "_"
                    );

                submission[
                    `selection_${safeId}`
                ] =
                    group.items
                        .map(
                            (item) =>
                                item.name
                        )
                        .join(", ");
            });


        return submission;
    }


    /* -------------------------------------
       SUMMARY RENDER
    ------------------------------------- */

    function renderSummary() {
        const groups =
            getReadableSelections();


        commissionsPage
            .querySelectorAll(
                "[data-commission-v2-summary]"
            )
            .forEach((summary) => {
                if (!groups.length) {
                    summary.innerHTML = `
                        <p class="commissions-v2__summary-empty">
                            ${
                                data.summaryEmptyText ||
                                "Nothing selected yet."
                            }
                        </p>
                    `;

                    return;
                }


                summary.innerHTML =
                    groups
                        .map((group) => {
                            const itemsHTML =
                                group.items
                                    .map(
                                        (item) => `
                                            <li class="commissions-v2__summary-item">
                                                <span>
                                                    ${item.name}
                                                </span>

                                                <button
                                                    type="button"
                                                    class="commissions-v2__summary-remove"
                                                    aria-label="Remove ${item.name}"
                                                    data-commission-v2-remove
                                                    data-selection-type="${group.type}"
                                                    data-block-id="${group.blockId}"
                                                    data-item-id="${item.id}"
                                                >
                                                    ×
                                                </button>
                                            </li>
                                        `
                                    )
                                    .join("");

                            return `
                                <section class="commissions-v2__summary-group">
                                    <h3>
                                        ${group.label}
                                    </h3>

                                    <ul>
                                        ${itemsHTML}
                                    </ul>
                                </section>
                            `;
                        })
                        .join("");
            });
    }


    /* -------------------------------------
       ESTIMATE RENDER
    ------------------------------------- */

    function renderEstimate() {
        const total =
            formatCommissionV2Price(
                calculateEstimatedTotal(),
                pricing
            );


        commissionsPage
            .querySelectorAll(
                "[data-commission-v2-estimate]"
            )
            .forEach((element) => {
                element.textContent =
                    total;
            });
    }


    /* -------------------------------------
       CONTROL STATES
    ------------------------------------- */

    function updateChoiceButton(
        button,
        selected
    ) {
        button.classList.toggle(
            "commissions-v2__select--active",
            selected
        );

        button.setAttribute(
            "aria-pressed",
            String(selected)
        );

        button
            .closest(
                ".commissions-v2__choice-card"
            )
            ?.classList.toggle(
                "commissions-v2__choice-card--selected",
                selected
            );
    }


    function refreshChoiceControls() {
        commissionsPage
            .querySelectorAll(
                "[data-commission-v2-single-choice]"
            )
            .forEach((button) => {
                const blockId =
                    button.dataset
                        .commissionV2SingleChoice;

                const selected =
                    state.singleChoices[
                        blockId
                    ] ===
                    button.dataset
                        .optionId;

                updateChoiceButton(
                    button,
                    selected
                );
            });


        commissionsPage
            .querySelectorAll(
                "[data-commission-v2-multi-choice]"
            )
            .forEach((button) => {
                const blockId =
                    button.dataset
                        .commissionV2MultiChoice;

                const optionId =
                    button.dataset
                        .optionId;

                const selectedItems =
                    state.multiChoices[
                        blockId
                    ] || [];

                const selected =
                    selectedItems.includes(
                        optionId
                    );

                const block =
                    blockMap.get(
                        blockId
                    );

                const atLimit =
                    Boolean(
                        block
                            ?.maxSelections &&
                        selectedItems.length >=
                            block.maxSelections
                    );

                updateChoiceButton(
                    button,
                    selected
                );

                button.disabled =
                    atLimit &&
                    !selected;
            });


        commissionsPage
            .querySelectorAll(
                "[data-commission-v2-counter]"
            )
            .forEach((counter) => {
                const blockId =
                    counter.dataset
                        .commissionV2Counter;

                const block =
                    blockMap.get(
                        blockId
                    );

                const count =
                    (
                        state.multiChoices[
                            blockId
                        ] || []
                    ).length;

                counter.textContent =
                    `${count} / ${block.maxSelections} selected`;
            });
    }


    function refreshGroupedControls(
        selector,
        collection,
        datasetName
    ) {
        commissionsPage
            .querySelectorAll(selector)
            .forEach((button) => {
                const blockId =
                    button.dataset[
                        datasetName
                    ];

                const itemId =
                    button.dataset
                        .itemId;

                const variantId =
                    button.dataset
                        .variantId ||
                    null;

                const current =
                    collection[
                        blockId
                    ]?.[itemId];

                const selected =
                    Boolean(current) &&
                    current.variantId ===
                        variantId;

                button.classList.toggle(
                    "commissions-v2__select--active",
                    selected
                );

                button.classList.toggle(
                    "commissions-v2__variant--active",
                    selected
                );

                button.setAttribute(
                    "aria-pressed",
                    String(selected)
                );


                const card =
                    button.closest(
                        ".commissions-v2__service-card"
                    );

                if (card) {
                    const cardBlockId =
                        card.dataset
                            .blockId;

                    const cardItemId =
                        card.dataset
                            .commissionV2ServiceCard;

                    const cardSelected =
                        Boolean(
                            collection[
                                cardBlockId
                            ]?.[
                                cardItemId
                            ]
                        );

                    card.classList.toggle(
                        "commissions-v2__service-card--selected",
                        cardSelected
                    );
                }
            });
    }


    function refreshSelectionControls() {
        refreshChoiceControls();


        refreshGroupedControls(
            "[data-commission-v2-service]",
            state.services,
            "commissionV2Service"
        );


        refreshGroupedControls(
            "[data-commission-v2-add-on]",
            state.addOns,
            "commissionV2AddOn"
        );
    }


    /* -------------------------------------
       CHANGE EVENT
    ------------------------------------- */

    function emitChange() {
        commissionsPage.dispatchEvent(
            new CustomEvent(
                "commissions-v2:change",
                {
                    bubbles: true,

                    detail: {
                        state:
                            cloneCommissionV2State(
                                state
                            ),

                        submissionData:
                            getSubmissionData(),

                        missingRequired:
                            getMissingRequiredSelections()
                    }
                }
            )
        );
    }


    function refresh() {
        refreshSelectionControls();
        renderSummary();
        renderEstimate();
        emitChange();
    }


    /* -------------------------------------
       STATE CHANGES
    ------------------------------------- */

    function toggleSingleChoice(
        blockId,
        optionId
    ) {
        if (
            state.singleChoices[
                blockId
            ] === optionId
        ) {
            delete state
                .singleChoices[
                    blockId
                ];
        } else {
            state.singleChoices[
                blockId
            ] = optionId;
        }

        refresh();
    }


    function toggleMultiChoice(
        blockId,
        optionId
    ) {
        const block =
            blockMap.get(blockId);

        const selected =
            state.multiChoices[
                blockId
            ] || [];

        const index =
            selected.indexOf(
                optionId
            );


        if (index >= 0) {
            selected.splice(
                index,
                1
            );
        } else {
            if (
                block?.maxSelections &&
                selected.length >=
                    block.maxSelections
            ) {
                return;
            }

            selected.push(
                optionId
            );
        }


        state.multiChoices[
            blockId
        ] = selected;

        refresh();
    }


    function toggleGroupedChoice(
        collection,
        blockId,
        itemId,
        variantId
    ) {
        if (!collection[blockId]) {
            collection[blockId] = {};
        }


        const current =
            collection[
                blockId
            ][itemId];


        if (
            current &&
            current.variantId ===
                variantId
        ) {
            delete collection[
                blockId
            ][itemId];
        } else {
            collection[
                blockId
            ][itemId] = {
                variantId
            };
        }


        refresh();
    }


    function removeSummarySelection(
        type,
        blockId,
        itemId
    ) {
        if (
            type ===
            "single-choice"
        ) {
            delete state
                .singleChoices[
                    blockId
                ];
        }


        if (
            type ===
            "multi-choice"
        ) {
            state.multiChoices[
                blockId
            ] =
                (
                    state.multiChoices[
                        blockId
                    ] || []
                ).filter(
                    (id) =>
                        id !== itemId
                );
        }


        if (
            type ===
            "services"
        ) {
            delete state
                .services[
                    blockId
                ]?.[itemId];
        }


        if (
            type ===
            "add-ons"
        ) {
            delete state
                .addOns[
                    blockId
                ]?.[itemId];
        }


        refresh();
    }


    /* -------------------------------------
       BUILD PAGE
    ------------------------------------- */

    initializeDefaults();


    if (data.intro) {
        commissionsPage.appendChild(
            createCommissionV2Intro(
                data.intro
            )
        );
    }


    const blocksContainer =
        document.createElement("div");

    blocksContainer.className =
        "commissions-v2__blocks";


    blocks.forEach((block) => {
        const blockElement =
            createCommissionV2Block(
                block,
                pricing
            );

        if (blockElement) {
            blocksContainer.appendChild(
                blockElement
            );
        }
    });


    commissionsPage.appendChild(
        blocksContainer
    );


    initializeCommissionV2Carousels(
        commissionsPage
    );


    /* -------------------------------------
       CLICK HANDLING
    ------------------------------------- */

    commissionsPage.addEventListener(
        "click",
        (event) => {
            const singleButton =
                event.target.closest(
                    "[data-commission-v2-single-choice]"
                );

            if (singleButton) {
                toggleSingleChoice(
                    singleButton.dataset
                        .commissionV2SingleChoice,

                    singleButton.dataset
                        .optionId
                );

                return;
            }


            const multiButton =
                event.target.closest(
                    "[data-commission-v2-multi-choice]"
                );

            if (multiButton) {
                toggleMultiChoice(
                    multiButton.dataset
                        .commissionV2MultiChoice,

                    multiButton.dataset
                        .optionId
                );

                return;
            }


            const serviceButton =
                event.target.closest(
                    "[data-commission-v2-service]"
                );

            if (serviceButton) {
                toggleGroupedChoice(
                    state.services,

                    serviceButton.dataset
                        .commissionV2Service,

                    serviceButton.dataset
                        .itemId,

                    serviceButton.dataset
                        .variantId ||
                    null
                );

                return;
            }


            const addOnButton =
                event.target.closest(
                    "[data-commission-v2-add-on]"
                );

            if (addOnButton) {
                toggleGroupedChoice(
                    state.addOns,

                    addOnButton.dataset
                        .commissionV2AddOn,

                    addOnButton.dataset
                        .itemId,

                    addOnButton.dataset
                        .variantId ||
                    null
                );

                return;
            }


            const removeButton =
                event.target.closest(
                    "[data-commission-v2-remove]"
                );

            if (removeButton) {
                removeSummarySelection(
                    removeButton.dataset
                        .selectionType,

                    removeButton.dataset
                        .blockId,

                    removeButton.dataset
                        .itemId
                );
            }
        }
    );


    /* -------------------------------------
       PUBLIC API
    ------------------------------------- */

    commissionsPage.getSelectionState =
        function () {
            return cloneCommissionV2State(
                state
            );
        };


    commissionsPage.getSubmissionData =
        function () {
            return getSubmissionData();
        };


    commissionsPage.getEstimatedTotal =
        function () {
            return calculateEstimatedTotal();
        };


    commissionsPage.getActiveQuestionGroups =
        function () {
            return getActiveQuestionGroups();
        };


    commissionsPage.getMissingRequiredSelections =
        function () {
            return getMissingRequiredSelections();
        };


    commissionsPage.isComplete =
        function () {
            return (
                getMissingRequiredSelections()
                    .length === 0
            );
        };


    refresh();

    return commissionsPage;
}
