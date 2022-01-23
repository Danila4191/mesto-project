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
const popupImgScale = document.querySelector(".popup__img");
const popupTittleScale = document.querySelector(".popup__img-title");
const emptyName = document.querySelector("#form_empty_name");
const emptyLink = document.querySelector("#form_empty_link");
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
editProfileButtonClose.addEventListener("click", () => {
  closePopup(popupEdit);
});
addImgButtonClose.addEventListener("click", () => {
  closePopup(popupAdd);
});
imgButtonClose.addEventListener("click", () => {
  closePopup(popupImg);
});
infoEditButtonOpen.addEventListener("click", () => {
  openPopup(popupEdit);
});
addImgButtonOpen.addEventListener("click", () => {
  formName.value = infoName.textContent;
  formText.value = infoParagraph.textContent;
  openPopup(popupAdd);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  infoName.textContent = formName.value;
  infoParagraph.textContent = formText.value;
  closePopup(popupEdit);
}
editProfileButtonSave.addEventListener("submit", handleProfileFormSubmit);



function createCard(imgName, imgLink ) {
  const template = document.querySelector("#template").content;
  const createElement = template.querySelector(".element").cloneNode(true);
  const elementImg = createElement.querySelector(".element__mask-group")
  const elementTitle = createElement.querySelector(".element__title")
  const elementLike = createElement.querySelector(".element__like");
  const elementDelete = createElement.querySelector(".element__delete-button");
  elementImg.src = imgLink;
  elementImg.alt = imgName;
  elementTitle.textContent =imgName;
  elementDelete.addEventListener("click", () => {
    elementDelete.closest(".element").remove();
  });
  elementLike.addEventListener("click", () => {
    elementLike.classList.toggle("element__like_active");
  });
  elementImg.addEventListener("click", () => {
      popupImgScale.src = elementImg.src;
      popupImgScale.alt = elementImg.alt;
      popupTittleScale.textContent = elementTitle.textContent;
      openPopup(popupImg);
    });
  return createElement;
}

function addCard(imgName, imgLink) {
  const newElement = createCard(imgName,imgLink);
  photos.prepend(newElement);
}
initialCards.forEach(function (element) {

  addCard(element.name, element.link);
});
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(emptyName.value,emptyLink.value);
  closePopup(popupAdd);
  emptyName.value = "";
  emptyLink.value = "";
}
addImgButtonSave.addEventListener("submit", handleAddFormSubmit);
