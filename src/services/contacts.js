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
