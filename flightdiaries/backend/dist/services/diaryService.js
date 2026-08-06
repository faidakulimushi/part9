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
const addDiary = () => {
    return null;
};
export default {
    getEntries,
    getNonSensitiveEntries,
    addDiary,
};
