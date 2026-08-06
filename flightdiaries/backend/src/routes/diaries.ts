import express, { type Request, type Response } from 'express';
import diaryService from '../services/diaryService.js';
import type { NonSensitiveDiaryEntry } from '../types.js';

const router = express.Router();

router.get('/', (_req: Request, res: Response<NonSensitiveDiaryEntry[]>) => {
  const data = diaryService.getNonSensitiveEntries();
  res.json(data);
});

router.post('/', (_req: Request, res: Response) => {
  res.send('add a new diary');
});

export default router;