const page = document.querySelector("#site");
const navigationElement = createNavigation(navigation);
const faqPage = document.createElement("section");
faqPage.className = "faq-page";
const faqIntro = document.createElement("header");
faqIntro.className = "faq-page__intro";
faqIntro.innerHTML = `
    <p class="faq-page__eyebrow">Questions from The Hive</p>
    <h1>Frequently Asked Questions</h1>
    <p>
        Find answers about streams, schedules, community events,
        game nights, and more. This is also where you can submit questions for the next Q&A stream!
    </p>
`;
const faqPanel = createFAQ({
    ...faq,
    showTitle:false
});
faqPanel.classList.add("faq--full-page");
const questionCard = document.createElement("section");
questionCard.className = "faq-question-card";
questionCard.innerHTML = `
    <div class="faq-question-card__heading">
        <span>🐝</span>
        <div>
            <p>Have something else in mind?</p>
            <h2>Ask a question for my next Q&amp;A!</h2>
        </div>
    </div>
    <form class="faq-question-form">
        <label>
            Display name
            <input
                type="text"
                name="displayName"
                placeholder="Optional"
            >
        </label>
        <label>
            Your question
            <textarea
                name="question"
                rows="5"
                placeholder="What would you like Honeybee to answer?"
                required
            ></textarea>
        </label>
        <button class="button" type="submit">
            Send Question
        </button>
    </form>
    <p class="faq-question-form__message" hidden></p>
`;
faqPage.appendChild(faqIntro);
faqPage.appendChild(faqPanel);
faqPage.appendChild(questionCard);
page.appendChild(navigationElement);
page.appendChild(faqPage);
const questionForm = questionCard.querySelector(".faq-question-form");
const formMessage = questionCard.querySelector(
    ".faq-question-form__message"
);
questionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent =
        "Demo submitted! A real client site can connect this form to email or a form service.";
    formMessage.hidden = false;
    questionForm.reset();
});