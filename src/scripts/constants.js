/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */

export const cardListElement = document.querySelector(".cards__array");
export const previewPopup = document.querySelector("#preview-popup");

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileEditPopup = document.querySelector("#edit-popup");
export const profileEditCloseButton = profileEditPopup.querySelector(
  ".popup__close-button"
);
export const profileEditForm = document.querySelector("#edit-profile-form");
export const profileNameElement = document.querySelector(".profile__name");
export const profileTitleElement = document.querySelector(".profile__title");

export const cardAddPopup = document.querySelector("#add-popup");
export const cardAddButton = document.querySelector("#add-button");
export const cardAddForm = document.querySelector("#add-card-form");
export const cardCloseButton = cardAddPopup.querySelector(
  ".popup__close-button"
);

export const profileNameInput = document.querySelector(
  ".popup__input_type_name"
);
export const profileTitleInput = document.querySelector(
  ".popup__input_type_title"
);

export const cardSelector = "#card-template";

/* -------------------------------------------------------------------------- */
/*                                Cards Array                                 */
/* -------------------------------------------------------------------------- */

export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

export const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
