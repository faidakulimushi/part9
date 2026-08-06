import express from 'express';
import diaryService from '../services/diaryService.js';
const router = express.Router();
router.get('/', (_req, res) => {
    const data = diaryService.getNonSensitiveEntries();
    res.json(data);
});
router.post('/', (_req, res) => {
    res.send('add a new diary');
});
export default router;
