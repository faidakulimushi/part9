 import { z } from 'zod';

export const Weather = [
  'sunny',
  'rainy',
  'cloudy',
  'stormy',
  'windy',
] as const;

export type Weather = (typeof Weather)[number];

export const Visibility = [
  'great',
  'good',
  'ok',
  'poor',
] as const;

export type Visibility = (typeof Visibility)[number];

export const NewEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.string().date(),
  comment: z.string().optional(),
});

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;