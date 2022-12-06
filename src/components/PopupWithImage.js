import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCaption = this._popup.querySelector(".popup__preview-text");
    this._popupImage = this._popup.querySelector(".popup__preview-image");
  }

  open({ name, link }) {
    this._popupCaption.textContent = name;
    this._popupImage.alt = name;
    this._popupImage.src = link;

    super.open();
  }
}
