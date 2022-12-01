class Card {
  constructor({
    data,
    selector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = selector;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => this._handleLikeButton());
    this._element
      .querySelector(".cards__delete")
      .addEventListener("click", () => this._handleDeleteClick(this));

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

  deleteCard() {
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

    // this._removeDeleteButton();
    this.showLikes(this._likes);
    this._setEventListeners();

    this._removeDeleteButton();
    return this._element;
  }
}

export default Card;
