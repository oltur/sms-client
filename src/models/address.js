export default class Address {
  constructor(obj) {
    if (!obj) {
      this.city = null;
      this.street = null;
      this.country = null;
    } else {
      this.city = obj.city;
      this.street = obj.street;
      this.country = obj.country;
    }
  }
}
