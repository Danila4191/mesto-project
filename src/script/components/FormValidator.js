

export default class FormValidator {
  constructor(config) {
    this._config = config;
  }
  _toggleButtonState = (button, isActive = false) => {
    if (isActive) {
      button.classList.remove(this._config.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._config.inactiveButtonClass);
      button.disabled = "disabled";
    }
  };
  _showError = (errorElement, inputElement) => {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };
  _hideError = (errorElement, inputElement) => {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };
  _checkInputValidity = (inputElement, form) => {
    const isInputValid = inputElement.validity.valid;
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    if (!isInputValid) {
      showError(errorElement, inputElement, this._config);
    } else {
      hideError(errorElement, inputElement, this._config);
    }
  };
  setEventListener = (form) => {
    const inputList = form.querySelectorAll(this._config.inputSelector);
    const submitButton = form.querySelector(this._config.submitButtonSelector);

    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    [...inputList].forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input, form);
        this._toggleButtonState(submitButton, form.checkValidity());
      });
    });
  };

  enableValidation = () => {
    const forms = document.querySelectorAll(config.formSelector);
    [...forms].forEach((form) => {
      setEventListener(form);
    });
  };

}
