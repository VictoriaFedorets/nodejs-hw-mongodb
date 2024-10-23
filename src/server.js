import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
  // наприклад, у запитах POST або PATCH
  app.use(express.json());

  // Налаштування CORS
  app.use(cors());

  // Налаштування логгера
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

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

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
