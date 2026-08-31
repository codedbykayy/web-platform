const commissionRequestForm = {
    title: "Commission Request!",
    description: "Fill out the form below and I'll get back to you soon!",

    fields: [
        {
            type: "text",
            name: "name",
            label: "Your Name",
            placeholder: "What should I call you?",
            required: true
        },

        {
            type: "email",
            name: "email",
            label: "Your Email",
            placeholder: "Where should I contact you?",
            required: true
        },

        {
            type: "textarea",
            name: "details",
            label: "Tell Me About Your Request!",
            placeholder: "Tell me what you'd like...",
            required: true,
            rows: 5
        },

        {
            type: "file",
            name: "attachments[]",
            label: "Upload Your References",
            multiple: true,
            accept: "image/*",
            helpText: "You can upload multiple reference images."
        }
    ],

    submitText: "Send Request!",
    sendingText: "Sending...",
    successMessage: "Your request was sent! I'll get back to you soon.",
    errorMessage: "Something went wrong. Please try again."
};