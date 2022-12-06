import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
  profileEditButton,
  cardAddButton,
  avatarButton,
  profileNameInput,
  profileTitleInput,
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

const userInfo = new UserInfo({
  userNameSelector: selectors.profileNameElement,
  userTitleSelector: selectors.profileTitleElement,
  userAvatarSelector: selectors.avatarImage,
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
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
  })
  .catch((error) => {
    console.log(`An error has occured ${error}`);
  });

function renderCard(cardData, userId) {
  const card = new Card({
    data: { ...cardData, userId },
    selector: "#card-template",
    handleCardClick: () => {
      imagePopup.open(cardData);
    },
    handleLikeClick: (data) => {
      if (card.isLiked()) {
        api
          .removeLikes(data._cardId)
          .then((response) => {
            card.showLikes(response.likes);
          })
          .catch((error) => {
            console.log(`An error has occured ${error}`);
          });
      } else {
        api
          .addLikes(data._cardId)
          .then((response) => {
            card.showLikes(response.likes);
          })
          .catch((error) => {
            console.log(`An error has occured ${error}`);
          });
      }
    },

    handleDeleteClick: (card) => {
      confirmationPopup.confirmDelete(() => {
        confirmationPopup.setSubmitText(true, "Deleting...");
        api
          .deleteCard(card._cardId)
          .then(() => {
            card.deleteCard();
            confirmationPopup.close();
          })
          .catch((error) => {
            console.log(`An error has occured ${error}`);
          })
          .finally(() => confirmationPopup.setSubmitText(false));
      });
      confirmationPopup.open();
    },
  });
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
    editProfilePopup.setSubmitText(true);
    api
      .editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        editProfilePopup.close();
      })
      .catch((error) => {
        console.log(`An error has occured ${error}`);
      })
      .finally(() => editProfilePopup.setSubmitText(false));
  },
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: selectors.cardAddPopup,
  handleFormSubmit: (cardData) => {
    newCardPopup.setSubmitText(true, "Creating...");
    api
      .postCard(cardData)
      .then((data) => {
        cardSection.addItem(renderCard(data, userId));
        newCardPopup.close();
      })
      .catch((error) => {
        console.log(`An error has occured ${error}`);
      })
      .finally(() => newCardPopup.setSubmitText(false));
  },
  resetOnClose: true,
});
newCardPopup.setEventListeners();

const newAvatarPopup = new PopupWithForm({
  popupSelector: selectors.avatarPopupElement,
  handleFormSubmit: (data) => {
    newAvatarPopup.setSubmitText(true);
    api
      .editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        newAvatarPopup.close();
      })
      .catch((error) => console.log(`An error has occured ${error}`))
      .finally(() => newAvatarPopup.setSubmitText(false));
  },
  resetOnClose: true,
});
newAvatarPopup.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: "#preview-popup",
});
imagePopup.setEventListeners();

const confirmationPopup = new PopupWithConfirmation({
  popupSelector: selectors.confirmPopup,
});
confirmationPopup.setEventListeners();

avatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  newAvatarPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const { userName, userTitle } = userInfo.getUserInfo();
  profileNameInput.value = userName;
  profileTitleInput.value = userTitle;
  addFormValidator.resetValidation();
  editProfilePopup.open();
});

cardAddButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  newCardPopup.open();
});
