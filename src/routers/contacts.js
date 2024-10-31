import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post('/students', ctrlWrapper(createContactController));

contactsRouter.delete(
  '/students/:studentId',
  ctrlWrapper(deleteContactController),
);

contactsRouter.put(
  '/students/:studentId',
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/students/:studentId',
  ctrlWrapper(patchContactController),
);

export default contactsRouter;
