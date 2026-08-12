import diaryData from '../../data/entries.json' with { type: 'json' };
import { NewEntrySchema } from '../types.js';
const getEntries = () => {
    return diaryData;
};
const getNonSensitiveEntries = () => {
    return diaryData.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const addDiary = (entry) => {
    const parsedEntry = NewEntrySchema.parse(entry);
    const newDiaryEntry = {
        id: Math.max(...diaryData.map((entry) => entry.id)) + 1,
        date: parsedEntry.date,
        weather: parsedEntry.weather,
        visibility: parsedEntry.visibility,
        comment: parsedEntry.comment ?? '',
    };
    diaryData.push(newDiaryEntry);
    return newDiaryEntry;
};
export default {
    getEntries,
    getNonSensitiveEntries,
    addDiary,
};
