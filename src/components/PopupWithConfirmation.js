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
    this._confirmDelete = confirmation;
  }

  setEventListners() {
    super.setEventListeners();
    this._submitButton.addEventListener("submit", (event) => {
      event.preventDefault();
      this.confirmDelete();
    });
    //this._submitButton.addEventListener("submit", this.confirmDelete);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._submitButton.removeEventListeners("submit", this.confirmDelete);
  }
}
