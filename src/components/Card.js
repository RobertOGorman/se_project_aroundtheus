class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data._userId;
    this._ownerId = data.owner._id;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => this._handleLikeButton());

    this._element
      .querySelector(".cards__delete")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () =>
        this._handleCardClick({ link: this._link, name: this._name })
      );
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

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  showLikes(data) {
    this._likes = data || [];
    this._element.querySelector(".cards__like-counter").textContent =
      this._likes.length;
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _removeDeleteButton() {
    this._deleteButton = this._element.querySelector("cards__delete");
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }
  }

  getView() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".cards__image");
    this._elementTitle = this._element.querySelector(".cards__location");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._likeButton = this._element.querySelector(".cards__like-button");
    this._deleteButton = this._element.querySelector(".cards__delete");
    this._likeCounter = this._element.querySelector(".cards__like-counter");

    /*if (this._ownerId !== this._userId) {
        this._removeDeleteButton();
      }*/

    this._setEventListeners();
    this.showLikes(this._likes);
    return this._element;
  }
}

export default Card;
