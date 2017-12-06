import Address from './address';

export default class Person {
  constructor(obj) {
    if (!obj) {
      this.id = null;
      this.name = null;
      this.phone = null;
      this.picture = null;
      this.email = null;
      this.birthday = null;
      this.address = new Address();
      this.birthdayString = null;
      this.age = null;
    } else {
      this.id = obj.id;
      this.name = obj.name;
      this.phone = obj.phone;
      this.picture = obj.picture;
      this.email = obj.email;
      this.birthday = obj.birthday;
      this.address = new Address(obj.address);
      this.birthdayString = obj.birthdayString;
      this.age = obj.age;        
    }
  }
}
