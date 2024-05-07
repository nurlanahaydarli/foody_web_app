export class Product {
  constructor(name, description, price, rest_id, img_url) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.img_url = img_url;
    this.rest_id = rest_id;
  }

  // Convert the Product instance to a plain object
  toPlainObject() {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
      img_url: this.img_url,
      rest_id: this.rest_id,
    };
  }
}
