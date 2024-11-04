// src/services/students.js
import { contacts } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page = 1, perPage = 10 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const allContacts = await contacts.find();
  console.log('Fetched contacts:', allContacts);

  const contactsCount = await contacts
    .find()
    .merge(allContacts)
    .countDocuments();

  const contacts = await allContacts.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
