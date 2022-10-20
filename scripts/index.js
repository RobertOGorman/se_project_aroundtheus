import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {
  openPopup,
  closePopup,
  handleEscPress,
  closePopupOnRemoteClick,
} from "./utils.js";

/* -------------------------------------------------------------------------- */
/*                                Cards Array                                 */
/* -------------------------------------------------------------------------- */

const initialCards = [
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

/* -------------------------------------------------------------------------- */
/*                                 Edit Popup                                 */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector("#edit-popup");
const profileEditCloseButton = profileEditPopup.querySelector(
  ".popup__close-button"
);
const profileEditForm = document.querySelector("#edit-profile-form");
const profileNameElement = document.querySelector(".profile__name");
const profileTitleElement = document.querySelector(".profile__title");
const cardListElement = document.querySelector(".cards__array");
const previewPopup = document.querySelector("#preview-popup");
const previewPopupImage = previewPopup.querySelector(".popup__preview-image");
const previewPopupText = previewPopup.querySelector(".popup__preview-text");

const cardAddPopup = document.querySelector("#add-popup");
const cardAddButton = document.querySelector("#add-button");
const cardCloseButton = cardAddPopup.querySelector(".popup__close-button");
const cardAddForm = document.querySelector("#add-card-form");

const profileNameInput = document.querySelector(".popup__input_type_name");
const profileTitleInput = document.querySelector(".popup__input_type_title");

const cardSelector = "#card-template";

//close preview popup
const previewCloseButton = previewPopup.querySelector(".popup__close-button");
previewCloseButton.addEventListener("click", (event) => {
  closePopup(previewPopup);
});

/* -------------------------------------------------------------------------- */
/*                                 Functions                                  */
/* -------------------------------------------------------------------------- */

function renderCard(cardElement, container) {
  //append to list
  container.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//edit form
const editFormElement = document.querySelector("#edit-profile-form");
const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
editFormValidator.enableValidation();

//add form
const addFormElement = document.querySelector("#add-card-form");
const addFormValidator = new FormValidator(validationSettings, addFormElement);
addFormValidator.enableValidation();

function getCardView(cardData) {
  const card = new Card(cardData, cardSelector);
  return card.getView();
}

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileNameElement.textContent;

  profileTitleInput.value = profileTitleElement.textContent;

  openPopup(profileEditPopup);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditPopup);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddPopup);
});

cardCloseButton.addEventListener("click", () => {
  closePopup(cardAddPopup);
});

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameValue = event.target.name.value;
  const titleValue = event.target.title.value;

  profileNameElement.textContent = nameValue;
  profileTitleElement.textContent = titleValue;

  closePopup(profileEditPopup);
});

cardAddForm.addEventListener("submit", function (event) {
  this.cardAddForm
  event.preventDefault();
  const name = event.target.name.value;
  const link = event.target.title.value;
  const cardView = getCardView({
    name,
    link,
  });
  renderCard(cardView, cardListElement);
  closePopup(cardAddPopup);
  cardAddForm.reset();
  addFormValidator.disableButton();
});

initialCards.reverse().forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListElement);
});
