import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
  profileEditButton,
  cardAddButton,
  avatarButton,
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
let userId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([data, cards]) => {
    userId = data._id;
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    });

    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          cardSection.addItem(renderCard(cardData, userId));
        },
      },
      selectors.cardListElement
    );
    cardSection.renderItems();
  }
);

function renderCard(cardData, userId) {
  const card = new Card(
    cardData,
    "#card-template",
    () => {
      imagePopup.open(data);
    },
    () => {
      if (card.isLiked()) {
        api
          .removeLikes(data._id)
          .then((response) => {
            card.showLikes(response.likes);
          })
          .catch((error) => {
            console.log(`An error has occured ${error}`);
          });
      } else {
        api
          .addLikes(data._id)
          .then((response) => {
            card.showLikes(response.likes);
          })
          .catch((error) => {
            console.log(`An error has occured ${error}`);
          });
      }
    },
    userId
  );
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
  handleFormSubmit: (cardData) => {
    api.postCard(cardData).then((data) => {
      cardSection.addItem(renderCard(data));
    });
  },
  resetOnClose: true,
});
newCardPopup.setEventListeners();

const newAvatarPopup = new PopupWithForm({
  popupSelector: selectors.avatarPopupElement,
  handleFormSubmit: (data) => {
    newAvatarPopup.submitText(true);
    api
      .editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        newAvatarPopup.close();
      })
      .catch((error) => console.log(`An error has occured ${error}`))
      .finally(() => newAvatarPopup.submitText(false));
  },
});

newAvatarPopup.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: "#preview-popup",
});
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: selectors.profileNameElement,
  userTitleSelector: selectors.profileTitleElement,
  userAvatarSelector: selectors.avatarImage,
});

avatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  newAvatarPopup.open();
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
