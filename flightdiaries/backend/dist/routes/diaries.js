import express from 'express';
import diaryService from '../services/diaryService.js';
const router = express.Router();
router.get('/', (_req, res) => {
    const data = diaryService.getNonSensitiveEntries();
    res.json(data);
});
router.post('/', (req, res) => {
    const newDiary = diaryService.addDiary(req.body);
    res.json(newDiary);
});
export default router;
