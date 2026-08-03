:root{
    --page-background:inherit;
    --section-background:inherit;
    --button-background:inherit;
    --button-text:inherit;
    --button-hover:inherit;
    --text-color:inherit;
    --border-color:inherit;

    --faq-answer-background: inherit;
    --faq-answer-text: inherit ;
    --faq-question-background: inherit;
    --faq-question-text: inherit;

    --about-page-background:var(--page-background);
    --about-card-background:var(--section-background);
    --about-text-color:var(--text-color);
    --about-heading-color:var(--text-color);
    --about-font-family:inherit;
    --about-accent-background:transparent;

    --schedule-page-background:var(--page-background);
    --schedule-card-background:var(--section-background);
    --schedule-text-color:var(--text-color);
    --schedule-heading-color:var(--text-color);
    --schedule-font-family:inherit;

    --navigation-background:var(--section-background);
}
body{
    background:var(--page-background);
    color:var(--text-color);
}
.hero,
.livestream,
.next-up,
.faq,
.community,
.calendar,
.about-page__profile{
    background:var(--section-background);
    border-color:var(--border-color);
}
#site > h1{
    width:min(1400px, 96%);
    margin:2rem auto 1.5rem;
    font-size:2.5rem;
    text-align:center;
}
.schedule-page{
    background:var(--schedule-page-background);
    color:var(--schedule-text-color);
    font-family:var(--schedule-font-family);
}

.schedule-page__title{
    color:var(--schedule-heading-color);
}
.calendar{
    background:var(--schedule-card-background);
}

.about-page{
--about-page-background:var(--page-background);
--about-text-color:var(--text-color);
--about-font-family:inherit;

--about-card-background:var(--section-background);
--about-card-border:var(--border-color);

--about-header-background:inherit;
--about-header-text:inherit;

--about-inner-background:inherit;
--about-inner-text:inherit;

--about-accent-background:inherit;
--about-accent-text:inherit;

--about-icon-background:inherit;
--about-icon-text:inherit;

--about-closing-background:inherit;
--about-closing-text:inherit;
}