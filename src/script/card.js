import { photos, popupImg, openPopup } from "../script/utils.js";

export function eventElement(event) {
  likeCard();
  deleteCard();
}

function likeCard(evt) {
  if (event.target.closest(".element__like"))
    event.target.classList.toggle("element__like_active");
}

function deleteCard(evt) {
  if (event.target.closest(".element__delete-button"))
    event.target.closest(".element").remove();
}

export function createCard(imgName, imgLink) {
  const template = document.querySelector("#template").content;
  const newElement = template.querySelector(".element").cloneNode(true);
  const popupImgScale = document.querySelector(".popup__img");
  const popupTittleScale = document.querySelector(".popup__img-title");
  newElement.querySelector(".element__mask-group").src = imgLink;
  newElement.querySelector(".element__title").textContent = imgName;
  renderCard(newElement, photos);
  const photoCardImage = newElement.querySelector(".element__mask-group");
  photoCardImage.addEventListener("click", () => {
    popupImgScale.src = imgLink;
    popupTittleScale.textContent = imgName;
    openPopup(popupImg);
  });
}
function renderCard(card, container) {
  container.prepend(card);
}
