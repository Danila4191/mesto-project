import api from "../utils/constants"

export default class Card {
  constructor(selector) {
    this._template = document.querySelector(selector).content;
  }
  createCard(element) {

    const newElement = this._template.querySelector(".element").cloneNode(true);
    const photoCardImage = newElement.querySelector(".element__mask-group");
    photoCardImage.src = element.link;
    photoCardImage.alt = element.name;
    newElement.querySelector(".element__title").textContent = element.name;
    const deleteCardButton = newElement.querySelector(".element__delete-button");
    const likeCardButton = newElement.querySelector(".element__like");
    const likeCount = newElement.querySelector(".element__like-count");
    if (element.owner._id !== userId){
      deleteCardButton.remove();
    }
    if (element.likes.find((like) => like._id === userId)) {
      likeCardButton.classList.add("element__like_active");
    }
    likeCount.textContent = element.likes.length;
    photoCardImage.addEventListener("click", () => {
      popupImgScale.src = element.link;
      popupImgScale.alt = element.name;
      popupTittleScale.textContent = element.name;
      openPopup(popupImg);
    });

    deleteCardButton.addEventListener("click", (e) => {
      if (element.owner._id === userId) {
        api.deleteCard(element._id)
          .then(() => {
            e.target.closest(".element").remove();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    likeCardButton.addEventListener("click", (e) => {
      if (element.likes.find((like) => like._id === userId)) {
        api.deleteLike({ likes: userAllData }, element._id)
          .then((dataFromServer) => {
            e.target.classList.toggle("element__like_active");
            likeCount.textContent = dataFromServer.likes.length;
            element.likes = dataFromServer.likes
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.putLike({ likes: userAllData }, element._id)
          .then((dataFromServer) => {
            e.target.classList.toggle("element__like_active");
            likeCount.textContent = dataFromServer.likes.length;
            element.likes = dataFromServer.likes
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    return newElement;
  }
  /*renderCard(element, container) {
    const card = createCard(element);
    container.prepend(card);
  }*/

}
