function formatCommissionV2Price(
    value,
    pricing = {}
) {
    const symbol =
        pricing.currencySymbol || "$";

    const decimals =
        pricing.decimals ?? 0;

    return `${symbol}${Number(
        value || 0
    ).toFixed(decimals)}`;
}


function cloneCommissionV2State(state) {
    if (
        typeof structuredClone ===
        "function"
    ) {
        return structuredClone(state);
    }

    return JSON.parse(
        JSON.stringify(state)
    );
}


function createCommissionV2DecorSlots() {
    return `
        <div
            class="commissions-v2__decor
                   commissions-v2__decor--one"
        ></div>

        <div
            class="commissions-v2__decor
                   commissions-v2__decor--two"
        ></div>
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
   INTRO
========================================= */

function createCommissionV2Intro(
    intro = {}
) {
    const element =
        document.createElement("header");

    element.className =
        "commissions-v2__intro";

    element.innerHTML = `
        ${createCommissionV2DecorSlots()}

        ${
            intro.eyebrow
                ? `
                    <p class="commissions-v2__eyebrow">
                        ${intro.eyebrow}
                    </p>
                `
                : ""
        }

        ${
            intro.title
                ? `
                    <h1>
                        ${intro.title}
                    </h1>
                `
                : ""
        }

        ${
            intro.description
                ? `
                    <p class="commissions-v2__description">
                        ${intro.description}
                    </p>
                `
                : ""
        }
    `;

    return element;
}


/* =========================================
   BLOCK HEADING
========================================= */

function createCommissionV2BlockHeading(
    block = {}
) {
    return `
        <header
            class="commissions-v2__block-heading"
        >
            ${
                block.eyebrow
                    ? `
                        <p
                            class="commissions-v2__block-eyebrow"
                        >
                            ${block.eyebrow}
                        </p>
                    `
                    : ""
            }

            ${
                block.title
                    ? `
                        <h2>
                            ${block.title}
                        </h2>
                    `
                    : ""
            }

            ${
                block.description
                    ? `
                        <p
                            class="commissions-v2__block-description"
                        >
                            ${block.description}
                        </p>
                    `
                    : ""
            }
        </header>
    `;
}


/* =========================================
   GENERIC LOOP CAROUSEL
========================================= */

function initializeCommissionV2LoopCarousel(
    carousel,
    config
) {
    const items = Array.from(
        carousel.querySelectorAll(
            config.itemSelector
        )
    );

    if (!items.length) {
        return;
    }


    let activeIndex =
        items.findIndex((item) =>
            item.classList.contains(
                config.activeClass
            )
        );


    if (activeIndex < 0) {
        activeIndex = 0;
    }


    const previousButton =
        config.previousSelector
            ? carousel.querySelector(
                config.previousSelector
            )
            : null;


    const nextButton =
        config.nextSelector
            ? carousel.querySelector(
                config.nextSelector
            )
            : null;


    const dots =
        config.dotSelector
            ? Array.from(
                carousel.querySelectorAll(
                    config.dotSelector
                )
            )
            : [];


    function showItem(index) {
        activeIndex =
            (
                index +
                items.length
            ) %
            items.length;


        items.forEach(
            (item, itemIndex) => {
                item.classList.toggle(
                    config.activeClass,
                    itemIndex === activeIndex
                );
            }
        );


        if (
            dots.length &&
            config.activeDotClass
        ) {
            dots.forEach(
                (dot, dotIndex) => {
                    dot.classList.toggle(
                        config.activeDotClass,
                        dotIndex === activeIndex
                    );
                }
            );
        }
    }


    if (
        items.length > 1 &&
        previousButton
    ) {
        previousButton.addEventListener(
            "click",
            () => {
                showItem(
                    activeIndex - 1
                );
            }
        );
    }


    if (
        items.length > 1 &&
        nextButton
    ) {
        nextButton.addEventListener(
            "click",
            () => {
                showItem(
                    activeIndex + 1
                );
            }
        );
    }


    showItem(activeIndex);
}


/* =========================================
   FINISHED WEBSITE EXAMPLES

   Existing working section preserved.
========================================= */

function createCommissionV2ExamplesBlock(
    block
) {
    const element =
        document.createElement(
            "section"
        );

    const items =
        block.items || [];


    element.className =
        "commissions-v2__block " +
        "commissions-v2__examples";

    element.dataset.commissionV2Block =
        block.id;


    const outerControls =
        createCommissionV2LoopControls(
            "commissions-v2__arrow commissions-v2__arrow--previous",
            "commissions-v2__arrow commissions-v2__arrow--next",
            "Previous website",
            "Next website"
        );


    const examplesHTML =
        items
            .map(
                (
                    item,
                    exampleIndex
                ) => {

                    const images =
                        item.images || [];


                    const imageControls =
                        createCommissionV2LoopControls(
                            "commissions-v2__image-arrow commissions-v2__image-arrow--previous",
                            "commissions-v2__image-arrow commissions-v2__image-arrow--next",
                            "Previous image",
                            "Next image"
                        );


                    const imagesHTML =
                        images
                            .map(
                                (
                                    image,
                                    imageIndex
                                ) => `
                                    <div
                                        class="
                                            commissions-v2__example-image
                                            ${
                                                imageIndex === 0
                                                    ? "commissions-v2__example-image--active"
                                                    : ""
                                            }
                                        "
                                    >
                                        <img
                                            src="${image.image}"
                                            alt="${image.alt || ""}"
                                            loading="lazy"
                                        >
                                    </div>
                                `
                            )
                            .join("");


                    const detailsHTML =
                        (
                            item.details || []
                        )
                            .map(
                                (detail) => `
                                    <div
                                        class="commissions-v2__example-detail"
                                    >
                                        <strong>
                                            ${detail.label}
                                        </strong>

                                        <span>
                                            ${detail.value}
                                        </span>
                                    </div>
                                `
                            )
                            .join("");


                    return `
                        <article
                            class="
                                commissions-v2__example
                                ${
                                    exampleIndex === 0
                                        ? "commissions-v2__example--active"
                                        : ""
                                }
                            "
                        >
                            <div
                                class="commissions-v2__example-media"
                            >
                                <div
                                    class="commissions-v2__image-carousel"
                                    data-commission-v2-example-image-carousel
                                >
                                    ${
                                        images.length > 1
                                            ? imageControls.previous
                                            : ""
                                    }

                                    <div
                                        class="commissions-v2__example-image-window"
                                    >
                                        ${imagesHTML}
                                    </div>

                                    ${
                                        images.length > 1
                                            ? imageControls.next
                                            : ""
                                    }
                                </div>
                            </div>


                            <div
                                class="commissions-v2__example-copy"
                            >
                                ${
                                    item.title
                                        ? `
                                            <h3>
                                                ${item.title}
                                            </h3>
                                        `
                                        : ""
                                }

                                ${
                                    item.description
                                        ? `
                                            <p>
                                                ${item.description}
                                            </p>
                                        `
                                        : ""
                                }

                                ${
                                    detailsHTML
                                        ? `
                                            <div
                                                class="commissions-v2__example-details"
                                            >
                                                ${detailsHTML}
                                            </div>
                                        `
                                        : ""
                                }
                            </div>
                        </article>
                    `;
                }
            )
            .join("");


    element.innerHTML = `
        ${createCommissionV2DecorSlots()}

        ${createCommissionV2BlockHeading(
            block
        )}

        <div
            class="commissions-v2__carousel"
            data-commission-v2-example-carousel
        >
            ${
                items.length > 1
                    ? outerControls.previous
                    : ""
            }

            <div
                class="commissions-v2__example-window"
            >
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
   REUSABLE SELECTION SHOWCASE

   Used for:
   - homepage layout
   - homepage sections
   - full pages
   - add-ons
   - future selection blocks

   Outer carousel = options
   Inner carousel = examples

   Optional bookId adds a second
   "View Book" button.
========================================= */

function createCommissionV2SelectionShowcase(
    block,
    pricing
) {
    const element =
        document.createElement(
            "section"
        );


    const options =
        block.options || [];


    const selectionMode =
        block.selectionMode ||
        "single";


    element.className =
        "commissions-v2__block " +
        "commissions-v2__selection-showcase";


    element.dataset.commissionV2Block =
        block.id;


    const outerControls =
        createCommissionV2LoopControls(
            "commissions-v2__selection-arrow commissions-v2__selection-arrow--previous",
            "commissions-v2__selection-arrow commissions-v2__selection-arrow--next",
            "Previous option",
            "Next option"
        );


    const slidesHTML =
        options
            .map(
                (
                    option,
                    optionIndex
                ) => {

                    const images =
                        option.images ||
                        (
                            option.image
                                ? [
                                    {
                                        image:
                                            option.image,

                                        alt:
                                            option.alt ||
                                            ""
                                    }
                                ]
                                : []
                        );


                    const imageControls =
                        createCommissionV2LoopControls(
                            "commissions-v2__selection-image-arrow commissions-v2__selection-image-arrow--previous",
                            "commissions-v2__selection-image-arrow commissions-v2__selection-image-arrow--next",
                            "Previous example",
                            "Next example"
                        );


                    const imagesHTML =
                        images
                            .map(
                                (
                                    image,
                                    imageIndex
                                ) => `
                                    <div
                                        class="
                                            commissions-v2__selection-image
                                            ${
                                                imageIndex === 0
                                                    ? "commissions-v2__selection-image--active"
                                                    : ""
                                            }
                                        "
                                    >
                                        <img
                                            src="${image.image}"
                                            alt="${image.alt || ""}"
                                            loading="lazy"
                                        >
                                    </div>
                                `
                            )
                            .join("");


                    const dotsHTML =
                        images.length > 1
                            ? `
                                <div
                                    class="commissions-v2__selection-dots"
                                    aria-hidden="true"
                                >
                                    ${images
                                        .map(
                                            (
                                                _,
                                                imageIndex
                                            ) => `
                                                <span
                                                    class="
                                                        commissions-v2__selection-dot
                                                        ${
                                                            imageIndex === 0
                                                                ? "commissions-v2__selection-dot--active"
                                                                : ""
                                                        }
                                                    "
                                                    data-commission-v2-selection-dot
                                                ></span>
                                            `
                                        )
                                        .join("")}
                                </div>
                            `
                            : "";


                    let priceHTML = "";


                    if (option.priceLabel) {
                        priceHTML = `
                            <p
                                class="commissions-v2__selection-price"
                            >
                                ${option.priceLabel}
                            </p>
                        `;
                    } else if (
                        typeof option.price ===
                        "number"
                    ) {
                        priceHTML = `
                            <p
                                class="commissions-v2__selection-price"
                            >
                                ${
                                    option.price === 0
                                        ? "Included"
                                        : `+${formatCommissionV2Price(
                                            option.price,
                                            pricing
                                        )}`
                                }
                            </p>
                        `;
                    }


                    const selectAttribute =
                        selectionMode ===
                        "multiple"
                            ? `data-commission-v2-multi-select="${block.id}"`
                            : `data-commission-v2-single-select="${block.id}"`;


                    const bookButtonHTML =
                        option.bookId
                            ? `
                                <button
                                    class="
                                        button
                                        commissions-v2__book-button
                                    "
                                    type="button"

                                    data-commission-v2-open-book="${option.bookId}"
                                >
                                    ${
                                        option.bookButtonText ||
                                        "View Catalogue"
                                    }
                                </button>
                            `
                            : "";


                    return `
                        <article
                            class="
                                commissions-v2__selection-slide
                                ${
                                    optionIndex === 0
                                        ? "commissions-v2__selection-slide--active"
                                        : ""
                                }
                            "
                            data-commission-v2-selection-slide
                            data-option-id="${option.id}"
                        >
                            <div
                                class="commissions-v2__selection-copy"
                            >
                                ${
                                    option.name
                                        ? `
                                            <h3>
                                                ${option.name}
                                            </h3>
                                        `
                                        : ""
                                }

                                ${
                                    option.description
                                        ? `
                                            <p>
                                                ${option.description}
                                            </p>
                                        `
                                        : ""
                                }

                                ${priceHTML}
                            </div>


                            ${
                                images.length
                                    ? `
                                        <div
                                            class="commissions-v2__selection-image-carousel"
                                            data-commission-v2-selection-image-carousel
                                        >
                                            ${
                                                images.length > 1
                                                    ? imageControls.previous
                                                    : ""
                                            }

                                            <div
                                                class="commissions-v2__selection-image-window"
                                            >
                                                ${imagesHTML}
                                            </div>

                                            ${
                                                images.length > 1
                                                    ? imageControls.next
                                                    : ""
                                            }

                                            ${dotsHTML}
                                        </div>
                                    `
                                    : ""
                            }


                            ${
                                block.selectionNote
                                    ? `
                                        <p
                                            class="commissions-v2__selection-note"
                                        >
                                            ${block.selectionNote}
                                        </p>
                                    `
                                    : ""
                            }


                            <div
                                class="commissions-v2__selection-actions"
                            >
                                <button
                                    class="
                                        button
                                        commissions-v2__selection-button
                                    "
                                    type="button"
                                    aria-pressed="false"

                                    ${selectAttribute}

                                    data-option-id="${option.id}"

                                    data-option-name="${
                                        option.name ||
                                        "Option"
                                    }"

                                    data-default-button-text="${
                                        option.buttonText ||
                                        "Select"
                                    }"
                                >
                                    ${
                                        option.buttonText ||
                                        "Select"
                                    }
                                </button>

                                ${bookButtonHTML}
                            </div>
                        </article>
                    `;
                }
            )
            .join("");


    const counterHTML =
        selectionMode ===
            "multiple" &&
        block.maxSelections
            ? `
                <p
                    class="commissions-v2__selection-counter"
                    data-commission-v2-counter="${block.id}"
                >
                    0 / ${block.maxSelections} selected
                </p>
            `
            : "";


    element.innerHTML = `
        ${createCommissionV2DecorSlots()}

        ${createCommissionV2BlockHeading(
            block
        )}

        ${counterHTML}

        <div
            class="commissions-v2__selection-carousel"
            data-commission-v2-selection-carousel
        >
            ${
                options.length > 1
                    ? outerControls.previous
                    : ""
            }

            <div
                class="commissions-v2__selection-window"
            >
                ${slidesHTML}
            </div>

            ${
                options.length > 1
                    ? outerControls.next
                    : ""
            }
        </div>
    `;


    return element;
}


/* =========================================
   BOOK CATALOGUES

   Books are intentionally NON-INTERACTIVE.

   The customer browses numbered items
   and references the number in the form.

   A book can contain unlimited sections.
   A section can contain unlimited items.
========================================= */

function createCommissionV2BookDialog(
    book
) {
    const dialog =
        document.createElement(
            "dialog"
        );


    dialog.className =
        "commissions-v2__dialog " +
        "commissions-v2__book-dialog";


    dialog.dataset.commissionV2Book =
        book.id;


    let automaticNumber = 1;


    const sectionsHTML =
        (book.sections || [])
            .map((section) => {

                const itemsHTML =
                    (section.items || [])
                        .map((item) => {

                            const itemNumber =
                                item.number ??
                                automaticNumber;


                            automaticNumber =
                                Math.max(
                                    automaticNumber + 1,
                                    Number(itemNumber) + 1
                                );


                            return `
                                <article
                                    class="commissions-v2__book-item"
                                >
                                    <p
                                        class="commissions-v2__book-number"
                                    >
                                        #${itemNumber}
                                    </p>

                                    ${
                                        item.image
                                            ? `
                                                <div
                                                    class="commissions-v2__book-item-media"
                                                >
                                                    <img
                                                        src="${item.image}"
                                                        alt="${
                                                            item.alt ||
                                                            item.name ||
                                                            `Catalogue item ${itemNumber}`
                                                        }"
                                                        loading="lazy"
                                                    >
                                                </div>
                                            `
                                            : ""
                                    }

                                    ${
                                        item.name
                                            ? `
                                                <h4>
                                                    ${item.name}
                                                </h4>
                                            `
                                            : ""
                                    }

                                    ${
                                        item.description
                                            ? `
                                                <p
                                                    class="commissions-v2__book-item-description"
                                                >
                                                    ${item.description}
                                                </p>
                                            `
                                            : ""
                                    }

                                    ${
                                        item.priceLabel
                                            ? `
                                                <p
                                                    class="commissions-v2__book-item-price"
                                                >
                                                    ${item.priceLabel}
                                                </p>
                                            `
                                            : (
                                                typeof item.price ===
                                                "number"
                                                    ? `
                                                        <p
                                                            class="commissions-v2__book-item-price"
                                                        >
                                                            $${item.price}
                                                        </p>
                                                    `
                                                    : ""
                                            )
                                    }
                                </article>
                            `;
                        })
                        .join("");


                return `
                    <section
                        class="commissions-v2__book-section"
                    >
                        ${
                            section.title
                                ? `
                                    <h3>
                                        ${section.title}
                                    </h3>
                                `
                                : ""
                        }

                        ${
                            section.description
                                ? `
                                    <p
                                        class="commissions-v2__book-section-description"
                                    >
                                        ${section.description}
                                    </p>
                                `
                                : ""
                        }

                        <div
                            class="commissions-v2__book-grid"
                        >
                            ${itemsHTML}
                        </div>
                    </section>
                `;
            })
            .join("");


    dialog.innerHTML = `
        <div
            class="commissions-v2__dialog-panel
                   commissions-v2__book-panel"
        >
            <div
                class="commissions-v2__dialog-top"
            >
                <div>
                    ${
                        book.title
                            ? `
                                <h2>
                                    ${book.title}
                                </h2>
                            `
                            : ""
                    }

                    ${
                        book.description
                            ? `
                                <p>
                                    ${book.description}
                                </p>
                            `
                            : ""
                    }
                </div>

                <button
                    class="commissions-v2__dialog-close"
                    type="button"
                    aria-label="Close catalogue"
                    data-commission-v2-close-dialog
                >
                    ×
                </button>
            </div>


            ${
                book.instructions
                    ? `
                        <div
                            class="commissions-v2__book-instructions"
                        >
                            ${book.instructions}
                        </div>
                    `
                    : ""
            }


            <div
                class="commissions-v2__book-content"
            >
                ${
                    sectionsHTML ||
                    `
                        <p
                            class="commissions-v2__book-empty"
                        >
                            Nothing has been added to this catalogue yet.
                        </p>
                    `
                }
            </div>
        </div>
    `;


    return dialog;
}


