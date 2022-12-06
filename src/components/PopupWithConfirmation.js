import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(options) {
    super(options);
    this._submitButton = this._popup.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  setSubmitText(submit, submitText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = submitText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  confirmDelete(confirmation) {
    this._handleFormSubmit = confirmation;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
  }
}
