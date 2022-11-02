import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  open({ name, link }, previewText, previewImage) {
    this.popupSelector.querySelector(previewText).textContent = name;
    this.popupSelector.querySelector(previewText).alt = name;
    this.popupSelector.querySelector(previewImage).src = link;

    super.open();
  }
}