/* =========================================
   FORM FIELDS
========================================= */

function createCommissionV2FormField(
    field
) {
    const requiredAttribute =
        field.required
            ? "required"
            : "";


    const requiredLabel =
        field.required
            ? `
                <span
                    class="commissions-v2__required"
                    aria-hidden="true"
                >
                    *
                </span>
            `
            : "";


    const descriptionHTML =
        field.description
            ? `
                <p
                    class="commissions-v2__field-description"
                >
                    ${field.description}
                </p>
            `
            : "";


    let controlHTML = "";


    if (field.type === "textarea") {
        controlHTML = `
            <textarea
                id="${field.id}"
                name="${field.name}"
                placeholder="${field.placeholder || ""}"
                ${requiredAttribute}
            ></textarea>
        `;
    } else if (field.type === "file") {
        controlHTML = `
            <input
                id="${field.id}"
                name="${field.name}"
                type="file"

                ${
                    field.accept
                        ? `accept="${field.accept}"`
                        : ""
                }

                ${
                    field.multiple
                        ? "multiple"
                        : ""
                }

                ${requiredAttribute}
            >
        `;
    } else {
        controlHTML = `
            <input
                id="${field.id}"
                name="${field.name}"
                type="${field.type || "text"}"
                placeholder="${field.placeholder || ""}"
                ${requiredAttribute}
            >
        `;
    }


    return `
        <div
            class="commissions-v2__field"
        >
            <label
                for="${field.id}"
            >
                ${field.label || field.name}
                ${requiredLabel}
            </label>

            ${descriptionHTML}

            ${controlHTML}
        </div>
    `;
}


