import { openPopup } from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => this._handleLikeButton());

    this._element
      .querySelector(".cards__delete")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewPicture());
  }

  _handleLikeButton() {
    this._element
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handlePreviewPicture() {
    const imageElement = document.querySelector(".popup__preview-image");
    const imageText = document.querySelector(".popup__preview-text");
    imageElement.src = this._link;
    imageText.textContent = this._name;
    imageElement.alt = `Photo of ${this._name}`;
    const popup = document.querySelector("#preview-popup");
    openPopup(popup);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    const imageElement = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".cards__location-title");
    imageElement.src = this._link;
    imageElement.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;