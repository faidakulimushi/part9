import { z } from 'zod';
export const Weather = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
export const Visibility = ['great', 'good', 'ok', 'poor'];
export const NewEntrySchema = z.object({
    weather: z.enum(Weather),
    visibility: z.enum(Visibility),
    date: z.string().date(),
    comment: z.string().optional(),
});
