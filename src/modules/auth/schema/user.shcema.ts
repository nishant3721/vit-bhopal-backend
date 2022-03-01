// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
  },
  { timestamps: true },
);
