import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, resetOnClose }) {
    super({ popupSelector });

    this._resetOnClose = resetOnClose;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  close() {
    if (this._resetOnClose) {
      this._popupForm.reset();
    }
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  setSubmitText(submit, submitText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = submitText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
