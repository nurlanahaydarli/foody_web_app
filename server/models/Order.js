export class Order {
  constructor(
    customer_id,
    delivery_address,
    amount,
    contact,
    payment_method,
    products
  ) {
    this.customer_id = customer_id;
    this.amount = amount;
    this.contact = contact;
    this.delivery_address = delivery_address;
    this.payment_method = payment_method;
    this.products = products;
  }

  toPlainObject() {
    return {
      customer_id: this.customer_id,
      amount: this.amount,
      contact: this.contact,
      delivery_address: this.delivery_address,
      payment_method: this.payment_method,
    };
  }
}
