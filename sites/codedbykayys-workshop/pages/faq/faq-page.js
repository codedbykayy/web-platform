const page = document.querySelector("#site");
const navigationElement = createNavigation(navigation);
const faqPage = document.createElement("section");
faqPage.className = "faq-page";
const faqIntro = document.createElement("header");
faqIntro.className = "faq-page__intro";
faqIntro.innerHTML = `
    <p class="faq-page__eyebrow">Questions from The Workshop</p>
    <h1>Frequently Asked Questions</h1>
    <p>
        Find answers about website requests, commissions, my etsy listings,
        programs I use, and more.
    </p>
`;
const faqPanel = createFAQ({
    ...faq,
    showTitle:false
});
faqPanel.classList.add("faq--full-page");
const questionCard = document.createElement("section");
questionCard.className = "faq-question-card";
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