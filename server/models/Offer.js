export class Offer {
  constructor(name, description, img_url) {
    this.name = name;
    this.description = description;
    this.img_url = img_url;
  }

  toPlainObject() {
    return {
      name: this.name,
      img_url: this.img_url,
      description: this.description,
    };
  }
}
