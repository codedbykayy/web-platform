function createLivestream(data){
    const livestreamPanel = document.createElement("section");
    livestreamPanel.className="livestream";
    livestreamPanel.innerHTML=`
        <h2 class="livestream__title">${data.title}</h2>
        <p class="livestream__description">${data.description}</p>
        <div class="livestream__media">Stream preview</div>
        <div class="livestream__buttons"></div>
    `;
    const buttonArea= livestreamPanel.querySelector(".livestream__buttons");
    data.buttons.forEach((button) =>{
        const link= document.createElement("a");
        link.className="button";
        link.href=button.link;
        link.textContent=button.label;
        buttonArea.appendChild(link);
    });
    return livestreamPanel;
}