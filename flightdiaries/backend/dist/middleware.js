import { z } from 'zod';
import { NewEntrySchema } from './types.js';
export const newDiaryParser = (req, _res, next) => {
    try {
        NewEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
export const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
