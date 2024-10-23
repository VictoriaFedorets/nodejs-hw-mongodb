import dotenv from 'dotenv';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

dotenv.config();

const bootstrap = async () => {
  try {
    await initMongoConnection(); // Підключення до MongoDB
    setupServer(); // Запуск сервера
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Завершення процесу з помилкою
  }
};

bootstrap();
