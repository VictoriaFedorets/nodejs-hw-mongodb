import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import { contactsRouter } from './routers/contacts.js';
import { notFoundHandler } from '../src/middlewares/notFoundHandler.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';
import { logger } from '../src/middlewares/logger.js';

const PORT = Number(env('PORT', '3026'));

export const setupServer = () => {
  const app = express();

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
  // наприклад, у запитах POST або PATCH
  app.use(express.json());

  // Налаштування CORS
  app.use(cors());

  // Налаштування логгера
  app.use(logger);

  // app.use((req, res, next) => {
  //   console.log(`Time: ${new Date().toLocaleString()}`);
  //   next();
  // });

  // Обробка неіснуючих роутів

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('/contacts', contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
