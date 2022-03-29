export const photos = document.querySelector(".photos");
export const popupEdit = document.querySelector("#popup-edit");
export const popupAdd = document.querySelector("#popup-add");
export const formText = document.querySelector("#form_text");
export const formName = document.querySelector("#form_name");
export const infoName = document.querySelector(".info__name");
export const addImgButtonSave = document.querySelector("#add_save");
export const infoParagraph = document.querySelector(".info__paragraph");
export const popupImg = document.querySelector("#popup-img");

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escClose);
  document.removeEventListener("keydown", overplayClose);
}
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", (evt) => {
    escClose(evt, popup);
  });
  popup.addEventListener("click",  overplayClose);
}
const ESC = 27
function escClose(evt, popup) {
  if (evt.keyCode === ESC) {
    closePopup(popup);
  }
}
function overplayClose(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
