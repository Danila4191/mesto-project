import "../src/pages/index.css";

import { api } from './script/utils/constants'
import PopupWithForm from './script/components/PopupWithForm';
import UserInfo from './script/components/UserInfo';
import Section from './script/components/Section';
import Card from './script/components/Card';
import FormValidator from './script/components/FormValidator';
import PopupWithImage from "./script/components/PopupWithImage";

const userInfo = new UserInfo('.info__name', '.info__paragraph', '.profile__avatar');

const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  formSelector: ".form",
  inputErrorClass: "form__input_error",
  inactiveButtonClass: "form__save-button_disabled",
};



const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};


enableValidation(validationConfig);

const popupEditProfile = new PopupWithForm('#popup-edit', (evt, popup) => {
  evt.preventDefault();
  popup.addDotesButtonName();
  const values = popup.getValues();
  api.submitProfileForm({ name: values['name'], about: values['text'] })
    .then((data) => {
      userInfo.setUserInfo(data);
      popup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popup.removeDotesFromButtonName();
    });
});
popupEditProfile.setEventListeners();


const popupAvatar = new PopupWithForm('#popupImgProfile', (evt, popup) => {
  evt.preventDefault();
  popup.addDotesButtonName();
  const values = popup.getValues();

  api.submitAvatarProfileForm({ avatar: values['href'] })
    .then((data) => {
      userInfo.setUserInfo(data);
      popup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popup.removeDotesFromButtonName();

    });
});
popupAvatar.setEventListeners();


const avatarButton = document.querySelector('.profile__avatar-button');
const infoButton = document.querySelector('.info__edit-button');
avatarButton.addEventListener("click", () => {
  popupAvatar.open()
  formValidators['add-img'].resetValidation();
})

infoButton.addEventListener("click", () => {
  const sourceUserInfo = userInfo.getUserInfo();
  popupEditProfile.setValues({
    name: sourceUserInfo.name,
    text: sourceUserInfo.about
  });
  popupEditProfile.open()
  formValidators['edit-profile'].resetValidation();
});





const popupImgScale = new PopupWithImage("#popup-img");
popupImgScale.setEventListeners()
const renderer = (item, userData) => {
  const card = new Card(item, '#template', userData, popupImgScale,
    ((id) => {
      api
        .deleteCard(id)
        .then(() => {
          card.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    }),
    ((id) => {
      api
        .deleteLike(id)
        .then((dataFromServer) => {
          card.changeLike(dataFromServer.likes.length, dataFromServer.likes);
        })
        .catch((err) => {
          console.log(err);
        }
        )
    }),
    ((id) => {
      api
        .putLike(id)
        .then((dataFromServer) => {
          card.changeLike(dataFromServer.likes.length, dataFromServer.likes);

        })
        .catch((err) => {
          console.log(err);
        }
        )
    })
  );
  return card.generate();

}
let cardList = null;
Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([userData, elements]) => {
    userInfo.setUserInfo(userData);
    cardList = new Section({
      renderer: (item) => renderer(item, userData)
    }, '.photos');
    cardList.renderItems(elements);
  })
  .catch(err => {
    console.log(err);
  });


const popupAddCard = new PopupWithForm('#popup-add', (evt, popup) => {
  evt.preventDefault();
  popup.addDotesButtonName();
  const values = popup.getValues();
  api.submitAddCardForm({ name: values['name'], link: values['href'] })
    .then((dataFromServer) => {

      cardList.addItem(dataFromServer, false);
      popup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popup.removeDotesFromButtonName();
    });
});
popupAddCard.setEventListeners();
const addCardButton = document.querySelector(".profile__button");
addCardButton.addEventListener("click", () => {
  popupAddCard.open()
  formValidators['add-imgProfile'].resetValidation();
});
//Лайки delete, Put.Конструктор PopupWithForm
