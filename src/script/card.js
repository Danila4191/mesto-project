import { photos, popupImg } from "../script/utils.js";
import { openPopup } from "../script/modal.js";
import {
  deleteCardApi,
  userApi,
  putLikeApi,
  deleteLikeApi,
} from "../script/api.js";

let userId = "";
let userAllData;
userApi()
  .then((data) => {
    userId = data._id;
    userAllData = data;
  })
  .catch((err) => {
    console.log(err);
  });
export function createCard(element) {
  const template = document.querySelector("#template").content;
  const newElement = template.querySelector(".element").cloneNode(true);
  const popupImgScale = document.querySelector(".popup__img");
  const popupTittleScale = document.querySelector(".popup__img-title");

  newElement.querySelector(".element__mask-group").src = element.link;
  newElement.querySelector(".element__title").textContent = element.name;

  const photoCardImage = newElement.querySelector(".element__mask-group");
  const deleteCardButton = newElement.querySelector(".element__delete-button");
  const likeCardButton = newElement.querySelector(".element__like");
  const likeCount = newElement.querySelector(".element__like-count");
  if (element.owner._id !== userId) {
    deleteCardButton.remove();
  }
  if (element.likes.find((like) => like._id === userId)) {
    likeCardButton.classList.add("element__like_active");
  }
  likeCount.textContent = element.likes.length;
  photoCardImage.addEventListener("click", () => {
    popupImgScale.src = element.link;
    popupTittleScale.textContent = element.name;
    openPopup(popupImg);
  });

  deleteCardButton.addEventListener("click", (e) => {
    if (element.owner._id === userId) {
      deleteCardApi(element._id)
        .then((dataFromServer) => {
          e.target.closest(".element").remove();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  likeCardButton.addEventListener("click", (e) => {
    if (element.likes.find((like) => like._id === userId)) {
      deleteLikeApi({ likes: userAllData }, element._id).then(
        (dataFromServer) => {
          e.target.classList.toggle("element__like_active");
          likeCount.textContent = dataFromServer.likes.length;
        }
      )
      .catch((err) => {
        console.log(err);
      });
    } else if (userId !== element.likes._id) {
      putLikeApi({ likes: userAllData }, element._id).then((dataFromServer) => {
        e.target.classList.toggle("element__like_active");
        likeCount.textContent = dataFromServer.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });
  return newElement;
}
export function renderCard(element, container) {
  const card = createCard(element);
  container.prepend(card);
}

/* старое и неудобное
export function eventElement(event) {
  likeCard();
  deleteCard();
}
function deleteCard(evt) {
    if (event.target.closest(".element__delete-button"))
    event.target.closest(".element").remove();
  })
}
function likeCard(evt) {
  if (event.target.closest(".element__like"))
    event.target.classList.toggle("element__like_active");
}
*/
