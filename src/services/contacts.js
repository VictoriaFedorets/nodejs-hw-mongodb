// src/services/students.js
import { contacts } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  try {
    const allContacts = await contacts.find();
    console.log('Fetched contacts:', allContacts); // Log the fetched contacts
    return allContacts;
  } catch (error) {
    console.error('Error fetching all contacts:', error);
    throw new Error('Could not fetch contacts'); // Provide a clear error message
  }
};

export const getContactById = async (contactId) => {
  try {
    const contact = await contacts.findById(contactId);
    if (!contact) {
      throw new Error(`Contact with ID ${contactId} not found`);
    }
    return contact;
  } catch (error) {
    console.error(`Error fetching contact with ID ${contactId}:`, error);
    throw new Error('Could not fetch contact');
  }
};