/* =========================================
   REQUEST FORM
========================================= */

function createCommissionV2RequestFormBlock(
    block,
    data
) {
    const element =
        document.createElement(
            "section"
        );


    element.className =
        "commissions-v2__block " +
        "commissions-v2__request";


    element.dataset.commissionV2Block =
        block.id;


    const fieldsHTML =
        (block.fields || [])
            .map(
                (field) =>
                    createCommissionV2FormField(
                        field
                    )
            )
            .join("");


    const conditionalHTML =
        Object.entries(
            block.questionGroups || {}
        )
            .map(
                (
                    [
                        groupId,
                        group
                    ]
                ) => {

                    const groupFieldsHTML =
                        (
                            group.fields || []
                        )
                            .map(
                                (field) =>
                                    createCommissionV2FormField(
                                        field
                                    )
                            )
                            .join("");


                    return `
                        <section
                            class="commissions-v2__conditional-group"
                            data-commission-v2-question-group="${groupId}"
                            hidden
                        >
                            ${
                                group.title
                                    ? `
                                        <h3>
                                            ${group.title}
                                        </h3>
                                    `
                                    : ""
                            }

                            ${
                                group.description
                                    ? `
                                        <p>
                                            ${group.description}
                                        </p>
                                    `
                                    : ""
                            }

                            <div
                                class="commissions-v2__form-fields"
                            >
                                ${groupFieldsHTML}
                            </div>
                        </section>
                    `;
                }
            )
            .join("");


    const action =
        block.formAction ||
        data.formAction ||
        "";


    const method =
        block.formMethod ||
        data.formMethod ||
        "POST";


    element.innerHTML = `
        ${createCommissionV2DecorSlots()}

        ${createCommissionV2BlockHeading(
            block
        )}

        <div
            class="commissions-v2__request-launch"
        >
            <button
                class="button commissions-v2__request-open"
                type="button"
                data-commission-v2-open-request
            >
                ${
                    block.openButtonText ||
                    "Submit Request"
                }
            </button>
        </div>


        <dialog
            class="commissions-v2__dialog
                   commissions-v2__request-dialog"

            data-commission-v2-request-dialog
        >
            <div
                class="commissions-v2__dialog-panel
                       commissions-v2__request-panel"
            >
                <div
                    class="commissions-v2__dialog-top"
                >
                    <div>
                        <h2>
                            ${
                                block.title ||
                                "Submit Your Request"
                            }
                        </h2>

                        ${
                            block.description
                                ? `
                                    <p>
                                        ${block.description}
                                    </p>
                                `
                                : ""
                        }
                    </div>

                    <button
                        class="commissions-v2__dialog-close"
                        type="button"
                        aria-label="Close request form"
                        data-commission-v2-close-dialog
                    >
                        ×
                    </button>
                </div>


                <form
                    class="commissions-v2__request-form"

                    data-commission-v2-request-form

                    action="${action}"

                    method="${method}"

                    enctype="multipart/form-data"
                >
                    ${
                        block.showSelectionSummary !==
                        false
                            ? `
                                <section
                                    class="commissions-v2__form-review"
                                >
                                    <h3>
                                        ${
                                            block.selectionSummaryTitle ||
                                            "Your Website Choices"
                                        }
                                    </h3>

                                    <div
                                        data-commission-v2-form-summary
                                    ></div>
                                </section>
                            `
                            : ""
                    }


                    <div
                        class="commissions-v2__form-warning"
                        data-commission-v2-form-warning
                        hidden
                    ></div>


                    <div
                        data-commission-v2-hidden-fields
                    ></div>


                    <div
                        class="commissions-v2__form-fields"
                    >
                        ${fieldsHTML}
                    </div>


                    ${
                        conditionalHTML
                            ? `
                                <div
                                    class="commissions-v2__conditional-groups"
                                >
                                    ${conditionalHTML}
                                </div>
                            `
                            : ""
                    }


                    <div
                        class="commissions-v2__form-actions"
                    >
                        <button
                            class="button"
                            type="button"
                            data-commission-v2-close-dialog
                        >
                            ${
                                block.closeButtonText ||
                                "Keep Editing"
                            }
                        </button>

                        <button
                            class="button commissions-v2__form-submit"
                            type="submit"
                        >
                            ${
                                block.submitButtonText ||
                                "Send for Quote"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    `;


    return element;
}


