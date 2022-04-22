import Popup from "./Popup"
import {
  api,
  popupEdit,
  formText,
  formName,
  infoName,
  infoParagraph} from "../utils/constants"
export default class PopupWithImage extends Popup {
   constructor(popupSelector) {
     super(popupSelector);
   }
   submit(evt){
     super.submit(evt);
     api.submitProfileForm({ name: formName.value, about: formText.value })
     .then(() => {
       infoName.textContent = formName.value;
       infoParagraph.textContent = formText.value;
       this.close(popupEdit);
     })
     .catch((err) => {
       console.log(err);
     })
     .finally(() => {
      this._buttomSave.textContent = "Сохранить";
     });
    }
}
