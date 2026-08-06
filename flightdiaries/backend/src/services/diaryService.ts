import diaryData from '../../data/entries.json' with { type: 'json' };
import type { DiaryEntry, NonSensitiveDiaryEntry } from '../types.js';

const getEntries = (): DiaryEntry[] => {
  return diaryData as DiaryEntry[];
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return (diaryData as DiaryEntry[]).map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  })) as NonSensitiveDiaryEntry[];
};

const addDiary = (): DiaryEntry | null => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
};