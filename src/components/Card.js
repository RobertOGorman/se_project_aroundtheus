class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._userId = data.owner._id;
    this._cardId = data._id;
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

  getView() {
    this._element = this._getTemplate();
    const imageElement = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".cards__location-title");
    imageElement.src = this._link;
    imageElement.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();
    this.showLikes(this._likes);
    return this._element;
  }
}

export default Card;
