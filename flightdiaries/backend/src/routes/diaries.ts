import express, { type Request, type Response } from 'express';
import diaryService from '../services/diaryService.js';
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from '../types.js';

const router = express.Router();

router.get('/', (_req: Request, res: Response<NonSensitiveDiaryEntry[]>) => {
  const data = diaryService.getNonSensitiveEntries();
  res.json(data);
});

router.post('/', (req: Request<unknown, unknown, NewDiaryEntry>, res: Response) => {
  const newDiary = diaryService.addDiary(req.body);
  res.json(newDiary);
});

export default router;