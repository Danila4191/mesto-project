import Popup from "./Popup"
import {
  api,
  formAvatarProfileLink,
  profileAvatar,} from "../utils/constants"
export default class PopupWithImage extends Popup {
   constructor(popupSelector) {
     super(popupSelector);
   }
   submit(evt){
     super.submit(evt);
    api.submitAvatarProfileForm({ avatar: formAvatarProfileLink.value })
    .then(() => {
      profileAvatar.src = formAvatarProfileLink.value;
      formAvatarProfileLink.value = "";
      this.close();
      this._buttomSave.disabled = "disabled";
      this._buttomSave.classList.add("form__save-button_disabled");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this._buttomSave.textContent = "Сохранить";
    });
   }
}
