export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item, toEnd = true) {
    const card = this._renderer(item)
    if (toEnd)
      this._container.append(card);
    else
      this._container.prepend(card);
  }
  renderItems(items) {

    items.forEach(item => {
      this.addItem(item);
    });
  }
}
