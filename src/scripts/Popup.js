export default class Popup {
  constructor({ popupSelector }) {
    this.popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this.popupSelector.classList.add("popup_open");
    document.addEventListener("keyup", (event) => {
      this._handleEscapeClose(event);
    });
    this.popupSelector.addEventListener(
      "click",
      this._handleClickOnOverlay.bind(this)
    );
  }

  close() {
    this.popupSelector.classList.remove("popup_open");
    document.removeEventListener("keyup", (event) => {
      this._handleEscapeClose(event);
    });
    this.popupSelector.removeEventListener(
      "mousedown",
      this._handleClickOnOverlay
    );
  }

  _handleEscapeClose(event) {
    event.preventDefault();
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleClickOnOverlay(event) {
    if (event.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this.popupSelector.addEventListener("mousedown", (event) => {
      if (
        !event.target.closest(".popup__content") ||
        event.target.classList.contains("popup__close-button")
      ) {
        this.close(event.currentTarget);
      }
    });
  }
}