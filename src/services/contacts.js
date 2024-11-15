// src/services/students.js
import { contacts } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // const userObjectId = mongoose.Types.ObjectId(userId);

  const contactsQuery = contacts.find({
    userId: filter.userId,
  });

  // console.log('Fetched contacts:', contactsQuery);

  if (filter.contactType !== undefined) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  // для врахування всіх фільтрів додаємо .clone()
  // const contactsCount = await contactsQuery.clone().countDocuments();

  const contactsCount = await contacts
    .find()
    .merge(contactsQuery)
    .countDocuments();

  const contactsData = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contactsData,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  return await contacts.findOne({
    _id: contactId,
    userId: userId,
  });
};

export const createContact = async (payload) => {
  const contact = await contacts.create(payload);
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await contacts.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const rawResult = await contacts.findOneAndUpdate(
    {
      _id: contactId,
      userId: userId,
    },
    payload,
    {
      ...options,
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
