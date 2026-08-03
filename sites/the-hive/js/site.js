const page = document.querySelector("#site");
const navigationElement= createNavigation(navigation)
const topRow = document.createElement("div");
topRow.className= "top-row";
const bottomRow=document.createElement("div");
bottomRow.className="bottom-row";
const nextUpPanel = createNextUp(nextUp);
bottomRow.appendChild(nextUpPanel);
const faqPanel = createFAQ({
    ...faq,
    questions: faq.questions.slice(0, 5)
});
const communityPanel = createCommunity(community);
bottomRow.appendChild(faqPanel);
bottomRow.appendChild(communityPanel);
const liveSpace = createLivestream(livestream);
topRow.appendChild(createHero(hero));
topRow.appendChild(liveSpace);
page.appendChild(navigationElement);
page.appendChild(topRow);
page.appendChild(bottomRow);
