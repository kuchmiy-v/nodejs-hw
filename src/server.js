import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Підключення стандартних middleware та логера
app.use(cors());
app.use(express.json());
app.use(pino());

// Маршрути для нотаток
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// Тестовий маршрут для імітації помилки
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// Middleware для обробки неіснуючих маршрутів (404)
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// Middleware для обробки помилок сервера (500)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    error: err.message,
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
