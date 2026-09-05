const commissionsV2 = {
    formType: "website-request",
    requestName: "Website Commission Request",
    formAction:
    "https://usebasin.com/f/5329e1f09048",
    formMethod:
        "POST",

    /* =====================================
       INTRO
    ===================================== */

    intro: {
        eyebrow:
            "Build Something in the Workshop! 1 Time Payment (after review!!), No Recurring Fees/Subscriptions.",

        title:
            "Request a Website",

        description:
            "Build your website by choosing the layouts, sections, pages, and extras you want. Once you're happy with your choices, submit your request and I'll review everything before sending your final quote."
    },


    /* =====================================
       PRICING
       Estimate calculator will use this later.
    ===================================== */

    pricing: {
        basePrice: 150,
        currencySymbol: "$",
        decimals: 0
    },


    summaryEmptyText:
        "Start building your website to see your choices here!",


    /* =====================================
       PAGE BLOCKS
    ===================================== */

    blocks: [


        /* =================================
           1. FINISHED WEBSITE EXAMPLES

           Non-selectable.
           Outer carousel = websites.
           Inner carousel = screenshots.
        ================================= */

        {
            id: "examples",
            type: "examples",

            eyebrow:
                "Made in the Workshop",

            title:
                "See What You Can Build!",

            description:
                "Swipe through finished websites to see how different layouts, sections, pages, and styles can come together.",

            items: [
                {
                    id: "the-hive",

                    title:
                        "The Hive",

                    description:
                        "A cozy woodland-inspired streamer website built with a mix of homepage features and full community pages.",

                    images: [
                        {
                            image:
                                "../../assets/hive1.png",

                            alt:
                                "The Hive homepage"
                        },

                        {
                            image:
                                "../../assets/hive2.png",

                            alt:
                                "The Hive gallery page"
                        },

                        {
                            image:
                                "../../assets/hive3.png",

                            alt:
                                "The Hive schedule page"
                        },

                        {
                            image:
                                "../../assets/hive4.png",

                            alt:
                                "The Hive community page"
                        },

                        {
                            image:
                                "../../assets/hive5.png",

                            alt:
                                "The Hive FAQ page"
                        }
                    ],

                    details: [
                        {
                            label:
                                "Homepage",

                            value:
                                "Split Homepage"
                        },

                        {
                            label:
                                "Homepage Features",

                            value:
                                "Gallery, FAQ, Currently Live, Next Up"
                        },

                        {
                            label:
                                "Full Pages",

                            value:
                                "Gallery, Schedule, Community, FAQ"
                        },

                        {
                            label:
                                "Requested Vibe",

                            value:
                                "Cozy woodland bee community"
                        }
                    ]
                },


                {
                    id:
                        "coded-by-kayy-workshop",

                    title:
                        "Coded by Kayy's Workshop",

                    description:
                        "A playful handmade portfolio and business website designed around a colorful toy workshop theme.",

                    images: [
                        {
                            image:
                                "../../assets/workshop1.png",

                            alt:
                                "Coded by Kayy's Workshop homepage"
                        },

                        {
                            image:
                                "../../assets/workshop2.png",

                            alt:
                                "Coded by Kayy's Workshop shop page"
                        },

                        {
                            image:
                                "../../assets/workshop3.png",

                            alt:
                                "Coded by Kayy's Workshop commissions page"
                        },

                        {
                            image:
                                "../../assets/workshop4.png",

                            alt:
                                "Coded by Kayy's Workshop gallery page"
                        },

                        {
                            image:
                                "../../assets/workshop5.png",

                            alt:
                                "Coded by Kayy's Workshop FAQ page"
                        }
                    ],

                    details: [
                        {
                            label:
                                "Homepage",

                            value:
                                "Stacked Homepage"
                        },

                        {
                            label:
                                "Homepage Features",

                            value:
                                "Shop, FAQ, Request a Website, Gallery"
                        },

                        {
                            label:
                                "Full Pages",

                            value:
                                "Shop, Commissions, Gallery, FAQ, Commission Builder"
                        },

                        {
                            label:
                                "Requested Vibe",

                            value:
                                "Pastel toy maker workshop"
                        }
                    ]
                }
            ]
        },


        /* =================================
           2. HOMEPAGE LAYOUT

           Same reusable selector.

           Outer carousel:
           Split / Stacked / future layouts.

           Inner carousel:
           layout mockup + real site examples.

           Customer chooses exactly ONE.
        ================================= */

        {
            id:
                "homepage-layout",

            type:
                "selection-showcase",

            selectionMode:
                "single",

            required:
                true,

            minSelections:
                1,

            maxSelections:
                1,

            eyebrow:
                "Start With Your Homepage",

            title:
                "Choose Your Homepage",

            description:
                "Choose the homepage layout you like best. The layout changes how your homepage is arranged, but it does not decide which homepage sections you can use. That is decided in the next step.",

            selectionNote:
                "You can choose any 4 homepage sections with either layout.",

            selectionLabel:
                "Homepage Layout",

            options: [
                {
                    id:
                        "split",

                    code:
                        "H1",

                    name:
                        "Split",

                    description:
                        "A structured homepage that places multiple pieces of content beside each other. Great when you want several features visible together.",

                    images: [
                        {
                            image:
                                "../../assets/hive1.png",

                            alt:
                                "Example of the Split homepage structure"
                        },

                        {
                            image:
                                "../../assets/hive1.png",

                            alt:
                                "The Hive using the Split homepage layout"
                        }
                    ],

                    price:
                        0,

                    priceLabel:
                        "Homepage Package: $150. Hero + 4 sections of your choice.",

                    buttonText:
                        "Choose Split"
                },


                {
                    id:
                        "stacked",

                    code:
                        "H2",

                    name:
                        "Stacked",

                    description:
                        "A more visual homepage where the main sections flow vertically and each section has more room to stand on its own.",

                    images: [
                        {
                            image:
                                "../../assets/workshop1.png",

                            alt:
                                "Example of the Stacked homepage structure"
                        },

                        {
                            image:
                                "../../assets/workshop1.png",

                            alt:
                                "Coded by Kayy's Workshop using the Stacked homepage layout"
                        }
                    ],

                    price:
                        0,

                    priceLabel:
                        "Homepage Package: $150. Hero + 4 sections of your choice (choose sections below).",

                    buttonText:
                        "Choose Stacked"
                }
            ]
        },


        /* =================================
           3. HOMEPAGE SECTIONS

           EXACT SAME selection-showcase.

           Add as many available section
           options here as you create later.

           Customer chooses exactly FOUR.
        ================================= */

        {
            id:
                "homepage-sections",

            type:
                "selection-showcase",

            selectionMode:
                "multiple",

            required:
                true,

            minSelections:
                4,

            maxSelections:
                4,

            eyebrow:
                "Fill Your Homepage",

            title:
                "Choose Your Homepage Sections",

            description:
                "Choose the 4 sections you want included on your homepage. You can mix and match these with either Split or Stacked.",

            selectionNote:
                "Choose exactly 4. You can change your selections at any time before submitting your request.",

            selectionLabel:
                "Homepage Sections",

            options: [
                {
                    id:
                        "shop",

                    code:
                        "HS-SHOP",

                    name:
                        "Shop",

                    description:
                        "Feature products, adopts, commissions, or other listings directly on your homepage.",

                    images: [
                        {
                            image:
                                "../../assets/workshop5.png",

                            alt:
                                "Shop homepage section example"
                        }
                    ],

                    price:
                        0,

                    priceLabel:
                        "4 selections included in $150 homepage package",

                    buttonText:
                        "Choose Shop"
                },


                {
                    id:
                        "faq",

                    code:
                        "HS-FAQ",

                    name:
                        "FAQ",

                    description:
                        "Show a compact set of frequently asked questions directly on your homepage.",

                    images: [
                        {
                            image:
                                "../../assets/workshop4.png",

                            alt:
                                "FAQ homepage section example"
                        }
                    ],

                    price:
                        0,

                    priceLabel:
                        "4 selections included in $150 homepage package",

                    buttonText:
                        "Choose FAQ"
                },


                {
                    id:
                        "gallery",

                    code:
                        "HS-GALLERY",

                    name:
                        "Gallery",

                    description:
                        "Show artwork, portfolio pieces, commissions, screenshots, or other visual work directly on your homepage.",

                    images: [
                        {
                            image:
                                "../../assets/hive7.png",

                            alt:
                                "Gallery homepage section example"
                        }
                    ],

                    price:
                        0,

                    priceLabel:
                        "4 selections included in $150 homepage package",

                    buttonText:
                        "Choose Gallery"
                },


                {
                    id:
                        "about",

                    code:
                        "HS-ABOUT",

                    name:
                        "About",

                    description:
                        "Introduce yourself, your brand, character, project, or community without requiring visitors to open another page.",

                    images: [
                        {
                            image:
                                "../../assets/hive2.png",

                            alt:
                                "About homepage section example"
                        }
                    ],

                    price:
                        0,

                    priceLabel:
                        "4 selections included in $150 homepage package",

                    buttonText:
                        "Choose About"
                },


                {
                    id:
                        "currently-live",

                    code:
                        "HS-LIVE",

                    name:
                        "Currently Live",

                    description:
                        "Show whether you're currently streaming and give visitors a direct way to reach your live content.",

                    images: [
                        {
                            image:
                                "../../assets/hive1.png",

                            alt:
                                "Currently Live homepage section example"
                        }
                    ],

                    price:
                        0,

                    priceLabel:
                        "4 selections included in $150 homepage package",

                    buttonText:
                        "Choose Currently Live"
                },


                {
                    id:
                        "next-up",

                    code:
                        "HS-NEXT",

                    name:
                        "Next Up",

                    description:
                        "Highlight your next stream, event, release, commission opening, or other upcoming activity.",

                    images: [
                        {
                            image:
                                "../../assets/hive1.png",

                            alt:
                                "Next Up homepage section example"
                        }
                    ],

                    price:
                        0,

                    priceLabel:
                        "4 selections included in $150 homepage package",

                    buttonText:
                        "Choose Next Up"
                },


                {
                    id:
                        "schedule-preview",

                    code:
                        "HS-SCHEDULE",

                    name:
                        "Schedule",

                    description:
                        "Give visitors a compact preview of your upcoming schedule directly from the homepage.",

                    images: [
                        {
                            image:
                                "../../assets/workshop3.png",

                            alt:
                                "Schedule homepage section example"
                        }
                    ],

                    price:
                        0,

                    priceLabel:
                        "4 selections included in $150 homepage package",

                    buttonText:
                        "Choose Schedule"
                },


                {
                    id:
                        "community",

                    code:
                        "HS-COMMUNITY",

                    name:
                        "Community",

                    description:
                        "Highlight your community, supporters, server, events, or other ways visitors can get involved.",

                    images: [
                        {
                            image:
                                "../../assets/hive8.png",

                            alt:
                                "Community homepage section example"
                        }
                    ],

                    price:
                        0,

                    priceLabel:
                        "4 selections included in $150 homepage package",

                    buttonText:
                        "Choose Community"
                }
            ]
        },


        /* =================================
           4. FULL PAGES

           Same reusable selector again.

           Unlike homepage sections, these
           are full standalone pages.

           No hard maximum for now.
           Set maxSelections later if you
           ever want a package limit.

           Add/remove page options entirely
           from this data file.
        ================================= */

        {
            id:
                "full-pages",

            type:
                "selection-showcase",

            selectionMode:
                "multiple",

            required:
                false,

            minSelections:
                0,

            eyebrow:
                "Add More Pages to Your Website!",

            title:
                "Choose Your Full Pages",

            description:
                "Homepage sections are small pieces of your homepage. Full pages are complete standalone pages visitors can open from your navigation.",

            selectionNote:
                "Full pages are optional. Choose as many as your website needs.",

            selectionLabel:
                "Full Pages",

            options: [
                {
                    id:
                        "shop-page",

                    code:
                        "P-SHOP",

                    name:
                        "Shop Page",

                    description:
                        "A full shop page for displaying your complete collection of products, adopts, commissions, or listings.",

                    images: [
                        {
                            image:
                                "../../assets/workshop5.png",

                            alt:
                                "Full Shop page example"
                        }
                    ],

                    price:
                        85,

                    priceLabel:
                        "85",

                    buttonText:
                        "Add Shop Page"
                },


                {
                    id:
                        "gallery-page",

                    code:
                        "P-GALLERY",

                    name:
                        "Gallery Page",

                    description:
                        "A full visual gallery for artwork, commissions, screenshots, portfolio work, or other media.",

                    images: [
                        {
                            image:
                                "../../assets/workshop6.png",

                            alt:
                                "Full Gallery page example"
                        },

                        {
                            image:
                                "../../assets/hive7.png",

                            alt:
                                "Alternative Gallery page example"
                        }
                    ],

                    price:
                        55,

                    priceLabel:
                        "55",

                    buttonText:
                        "Add Gallery Page"
                },


                {
                    id:
                        "faq-page",

                    code:
                        "P-FAQ",

                    name:
                        "FAQ Page",

                    description:
                        "A complete FAQ page for larger collections of questions that need more room than a homepage section.",

                    images: [
                        {
                            image:
                                "../../assets/hive4.png",

                            alt:
                                "Full FAQ page example"
                        },

                        {
                            image:
                                "../../assets/workshop4.png",

                            alt:
                                "Alternative FAQ page example"
                        }
                    ],

                    price:
                        35,

                    priceLabel:
                        "35",

                    buttonText:
                        "Add FAQ Page"
                },


                {
                    id:
                        "schedule-page",

                    code:
                        "P-SCHEDULE",

                    name:
                        "Schedule Page",

                    description:
                        "A dedicated schedule page for streams, events, releases, appointments, or recurring content.",

                    images: [
                        {
                            image:
                                "../../assets/hive3.png",

                            alt:
                                "Full Schedule page example"
                        },
                        {
                            image:
                                "../../assets/workshop3.png",

                            alt:
                                "Full Schedule page example"
                        }
                    ],

                    price:
                        35,

                    priceLabel:
                        "35",

                    buttonText:
                        "Add Schedule Page"
                },


                {
                    id:
                        "community-page",

                    code:
                        "P-COMMUNITY",

                    name:
                        "Community Page",

                    description:
                        "A larger community space for supporters, events, giveaways, movie nights, servers, or other community features.",

                    images: [
                        {
                            image:
                                "../../assets/hive8.png",

                            alt:
                                "Full Community page example"
                        }
                    ],

                    price:
                        65,

                    priceLabel:
                        "65",

                    buttonText:
                        "Add Community Page"
                },


                {
                    id:
                        "commissions-page",

                    code:
                        "P-COMMISSIONS",

                    name:
                        "Commissions Page",

                    description:
                        "A dedicated page for explaining your commission services, examples, pricing, and available options.",

                    images: [
                        {
                            image:
                                "../../assets/workshop2.png",

                            alt:
                                "Full Commissions page example"
                        }
                    ],

                    price:
                        85,

                    priceLabel:
                        "Quote Based",

                    buttonText:
                        "Add Commissions Page"
                }
            ]
        },


        /* =================================
           5. ADD-ONS

           This is ALSO a carousel, but its
           final purpose is slightly different.

           Some choices can be selected directly.

           Others will eventually use:
               action: "open-book"
               bookId: "..."

           The shared JS will be expanded next
           so those buttons open the matching
           reusable Book component.
        ================================= */

        {
            id:
                "add-ons",

            type:
                "selection-showcase",

            selectionMode:
                "multiple",

            required:
                false,

            minSelections:
                0,

            eyebrow:
                "Add the Finishing Touches",

            title:
                "Choose Your Extras",

            description:
                "Add optional details and custom features to make your website feel even more personal.",

            selectionNote:
                "Some extras have a premade book you can browse, while custom work will be reviewed with your request.",

            selectionLabel:
                "Website Add-Ons",

            options: [
                {
                    id:
                        "cursors",

                    code:
                        "A-CURSOR",

                    name:
                        "Cursors",

                    description:
                        "Choose a premade cursor from the Cursor Book or request a cursor designed specifically for your website.",

                    price:
                        15,

                    priceLabel:
                        "$15–$50",

                    images: [
                        {
                            image:
                                "../../assets/workshop1.png",

                            alt:
                                "Custom cursor add-on preview"
                        }
                    ],

                    action:
                        "open-book",

                    bookId:
                        "cursor-book",

                    buttonText:
                        "I want a cursor!"
                },


                {
                    id:
                        "decor-assets",

                    code:
                        "A-ASSETS",

                    name:
                        "Decorative Assets",

                    description:
                        "Add small themed decorations such as stars, flowers, bows, toys, sparkles, or other visual accents.",

                    price:
                        2,

                    priceLabel:
                        "Starting at $2",

                    images: [
                        {
                            image:
                                "../../assets/workshop1.png",

                            alt:
                                "Decorative website asset preview"
                        }
                    ],

                    action:
                        "open-book",

                    bookId:
                        "asset-book",

                    buttonText:
                        "View Asset Book"
                },


                {
                    id:
                        "custom-widget",

                    code:
                        "A-WIDGET",

                    name:
                        "Custom Widget",

                    description:
                        "Request a custom interactive feature built specifically for your website, such as a themed question widget or another unique interaction.",

                    price:
                        100,

                    priceLabel:
                        "Starting at $100",

                    images: [
                        {
                            image:
                                "../../assets/workshop1.png",

                            alt:
                                "Custom website widget example"
                        }
                    ],

                    action:
                        "select",

                    buttonText:
                        "Request Custom Widget",

                    questionGroups: [
                        "custom-widget"
                    ]
                },


                {
                    id:
                        "animated-details",

                    code:
                        "A-ANIMATION",

                    name:
                        "Animated Details",

                    description:
                        "Add small animated decorative details to your website for extra movement and personality.",

                    price:
                        60,

                    priceLabel:
                        "Starting at $40",

                    images: [
                        {
                            image:
                                "../../assets/workshop1.png",

                            alt:
                                "Animated website decoration example"
                        }
                    ],

                    action:
                        "select",

                    buttonText:
                        "Add Animated Details",

                    questionGroups: [
                        "animated-details"
                    ]
                }
            ]
        },
        {
            id:
                "estimate",

            type:
                "estimate",

            eyebrow:
                "Your Current Estimate",

            title:
                "Estimated Total",

            shortDisclaimer:
                "This is not a guarantee of your final quote.",

            disclaimer:
                "Final adjustments may be made after I review your request, references, custom details, and any quote-based features."
        },


        /* =================================
           6. SUBMIT REQUEST / FORM

           NEXT SHARED COMPONENT TO BUILD.

           This will appear at the bottom as
           a Submit Request button.

           Clicking it will open the request
           form and show the client everything
           currently selected above.

           This data is intentionally provider-
           neutral. We can connect Basin,
           Formspree, etc. afterward without
           changing the page structure.
        ================================= */

        {
            id:
                "request-form",

            type:
                "request-form",

            eyebrow:
                "Ready for Me to Take a Look?",

            title:
                "Submit Your Request",

            description:
                "Review your website choices, tell me about the look you're going for, and send any references that will help me understand your idea. You will not be charged when you submit this form.",

            openButtonText:
                "Submit Request",

            closeButtonText:
                "Keep Editing",

            submitButtonText:
                "Send for Quote",

            successTitle:
                "Request Sent!",

            successMessage:
                "Thank you! I'll review your selections and references before contacting you with your final quote.",


            /* -----------------------------
               Selection review shown inside
               the form automatically.
            ----------------------------- */

            showSelectionSummary:
                true,

            selectionSummaryTitle:
                "Your Website Choices",


            /* -----------------------------
               Client information
            ----------------------------- */

            fields: [
                {
                    id:
                        "client-name",

                    name:
                        "clientName",

                    type:
                        "text",

                    label:
                        "Your Name",

                    placeholder:
                        "What should I call you?",

                    required:
                        true
                },


                {
                    id:
                        "client-email",

                    name:
                        "clientEmail",

                    type:
                        "email",

                    label:
                        "Email",

                    placeholder:
                        "Where should I send your quote?",

                    required:
                        true
                },


                {
                    id:
                        "site-name",

                    name:
                        "siteName",

                    type:
                        "text",

                    label:
                        "Website / Brand Name",

                    placeholder:
                        "What will your website be called?",

                    required:
                        false
                },


                {
                    id:
                        "site-description",

                    name:
                        "siteDescription",

                    type:
                        "textarea",

                    label:
                        "Tell Me About Your Website",

                    placeholder:
                        "What is the website for? Who will be using it? What do you want visitors to be able to do?",

                    required:
                        true
                },


                {
                    id:
                        "requested-vibe",

                    name:
                        "requestedVibe",

                    type:
                        "textarea",

                    label:
                        "What Vibe Are You Looking For?",

                    placeholder:
                        "Describe the colors, themes, characters, mood, references, or overall feeling you want.",

                    required:
                        true
                },


                {
                    id:
                        "reference-links",

                    name:
                        "referenceLinks",

                    type:
                        "textarea",

                    label:
                        "Reference Links",

                    placeholder:
                        "Paste links to websites, Pinterest boards, characters, art, social pages, or other references here.",

                    required:
                        false
                },


                {
                    id:
                        "reference-images",

                    name:
                        "referenceImages",

                    type:
                        "file",

                    label:
                        "Upload Reference Images",

                    description:
                        "You can attach artwork, mockups, screenshots, character references, branding, or other images that help explain what you want.",

                    accept:
                        "image/*",

                    multiple:
                        true,

                    required:
                        false
                },


                {
                    id:
                        "questions",

                    name:
                        "questions",

                    type:
                        "textarea",

                    label:
                        "Questions or Extra Notes",

                    placeholder:
                        "Anything you're unsure about or want me to know before I review your request?",

                    required:
                        false
                }
            ],


            /* -----------------------------
               Conditional questions.

               These appear only when one of
               the selected options requests
               the matching questionGroup.
            ----------------------------- */

            questionGroups: {
                "custom-widget": {
                    title:
                        "Custom Widget",

                    fields: [
                        {
                            id:
                                "custom-widget-description",

                            name:
                                "customWidgetDescription",

                            type:
                                "textarea",

                            label:
                                "What Should Your Widget Do?",

                            placeholder:
                                "Describe the interaction or feature you have in mind.",

                            required:
                                true
                        }
                    ]
                },


                "animated-details": {
                    title:
                        "Animated Details",

                    fields: [
                        {
                            id:
                                "animation-description",

                            name:
                                "animationDescription",

                            type:
                                "textarea",

                            label:
                                "What Would You Like Animated?",

                            placeholder:
                                "Describe the type of movement or decorative effect you're imagining.",

                            required:
                                true
                        }
                    ]
                }
            }
        }
    ],


    /* =====================================
       BOOK DATA

       The reusable Book component will use
       these later.

       You can add unlimited books and
       unlimited sections/items inside them.
    ===================================== */

    books: {
        "cursor-book": {
            id:
                "cursor-book",

            title:
                "Premade Cursor Book",

            description:
                "Browse premade cursors and add your favorite directly to your website request.",

            selectionLabel:
                "Cursor",

            maxSelections:
                1,

            sections: [
                {
                    id:
                        "featured-cursors",

                    title:
                        "Featured Cursors",

                    items: [
                        /*
                            Cursor products will go here.

                            Example structure:

                            {
                                id: "pink-star",
                                code: "CURSOR-PINK-STAR",
                                name: "Pink Star",
                                image: "../../assets/cursors/pink-star.png",
                                price: 15,
                                buttonText: "Choose Pink Star"
                            }
                        */
                    ]
                }
            ]
        },


        "asset-book": {
            id:
                "asset-book",

            title:
                "Decorative Asset Book",

            description:
                "Browse premade decorative assets and add the ones you want to your request.",

            selectionLabel:
                "Decorative Assets",

            sections: [
                {
                    id:
                        "small-decor",

                    title:
                        "Small Decorations",

                    items: [
                        /*
                            Asset products will go here later.
                        */
                    ]
                }
            ]
        }
    }
};
