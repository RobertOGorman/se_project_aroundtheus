//enabling validation by calling enableValidation()
//pass all the settings on call

function showInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
  console.log(inputEl.id)
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass)
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(inputEl, formEl)
  inputEl.classList.remove(inputErrorClass)
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  console.log(inputEl)
  if(!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  } 

    hideInputError(formEl, inputEl, options);
  }

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}) {
  if(hasInvalidInput(inputEls)) {
    return disableButton(submitButton, inactiveButtonClass)
  } 
    return enableButton(submitButton, inactiveButtonClass)
  }
    
function setEventListeners(formEl, options) {
  console.log(formEl)
    const {inputSelector} = options
    const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
    const submitButton = formEl.querySelector(".popup__button")
    console.log(inputEls, "i was here")
    inputEls.forEach(inputEl => {
    console.log(inputEl)
        inputEl.addEventListener("input", (e) => {
      
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(inputEls, submitButton, options);
        })
    })
}

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
      formEl.addEventListener("submit", () => {
        e.preventDefault();
      });

      setEventListeners(formEl, options);
    });
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
}

enableValidation(config);