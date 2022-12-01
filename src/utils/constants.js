/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const cardAddButton = document.querySelector("#add-button");

export const avatarButton = document.querySelector("#avatar-button");

export const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const selectors = {
  cardListElement: ".cards__array",
  cardTemplate: "#card-template",
  previewPopup: "#preview-popup",

  profileNameInput: ".popup__input_type_name",
  profileTitleInput: ".popup__input_type_title",

  profileEditPopup: "#edit-popup",
  cardAddPopup: "#add-popup",
  profileNameElement: ".profile__name",
  profileTitleElement: ".profile__title",

  avatarPopupElement: "#avatar-popup",
  avatarButton: "#avatar-button",
  avatarImage: ".profile__image",

  confirmPopup: "#confirm-popup",
};
