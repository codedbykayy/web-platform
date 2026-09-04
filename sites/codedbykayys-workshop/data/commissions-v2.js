const commissionsV2 = {
    formType: "website-request",
    requestName: "Website Commission Request",

    intro: {
        eyebrow: "Build Something in the Workshop!",
        title: "Request a Website",
        description:
            "Build your website by choosing the layouts, pages, and extras you want. Once you're happy with your choices, send me your request and I'll review everything before giving you a final quote."
    },

    pricing: {
        basePrice: 150,
        currencySymbol: "$",
        decimals: 0
    },

    summaryEmptyText:
        "Start building your commission to see your choices here!",

    blocks: [
        {
            id: "examples",
            type: "examples",

            eyebrow: "Made in the Workshop",
            title: "See What You Can Build!",
            description:
                "Swipe through finished websites to see how different layouts, sections, pages, and styles can come together.",

            items: [
                {
                    id: "the-hive",
                    title: "The Hive",

                    description:
                        "A cozy woodland-inspired streamer website built with a mix of homepage features and full community pages.",

                    images: [
                        {
                            image: "../../assets/hive1.png",
                            alt: "The Hive homepage"
                        },
                        {
                            image: "../../assets/hive2.png",
                            alt: "The Hive gallery page"
                        },
                        {
                            image: "../../assets/hive3.png",
                            alt: "The Hive schedule page"
                        },
                        {
                            image: "../../assets/hive4.png",
                            alt: "The Hive community page"
                        },
                        {
                            image: "../../assets/hive5.png",
                            alt: "The Hive FAQ page"
                        }
                    ],

                    details: [
                        {
                            label: "Homepage",
                            value: "Split Homepage"
                        },
                        {
                            label: "Homepage Features",
                            value:
                                "Gallery, FAQ, Currently Live, Next Up"
                        },
                        {
                            label: "Full Pages",
                            value:
                                "Gallery, Schedule, Community, FAQ"
                        },
                        {
                            label: "Requested Vibe",
                            value:
                                "Cozy woodland bee community"
                        }
                    ]
                },

                {
                    id: "coded-by-kayy-workshop",
                    title: "Coded by Kayy's Workshop",

                    description:
                        "A playful handmade portfolio and business website designed around a colorful toy workshop theme.",

                    images: [
                        {
                            image: "../../assets/workshop1.png",
                            alt: "Coded by Kayy's Workshop homepage"
                        },
                        {
                            image: "../../assets/workshop2.png",
                            alt: "Coded by Kayy's Workshop shop page"
                        },
                        {
                            image: "../../assets/workshop3.png",
                            alt: "Coded by Kayy's Workshop commissions page"
                        },
                        {
                            image: "../../assets/workshop4.png",
                            alt: "Coded by Kayy's Workshop gallery page"
                        },
                        {
                            image: "../../assets/workshop5.png",
                            alt: "Coded by Kayy's Workshop FAQ page"
                        }
                    ],

                    details: [
                        {
                            label: "Homepage",
                            value: "Workshop Homepage"
                        },
                        {
                            label: "Homepage Features",
                            value:
                                "Shop, FAQ, Request a Website, Gallery"
                        },
                        {
                            label: "Full Pages",
                            value:
                                "Shop, Commissions, Gallery, FAQ, Commission Builder"
                        },
                        {
                            label: "Requested Vibe",
                            value:
                                "Pastel toy maker workshop"
                        }
                    ]
                }
            ]
        },
        {
            id: "homepage-layout",
            type: "single-choice",
            required: true,

            eyebrow: "Start With Your Homepage",
            title: "Choose Your Homepage",
            description:
                "Pick the homepage layout you like best. Your colors, artwork, text, and overall style will be customized to your site.",

            selectionLabel: "Homepage",

            options: [
                {
                    id: "split",
                    code: "H1",
                    name: "Split",

                    image: "../../assets/hive1.png",
                    alt: "Example of the Split homepage layout",

                    description:
                        "A structured homepage that divides content into clear sections. Great for creators, streamers, communities, and sites with several homepage features.",

                    price: 0,
                    priceLabel: "Included",

                    buttonText: "Choose Split"
                },

                {
                    id: "stacked",
                    code: "H2",
                    name: "Stacked",

                    image: "../../assets/workshop1.png",
                    alt: "Example of the Stacked homepage layout",

                    description:
                        "A more visual homepage that flows vertically through the main content. Great for portfolios, brands, artists, and highly themed sites.",

                    price: 0,
                    priceLabel: "Included",

                    buttonText: "Choose Stacked"
                }
            ]
        },
    ]
};
