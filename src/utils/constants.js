/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */

//buttons
export const profileEditButton = document.querySelector(".profile__edit-button");
export const cardAddButton = document.querySelector("#add-button");
export const avatarButton = document.querySelector("#avatar-button");

//forms
export const profileNameInput = document.querySelector(".popup__input_type_name");
export const profileTitleInput = document.querySelector(".popup__input_type_title");

//validation
export const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//element variables
export const selectors = {
  cardListElement: ".cards__array",
  cardTemplate: "#card-template",
  previewPopup: "#preview-popup",

  profileEditPopup: "#edit-popup",
  cardAddPopup: "#add-popup",
  profileNameElement: ".profile__name",
  profileTitleElement: ".profile__title",

  avatarPopupElement: "#avatar-popup",
  avatarButton: "#avatar-button",
  avatarImage: ".profile__image",

  confirmPopup: "#confirm-popup",
};
