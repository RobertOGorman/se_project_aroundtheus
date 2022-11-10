import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import {
  previewPopup,
  validationSettings,
  profileEditButton,
  initialCards,
  cardSelector,
  cardListElement,
  profileNameInput,
  profileNameElement,
  profileTitleInput,
  profileTitleElement,
  profileEditPopup,
  cardAddPopup,
  cardAddButton,
} from "../utils/constants.js";
import "./index.css";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
/* -------------------------------------------------------------------------- */
/*                                 Functions                                  */
/* -------------------------------------------------------------------------- */

function renderCard(cardElement, container) {
  //append to list
  container.prepend(cardElement);
}

function getCardView(cardData) {
  const card = new Card(cardData, cardSelector, (data) => {
    imagePopup.open(data);
  });
  return card.getView();
}

const imagePopup = new PopupWithImage({
  popupSelector: "#preview-popup",
});

imagePopup.setEventListeners();

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

const NewCardPopup = new PopupWithForm({
  popupSelector: cardAddPopup,
  handleFormSubmit: (data) => {
    const cardView = getCardView(data);
    renderCard(cardView, cardListElement);
    addFormValidator.disableButton();
  },
});

NewCardPopup.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: profileNameElement,
  userTitleSelector: profileTitleElement,
});

const EditProfilePopup = new PopupWithForm({
  popupSelector: profileEditPopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

EditProfilePopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  console.log(profileNameElement);
  profileNameInput.value =
    document.querySelector(profileNameElement).textContent;
  profileTitleInput.value =
    document.querySelector(profileTitleElement).textContent;

  EditProfilePopup.open();
});

cardAddButton.addEventListener("click", () => {
  NewCardPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                               Initialize Card                              */
/* -------------------------------------------------------------------------- */

initialCards.reverse().forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListElement);
});
