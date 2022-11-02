import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openPopup, closePopup } from "./utils.js";
import {
  previewPopup,
  validationSettings,
  profileEditButton,
  profileEditCloseButton,
  initialCards,
  cardSelector,
} from "./constants.js";

/* -------------------------------------------------------------------------- */
/*                                 Functions                                  */
/* -------------------------------------------------------------------------- */

//close preview popup
const previewCloseButton = previewPopup.querySelector(".popup__close-button");
previewCloseButton.addEventListener("click", () => {
  closePopup(previewPopup);
});

function renderCard(cardElement, container) {
  //append to list
  container.prepend(cardElement);
}

function getCardView(cardData) {
  const card = new Card(cardData, cardSelector);
  return card.getView();
}

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileNameElement.textContent;

  profileTitleInput.value = profileTitleElement.textContent;

  openPopup(profileEditPopup);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditPopup);
});

/* -------------------------------------------------------------------------- */
/*                               Initialize Card                              */
/* -------------------------------------------------------------------------- */

initialCards.reverse().forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListElement);
});
