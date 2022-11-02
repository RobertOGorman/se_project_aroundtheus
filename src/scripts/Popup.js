export default class Popup {
  constructor({ popupSelector }) {
    this.popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this.popupSelector.classList.add("popup_open");
    document.addEventListener("keyup", (event) => {
      this._handleEscapeClose(event);
    });
    this.popupSelector.addEventListener("click", (event) => {
      this._handleClickOnOverlay(event);
    });
  }

  close() {
    this.popupSelector.classList.remove("popup_open");
    document.removeEventListener("keyup", (event) => {
      this._handleEscapeClose(event);
    });
    this.popupSelector.removeEventListener("click", (event) => {
      this._handleClickOnOverlay(event);
    });
  }

  _handleEscapeClose(event) {
    event.preventDefault();
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay(event) {
    if (event.target.classList.contains("popup")) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this.popupSelector.addEventListener("click", (event) => {
      if (!event.target.closest(".popup__content")) {
        this.close(event.currentTarget);
      }
    });
  }
}
