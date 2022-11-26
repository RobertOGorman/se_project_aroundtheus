import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(options) {
    super(options);
    this._submitButton = this._popup.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  submitText(submit, submitText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = submitText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  confirmDelete(confirmation) {
    this._handleFormSubmit = confirmation;
  }

  openPopup(confirmation) {
    super.open();
    this._confirmDelte = confirmation;
  }

  setEventListners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", this.confirmDelete);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._submitButton.removeEventListeners("click", this.confirmDelete);
  }
}
