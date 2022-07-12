import Popup from "./Popup"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgScale = this._popup.querySelector(".popup__img");
    this._popupTittleScale = this._popup.querySelector(".popup__img-title");
  }

  open(link, name) {
    super.open()
    this._popupImgScale.src = link;
    this._popupImgScale.alt = name;
    this._popupTittleScale.textContent = name;
  }
}

