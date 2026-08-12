import diaryData from '../../data/entries.json' with { type: 'json' };
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
    const newDiaryEntry = {
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
