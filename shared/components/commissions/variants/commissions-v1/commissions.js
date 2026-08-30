function createCommissionDecorSlots() {
    return `
        <div class="commissions-v1__decor commissions-v1__decor--one"></div>
        <div class="commissions-v1__decor commissions-v1__decor--two"></div>
    `;
}

function createCommissionHeadingDecorSlots() {
    return `
        <div class="commissions-v1__heading-decor commissions-v1__heading-decor--one"></div>
        <div class="commissions-v1__heading-decor commissions-v1__heading-decor--two"></div>
    `;
}
function createCommissionPricing(section) {
    return `
        <div class="commissions-v1__pricing">
            ${
                section.pricingTitle
                    ? `<h3 class="commissions-v1__subtitle">${section.pricingTitle}</h3>`
                    : ""
            }
            ${
                section.pricingImage
                    ? `
                        <div class="commissions-v1__media commissions-v1__media--pricing">
                            <img
                                src="${section.pricingImage}"
                                alt="${section.pricingAlt || ""}"
                                loading="lazy"
                            >
                        </div>
                    `
                    : ""
            }
            ${
                section.description
                    ? `<p class="commissions-v1__pricing-description">${section.description}</p>`
                    : ""
            }
        </div>
    `;
}
function createCommissionExamples(section, sectionIndex) {
    const examples = section.examples || [];

    const examplesHTML = examples
        .map((example, exampleIndex) => {
            return `
                <div
                    class="commissions-v1__example ${
                        exampleIndex === 0
                            ? "commissions-v1__example--active"
                            : ""
                    }"
                    data-example-index="${exampleIndex}"
                >
                    <img
                        src="${example.image}"
                        alt="${example.alt || ""}"
                        loading="lazy"
                    >
                </div>
            `;
        })
        .join("");

    return `
        <div class="commissions-v1__examples">
            ${
                section.examplesTitle
                    ? `<h3 class="commissions-v1__subtitle">${section.examplesTitle}</h3>`
                    : ""
            }

            <div
                class="commissions-v1__carousel"
                data-commission-carousel="${sectionIndex}"
            >
                ${
                    examples.length > 1
                        ? `
                            <button
                                class="commissions-v1__arrow commissions-v1__arrow--previous"
                                type="button"
                                aria-label="Previous example"
                            >
                                ‹
                            </button>
                        `
                        : ""
                }

                <div class="commissions-v1__example-window">
                    ${examplesHTML}
                </div>

                ${
                    examples.length > 1
                        ? `
                            <button
                                class="commissions-v1__arrow commissions-v1__arrow--next"
                                type="button"
                                aria-label="Next example"
                            >
                                ›
                            </button>
                        `
                        : ""
                }
            </div>
        </div>
    `;
}
function createCommissionSection(section, index) {
    return `
        <section
            class="commissions-v1__section"
            data-commission-index="${index}"
        >
            ${createCommissionDecorSlots()}

            <header class="commissions-v1__section-heading">
                ${createCommissionHeadingDecorSlots()}

                ${
                    section.title
                        ? `<h2>${section.title}</h2>`
                        : ""
                }
            </header>

            <div class="commissions-v1__content">
                ${createCommissionPricing(section)}
                ${createCommissionExamples(section, index)}
            </div>

            ${
                section.buttonText
                    ? `
                        <button
                            class="button commissions-v1__request"
                            type="button"
                            data-commission-request="${index}"
                        >
                            ${section.buttonText}
                        </button>
                    `
                    : ""
            }
        </section>
    `;
}
function initializeCommissionCarousels(root) {
    const carousels = root.querySelectorAll(
        ".commissions-v1__carousel"
    );

    carousels.forEach((carousel) => {
        const examples = Array.from(
            carousel.querySelectorAll(".commissions-v1__example")
        );

        if (examples.length <= 1) {
            return;
        }

        const previousButton = carousel.querySelector(
            ".commissions-v1__arrow--previous"
        );

        const nextButton = carousel.querySelector(
            ".commissions-v1__arrow--next"
        );

        let activeIndex = 0;

        function showExample(index) {
            activeIndex =
                (index + examples.length) % examples.length;

            examples.forEach((example, exampleIndex) => {
                example.classList.toggle(
                    "commissions-v1__example--active",
                    exampleIndex === activeIndex
                );
            });
        }

        previousButton.addEventListener("click", () => {
            showExample(activeIndex - 1);
        });

        nextButton.addEventListener("click", () => {
            showExample(activeIndex + 1);
        });
    });
}
function createCommissions(data) {
    const commissionsPage = document.createElement("section");
    commissionsPage.className = "commissions-v1";
    const sectionsHTML = (data.sections || [])
        .map((section, index) => {
            return createCommissionSection(section, index);
        })
        .join("");
    commissionsPage.innerHTML = `
        <header class="commissions-v1__intro">
            <div class="commissions-v1__intro-decor commissions-v1__intro-decor--one"></div>
            ${
                data.intro?.eyebrow
                    ? `<p class="commissions-v1__eyebrow">${data.intro.eyebrow}</p>`
                    : ""
            }
            ${
                data.intro?.title
                    ? `<h1>${data.intro.title}</h1>`
                    : ""
            }
            ${
                data.intro?.description
                    ? `<p class="commissions-v1__description">${data.intro.description}</p>`
                    : ""
            }
            <div class="commissions-v1__intro-decor commissions-v1__intro-decor--two"></div>
        </header>
        <div class="commissions-v1__sections">
            ${sectionsHTML}
        </div>
    `;
    initializeCommissionCarousels(commissionsPage);
    return commissionsPage;
}