/* =========================================
   NOTICE
========================================= */

function createCommissionV2NoticeBlock(
    block
) {
    const element =
        document.createElement(
            "section"
        );


    element.className =
        "commissions-v2__block " +
        "commissions-v2__notice";


    element.dataset.commissionV2Block =
        block.id;


    element.innerHTML = `
        ${createCommissionV2DecorSlots()}

        ${createCommissionV2BlockHeading(
            block
        )}

        ${
            block.body
                ? `
                    <div
                        class="commissions-v2__notice-body"
                    >
                        ${block.body}
                    </div>
                `
                : ""
        }
    `;


    return element;
}


/* =========================================
   SUMMARY
========================================= */

function createCommissionV2SummaryBlock(
    block
) {
    const element =
        document.createElement(
            "section"
        );


    element.className =
        "commissions-v2__block " +
        "commissions-v2__summary";


    element.dataset.commissionV2Block =
        block.id;


    element.innerHTML = `
        ${createCommissionV2DecorSlots()}

        ${createCommissionV2BlockHeading(
            block
        )}

        <div
            class="commissions-v2__summary-content"
            data-commission-v2-summary
        ></div>
    `;


    return element;
}


/* =========================================
   ESTIMATE

   Kept available for the next step.
========================================= */

function createCommissionV2EstimateBlock(
    block
) {
    const element =
        document.createElement(
            "section"
        );


    element.className =
        "commissions-v2__block " +
        "commissions-v2__estimate";


    element.dataset.commissionV2Block =
        block.id;


    element.innerHTML = `
        ${createCommissionV2DecorSlots()}

        ${createCommissionV2BlockHeading(
            block
        )}

        <p
            class="commissions-v2__estimate-total"
            data-commission-v2-estimate
        ></p>

        ${
            block.shortDisclaimer
                ? `
                    <p
                        class="commissions-v2__estimate-short-disclaimer"
                    >
                        ${block.shortDisclaimer}
                    </p>
                `
                : ""
        }

        ${
            block.disclaimer
                ? `
                    <p
                        class="commissions-v2__estimate-disclaimer"
                    >
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
    pricing,
    data
) {
    switch (block.type) {

        case "examples":
            return createCommissionV2ExamplesBlock(
                block
            );


        case "selection-showcase":
            return createCommissionV2SelectionShowcase(
                block,
                pricing
            );


        case "request-form":
            return createCommissionV2RequestFormBlock(
                block,
                data
            );


        case "notice":
            return createCommissionV2NoticeBlock(
                block
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
   INITIALIZE CAROUSELS
========================================= */

function initializeCommissionV2Carousels(
    root
) {

    root
        .querySelectorAll(
            "[data-commission-v2-example-carousel]"
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
            "[data-commission-v2-example-image-carousel]"
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
            "[data-commission-v2-selection-carousel]"
        )
        .forEach((carousel) => {

            initializeCommissionV2LoopCarousel(
                carousel,
                {
                    itemSelector:
                        ".commissions-v2__selection-slide",

                    activeClass:
                        "commissions-v2__selection-slide--active",

                    previousSelector:
                        ".commissions-v2__selection-arrow--previous",

                    nextSelector:
                        ".commissions-v2__selection-arrow--next"
                }
            );
        });


    root
        .querySelectorAll(
            "[data-commission-v2-selection-image-carousel]"
        )
        .forEach((carousel) => {

            initializeCommissionV2LoopCarousel(
                carousel,
                {
                    itemSelector:
                        ".commissions-v2__selection-image",

                    activeClass:
                        "commissions-v2__selection-image--active",

                    previousSelector:
                        ".commissions-v2__selection-image-arrow--previous",

                    nextSelector:
                        ".commissions-v2__selection-image-arrow--next",

                    dotSelector:
                        "[data-commission-v2-selection-dot]",

                    activeDotClass:
                        "commissions-v2__selection-dot--active"
                }
            );
        });
}


/* =========================================
   MAIN COMPONENT
========================================= */

function createCommissionsV2(data) {
    const commissionsPage =
        document.createElement(
            "section"
        );


    commissionsPage.className =
        "commissions-v2";


    const pricing =
        data.pricing || {};


    const blocks =
        data.blocks || [];


    const blockMap =
        new Map(
            blocks.map(
                (block) => [
                    block.id,
                    block
                ]
            )
        );


    const state = {
        selections: {}
    };


    /* =====================================
       LOOKUPS
    ===================================== */

    function findOption(
        blockId,
        optionId
    ) {
        const block =
            blockMap.get(blockId);


        return (
            block?.options || []
        ).find(
            (option) =>
                option.id === optionId
        );
    }


    function getSelectedIds(
        blockId
    ) {
        return (
            state.selections[
                blockId
            ] || []
        );
    }


    /* =====================================
       DEFAULTS
    ===================================== */

    function initializeDefaults() {
        blocks.forEach((block) => {

            if (
                block.type !==
                "selection-showcase"
            ) {
                return;
            }


            const defaults =
                (
                    block.options || []
                )
                    .filter(
                        (option) =>
                            option.defaultSelected
                    )
                    .map(
                        (option) =>
                            option.id
                    );


            if (
                block.selectionMode ===
                "multiple"
            ) {
                state.selections[
                    block.id
                ] =
                    block.maxSelections
                        ? defaults.slice(
                            0,
                            block.maxSelections
                        )
                        : defaults;

                return;
            }


            state.selections[
                block.id
            ] =
                defaults.length
                    ? [defaults[0]]
                    : [];
        });
    }


    /* =====================================
       PRICE
    ===================================== */

    function calculateEstimatedTotal() {
        let total =
            Number(
                pricing.basePrice || 0
            );


        blocks.forEach((block) => {

            if (
                block.type !==
                "selection-showcase"
            ) {
                return;
            }


            getSelectedIds(
                block.id
            ).forEach(
                (optionId) => {

                    const option =
                        findOption(
                            block.id,
                            optionId
                        );


                    if (!option) {
                        return;
                    }


                    total +=
                        Number(
                            option.price || 0
                        );
                }
            );
        });


        return total;
    }


    /* =====================================
       QUESTION GROUPS
    ===================================== */

    function getActiveQuestionGroups() {
        const groups =
            new Set();


        blocks.forEach((block) => {

            if (
                block.type !==
                "selection-showcase"
            ) {
                return;
            }


            getSelectedIds(
                block.id
            ).forEach(
                (optionId) => {

                    const option =
                        findOption(
                            block.id,
                            optionId
                        );


                    (
                        option?.questionGroups ||
                        []
                    ).forEach(
                        (group) =>
                            groups.add(group)
                    );
                }
            );
        });


        return Array.from(groups);
    }


    /* =====================================
       BUILD CODES
    ===================================== */

    function getBuildCodes() {
        const codes = [];


        blocks.forEach((block) => {

            if (
                block.type !==
                "selection-showcase"
            ) {
                return;
            }


            getSelectedIds(
                block.id
            ).forEach(
                (optionId) => {

                    const option =
                        findOption(
                            block.id,
                            optionId
                        );


                    if (option?.code) {
                        codes.push(
                            option.code
                        );
                    }
                }
            );
        });


        return codes;
    }


    /* =====================================
       READABLE SELECTIONS
    ===================================== */

    function getReadableSelections() {
        const groups = [];


        blocks.forEach((block) => {

            if (
                block.type !==
                "selection-showcase"
            ) {
                return;
            }


            const items =
                getSelectedIds(
                    block.id
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

                label:
                    block.selectionLabel ||
                    block.title ||
                    block.id,

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


                group.items.forEach(
                    (item) => {

                        lines.push(
                            `- ${item.name}`
                        );
                    }
                );


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


    /* =====================================
       REQUIRED SELECTIONS
    ===================================== */

    function getMissingRequiredSelections() {
        const missing = [];


        blocks.forEach((block) => {

            if (
                block.type !==
                    "selection-showcase" ||
                !block.required
            ) {
                return;
            }


            const selectedCount =
                getSelectedIds(
                    block.id
                ).length;


            const minimum =
                block.minSelections ?? 1;


            if (
                selectedCount <
                minimum
            ) {
                missing.push(
                    block.id
                );
            }
        });


        return missing;
    }


    function getMissingRequiredLabels() {
        return getMissingRequiredSelections()
            .map((blockId) => {

                const block =
                    blockMap.get(blockId);


                return (
                    block?.selectionLabel ||
                    block?.title ||
                    blockId
                );
            });
    }


    /* =====================================
       SUBMISSION DATA
    ===================================== */

    function getSubmissionData() {
        const submission = {
            formType:
                data.formType ||
                "website-request",

            requestName:
                data.requestName ||
                data.intro?.title ||
                "Website Request",

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


    /* =====================================
       SUMMARY HTML
    ===================================== */

    function createReadableSelectionsHTML(
        allowRemove = false
    ) {
        const groups =
            getReadableSelections();


        if (!groups.length) {
            return `
                <p
                    class="commissions-v2__summary-empty"
                >
                    ${
                        data.summaryEmptyText ||
                        "Nothing selected yet."
                    }
                </p>
            `;
        }


        return groups
            .map(
                (group) => `
                    <section
                        class="commissions-v2__summary-group"
                    >
                        <h3>
                            ${group.label}
                        </h3>

                        <ul>
                            ${group.items
                                .map(
                                    (item) => `
                                        <li
                                            class="commissions-v2__summary-item"
                                        >
                                            <span>
                                                ${item.name}
                                            </span>

                                            ${
                                                allowRemove
                                                    ? `
                                                        <button
                                                            type="button"
                                                            class="commissions-v2__summary-remove"

                                                            aria-label="Remove ${item.name}"

                                                            data-commission-v2-summary-remove

                                                            data-block-id="${group.blockId}"

                                                            data-option-id="${item.id}"
                                                        >
                                                            ×
                                                        </button>
                                                    `
                                                    : ""
                                            }
                                        </li>
                                    `
                                )
                                .join("")}
                        </ul>
                    </section>
                `
            )
            .join("");
    }


    /* =====================================
       RENDER SUMMARY
    ===================================== */

    function renderSummary() {
        commissionsPage
            .querySelectorAll(
                "[data-commission-v2-summary]"
            )
            .forEach(
                (summary) => {

                    summary.innerHTML =
                        createReadableSelectionsHTML(
                            true
                        );
                }
            );
    }


    /* =====================================
       RENDER ESTIMATE
    ===================================== */

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
            .forEach(
                (element) => {

                    element.textContent =
                        total;
                }
            );
    }


    /* =====================================
       FORM REVIEW
    ===================================== */

    function renderRequestForms() {
        const activeQuestionGroups =
            new Set(
                getActiveQuestionGroups()
            );


        commissionsPage
            .querySelectorAll(
                "[data-commission-v2-form-summary]"
            )
            .forEach(
                (summary) => {

                    summary.innerHTML =
                        createReadableSelectionsHTML(
                            false
                        );
                }
            );


        commissionsPage
            .querySelectorAll(
                "[data-commission-v2-question-group]"
            )
            .forEach(
                (group) => {

                    const groupId =
                        group.dataset
                            .commissionV2QuestionGroup;


                    const active =
                        activeQuestionGroups.has(
                            groupId
                        );


                    group.hidden =
                        !active;


                    group
                        .querySelectorAll(
                            "input, textarea, select"
                        )
                        .forEach(
                            (control) => {

                                control.disabled =
                                    !active;
                            }
                        );
                }
            );


        commissionsPage
            .querySelectorAll(
                "[data-commission-v2-hidden-fields]"
            )
            .forEach(
                (container) => {

                    container.innerHTML =
                        "";


                    const submission =
                        getSubmissionData();


                    Object.entries(
                        submission
                    ).forEach(
                        (
                            [
                                key,
                                value
                            ]
                        ) => {

                            const input =
                                document.createElement(
                                    "input"
                                );


                            input.type =
                                "hidden";

                            input.name =
                                key;

                            input.value =
                                String(
                                    value ?? ""
                                );


                            container.appendChild(
                                input
                            );
                        }
                    );
                }
            );
    }


    /* =====================================
       SELECTION CONTROLS
    ===================================== */

    function refreshSelectionControls() {
        commissionsPage
            .querySelectorAll(
                "[data-commission-v2-single-select], [data-commission-v2-multi-select]"
            )
            .forEach(
                (button) => {

                    const blockId =
                        button.dataset
                            .commissionV2SingleSelect ||
                        button.dataset
                            .commissionV2MultiSelect;


                    const optionId =
                        button.dataset
                            .optionId;


                    const selectedIds =
                        getSelectedIds(
                            blockId
                        );


                    const selected =
                        selectedIds.includes(
                            optionId
                        );


                    const block =
                        blockMap.get(
                            blockId
                        );


                    const atLimit =
                        Boolean(
                            block?.maxSelections &&
                            selectedIds.length >=
                                block.maxSelections
                        );


                    button.classList.toggle(
                        "commissions-v2__selection-button--active",
                        selected
                    );


                    button.setAttribute(
                        "aria-pressed",
                        String(selected)
                    );


                    button.disabled =
                        Boolean(
                            block?.selectionMode ===
                                "multiple" &&
                            atLimit &&
                            !selected
                        );


                    const defaultText =
                        button.dataset
                            .defaultButtonText ||
                        "Select";


                    const optionName =
                        button.dataset
                            .optionName ||
                        "Option";


                    button.textContent =
                        selected
                            ? `✓ ${optionName} Selected`
                            : defaultText;


                    button
                        .closest(
                            ".commissions-v2__selection-slide"
                        )
                        ?.classList.toggle(
                            "commissions-v2__selection-slide--selected",
                            selected
                        );
                }
            );


        commissionsPage
            .querySelectorAll(
                "[data-commission-v2-counter]"
            )
            .forEach(
                (counter) => {

                    const blockId =
                        counter.dataset
                            .commissionV2Counter;


                    const block =
                        blockMap.get(
                            blockId
                        );


                    const count =
                        getSelectedIds(
                            blockId
                        ).length;


                    counter.textContent =
                        `${count} / ${block.maxSelections} selected`;
                }
            );
    }


    /* =====================================
       EVENTS / REFRESH
    ===================================== */

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
        renderRequestForms();
        emitChange();
    }


    /* =====================================
       SELECTION CHANGES
    ===================================== */

    function selectSingle(
        blockId,
        optionId
    ) {
        const block =
            blockMap.get(blockId);


        if (!block) {
            return;
        }


        const alreadySelected =
            getSelectedIds(
                blockId
            ).includes(
                optionId
            );


        if (
            alreadySelected &&
            !block.required
        ) {
            state.selections[
                blockId
            ] = [];
        } else {
            state.selections[
                blockId
            ] = [optionId];
        }


        refresh();
    }


    function selectMultiple(
        blockId,
        optionId
    ) {
        const block =
            blockMap.get(blockId);


        if (!block) {
            return;
        }


        const selected =
            [
                ...getSelectedIds(
                    blockId
                )
            ];


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
                block.maxSelections &&
                selected.length >=
                    block.maxSelections
            ) {
                return;
            }


            selected.push(
                optionId
            );
        }


        state.selections[
            blockId
        ] = selected;


        refresh();
    }


    function removeSelection(
        blockId,
        optionId
    ) {
        const block =
            blockMap.get(blockId);


        if (!block) {
            return;
        }


        if (
            block.selectionMode ===
            "single"
        ) {

            if (block.required) {
                return;
            }


            state.selections[
                blockId
            ] = [];


            refresh();

            return;
        }


        state.selections[
            blockId
        ] =
            getSelectedIds(
                blockId
            ).filter(
                (id) =>
                    id !== optionId
            );


        refresh();
    }


    /* =====================================
       DIALOG HELPERS
    ===================================== */

    function openDialog(dialog) {
        if (!dialog) {
            return;
        }


        if (
            typeof dialog.showModal ===
            "function"
        ) {
            dialog.showModal();
        } else {
            dialog.setAttribute(
                "open",
                ""
            );
        }
    }


    function closeDialog(dialog) {
        if (!dialog) {
            return;
        }


        if (
            typeof dialog.close ===
            "function"
        ) {
            dialog.close();
        } else {
            dialog.removeAttribute(
                "open"
            );
        }
    }


    /* =====================================
       BUILD PAGE
    ===================================== */

    initializeDefaults();


    if (data.intro) {
        commissionsPage.appendChild(
            createCommissionV2Intro(
                data.intro
            )
        );
    }


    const blocksContainer =
        document.createElement(
            "div"
        );


    blocksContainer.className =
        "commissions-v2__blocks";


    blocks.forEach((block) => {

        const blockElement =
            createCommissionV2Block(
                block,
                pricing,
                data
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


    /* =====================================
       BOOK DIALOGS
    ===================================== */

    Object.values(
        data.books || {}
    ).forEach((book) => {

        if (!book.id) {
            return;
        }


        commissionsPage.appendChild(
            createCommissionV2BookDialog(
                book
            )
        );
    });


    initializeCommissionV2Carousels(
        commissionsPage
    );


    /* =====================================
       CLICK HANDLING
    ===================================== */

    commissionsPage.addEventListener(
        "click",
        (event) => {

            const singleButton =
                event.target.closest(
                    "[data-commission-v2-single-select]"
                );


            if (singleButton) {
                selectSingle(
                    singleButton.dataset
                        .commissionV2SingleSelect,

                    singleButton.dataset
                        .optionId
                );

                return;
            }


            const multiButton =
                event.target.closest(
                    "[data-commission-v2-multi-select]"
                );


            if (multiButton) {
                selectMultiple(
                    multiButton.dataset
                        .commissionV2MultiSelect,

                    multiButton.dataset
                        .optionId
                );

                return;
            }


            const bookButton =
                event.target.closest(
                    "[data-commission-v2-open-book]"
                );


            if (bookButton) {

                const bookId =
                    bookButton.dataset
                        .commissionV2OpenBook;


                const dialog =
                    commissionsPage
                        .querySelector(
                            `[data-commission-v2-book="${bookId}"]`
                        );


                openDialog(dialog);

                return;
            }


            const requestButton =
                event.target.closest(
                    "[data-commission-v2-open-request]"
                );


            if (requestButton) {
                refresh();


                const dialog =
                    commissionsPage
                        .querySelector(
                            "[data-commission-v2-request-dialog]"
                        );


                openDialog(dialog);

                return;
            }


            const closeButton =
                event.target.closest(
                    "[data-commission-v2-close-dialog]"
                );


            if (closeButton) {
                closeDialog(
                    closeButton.closest(
                        "dialog"
                    )
                );

                return;
            }


            const removeButton =
                event.target.closest(
                    "[data-commission-v2-summary-remove]"
                );


            if (removeButton) {
                removeSelection(
                    removeButton.dataset
                        .blockId,

                    removeButton.dataset
                        .optionId
                );
            }
        }
    );


    /* =====================================
       REQUEST FORM SUBMISSION
    ===================================== */

    commissionsPage
        .querySelectorAll(
            "[data-commission-v2-request-form]"
        )
        .forEach((form) => {

            form.addEventListener(
                "submit",
                (event) => {

                    refresh();


                    const missing =
                        getMissingRequiredLabels();


                    const warning =
                        form.querySelector(
                            "[data-commission-v2-form-warning]"
                        ) ||
                        commissionsPage.querySelector(
                            "[data-commission-v2-form-warning]"
                        );


                    if (missing.length) {
                        event.preventDefault();


                        if (warning) {
                            warning.hidden =
                                false;

                            warning.innerHTML = `
                                <strong>
                                    Finish your required choices first:
                                </strong>

                                <span>
                                    ${missing.join(", ")}
                                </span>
                            `;
                        }


                        return;
                    }


                    if (warning) {
                        warning.hidden =
                            true;

                        warning.innerHTML =
                            "";
                    }


                    /*
                        If no form-service action
                        has been added yet, prevent
                        the browser from leaving
                        the page and emit an event.

                        Later, once data.formAction
                        is supplied, normal form
                        submission will work.
                    */

                    if (!form.action) {
                        event.preventDefault();


                        commissionsPage.dispatchEvent(
                            new CustomEvent(
                                "commissions-v2:submit",
                                {
                                    bubbles:
                                        true,

                                    detail: {
                                        submissionData:
                                            getSubmissionData(),

                                        formData:
                                            new FormData(
                                                form
                                            )
                                    }
                                }
                            )
                        );
                    }
                }
            );
        });


    /* =====================================
       PUBLIC API
    ===================================== */

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
