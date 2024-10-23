import dotenv from 'dotenv';

dotenv.config();

export function env(name, defaultValue) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}

console.log('MONGODB_USER:', process.env.MONGODB_USER);
console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);
console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('MONGODB_DB:', process.env.MONGODB_DB);
console.log('PORT:', process.env.PORT);
