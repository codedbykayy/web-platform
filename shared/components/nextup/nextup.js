function createNextUp(data){
    const nextUpPanel = document.createElement("section");
    nextUpPanel.className = "next-up";
    nextUpPanel.innerHTML=`
        <h2 class="next-up__title">${data.title}</h2>
        <div class="next-up__events"></div>
        <div class="next-up__action"></div>
        `;
        const eventsArea= nextUpPanel.querySelector(".next-up__events");
        data.events.forEach((event)=>{
            const eventCard= document.createElement("div");
            eventCard.className="next_up__event";
            eventCard.innerHTML=`
            <p class="next-up__label">${event.label}</p>
            <h3 class="next-up__event-title">${event.title}</h3>
            <p class="next-up__date">${event.ate}</p>
            <p class="next-up__time">${event.time}</p>
        `;
        eventsArea.appendChild(eventCard);
        })
        const actionArea= nextUpPanel.querySelector(".next-up__action");
        const link= document.createElement("a");
        link.className="button";
        link.href= data.button.link;
        link.textContent=data.button.label;
        actionArea.appendChild(link);
        return nextUpPanel;
}