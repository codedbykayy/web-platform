function createNavigation(data){
    const navigation = document.createElement("nav");
    navigation.className="navigation";
    navigation.innerHTML=`
        <div class="navigation__logo"></div>
        <div class="navigation__pages"></div>
        <div class="navigation__action"></div>`;
        const logoArea = navigation.querySelector(".navigation__logo");
        const pagesArea= navigation.querySelector(".navigation__pages");
        const actionArea= navigation.querySelector(".navigation__action");
        if (data.logo.image){
            const logo= document.createElement("img");
            logo.src=data.logo.image;
            logo.alt=data.logo.alt||"";
            logoArea.appendChild(logo);
        } else {
            logoArea.textContent=data.logo.text;
        }
        data.pages.forEach((page)=>{
            const link = document.createElement("a");
            link.className="navigation__link";
            link.href=page.link;
            link.textContent=page.label;
            pagesArea.appendChild(link);
        });
        const action = document.createElement("a");
        action.className="button navigation__button"
        action.href = data.button.link;
        action.textContent= data.button.label;
        actionArea.appendChild(action);
        return navigation;
}