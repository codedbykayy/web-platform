function createCalendar(embedLink) {
    const calendarPanel = document.createElement("section");
    calendarPanel.className = "calendar";

    calendarPanel.innerHTML = `
        <iframe
            src="${embedLink}"
            width="100%"
            height="700"
            style="border:0;"
            loading="lazy">
        </iframe>
    `;

    return calendarPanel;
}