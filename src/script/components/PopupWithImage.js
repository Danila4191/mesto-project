import Popup from "./Popup"

  export default class PopupWithImage extends Popup {
   constructor(popupSelector,link,name ) {
     super(popupSelector,link,name);
     this._link = link
     this._name = name
   }
   setImgPopup(){
    const popupImgScale = document.querySelector(".popup__img");
    const popupTittleScale = document.querySelector(".popup__img-title");
    popupImgScale.src = this._link;
    popupImgScale.alt = this._name;
    popupTittleScale.textContent = this._name;
   }
}

