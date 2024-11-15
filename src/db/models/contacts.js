import mongoose, { model, Schema } from 'mongoose';
import { handleServerError } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    // parentId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactsSchema.post('save', handleServerError);

export const contacts = model('contacts', contactsSchema);
