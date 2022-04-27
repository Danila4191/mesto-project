

export default class Card {
  constructor(item, selector, userAllData, popupImgScale, deleteCardHandler, deleteLikeHandler, putLikeHandler) {
    this._template = document.querySelector(selector).content;
    this._item = item;
    this._userAllData = userAllData;
    this._popupImgScale = popupImgScale;
    this._deleteCardHandler = deleteCardHandler;
    this._deleteLikeHandler = deleteLikeHandler;
    this._putLikeHandler = putLikeHandler;

  }
  generate() {
    const newElement = this._template.querySelector(".element").cloneNode(true);
    const photoCardImage = newElement.querySelector(".element__mask-group");
    photoCardImage.src = this._item.link;
    photoCardImage.alt = this._item.name;
    newElement.querySelector(".element__title").textContent = this._item.name;
    const deleteCardButton = newElement.querySelector(
      ".element__delete-button"
    );
    const likeCardButton = newElement.querySelector(".element__like");
    const likeCount = newElement.querySelector(".element__like-count");
    if (this._item.owner._id !== this._userAllData._id) {
      deleteCardButton.remove();
    }
    if (this._item.likes.find((like) => like._id === this._userAllData._id)) {
      likeCardButton.classList.add("element__like_active");
    }
    likeCount.textContent = this._item.likes.length;


    photoCardImage.addEventListener("click", () => {

      this._popupImgScale.init(this._item.link,
        this._item.name);
      this._popupImgScale.open();
      this._popupImgScale.setImgPopup()
      this._popupImgScale.setEventListeners()
    });


    deleteCardButton.addEventListener("click", (e) => {
      if (this._item.owner._id === this._userAllData._id) {
        this._deleteCardHandler(e, this);
      }
    });

    likeCardButton.addEventListener("click", (e) => {
      if (this._item.likes.find((like) => like._id === this._userAllData._id)) {
        this._deleteLikeHandler(e, this);

      } else {
        this._putLikeHandler(e, this);
      }
    });
    return newElement;
  }
}
