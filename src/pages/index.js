import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
  profileEditButton,
  cardAddButton,
  validationSettings,
  selectors,
} from "../utils/constants.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
/* -------------------------------------------------------------------------- */
/*                                 Functions                                  */
/* -------------------------------------------------------------------------- */

const api = new Api("https://around.nomoreparties.co/v1/group-12", {
  authorization: "131ba339-cd78-4b6e-97bd-4c8ebc90ef11",
  "Content-Type": "application/json",
});
let cardSection = null;
api.getInitialCards().then((cards) => {
  cardSection = new Section(
    {
      items: cards,
      renderer: (cardData) => {
        cardSection.addItem(getCardView(cardData));
      },
    },
    selectors.cardListElement
  );
  cardSection.renderItems();
});

function getCardView(cardData) {
  const card = new Card(cardData, "#card-template", (data) => {
    imagePopup.open(data);
  });
  return card.getView();
}

const confirmationPopup = new PopupWithConfirmation({
  popupSelector: "#confirm-popup",
});
confirmationPopup.setEventListeners();

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

//avatar form
const avatarFormElement = document.querySelector("#avatar-form");
const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarFormElement
);
avatarFormValidator.enableValidation();
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

const editProfilePopup = new PopupWithForm({
  popupSelector: selectors.profileEditPopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: selectors.cardAddPopup,
  handleFormSubmit: (data) => {
    cardSection.addItem(getCardView(data));
  },
  resetOnClose: true,
});
newCardPopup.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: "#preview-popup",
});
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: selectors.profileNameElement,
  userTitleSelector: selectors.profileTitleElement,
});

selectors.avatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  selectors.avatarPopupElement.open();
});

profileEditButton.addEventListener("click", () => {
  const { userName, userTitle } = userInfo.getUserInfo();
  document.querySelector(selectors.profileNameInput).value = userName;
  document.querySelector(selectors.profileTitleInput).value = userTitle;
  addFormValidator.resetValidation();
  editProfilePopup.open();
});

cardAddButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  newCardPopup.open();
});