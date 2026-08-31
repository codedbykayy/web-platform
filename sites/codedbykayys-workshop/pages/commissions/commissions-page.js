const page = document.querySelector("#site");
const navigationElement = createNavigation(navigation);
const commissionsElement = createCommissions(commissions);
page.appendChild(navigationElement);
page.appendChild(commissionsElement);
const requestFormModal = createRequestFormModal(
    commissionRequestForm,
    {
        endpoint: siteConfig.forms.endpoint,
        hiddenFields: {
            formType: "commission",
            requestName: ""
        }
    }
);
document.body.appendChild(requestFormModal);
const requestNameInput = requestFormModal.formElement.querySelector(
    'input[name="requestName"]'
);
commissionsElement
    .querySelectorAll("[data-commission-request]")
    .forEach((button) => {
        button.addEventListener("click", () => {
            const sectionIndex = Number(
                button.dataset.commissionRequest
            );
            const selectedCommission =
                commissions.sections[sectionIndex];
            requestNameInput.value =
                selectedCommission.requestName ||
                selectedCommission.title ||
                "Commission Request";
            requestFormModal.openForm();
        });
    });