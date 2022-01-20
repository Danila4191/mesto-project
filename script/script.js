let popupEdit = document.querySelector('#popup-edit')
let infoName = document.querySelector('.info__name')
let infoParagraph = document.querySelector('.info__paragraph')
let infoEditButtonOpen = document.querySelector('.info__edit-button')
let editProfileButtonSave = document.querySelector('#profile_save')
let editProfileButtonClose = document.querySelector('#profile_close')
let popupAdd = document.querySelector('#popup-add')
let addImgButtonOpen = document.querySelector('.profile__button')
let addImgButtonClose = document.querySelector('#add_close')
let addImgButtonSave= document.querySelector('#add_save')
let popupImg = document.querySelector('#popup-img')
let imgButtonClose = document.querySelector('#img_close')
let formText= document.querySelector('#form_text')
let formName = document.querySelector('#form_name')
const template = document.querySelector('#template').content
const photos = document.querySelector('.photos')
let popupImgScale = document.querySelector('.popup__img')
let popupTittleScale = document.querySelector('.popup__img-title')
formName.value = infoName.textContent
formText.value = infoParagraph.textContent

editProfileButtonClose .addEventListener('click', () => {  closePopup(popupEdit)})
addImgButtonClose.addEventListener('click', () => {  closePopup(popupAdd)})
imgButtonClose.addEventListener('click', () => {  closePopup(popupImg)})
function  closePopup(popup) {  popup.classList.remove("popup_opened")}

function popupEditSave(evt) {
  evt.preventDefault()
  infoName.textContent = formName.value;
  infoParagraph.textContent = formText.value;
  popupEdit.classList.remove('popup_opened')
}
editProfileButtonSave.addEventListener('click', popupEditSave);

infoEditButtonOpen.addEventListener('click', () => {  openPopup(popupEdit)})
addImgButtonOpen.addEventListener('click', () => {  openPopup(popupAdd)})
function  openPopup(popup) {  popup.classList.add("popup_opened")}

photos.addEventListener('click', EventElement )
function EventElement (event) {
  if(event.target.closest('.element__like'))
  event.target.classList.toggle('element__like_active')
  if(event.target.closest('.element__delete-button'))
  (event.target.closest('.element')).remove()
 }

initialCards.forEach(function (element) {
  imgName = element.name
  imgLink =  element.link
  imgAdd(imgName,imgLink)
})

function popupAddSave(evt) {
  evt.preventDefault()
  imgName = form_empty_name.value
  imgLink = form_empty_link.value
  imgAdd(imgName, imgLink)
  popupAdd.classList.remove('popup_opened')
  form_empty_name.value = ''
  form_empty_link.value = ''
 }
addImgButtonSave.addEventListener('click', popupAddSave)


function imgAdd(imgName,imgLink){
  const template = document.querySelector('#template').content
  const newElement = template.querySelector('.element').cloneNode(true)
  newElement.querySelector('.element__mask-group').src = imgLink;
  newElement.querySelector('.element__title').textContent =  imgName;
  photos.prepend(newElement)
  let photoCardImage =  newElement.querySelector('.element__mask-group')
  photoCardImage.addEventListener('click', () => {
  popupImgScale.src = imgLink;
  popupTittleScale.textContent = imgName;
  openPopup(popupImg);
  });
}










/*
  if(event.target.closest('.element__mask-group'))
  ( PopupImg.classList.add('popup_opened'))
  (document.querySelector('.popup__title').textContent = )
  (document.querySelector('.popup__img').src = )*/

/*

  initialCards.forEach(function (element) {
    const directorElement = template.cloneNode(true);
    directorElement.querySelector('.element__title').textContent = element.name
    directorElement.querySelector('.element__mask-group').src = element.link
    photos.prepend(directorElement)
  })*/



