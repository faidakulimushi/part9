import express from 'express';
import { ZodError } from 'zod';
import diaryService from '../services/diaryService.js';
const router = express.Router();
router.get('/', (_req, res) => {
    const data = diaryService.getNonSensitiveEntries();
    res.json(data);
});
router.post('/', (req, res) => {
    try {
        const newDiary = diaryService.addDiary(req.body);
        res.json(newDiary);
    }
    catch (error) {
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
});
export default router;
