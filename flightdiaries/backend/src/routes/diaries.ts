 import express, { type Request, type Response } from 'express';
import { ZodError } from 'zod';
import diaryService from '../services/diaryService.js';
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from '../types.js';

const router = express.Router();

router.get('/', (_req: Request, res: Response<NonSensitiveDiaryEntry[]>) => {
  const data = diaryService.getNonSensitiveEntries();
  res.json(data);
});

router.post(
  '/',
  (req: Request<unknown, unknown, NewDiaryEntry>, res: Response) => {
    try {
      const newDiary = diaryService.addDiary(req.body);
      res.json(newDiary);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.issues.map((issue) => issue.message).join(', '),
        });
        return;
      }

      res.status(400).json({
        error: 'Something went wrong',
      });
    }
  }
);

export default router;