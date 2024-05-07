export class Restaurant {
  constructor(
    name,
    cuisine,
    delivery_price,
    delivery_min,
    img_url,
    address,
    category_id
  ) {
    this.name = name;
    this.cuisine = cuisine;
    this.delivery_price = delivery_price;
    this.img_url = img_url;
    this.delivery_min = delivery_min;
    this.img_url = img_url;
    this.address = address;
    this.category_id = category_id;
  }

  toPlainObject() {
    return {
      name: this.name,
      cuisine: this.cuisine,
      delivery_price: this.delivery_price,
      img_url: this.img_url,
      delivery_min: this.delivery_min,
      address: this.address,
      img_url: this.img_url,
      category_id: this.category_id,
    };
  }
}
