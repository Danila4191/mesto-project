import Api from "../components/Api"
export const api = new Api({
  baseUrl:"https://nomoreparties.co/v1/plus-cohort-8",
  headers: {
    authorization: "8263c3c6-b8b7-4055-9b88-53b541ccbb29",
    "Content-Type": "application/json",
  },
});
export const ESC = 27;
export const photos = document.querySelector(".photos");
export const popupEdit = document.querySelector("#popup-edit");
export const popupAdd = document.querySelector("#popup-add");
export const formText = document.querySelector("#form_text");
export const formName = document.querySelector("#form_name");
export const infoName = document.querySelector(".info__name");
export const addImgButtonSave = document.querySelector("#add_save");
export const infoParagraph = document.querySelector(".info__paragraph");
export const popupImg = document.querySelector("#popup-img");
export const popupImgProfile = document.querySelector('#popupImgProfile')
export const formAvatarProfileLink = document.querySelector('#formAvatarProfileLink')
export const profileAvatar = document.querySelector(".profile__avatar")
export const avatarProfileSave = document.querySelector("#avatarProfileSave")
export const editProfileButtonSave = document.querySelector("#profile_save");
export const popupImgScale = document.querySelector(".popup__img");
export const popupTittleScale = document.querySelector(".popup__img-title");
