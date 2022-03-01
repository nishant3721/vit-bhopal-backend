export class User {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  token?: string;

  constructor(data: {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    createdAt?: string;
    updatedAt?: string;
  }) {
    if (!data) {
      data = {};
    }
    this._id = data._id || null;
    this.name = data.name || null;
    this.email = data.email || null;
    this.phone = data.phone || null;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }
}
