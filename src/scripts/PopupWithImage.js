import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    this.popupSelector.querySelector(".popup__preview-text").textContent = name;
    this.popupSelector.querySelector(".popup__preview-text").alt = name;
    this.popupSelector.querySelector(".popup__preview-image").src = link;

    super.open();
  }
}
