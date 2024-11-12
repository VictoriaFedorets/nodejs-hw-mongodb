import { model, Schema } from 'mongoose';
import { emailRegexp } from '../../constants/index.js';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegexp, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
// Метод toJSON() викликається тоді, коли обʼєкт серіалізується (перетворюється на JSON) під час виклику JSON.stringify() або res.json().

export const UsersCollection = model('users', usersSchema);
