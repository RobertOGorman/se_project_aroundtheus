class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement, { inputErrorClass }) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _toggleButtonState(inputElements, submitButton, { inactiveButtonClass }) {
    if (this._hasInvalidInput(inputElements)) {
      return this.disableButton(submitButton, inactiveButtonClass);
    }
    return this.enableButton(submitButton, inactiveButtonClass);
  }

  hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  checkInputValidity(formElement, inputElement, options) {
    if (!inputElement.validity.valid) {
      return this._showInputError(formElement, inputElement, options);
    }

    this._hideInputError(formElement, inputElement, options);
  }

  _setEventListeners() {
    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = document.querySelector(this._submitButtonSelector);
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(formElement, inputElement, options);
        this._toggleButtonState(
          this._inputElements,
          this._submitButton,
          options
        );
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", () => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
