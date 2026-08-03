function createNavigation(data){
    const navigationDataScript = [...document.scripts].find((script) =>
    script.src.includes("/data/navigation.js")
    );
    const siteRoot = new URL("../", navigationDataScript.src);
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
            logoArea.href= new URL(data.logo.link, siteRoot).href;
        } else {
            logoArea.textContent=data.logo.text;
        }
        data.pages.forEach((page)=>{
            const link = document.createElement("a");
            link.className="navigation__link";
            link.href= new URL(page.link, siteRoot).href;
            link.textContent=page.label;
            const currentPage = window.location.pathname;
            const linkPage = new URL(link.href).pathname;
            if (currentPage === linkPage) {
                link.classList.add("navigation__link--active");
            }
            pagesArea.appendChild(link);
        });
        const action = document.createElement("a");
        action.className="button navigation__button"
        action.href = new URL(data.button.link, siteRoot).href;
        action.textContent= data.button.label;
        actionArea.appendChild(action);
        return navigation;
}