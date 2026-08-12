 import diaryData from '../../data/entries.json' with { type: 'json' };
import type { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types.js';

const getEntries = (): DiaryEntry[] => {
  return diaryData as DiaryEntry[];
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return (diaryData as DiaryEntry[]).map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry: DiaryEntry = {
    id: Math.max(...diaryData.map((entry) => entry.id)) + 1,
    ...entry,
  };

  diaryData.push(newDiaryEntry);

  return newDiaryEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
};