function createFAQ(data){
    const faqPanel = document.createElement("section");
    faqPanel.className="faq";
    faqPanel.innerHTML=`
        <h2 class= "faq__title">${data.title}</h2>
        <div class="faq__questions"></div>
    `;
    const questionsContainer = faqPanel.querySelector(".faq__questions");
    data.questions.forEach((item)=>{
        const question = document.createElement("div");
        question.className="faq__question";
        question.innerHTML = `
            <button class="faq__question-button" type="button">
                <span>${item.question}</span>
                <span class="faq__icon">+</span>
            </button>

            <div class="faq__answer">
                <p>${item.answer}</p>
            </div>
        `;
        const questionButton = question.querySelector(".faq__question-button");
        const answer = question.querySelector(".faq__answer");
        const icon = question.querySelector(".faq__icon");
        answer.hidden = true;
        questionButton.addEventListener("click", () => {
            const isOpen = question.classList.toggle("faq__question--open");

            answer.hidden = !isOpen;
            icon.textContent = isOpen ? "−" : "+";
        });
        questionsContainer.appendChild(question);
    });
    return faqPanel;
}