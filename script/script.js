const popupEdit = document.querySelector("#popup-edit");
const infoName = document.querySelector(".info__name");
const infoParagraph = document.querySelector(".info__paragraph");
const infoEditButtonOpen = document.querySelector(".info__edit-button");
const editProfileButtonSave = document.querySelector("#edit-profile");
const editProfileButtonClose = document.querySelector("#profile_close");
const popupAdd = document.querySelector("#popup-add");
const addImgButtonOpen = document.querySelector(".profile__button");
const addImgButtonClose = document.querySelector("#add_close");
const addImgButtonSave = document.querySelector("#add-img");
const popupImg = document.querySelector("#popup-img");
const imgButtonClose = document.querySelector("#img_close");
const formText = document.querySelector("#form_text");
const formName = document.querySelector("#form_name");
const template = document.querySelector("#template").content;
const photos = document.querySelector(".photos");

const emptyName = document.querySelector("#form_empty_name");
const emptyLink = document.querySelector("#form_empty_link");
editProfileButtonClose.addEventListener("click", () => {
  closePopup(popupEdit);
});
addImgButtonClose.addEventListener("click", () => {
  closePopup(popupAdd);
});
imgButtonClose.addEventListener("click", () => {
  closePopup(popupImg);
});
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

infoEditButtonOpen.addEventListener("click", () => {
  openPopup(popupEdit);
});
addImgButtonOpen.addEventListener("click", () => {
  formName.value = infoName.textContent;
  formText.value = infoParagraph.textContent;
  openPopup(popupAdd);
});
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  imgName = emptyName.value;
  imgLink = emptyLink.value;
  addCard(imgName, imgLink);
  closePopup(popupAdd);
  emptyName.value = "";
  emptyLink.value = "";
}
addImgButtonSave.addEventListener("submit", handleAddFormSubmit);

function popupEditSave(evt) {
  evt.preventDefault();
  infoName.textContent = formName.value;
  infoParagraph.textContent = formText.value;
  closePopup(popupEdit);
}
editProfileButtonSave.addEventListener("submit", popupEditSave);

initialCards.forEach(function (element) {
  imgName = element.name;
  imgLink = element.link;
  addCard(imgName, imgLink);
});






function createElement(item)  {
  const template = document.querySelector("#template").content;
  const createElement = template.querySelector(".element").cloneNode(true);
  createElement.querySelector(".element__mask-group").src = imgLink;
  createElement.querySelector(".element__mask-group").alt = imgName;
  createElement.querySelector(".element__title").textContent = imgName;
  const elementLike = createElement.querySelector(".element__like");
  const elementDelete = createElement.querySelector(".element__delete-button");

  elementDelete.addEventListener("click", () => {
    elementDelete.closest(".element").remove();
  });
  elementLike.addEventListener("click", () => {
    elementLike.classList.toggle("element__like_active");
  });
  createElement.querySelector(".element__mask-group").addEventListener("click", () => {
      popupImgScale.src =  createElement.querySelector(".element__mask-group").src;
      popupImgScale.alt =  createElement.querySelector(".element__mask-group").alt;
      popupTittleScale.textContent =  createElement.querySelector(".element__title").textContent;
      openPopup(popupImg);
    });
  return createElement
}
const popupImgScale = document.querySelector(".popup__img");
const popupTittleScale = document.querySelector(".popup__img-title");








function addCard(imgName, imgLink)  {
const newElement = createElement(imgName, imgLink)
  photos.prepend(newElement);
}




















/*
  if(event.target.closest('.element__mask-group'))
  ( PopupImg.classList.add('popup_opened'))
  (document.querySelector('.popup__title').textContent = )
  (document.querySelector('.popup__img').src = )



  initialCards.forEach(function (element) {
    const directorElement = template.cloneNode(true);
    directorElement.querySelector('.element__title').textContent = element.name
    directorElement.querySelector('.element__mask-group').src = element.link
    photos.prepend(directorElement)
  })

photos.addEventListener("click", EventElement);
function EventElement(event) {
  if (event.target.closest(".element__like"))
    event.target.classList.toggle("element__like_active");
  if (event.target.closest(".element__delete-button"))
    event.target.closest(".element").remove();
}
*/
