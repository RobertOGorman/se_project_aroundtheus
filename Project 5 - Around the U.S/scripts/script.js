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
const profileEditCloseButton = profileEditPopup.querySelector(".popup__close-button");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileNameEl = document.querySelector(".profile__name");
const profileTitleEl = document.querySelector(".profile__title");
const cardListEl = document.querySelector(".cards__array");
const previewPopup = document.querySelector(".popup__preview")
const previewPopupImg = previewPopup.querySelector(".popup__preview-image")
const popupText = previewPopup.querySelector(".popup__preview-text")

const cardAddPopup = document.querySelector("#add-popup");
const cardAddButton = document.querySelector("#add-button");
const cardCloseButton = cardAddPopup .querySelector(".popup__close-button");
const cardAddForm = document.querySelector("#add-card-form");

const profileNameInput = document.querySelector(".popup__form-input_type_name");
const profileTitleInput = document.querySelector(".popup__form-input_type_title");

const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                 Functions                                  */
/* -------------------------------------------------------------------------- */

function openPopup(popup) {
    popup.classList.add("popup_open");
}

function closePopup(popup) {
    popup.classList.remove("popup_open");
}

function renderCard(cardEl, container) {
  //append to list
  container.prepend(cardEl);
}

function getCardView(cardData) {
  // clone template
  const cardEl = cardTemplate.cloneNode(true);
  //find .card__image
  const imageEl = cardEl.querySelector(".cards__image");
  // find card__title
  const cardTitle = cardEl.querySelector(".cards__location-title");
  // replace image src
  imageEl.src = cardData.link;
  // replace image alt
  imageEl.alt = cardData.name;
  // replace title
  cardTitle.textContent = cardData.name;
  
//open preview popup
imageEl.addEventListener("click", (event) => {
  openPopup(previewPopup);
  previewPopupImg.src = event.target.src;
  popupText.textContent = cardData.name;
});

  //add event listener for like button
  const cardLikeBtn = cardEl.querySelector(".cards__like-button");
  cardLikeBtn.addEventListener("click", () => {
  //add active class to cardLikeBtn
    cardLikeBtn.classList.toggle("cards__like-button_active");
  });

  
  //delete card
  const deleteCard = cardEl.querySelector(".cards__delete")
  deleteCard.addEventListener("click", function () {
    cardEl.remove();
  });


  //close preview popup
  const closePreview = previewPopup.querySelector(".popup__close-button")
  closePreview.addEventListener("click", (event) => {
    closePopup(previewPopup);
  });

  return cardEl;
}


profileEditButton.addEventListener("click", () => {

    profileNameInput.value = profileNameEl.textContent;

    profileTitleInput.value = profileTitleEl.textContent;

    openPopup(profileEditPopup)
});

profileEditCloseButton.addEventListener("click", () => {

    closePopup(profileEditPopup)
});

cardAddButton.addEventListener("click", () => {

    openPopup(cardAddPopup)
}); 

cardCloseButton.addEventListener("click", () => {

    closePopup(cardAddPopup)
});

profileEditForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameValue = event.target.name.value;
    const titleValue = event.target.title.value;

    profileNameEl.textContent = nameValue;
    profileTitleEl.textContent = titleValue;

    closePopup(); 
});

cardAddForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = event.target.name.value;
  const link = event.target.title.value;
  const cardView = getCardView({
    name,
    link,
  })
  renderCard(cardView, cardListEl);
  closePopup(cardAddPopup)
});

initialCards.reverse().forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListEl);
});