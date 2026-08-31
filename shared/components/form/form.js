function createFormField(field) {
    const wrapper = document.createElement("div");
    wrapper.className = "request-form__field";

    const id = `form-{field.name}`;

    if (field.type === "checkbox") {
        wrapper.classList.add("request-form__field--checkbox");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = id;
        input.name = field.name;

        if (field.value) {
            input.value = field.value;
        }

        if (field.required) {
            input.required = true;
        }

        const label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = field.label;

        wrapper.append(input, label);

        return wrapper;
    }

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = field.label;

    let input;

    if (field.type === "textarea") {
        input = document.createElement("textarea");
        input.rows = field.rows || 5;
    } else if (field.type === "select") {
        input = document.createElement("select");

        if (field.placeholder) {
            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = field.placeholder;
            placeholder.disabled = true;
            placeholder.selected = true;

            input.appendChild(placeholder);
        }

        (field.options || []).forEach((option) => {
            const optionElement = document.createElement("option");

            if (typeof option === "string") {
                optionElement.value = option;
                optionElement.textContent = option;
            } else {
                optionElement.value = option.value;
                optionElement.textContent = option.label;
            }

            input.appendChild(optionElement);
        });
    } else {
        input = document.createElement("input");
        input.type = field.type || "text";
    }

    input.id = id;
    input.name = field.name;

    if (field.placeholder && field.type !== "select") {
        input.placeholder = field.placeholder;
    }

    if (field.required) {
        input.required = true;
    }

    if (field.type === "file") {
        if (field.multiple) {
            input.multiple = true;
        }

        if (field.accept) {
            input.accept = field.accept;
        }
    }

    wrapper.append(label, input);

    if (field.type === "file" && field.multiple) {
        const selectedFiles = [];

        const fileList = document.createElement("div");
        fileList.className = "request-form__file-list";

        function updateInputFiles() {
            const transfer = new DataTransfer();

            selectedFiles.forEach((file) => {
                transfer.items.add(file);
            });

            input.files = transfer.files;
        }

        function renderFileList() {
            fileList.innerHTML = "";

            selectedFiles.forEach((file, index) => {
                const item = document.createElement("div");
                item.className = "request-form__file-item";

                const name = document.createElement("span");
                name.className = "request-form__file-name";
                name.textContent = file.name;

                const removeButton = document.createElement("button");
                removeButton.type = "button";
                removeButton.className = "request-form__file-remove";
                removeButton.textContent = "Remove";

                removeButton.addEventListener("click", () => {
                    selectedFiles.splice(index, 1);

                    updateInputFiles();
                    renderFileList();
                });

                item.append(name, removeButton);
                fileList.appendChild(item);
            });
        }

        input.addEventListener("change", () => {
            const newFiles = Array.from(input.files);

            newFiles.forEach((file) => {
                const alreadyAdded = selectedFiles.some(
                    (existingFile) =>
                        existingFile.name === file.name &&
                        existingFile.size === file.size &&
                        existingFile.lastModified === file.lastModified
                );

                if (!alreadyAdded) {
                    selectedFiles.push(file);
                }
            });

            updateInputFiles();
            renderFileList();
        });

        input.clearSelectedFiles = function () {
            selectedFiles.length = 0;
            input.value = "";
            renderFileList();
        };

        wrapper.appendChild(fileList);
    }

    if (field.helpText) {
        const helpText = document.createElement("p");
        helpText.className = "request-form__help";
        helpText.textContent = field.helpText;

        wrapper.appendChild(helpText);
    }

    return wrapper;
}


function createRequestForm(data, options = {}) {
    const form = document.createElement("form");
    form.className = "request-form";

    form.method = "POST";
    form.enctype = "multipart/form-data";
    form.acceptCharset = "UTF-8";

    if (options.endpoint) {
        form.action = options.endpoint;
    }

    if (data.title || data.description) {
        const header = document.createElement("div");
        header.className = "request-form__header";

        if (data.title) {
            const title = document.createElement("h2");
            title.className = "request-form__title";
            title.textContent = data.title;

            header.appendChild(title);
        }

        if (data.description) {
            const description = document.createElement("p");
            description.className = "request-form__description";
            description.textContent = data.description;

            header.appendChild(description);
        }

        form.appendChild(header);
    }

    const fields = document.createElement("div");
    fields.className = "request-form__fields";

    (data.fields || []).forEach((field) => {
        fields.appendChild(createFormField(field));
    });

    form.appendChild(fields);

    const hiddenFields = {
        ...(data.hiddenFields || {}),
        ...(options.hiddenFields || {})
    };

    Object.entries(hiddenFields).forEach(([name, value]) => {
        const input = document.createElement("input");

        input.type = "hidden";
        input.name = name;
        input.value = value ?? "";

        form.appendChild(input);
    });

    const actions = document.createElement("div");
    actions.className = "request-form__actions";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "request-form__submit button";
    submitButton.textContent = data.submitText || "Submit";

    actions.appendChild(submitButton);
    form.appendChild(actions);

    const status = document.createElement("p");
    status.className = "request-form__status";
    status.setAttribute("aria-live", "polite");

    form.appendChild(status);

    form.addEventListener("submit", async (event) => {
        if (!options.endpoint) {
            event.preventDefault();

            status.textContent = "This form is not connected yet.";
            status.classList.add("request-form__status--error");

            return;
        }

        event.preventDefault();

        submitButton.disabled = true;
        status.textContent = data.sendingText || "Sending...";

        status.classList.remove(
            "request-form__status--success",
            "request-form__status--error"
        );

        try {
            const response = await fetch(options.endpoint, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Form submission failed.");
            }

            form.reset();

            form
                .querySelectorAll('input[type="file"]')
                .forEach((fileInput) => {
                    if (fileInput.clearSelectedFiles) {
                        fileInput.clearSelectedFiles();
                    }
                });

            status.textContent =
                data.successMessage ||
                "Your request was sent successfully!";

            status.classList.add("request-form__status--success");
        } catch (error) {
            status.textContent =
                data.errorMessage ||
                "Something went wrong. Please try again.";

            status.classList.add("request-form__status--error");
        } finally {
            submitButton.disabled = false;
        }
    });

    return form;
}


function createRequestFormModal(data, options = {}) {
    const modal = document.createElement("div");
    modal.className = "request-form-modal";
    modal.hidden = true;

    const backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "request-form-modal__backdrop";
    backdrop.setAttribute("aria-label", "Close form");

    const panel = document.createElement("div");
    panel.className = "request-form-modal__panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "request-form-modal__close";
    closeButton.setAttribute("aria-label", "Close form");
    closeButton.textContent = "×";

    const content = document.createElement("div");
    content.className = "request-form-modal__content";

    const form = createRequestForm(data, options);

    content.appendChild(form);
    panel.append(closeButton, content);
    modal.append(backdrop, panel);

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove("request-form-modal-open");
    }

    function openModal() {
        modal.hidden = false;
        document.body.classList.add("request-form-modal-open");

        const firstField = form.querySelector(
            "input:not([type='hidden']), textarea, select"
        );

        firstField?.focus();
    }

    backdrop.addEventListener("click", closeModal);
    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    modal.openForm = openModal;
    modal.closeForm = closeModal;
    modal.formElement = form;

    return modal;
}