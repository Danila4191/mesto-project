

export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      this._hideError(errorElement, inputElement);
    });

  }
  _toggleButtonState = (isActive = false) => {
    if (isActive) {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = "disabled";
    }
  };
  _showError = (errorElement, inputElement) => {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };
  _hideError = (errorElement, inputElement) => {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  };
  _checkInputValidity = (inputElement) => {
    const isInputValid = inputElement.validity.valid;
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    if (!isInputValid) {
      this._showError(errorElement, inputElement, this._config);
    } else {
      this._hideError(errorElement, inputElement, this._config);
    }
  };
  _setEventListener = () => {
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);

    [...this._inputList].forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(this._form.checkValidity());
      });
    });
  };

  enableValidation = () => {
    this._setEventListener(this._form);
  };

}
