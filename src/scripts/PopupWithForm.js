import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });

    this._popupForm = this.popupSelector.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      this.close();
    });
  }
}
