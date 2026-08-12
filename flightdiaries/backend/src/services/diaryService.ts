 import diaryData from '../../data/entries.json' with { type: 'json' };
import { NewEntrySchema } from '../types.js';
import type {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from '../types.js';

const getEntries = (): DiaryEntry[] => {
  return diaryData as DiaryEntry[];
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return (diaryData as DiaryEntry[]).map(
    ({ id, date, weather, visibility }) => ({
      id,
      date,
      weather,
      visibility,
    })
  );
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const parsedEntry = NewEntrySchema.parse(entry);

  const newDiaryEntry: DiaryEntry = {
    id: Math.max(...(diaryData as DiaryEntry[]).map((entry) => entry.id)) + 1,
    date: parsedEntry.date,
    weather: parsedEntry.weather,
    visibility: parsedEntry.visibility,
    comment: parsedEntry.comment ?? '',
  };

  (diaryData as DiaryEntry[]).push(newDiaryEntry);

  return newDiaryEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
};