// src/services/students.js
import { contacts } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const allContacts = await contacts.find();
  console.log('Fetched contacts:', allContacts); // Log the fetched contacts
  return allContacts;
};

export const getContactById = async (contactId) => {
  const contact = await contacts.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contacts.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await contacts.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await contacts.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
